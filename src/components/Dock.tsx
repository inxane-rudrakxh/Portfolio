"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

// ─── Icons ───────────────────────────────────────────────────────────────────
const Icons = {
  Home: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Code: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  ),
  Zap: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Compass: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
  ),
  Star: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  BookOpen: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  ),
  Mail: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  FileText: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
  ),
};

const DOCK_ITEMS = [
  { id: "home",      icon: Icons.Home,     label: "Home",     href: "#home" },
  { id: "projects",  icon: Icons.Code,     label: "Projects", href: "#projects" },
  { id: "hackathons",icon: Icons.Star,     label: "Hackathons",href: "#hackathons" },
  { id: "blog",      icon: Icons.BookOpen, label: "Blog",     href: "#blog" },
  { id: "skills",    icon: Icons.Zap,      label: "Skills",   href: "#skills" },
  { id: "journey",   icon: Icons.Compass,  label: "Journey",  href: "#journey" },
  { id: "contact",   icon: Icons.Mail,     label: "Contact",  href: "#contact" },
  { id: "resume",    icon: Icons.FileText, label: "Resume",   href: "/resume" },
];

// ─── Desktop dock (magnification on hover) ───────────────────────────────────
function DesktopDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50 h-16 items-end gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 pb-3 backdrop-blur-md shadow-2xl"
    >
      {DOCK_ITEMS.map((item) => (
        <DesktopDockIcon key={item.id} mouseX={mouseX} item={item} />
      ))}
    </motion.div>
  );
}

function DesktopDockIcon({
  mouseX,
  item,
}: {
  mouseX: MotionValue<number>;
  item: (typeof DOCK_ITEMS)[0];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={item.href}>
      <motion.div
        ref={ref}
        style={{ width }}
        className="aspect-square w-10 rounded-full bg-gray-700/50 border border-white/10 flex items-center justify-center hover:bg-gray-600/80 transition-colors group relative"
      >
        <item.icon className="w-1/2 h-1/2 text-gray-200 group-hover:text-white" />
        {/* Tooltip */}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
          {item.label}
        </span>
      </motion.div>
    </Link>
  );
}

// ─── Mobile nav bar (scrollable pill icons) ───────────────────────────────────
function MobileDock() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="mx-4 mb-3 px-3 py-2 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {DOCK_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col items-center gap-0.5 flex-shrink-0 px-2.5 py-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            aria-label={item.label}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[9px] font-medium tracking-wide whitespace-nowrap">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────
export default function Dock() {
  return (
    <>
      <DesktopDock />
      <MobileDock />
    </>
  );
}
