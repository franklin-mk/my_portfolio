import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, ExternalLink } from "lucide-react";
import { projects, projectTabs, type Project, type ProjectTab } from "../data";
import {
  ArrowButton,
  btnOutline,
  btnPrimary,
  Counter,
  glass,
  glow,
  Modal,
  Section,
  SectionHeading,
  scrollToId,
  useArrowKeys,
} from "./ui";

const PANELS = ["Overview", "Key features", "Stack & links"] as const;

function Thumb({ project, className = "" }: { project: Project; className?: string }) {
  const [ok, setOk] = useState(Boolean(project.image));
  return (
    <div className={`overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 ${className}`}>
      {ok && project.image ? (
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover object-top"
          onError={() => setOk(false)}
        />
      ) : (
        <div className="grid h-full w-full place-items-center">
          <Code2 size={34} className="text-accent/60" />
        </div>
      )}
    </div>
  );
}

const statusTint: Record<Project["status"], string> = {
  Live: "text-emerald-400",
  Prototype: "text-indigo-300",
  "Case study": "text-cta",
};

function Stats({ project }: { project: Project }) {
  const stats = [
    { value: project.status, label: "Status", tint: statusTint[project.status] },
    { value: String(project.stack.length), label: "Technologies", tint: "text-white" },
    { value: String(project.highlights.length), label: "Key features", tint: "text-white" },
  ];
  return (
    <dl className="grid grid-cols-3 gap-2">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-2">
          <dt className="text-[10px] uppercase tracking-wider text-slate-500">{s.label}</dt>
          <dd className={`font-display text-sm font-semibold ${s.tint}`}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Projects() {
  const [tab, setTab] = useState<ProjectTab>("All");
  const [active, setActive] = useState<Project | null>(null);
  const [panel, setPanel] = useState(0);

  const visible = projects.filter((p) => tab === "All" || (p.categories as string[]).includes(tab));

  const open = (p: Project) => {
    setPanel(0);
    setActive(p);
  };
  const prev = useCallback(() => setPanel((i) => (i - 1 + PANELS.length) % PANELS.length), []);
  const next = useCallback(() => setPanel((i) => (i + 1) % PANELS.length), []);
  useArrowKeys(active !== null, prev, next);

  return (
    <Section id="cases">
      <SectionHeading
        eyebrow="Software Engineering & Cases"
        title="Projects that"
        highlight="ship and perform"
        subtitle="Web systems, mobile apps and AI work. Open any card to flip through the details."
      />

      <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter projects">
        {projectTabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={t === tab}
            onClick={() => setTab(t)}
            className={`relative rounded-full border px-4 py-2 text-sm transition ${
              t === tab ? "border-accent/60 text-accent" : "border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            {t === tab && (
              <motion.span
                layoutId="project-tab"
                className="absolute inset-0 rounded-full bg-accent/10"
                transition={{ type: "spring", damping: 28, stiffness: 320 }}
              />
            )}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.button
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={() => open(p)}
              className={`${glass} ${glow} flex flex-col overflow-hidden rounded-2xl text-left`}
            >
              <Thumb project={p} className="aspect-[16/9] w-full" />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-accent">{p.kind}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-slate-400">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex-1" />
                <Stats project={p} />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <Modal open={active !== null} onClose={() => setActive(null)} label={active?.title ?? "Project"} className="max-w-3xl">
        {active && (
          <div>
            <div className="mb-4 flex items-center gap-3 pr-12">
              <Counter index={panel} total={PANELS.length} />
              <div className="min-w-0">
                <h3 className="truncate font-display text-lg font-semibold">{active.title}</h3>
                <p className="text-xs text-slate-400">{PANELS[panel]}</p>
              </div>
            </div>

            <div className="relative">
              <div className="min-h-[21rem] px-0 sm:px-14">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={panel}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.2 }}
                  >
                    {panel === 0 && (
                      <div>
                        <Thumb project={active} className="aspect-[16/9] max-h-64 w-full rounded-2xl" />
                        <p className="mt-4 text-xs font-medium uppercase tracking-wider text-accent">{active.kind}</p>
                        <p className="mt-1 text-slate-200">{active.summary}</p>
                      </div>
                    )}
                    {panel === 1 && (
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {active.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-200"
                          >
                            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    {panel === 2 && (
                      <div className="space-y-5">
                        <Stats project={active} />
                        <div>
                          <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">Built with</p>
                          <div className="flex flex-wrap gap-2">
                            {active.stack.map((s) => (
                              <span key={s} className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-200">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {active.url && (
                            <a href={active.url} target="_blank" rel="noreferrer" className={btnPrimary}>
                              {active.urlLabel ?? "Open project"} <ExternalLink size={15} />
                            </a>
                          )}
                          <button
                            onClick={() => {
                              setActive(null);
                              setTimeout(() => scrollToId("contact"), 150);
                            }}
                            className={btnOutline}
                          >
                            Discuss a similar project <ArrowRight size={15} />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <ArrowButton dir="prev" onClick={prev} className="absolute top-1/2 left-0 hidden -translate-y-1/2 sm:grid" />
              <ArrowButton dir="next" onClick={next} className="absolute top-1/2 right-0 hidden -translate-y-1/2 sm:grid" />
            </div>

            <div className="mt-4 flex items-center justify-center gap-3 sm:hidden">
              <ArrowButton dir="prev" onClick={prev} />
              <ArrowButton dir="next" onClick={next} />
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}
