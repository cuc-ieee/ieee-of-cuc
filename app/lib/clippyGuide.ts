export type GuideTarget = {
  selector: string;
  line: string;
};

export const GUIDE_START_LINE =
  "Guide started. I will walk you through the key sections.";

export const GUIDE_DONE_LINE =
  "Guide complete. You are ready to explore on your own.";

export function getRouteGuideHint(pathname: string): string {
  if (pathname === "/") {
    return "You are on Home. Press Guide for a quick walkthrough.";
  }

  if (pathname.startsWith("/events")) {
    return "Events page detected. Press Guide to focus on key content.";
  }

  if (pathname.startsWith("/membership")) {
    return "Membership page is open. Press Guide for highlights.";
  }

  if (pathname.startsWith("/contact")) {
    return "Contact page is ready. Press Guide to jump to the form.";
  }

  if (pathname.startsWith("/about")) {
    return "About page loaded. Press Guide to view mission highlights.";
  }

  if (pathname.startsWith("/committee")) {
    return "Committee page loaded. Press Guide to scan important sections.";
  }

  if (pathname.startsWith("/gallery")) {
    return "Gallery page loaded. Press Guide to jump to featured content.";
  }

  return "Press Guide and I will point out the important parts.";
}

export function getGuideTargets(pathname: string): GuideTarget[] {
  if (pathname === "/") {
    return [
      {
        selector: "#events",
        line: "This section shows your upcoming events.",
      },
      {
        selector: "#membership",
        line: "This is where visitors can join IEEE.",
      },
      {
        selector: "#contact",
        line: "Here is the contact section for direct messages.",
      },
    ];
  }

  if (pathname.startsWith("/contact")) {
    return [
      {
        selector: "form",
        line: "This is the contact form. Send your message here.",
      },
    ];
  }

  if (pathname.startsWith("/events")) {
    return [
      {
        selector: "main h1, section h1",
        line: "Start here and open an event for more details.",
      },
    ];
  }

  return [
    {
      selector: "main h1, section h1, #about, #hero",
      line: "Start from this section and scroll for more details.",
    },
  ];
}
