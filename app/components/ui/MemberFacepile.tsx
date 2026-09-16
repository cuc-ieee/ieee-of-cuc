"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { committeeMembers, CommitteeMember } from "@/data/committee";

interface FaceAvatar {
  id: string;
  member: CommitteeMember;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  zIndex: number;
}

const SLOT_SPACING = 28; // 28px offset between overlapping 40px avatars

export function MemberFacepile() {
  const nextMemberIdx = useRef(4);
  const idCounter = useRef(4);

  // Exactly 4 active avatars in slots 0, 1, 2, 3 (x = 0, 28, 56, 84)
  const [avatars, setAvatars] = useState<FaceAvatar[]>(() => [
    {
      id: "face-0",
      member: committeeMembers[0],
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      zIndex: 40,
    },
    {
      id: "face-1",
      member: committeeMembers[1],
      x: SLOT_SPACING * 1,
      y: 0,
      opacity: 1,
      scale: 1,
      zIndex: 30,
    },
    {
      id: "face-2",
      member: committeeMembers[2],
      x: SLOT_SPACING * 2,
      y: 0,
      opacity: 1,
      scale: 1,
      zIndex: 20,
    },
    {
      id: "face-3",
      member: committeeMembers[3],
      x: SLOT_SPACING * 3,
      y: 0,
      opacity: 1,
      scale: 1,
      zIndex: 10,
    },
  ]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let cancelled = false;

    const runConveyorStep = () => {
      // Step 1: Rightmost avatar (index 3, at x: 84) falls down and fades
      setAvatars((prev) => {
        if (prev.length < 4) return prev;
        return [
          prev[0],
          prev[1],
          prev[2],
          { ...prev[3], y: 40, opacity: 0, scale: 0.8 },
        ];
      });

      // Step 2a: Avatar at index 2 moves right to slot 3 (x: 84)
      setTimeout(() => {
        if (cancelled) return;
        setAvatars((prev) => {
          if (prev.length < 4) return prev;
          return [
            prev[0],
            prev[1],
            { ...prev[2], x: SLOT_SPACING * 3, zIndex: 10 },
            prev[3],
          ];
        });
      }, 260);

      // Step 2b: Avatar at index 1 moves right to slot 2 (x: 56)
      setTimeout(() => {
        if (cancelled) return;
        setAvatars((prev) => {
          if (prev.length < 4) return prev;
          return [
            prev[0],
            { ...prev[1], x: SLOT_SPACING * 2, zIndex: 20 },
            prev[2],
            prev[3],
          ];
        });
      }, 480);

      // Step 2c: Avatar at index 0 moves right to slot 1 (x: 28)
      setTimeout(() => {
        if (cancelled) return;
        setAvatars((prev) => {
          if (prev.length < 4) return prev;
          return [
            { ...prev[0], x: SLOT_SPACING * 1, zIndex: 30 },
            prev[1],
            prev[2],
            prev[3],
          ];
        });
      }, 700);

      // Step 3: New member falls down from above into empty slot 0 (x: 0)
      setTimeout(() => {
        if (cancelled) return;
        const nextMember =
          committeeMembers[nextMemberIdx.current % committeeMembers.length];
        nextMemberIdx.current += 1;
        const newId = `face-${idCounter.current++}`;

        // Replace the old dropped avatar (prev[3]) with the new avatar at index 0
        setAvatars((prev) => [
          {
            id: newId,
            member: nextMember,
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            zIndex: 40,
          },
          prev[0], // was 0, now slot 1
          prev[1], // was 1, now slot 2
          prev[2], // was 2, now slot 3
        ]);
      }, 920);

      // Schedule next cycle after resting
      timer = setTimeout(runConveyorStep, 4200);
    };

    timer = setTimeout(runConveyorStep, 3200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-4 sm:gap-5 px-3.5 py-2.5 rounded-2xl border border-border/40 bg-transparent hover:border-primary/40 transition-colors">
      {/* 4 Overlapping Avatar Track */}
      <div className="relative h-10 w-[124px] overflow-visible">
        {avatars.map((av) => (
          <motion.div
            key={av.id}
            initial={{
              x: av.x,
              y: av.x === 0 ? -38 : 0,
              opacity: av.x === 0 ? 0 : 1,
              scale: av.x === 0 ? 0.8 : 1,
            }}
            animate={{
              x: av.x,
              y: av.y,
              opacity: av.opacity,
              scale: av.scale,
            }}
            transition={{
              x: { duration: 0.28, ease: [0.25, 1, 0.5, 1] },
              y: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.24 },
              scale: { duration: 0.24 },
            }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: av.zIndex,
            }}
            className="group cursor-pointer"
            title={`${av.member.name} • ${av.member.role}`}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-background ring-1 ring-primary/40 shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:scale-110 group-hover:ring-primary group-hover:z-50 transition-all duration-200">
              <Image
                src={av.member.image}
                alt={av.member.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Direct link to meet the community */}
      <Link
        href="/committee"
        className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-sky-300 transition-colors font-medium group pr-1"
      >
        <span>Meet the community</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>
    </div>
  );
}
