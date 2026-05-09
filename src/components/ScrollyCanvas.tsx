"use client";

import { useScroll, useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollyCanvasProps {
  frameCount: number;
  framePrefix: string;
  extension?: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyCanvas({
  frameCount,
  framePrefix,
  extension = ".png",
  children,
}: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  
  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const drawFrame = (frameIndex: number, imgs: HTMLImageElement[] = images) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !imgs[frameIndex]) return;

    const img = imgs[frameIndex];
    if (!img.complete || img.naturalWidth === 0) return; // not loaded yet

    // Sync canvas internal resolution with image resolution for CSS object-cover
    if (canvas.width !== img.naturalWidth) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // ezgif-frame-001.png
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `${framePrefix}${paddedIndex}${extension}`;
      img.onload = () => {
        loadedCount++;
        // Draw the first frame once the first image is loaded if we are at start
        if (i === 1 && targetFrameRef.current === 0) {
          drawFrame(0, loadedImages);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount, framePrefix, extension]);

  const syncCanvas = () => {
    rafIdRef.current = null;
    drawFrame(targetFrameRef.current);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const currentFrame = Math.max(0, Math.min(frameCount - 1, Math.floor(latest * (frameCount - 1))));
    targetFrameRef.current = currentFrame;
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(syncCanvas);
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
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
        />
        {/* Render children (Overlay) passing the scrollYProgress value */}
        {children && children(scrollYProgress)}
      </div>
    </div>
  );
}
