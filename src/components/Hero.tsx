"use client";

import ScrollyVideo from "@/components/ScrollyVideo";
import Overlay from "@/components/Overlay";

export default function Hero() {
  return (
    <div className="relative" id="home">
      <ScrollyVideo
        src="/hero-video-optimized.mp4"
        sources={[
          { src: "/hero-video-optimized.mp4", type: "video/mp4" },
          { src: "/hero-video.mp4", type: "video/mp4" },
        ]}
      >
        {(progress: any) => <Overlay scrollYProgress={progress} />}
      </ScrollyVideo>
    </div>
  );
}
