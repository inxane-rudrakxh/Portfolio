"use client";

import { motion, type Easing } from "framer-motion";
import Link from "next/link";

const ease: Easing = "easeOut";
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease, delay },
});

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[110px]" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .print-card { background: #f9f9f9 !important; border: 1px solid #ddd !important; }
        }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:px-8 md:py-16">

        {/* Top bar */}
        <motion.div {...fadeUp(0)} className="flex justify-between items-center mb-12 no-print">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Portfolio
          </Link>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / Save PDF
          </button>
        </motion.div>

        {/* Header */}
        <motion.div {...fadeUp(0.05)} className="mb-10">
          <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-blue-400 mb-4 backdrop-blur-md">
            résumé
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-3">
            Rudraksh{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Kottalwar
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium tracking-wide mb-6">
            Full Stack Developer &nbsp;|&nbsp; Python (AI & ML) &nbsp;|&nbsp; UI/UX Designer
          </p>
          <p className="text-gray-400 max-w-3xl leading-relaxed text-base">
            Detail-oriented and tech-savvy student with a strong interest in AI systems, data
            annotation, and problem solving. Skilled in Python, UI/UX design, and building
            real-world projects. Looking to contribute as an AI Trainer in a work-from-home
            environment.
          </p>

          {/* Contact row */}
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { icon: "phone", label: "+91 70834 56836", href: "tel:+917083456836" },
              { icon: "mail", label: "rudraksh7709@gmail.com", href: "mailto:rudraksh7709@gmail.com" },
              { icon: "globe", label: "Portfolio", href: "https://inxane-rudrakxh.github.io/Rudraksh-Kottalwar/" },
              { icon: "github", label: "inxane-rudrakxh", href: "https://github.com/inxane-rudrakxh" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm hover:text-white hover:bg-white/10 transition-all backdrop-blur-md"
              >
                <ContactIcon type={c.icon} />
                {c.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT COLUMN */}
          <div className="md:col-span-1 flex flex-col gap-6">

            {/* Skills */}
            <motion.div {...fadeUp(0.1)} className="print-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
              <SectionTitle icon="⚡" title="Skills" />
              <div className="flex flex-col gap-2 mt-4">
                {[
                  "Python Programming",
                  "Basic Machine Learning",
                  "UI/UX Design",
                  "Web Development (React, JS)",
                  "Data Annotation & Labelling",
                  "Attention to Detail",
                ].map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span className="text-gray-300 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Strengths */}
            <motion.div {...fadeUp(0.15)} className="print-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
              <SectionTitle icon="💪" title="Strengths" />
              <div className="flex flex-col gap-2 mt-4">
                {[
                  "High Accuracy & Attention to Detail",
                  "Strong Problem Solving Skills",
                  "Quick Learner & Adaptable",
                  "Self-Motivated & Consistent",
                  "Efficient Time Management",
                ].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    <span className="text-gray-300 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div {...fadeUp(0.2)} className="print-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
              <SectionTitle icon="🎓" title="Education" />
              <div className="mt-4">
                <p className="text-white font-semibold text-sm leading-snug">
                  Diploma in Computer Science & Engineering
                </p>
                <p className="text-blue-400 text-xs font-mono mt-1">Somayya Polytechnic, Chandrapur</p>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                  Relevant Coursework: Programming & DSA in Java, Python, Full Stack Development
                </p>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN — Projects */}
          <div className="md:col-span-2 flex flex-col gap-6">

            <motion.div {...fadeUp(0.1)} className="print-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
              <SectionTitle icon="🚀" title="Projects" />

              <div className="flex flex-col divide-y divide-white/5 mt-4">

                {/* AttendX */}
                <ProjectEntry
                  title="AttendX"
                  subtitle="AI-Based Attendance System"
                  gradient="from-green-500 to-teal-500"
                  tags={["Python", "OpenCV", "DeepFace", "React", "Firebase"]}
                  repo="https://github.com/inxane-rudrakxh/AttendX"
                  bullets={[
                    "Developed a voice-enabled attendance system using Python",
                    "Implemented user authentication and real-time data handling",
                    "Designed for accuracy and automation in attendance tracking",
                  ]}
                />

                {/* SecureVault */}
                <ProjectEntry
                  title="SecureVault V2.0"
                  subtitle="Encrypted File Storage PWA"
                  gradient="from-blue-500 to-cyan-500"
                  tags={["React", "TypeScript", "Firebase", "AES-256", "PWA"]}
                  repo="https://github.com/inxane-rudrakxh/secure-vault-v2-main"
                  bullets={[
                    "Built a secure file storage system with AES-256 encryption",
                    "Implemented password and PIN-based authentication with intruder detection",
                    "Enabled safe storage and retrieval of sensitive files as a PWA",
                  ]}
                />

                {/* SkillGap AI */}
                <ProjectEntry
                  title="SkillGap AI"
                  subtitle="Smart Skill Analysis Platform"
                  gradient="from-purple-500 to-pink-500"
                  tags={["React", "TypeScript", "Google Gemini AI", "Firebase", "Supabase"]}
                  repo="https://github.com/inxane-rudrakxh/SkillGap"
                  demo="https://skill-navigator-seven.vercel.app"
                  bullets={[
                    "Designed an AI-based system to analyze user skills and suggest improvements",
                    "Focused on bridging the gap between current skills and industry requirements",
                    "Integrated clean UI/UX with Tailwind CSS and Framer Motion for better user interaction",
                  ]}
                  last
                />

              </div>
            </motion.div>

            {/* Hackathons / Extra */}
            <motion.div {...fadeUp(0.2)} className="print-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
              <SectionTitle icon="🏆" title="Hackathons & Experience" />
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <p className="text-white font-semibold text-sm">Innovex Hackathon 2026</p>
                  <p className="text-blue-400 font-mono text-xs mt-0.5">Built AttendX & SkillGap AI</p>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                    Developed two full-stack AI-powered applications in a competitive hackathon setting.
                  </p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">CodeAlpha Internship</p>
                  <p className="text-purple-400 font-mono text-xs mt-0.5">Full Stack Development Intern</p>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                    Built a complete e-commerce store with Django backend, HTML/CSS/JS frontend,
                    featuring auth, cart, wishlist, and checkout.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Footer */}
        <motion.div {...fadeUp(0.3)} className="mt-12 pt-8 border-t border-white/5 text-center text-gray-600 text-xs font-mono no-print">
          © {new Date().getFullYear()} Rudraksh Kottalwar · rudraksh7709@gmail.com
        </motion.div>

      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base">{icon}</span>
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">{title}</h2>
    </div>
  );
}

function ProjectEntry({
  title,
  subtitle,
  gradient,
  tags,
  repo,
  demo,
  bullets,
  last = false,
}: {
  title: string;
  subtitle: string;
  gradient: string;
  tags: string[];
  repo: string;
  demo?: string;
  bullets: string[];
  last?: boolean;
}) {
  return (
    <div className={`py-5 ${last ? "" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient} font-bold text-base`}>
            {title}
          </span>
          <span className="text-gray-500 text-sm ml-2">— {subtitle}</span>
        </div>
        <div className="flex gap-2">
          <a href={repo} target="_blank" rel="noopener noreferrer"
            className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all font-mono">
            GitHub ↗
          </a>
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer"
              className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all font-mono">
              Live ↗
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.map((t) => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-500 font-mono">
            {t}
          </span>
        ))}
      </div>

      <ul className="flex flex-col gap-1">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-gray-400 text-sm">
            <span className="text-gray-600 mt-1">›</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactIcon({ type }: { type: string }) {
  const cls = "w-3.5 h-3.5";
  if (type === "phone")
    return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>;
  if (type === "mail")
    return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>;
  if (type === "globe")
    return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>;
  return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
}
