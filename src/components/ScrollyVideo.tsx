"use client";

import { useScroll, useSpring, useMotionValueEvent, motion, MotionValue } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

interface ScrollyVideoProps {
  src: string;
  sources?: { src: string; type: string }[];
  poster?: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyVideo({
  src,
  sources,
  poster,
  children,
}: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const FRAME_STEP = 1 / 60; // throttle seeks to ~60fps for smoother scrubbing

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll value
  const springScroll = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
  });

  // Seek the video using rAF to avoid hammering the decoder on every scroll tick
  const syncVideoTime = () => {
    rafIdRef.current = null;
    const video = videoRef.current;
    if (!video || !video.duration || video.readyState < 1) return;

    const targetTime = targetProgressRef.current * video.duration;
    if (Math.abs(targetTime - lastTimeRef.current) < FRAME_STEP) return;

    if (typeof (video as any).fastSeek === "function") {
      (video as any).fastSeek(targetTime);
    } else {
      video.currentTime = targetTime;
    }

    lastTimeRef.current = targetTime;
  };

  useMotionValueEvent(springScroll, "change", (latest) => {
    targetProgressRef.current = latest;
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(syncVideoTime);
    }
  });

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          poster={poster}
        >
          {sources && sources.length > 0 ? (
            sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))
          ) : (
            <source src={src} />
          )}
        </video>
        {/* Render children (Overlay) passing the springScroll value */}
        {children && children(springScroll)}
      </div>
    </div>
  );
}
