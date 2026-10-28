import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, CheckCircle2, ChevronDown, ShieldCheck } from "lucide-react";
import { certifications, skillGroups, timeline } from "../data";
import { glass, glow, Reveal, Section, SectionHeading } from "./ui";

export default function About() {
  const [openId, setOpenId] = useState<string>(timeline[0].id);

  return (
    <>
      <Section id="about">
        <SectionHeading eyebrow="About" title="My" highlight="story" />
        <Reveal>
          <div className={`${glass} mx-auto max-w-4xl rounded-3xl p-8 sm:p-10`}>
            <p className="text-lg leading-relaxed text-slate-200">
              I'm Franklin Muriithi Kinyua, a third-year Computer Science student at Dedan Kimathi University of
              Technology (DeKUT), expected to graduate in 2028, and the founder of Frank.M.Tech in Nyeri, Kenya.
            </p>
            <p className="mt-4 leading-relaxed text-slate-300">
              My path started with a full-stack apprenticeship at DirectEd Development Foundation, where I built
              React, Next.js and Node.js applications and finished with Distinction. At DeKUT I went deeper into
              databases, networks and AI, including the online voting system I built during my internal
              attachment.
            </p>
            <p className="mt-4 leading-relaxed text-slate-300">
              Alongside the code, I make things people see: short-form video, nature photography and brand design.
              Together they let me help local businesses with both the system behind the scenes and the story they
              show the world.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              Off the screen: photography, a game of pool, and making pancakes.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section id="skills" tight>
        <SectionHeading eyebrow="Skills & Stack" title="Tools I" highlight="build with" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06}>
              <div className={`${glass} ${glow} h-full rounded-2xl p-5`}>
                <h3 className="font-display text-lg font-semibold text-accent">{g.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="rounded-full border border-slate-700 bg-slate-950/50 px-3 py-1 text-sm text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="experience">
        <SectionHeading eyebrow="Experience" title="Education &" highlight="hands-on work" />
        <Reveal>
          <ol className="relative mx-auto ml-3 max-w-3xl border-l border-slate-800 sm:mx-auto">
            {timeline.map((t) => {
              const isOpen = openId === t.id;
              return (
                <li key={t.id} className="mb-6 ml-6">
                  <span
                    className={`absolute -left-[7px] mt-2 h-3.5 w-3.5 rounded-full border-2 border-ink transition ${
                      isOpen ? "bg-cta shadow-[0_0_14px_rgba(245,158,11,0.8)]" : "bg-slate-600"
                    }`}
                  />
                  <button
                    onClick={() => setOpenId(isOpen ? "" : t.id)}
                    aria-expanded={isOpen}
                    className={`${glass} ${glow} w-full rounded-2xl p-5 text-left`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-accent">{t.period}</p>
                        <h3 className="mt-1 font-display text-lg font-semibold">{t.title}</h3>
                        <p className="text-sm text-slate-400">{t.org}</p>
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
                          <div className="space-y-2 pt-4">
                            {t.points.map((p) => (
                              <li key={p} className="flex items-start gap-2.5 text-sm text-slate-300">
                                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent" />
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
      </Section>

      <Section id="certifications" tight>
        <SectionHeading eyebrow="Certifications" title="Verified" highlight="credentials" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 0.06}>
              <div className={`${glass} ${glow} flex h-full flex-col rounded-2xl p-5`}>
                <div className="flex items-center justify-between">
                  <Award size={22} className="text-cta" />
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                    <ShieldCheck size={12} /> Verified
                  </span>
                </div>
                <p className="mt-4 flex-1 text-sm font-semibold leading-snug">{c.title}</p>
                <p className="mt-2 text-xs text-slate-400">{c.issuer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
