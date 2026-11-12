import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, CheckCircle2, ChevronDown, ExternalLink, ShieldCheck } from "lucide-react";
import { certifications, skillGroups, timeline } from "../data";
import { glass, glow, Reveal, SectionHeading } from "./ui";

const sectionCls = "mx-auto max-w-7xl scroll-mt-24 px-6 py-8 lg:py-10";

export default function About() {
  const [openId, setOpenId] = useState<string>(timeline[0].id);

  return (
    <>
      <section id="about" className={sectionCls}>
        <SectionHeading compact eyebrow="About" title="My" highlight="story" />
        <Reveal>
          <div className={`${glass} mx-auto max-w-4xl rounded-2xl p-5 sm:p-7`}>
            <p className="text-base leading-relaxed text-slate-200">
              I'm Franklin Muriithi Kinyua, a third-year Computer Science student at Dedan Kimathi University of
              Technology (DeKUT), expected to graduate in 2028, and the founder of Frank.M.Tech in Nyeri, Kenya.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
              My path started with a full-stack apprenticeship at DirectEd Development Foundation, where I built
              React, Next.js and Node.js applications and finished with Distinction. At DeKUT I went deeper into
              databases, networks and AI, including the online voting system I built during my internal
              attachment.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
              Alongside the code, I make things people see: short-form video, nature photography and brand design.
              Together they let me help local businesses with both the system behind the scenes and the story they
              show the world.
            </p>
            <p className="mt-3 text-xs text-slate-400 sm:text-sm">
              Off the screen: photography, a game of pool, and making pancakes.
            </p>
          </div>
        </Reveal>
      </section>

      <section id="skills" className={sectionCls}>
        <SectionHeading compact eyebrow="Skills & Stack" title="Tools I" highlight="build with" />
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06} className="h-full">
              <div className={`${glass} ${glow} h-full rounded-xl p-4`}>
                <h3 className="font-display text-base font-semibold text-accent">{g.title}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-slate-700 bg-slate-950/50 px-2.5 py-0.5 text-xs text-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="experience" className={sectionCls}>
        <SectionHeading compact eyebrow="Experience" title="Education &" highlight="hands-on work" />
        <Reveal>
          <ol className="relative mx-auto ml-3 max-w-3xl border-l border-slate-800 sm:mx-auto">
            {timeline.map((t) => {
              const isOpen = openId === t.id;
              return (
                <li key={t.id} className="mb-4 ml-5 sm:ml-6">
                  <span
                    className={`absolute -left-[7px] mt-2 h-3.5 w-3.5 rounded-full border-2 border-ink transition ${
                      isOpen ? "bg-cta shadow-[0_0_14px_rgba(245,158,11,0.8)]" : "bg-slate-600"
                    }`}
                  />
                  <button
                    onClick={() => setOpenId(isOpen ? "" : t.id)}
                    aria-expanded={isOpen}
                    className={`${glass} ${glow} w-full rounded-xl p-4 text-left`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs text-accent">{t.period}</p>
                        <h3 className="mt-0.5 break-words font-display text-base font-semibold sm:text-lg">
                          {t.title}
                        </h3>
                        <p className="text-xs text-slate-400 sm:text-sm">{t.org}</p>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`mt-1 shrink-0 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1.5 pt-3">
                            {t.points.map((p) => (
                              <li key={p} className="flex items-start gap-2 text-[13px] text-slate-300">
                                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent" />
                                {p}
                              </li>
                            ))}
                          </div>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </section>

      <section id="certifications" className={sectionCls}>
        <SectionHeading compact eyebrow="Certifications" title="Verified" highlight="credentials" />
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 0.06} className="h-full">
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${glass} ${glow} group flex h-full min-w-0 flex-col rounded-xl p-4 transition-transform duration-200 hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between">
                  <Award size={20} className="text-cta" />
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                    <ShieldCheck size={12} /> Verified
                  </span>
                </div>
                <p className="mt-3 flex-1 break-words text-[13px] font-semibold leading-snug transition-colors group-hover:text-amber-400 sm:text-sm">
                  {c.title}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>{c.issuer}</span>
                  <ExternalLink
                    size={14}
                    className="text-slate-300 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}