import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftRight, ArrowRight, CheckCircle2, Code2, ExternalLink, LayoutGrid } from "lucide-react";
import { projects, projectTabs, type Project, type ProjectTab } from "../data";
import {
  ArrowButton,
  btnOutline,
  btnPrimary,
  Counter,
  glass,
  glow,
  Modal,
  SectionHeading,
  scrollToId,
  useArrowKeys,
} from "./ui";

const PANELS = ["Overview", "Key features", "Stack & links"] as const;

type ViewMode = "slide" | "grid";

/** Auto-scroll speed of the slider, in pixels per second. */
const SLIDE_SPEED = 45;

function Thumb({ project, className = "" }: { project: Project; className?: string }) {
  const [ok, setOk] = useState(Boolean(project.image));
  return (
    <div className={`overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 ${className}`}>
      {ok && project.image ? (
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          draggable={false}
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
    { value: String(project.stack.length), label: "Tech", tint: "text-white" },
    { value: String(project.highlights.length), label: "Features", tint: "text-white" },
  ];
  return (
    <dl className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-2">
      {stats.map((s) => (
        <div key={s.label} className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/50 px-2.5 py-2">
          <dt className="truncate text-[10px] uppercase tracking-wide text-slate-500">{s.label}</dt>
          <dd className={`truncate font-display text-sm font-semibold ${s.tint}`}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectCard({
  project,
  onOpen,
  hidden = false,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  hidden?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden || undefined}
      className={`${glass} ${glow} flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl text-left`}
    >
      <Thumb project={project} className="aspect-[16/9] w-full" />
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider text-accent">{project.kind}</p>
        <h3 className="mt-1 break-words font-display text-base font-semibold leading-snug">{project.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-slate-400">{project.summary}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((s) => (
            <span key={s} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-300">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-4 flex-1" />
        <Stats project={project} />
      </div>
    </button>
  );
}

const SCROLLER_CSS = `
.proj-scroller { scrollbar-width: none; -ms-overflow-style: none; }
.proj-scroller::-webkit-scrollbar { display: none; }
`;

export default function Projects() {
  const [tab, setTab] = useState<ProjectTab>("All");
  const [view, setView] = useState<ViewMode>("slide");
  const [active, setActive] = useState<Project | null>(null);
  const [panel, setPanel] = useState(0);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const modalOpenRef = useRef(false);
  modalOpenRef.current = active !== null;

  const visible = projects.filter((p) => tab === "All" || (p.categories as string[]).includes(tab));

  // Repeat the list until it is wide enough to fill the screen, then double it for a seamless loop.
  const repeats = visible.length ? Math.ceil(8 / visible.length) : 0;
  const base = Array.from({ length: repeats }, () => visible).flat();
  const loop = [...base, ...base];

  // Auto-scroll right to left, with mouse drag, wrap-around and pause rules.
  useEffect(() => {
    if (view !== "slide") return;
    const el = scrollerRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const flags = { hover: false, drag: false, touch: false };
    let touchTimer: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;
    let last = performance.now();
    let pos = 1;

    const half = () => el.scrollWidth / 2;

    // The list is two identical halves, so jumping by half a width is invisible.
    const normalize = () => {
      const h = half();
      if (h <= 0) return;
      if (el.scrollLeft < 1) el.scrollLeft += h;
      else if (el.scrollLeft >= h + 1) el.scrollLeft -= h;
    };

    el.scrollLeft = 1;

    const paused = () => flags.hover || flags.drag || flags.touch || modalOpenRef.current || reduce;

    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.1);
      last = t;
      if (paused()) {
        pos = el.scrollLeft;
      } else {
        pos += SLIDE_SPEED * dt;
        const h = half();
        if (h > 0 && pos >= h + 1) pos -= h;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Mouse drag
    let down = false;
    let startX = 0;
    let startLeft = 0;
    let moved = 0;
    let suppressClick = false;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = 0;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      flags.drag = true;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      if (moved > 5) el.style.cursor = "grabbing";
      el.scrollLeft = startLeft - dx;
      const before = el.scrollLeft;
      normalize();
      startLeft += el.scrollLeft - before;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      flags.drag = false;
      el.style.cursor = "";
      if (moved > 5) {
        suppressClick = true;
        setTimeout(() => (suppressClick = false), 50);
      }
    };
    const onClickCapture = (e: MouseEvent) => {
      if (suppressClick) {
        e.preventDefault();
        e.stopPropagation();
        suppressClick = false;
      }
    };

    const onEnter = () => (flags.hover = true);
    const onLeave = () => (flags.hover = false);
    const onTouchStart = () => {
      flags.touch = true;
      clearTimeout(touchTimer);
    };
    const onTouchEnd = () => {
      clearTimeout(touchTimer);
      touchTimer = setTimeout(() => (flags.touch = false), 1500);
    };
    const onDragStart = (e: Event) => e.preventDefault();

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    el.addEventListener("scroll", normalize, { passive: true });
    el.addEventListener("dragstart", onDragStart);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(touchTimer);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("scroll", normalize);
      el.removeEventListener("dragstart", onDragStart);
    };
  }, [view, tab, visible.length]);

  const open = (p: Project) => {
    setPanel(0);
    setActive(p);
  };
  const prev = useCallback(() => setPanel((i) => (i - 1 + PANELS.length) % PANELS.length), []);
  const next = useCallback(() => setPanel((i) => (i + 1) % PANELS.length), []);
  useArrowKeys(active !== null, prev, next);

  const viewOptions: { id: ViewMode; label: string; Icon: typeof LayoutGrid }[] = [
    { id: "slide", label: "Slide", Icon: ArrowLeftRight },
    { id: "grid", label: "Grid", Icon: LayoutGrid },
  ];

  return (
    <section id="cases" className="mx-auto max-w-7xl px-6 pt-24 pb-12 lg:pb-16">
      <style>{SCROLLER_CSS}</style>

      <SectionHeading
        compact
        eyebrow="Software Engineering & Cases"
        title="Projects that"
        highlight="ship and perform"
        subtitle="Web systems, mobile apps and AI work. Open any card to flip through the details."
      />

      <div className="mb-5 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter projects">
        {projectTabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={t === tab}
            onClick={() => setTab(t)}
            className={`relative inline-flex h-9 items-center rounded-full border px-4 text-sm transition ${
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

      {view === "slide" ? (
        <div
          ref={scrollerRef}
          className="proj-scroller -mx-6 cursor-grab select-none overflow-x-auto overflow-y-hidden py-2"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div key={`${tab}-${view}`} className="flex w-max">
            {loop.map((p, i) => (
              <div key={`${p.id}-${i}`} className="mr-4 w-[17rem] shrink-0 sm:w-[19rem]">
                <ProjectCard project={p} onOpen={open} hidden={i >= base.length} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="min-w-0"
              >
                <ProjectCard project={p} onOpen={open} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* View toggle, centered under the projects */}
      <div className="mt-5 flex justify-center">
        <div
          className="inline-flex h-9 items-center rounded-full border border-slate-700 bg-slate-950/60 p-0.5"
          role="group"
          aria-label="Project view"
        >
          {viewOptions.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              aria-pressed={view === id}
              className={`relative inline-flex h-full items-center gap-1.5 rounded-full px-4 text-sm transition ${
                view === id ? "text-slate-950" : "text-slate-300 hover:text-white"
              }`}
            >
              {view === id && (
                <motion.span
                  layoutId="project-view"
                  className="absolute inset-0 rounded-full bg-cta"
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                />
              )}
              <Icon size={14} className="relative" />
              <span className="relative font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

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
    </section>
  );
}