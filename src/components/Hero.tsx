"use client";

import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";

export default function Hero() {
  return (
    <div className="relative" id="home">
      <ScrollyCanvas
        frameCount={128}
        framePrefix="/sequence/ezgif-frame-"
        extension=".png"
      >
        {(progress: any) => <Overlay scrollYProgress={progress} />}
      </ScrollyCanvas>
    </div>
  );
}
