"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  GUIDE_DONE_LINE,
  GUIDE_START_LINE,
  getGuideTargets,
  getRouteGuideHint,
} from "@/lib/clippyGuide";

type AgentName =
  | "Clippy"
  | "Merlin"
  | "Rover"
  | "Links"
  | "Peedy"
  | "Bonzi"
  | "F1"
  | "Genie"
  | "Genius"
  | "Rocky";

type ClippyAgent = {
  show: (fast?: boolean) => void;
  hide: (fast?: boolean, callback?: () => void) => void;
  speak: (text: string, hold?: boolean) => void;
  animate: () => void;
  stop: () => void;
  dispose: () => void;
  gestureAt?: (x: number, y: number) => void;
  moveTo?: (x: number, y: number, duration?: number) => void;
};

const AGENTS: AgentName[] = [
  "Clippy",
  "Merlin",
  "Rover",
  "Links",
  "Peedy",
  "Bonzi",
  "F1",
  "Genie",
  "Genius",
  "Rocky",
];

export function FunClippyOverlay() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentName>("Clippy");
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isGuideRunning, setIsGuideRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guideStep, setGuideStep] = useState(0);
  const agentRef = useRef<ClippyAgent | null>(null);

  const welcomeMessage = useMemo(
    () =>
      `Hi! I am ${selectedAgent}. Drag me around and press Guide when ready.`,
    [selectedAgent],
  );

  const routeMessage = useMemo(() => getRouteGuideHint(pathname), [pathname]);
  const guideTargets = useMemo(() => getGuideTargets(pathname), [pathname]);

  const speakIfActive = useCallback((text: string) => {
    const activeAgent = agentRef.current;
    if (!activeAgent) {
      return;
    }

    activeAgent.speak(text);
  }, []);

  const pulseElement = useCallback((element: Element) => {
    if (!(element instanceof HTMLElement)) {
      return;
    }

    const previousTransition = element.style.transition;
    const previousBoxShadow = element.style.boxShadow;
    const previousBorderRadius = element.style.borderRadius;

    element.style.transition = "box-shadow 220ms ease";
    element.style.boxShadow =
      "0 0 0 2px rgba(0, 163, 255, 0.8), 0 0 0 10px rgba(0, 163, 255, 0.18)";
    element.style.borderRadius = "12px";

    window.setTimeout(() => {
      element.style.boxShadow = previousBoxShadow;
      element.style.borderRadius = previousBorderRadius;
      element.style.transition = previousTransition;
    }, 1400);
  }, []);

  const runGuideStepAtIndex = useCallback(
    (index: number) => {
      const activeAgent = agentRef.current;
      if (!activeAgent) {
        return false;
      }

      const target = guideTargets[index];
      if (!target) {
        activeAgent.speak("No further guide steps for this page.");
        return false;
      }

      const element = document.querySelector(target.selector);
      if (!element) {
        activeAgent.speak("I could not locate that section on this page.");
        return false;
      }

      element.scrollIntoView({ behavior: "smooth", block: "center" });
      pulseElement(element);

      const rect = element.getBoundingClientRect();
      const x = window.scrollX + rect.left + rect.width / 2;
      const y = window.scrollY + rect.top + Math.min(120, rect.height / 2);

      if (!isMobile && activeAgent.moveTo) {
        activeAgent.moveTo(Math.max(20, x - 120), Math.max(20, y + 100), 700);
      }

      if (!isMobile && activeAgent.gestureAt) {
        activeAgent.gestureAt(x, y);
      }

      activeAgent.speak(target.line);
      setGuideStep(index + 1);
      return true;
    },
    [guideTargets, isMobile, pulseElement],
  );

  const dismissAgent = useCallback(() => {
    const activeAgent = agentRef.current;
    if (!activeAgent) {
      setIsActive(false);
      setIsGuideRunning(false);
      return;
    }

    activeAgent.stop();
    activeAgent.hide(true, () => {
      activeAgent.dispose();
      if (agentRef.current === activeAgent) {
        agentRef.current = null;
      }
      setIsActive(false);
      setIsGuideRunning(false);
    });
  }, []);

  const summonAgent = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      if (agentRef.current) {
        dismissAgent();
      }

      const [{ initAgent }, agents] = await Promise.all([
        import("clippyjs"),
        import("clippyjs/agents"),
      ]);

      const loader = (agents as Record<string, unknown>)[selectedAgent];
      if (!loader) {
        throw new Error(`Agent ${selectedAgent} is not available.`);
      }

      const clippyAgent = (await initAgent(loader as never)) as ClippyAgent;
      clippyAgent.show();
      clippyAgent.speak(welcomeMessage);
      clippyAgent.animate();
      agentRef.current = clippyAgent;
      setIsActive(true);
      setGuideStep(0);
      setIsGuideRunning(false);
    } catch {
      setError("Clippy overlay could not be loaded right now.");
      setIsActive(false);
      setIsGuideRunning(false);
    } finally {
      setIsLoading(false);
    }
  }, [dismissAgent, isLoading, selectedAgent, welcomeMessage]);

  useEffect(() => {
    return () => {
      const activeAgent = agentRef.current;
      if (activeAgent) {
        activeAgent.stop();
        activeAgent.dispose();
      }
      agentRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    if (isMobile && !launcherOpen) {
      return;
    }

    speakIfActive(routeMessage);
  }, [isActive, isMobile, launcherOpen, routeMessage, speakIfActive]);

  useEffect(() => {
    if (!isActive || !isGuideRunning) {
      return;
    }

    if (!guideTargets.length) {
      speakIfActive("Guide has no targets on this page.");
      setIsGuideRunning(false);
      return;
    }

    const tourTargets = isMobile ? guideTargets.slice(0, 2) : guideTargets;

    speakIfActive(GUIDE_START_LINE);

    let step = 0;
    runGuideStepAtIndex(step);
    step += 1;

    const intervalId = window.setInterval(
      () => {
        if (step >= tourTargets.length) {
          window.clearInterval(intervalId);
          setIsGuideRunning(false);
          speakIfActive(GUIDE_DONE_LINE);
          return;
        }

        runGuideStepAtIndex(step);
        step += 1;
      },
      isMobile ? 9000 : 7500,
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [
    guideTargets,
    isActive,
    isGuideRunning,
    isMobile,
    runGuideStepAtIndex,
    speakIfActive,
  ]);

  useEffect(() => {
    if (!isMobile || !launcherOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target) {
        return;
      }

      if (!target.closest("[data-clippy-overlay='true']")) {
        setLauncherOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isMobile, launcherOpen]);

  return (
    <div
      className="fixed bottom-4 right-3 z-[120] flex flex-col items-end gap-2 sm:right-4"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      data-clippy-overlay="true"
    >
      {launcherOpen && (
        <div className="w-[300px] max-w-[calc(100vw-1.5rem)] rounded-xl border border-border/80 bg-card/95 p-3 shadow-2xl backdrop-blur-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Guide Mode
          </p>

          <label
            htmlFor="clippy-agent"
            className="mb-1 block text-xs text-muted-foreground"
          >
            Assistant
          </label>
          <select
            id="clippy-agent"
            value={selectedAgent}
            onChange={(event) =>
              setSelectedAgent(event.target.value as AgentName)
            }
            className="mb-3 w-full rounded-md border border-border bg-background px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          >
            {AGENTS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={summonAgent}
              disabled={isLoading}
              className="min-h-10 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Loading..." : isActive ? "Respawn" : "Summon"}
            </button>
            <button
              type="button"
              onClick={dismissAgent}
              disabled={!isActive && !agentRef.current}
              className="min-h-10 rounded-md border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Dismiss
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setGuideStep(0);
              setIsGuideRunning((value) => !value);
            }}
            disabled={!isActive}
            className="mt-2 min-h-10 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGuideRunning ? "Stop Guide" : "Guide"}
          </button>

          <p className="mt-2 text-xs text-muted-foreground">
            Guide Progress:{" "}
            {guideTargets.length ? Math.min(guideStep, guideTargets.length) : 0}
            /{guideTargets.length}
          </p>

          {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
        </div>
      )}

      <button
        type="button"
        onClick={() => setLauncherOpen((previous) => !previous)}
        className="min-h-11 rounded-full border border-border bg-card/95 px-4 py-2 text-sm font-semibold text-foreground shadow-lg transition-colors hover:bg-secondary"
        aria-expanded={launcherOpen}
        aria-label="Toggle Clippy guide controls"
      >
        {launcherOpen ? "Hide Guide" : "Clippy Guide"}
      </button>
    </div>
  );
}
