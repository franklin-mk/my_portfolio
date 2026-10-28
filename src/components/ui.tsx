import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export const glass = "bg-slate-900/90 border border-slate-800/80 backdrop-blur-xl";
export const glow =
  "transition duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_40px_-12px_rgba(0,242,254,0.45)]";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_30px_-8px_rgba(245,158,11,0.7)] transition hover:brightness-110 active:scale-[0.98]";
export const btnOutline =
  "inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-accent/60 hover:text-accent active:scale-[0.98]";

export const inputCls =
  "w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/20";

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Fixed 3px reading progress bar */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed top-0 left-0 z-50 h-[3px] w-full origin-left bg-gradient-to-r from-cyan-400 via-amber-400 to-indigo-500"
    />
  );
}

export function Section({
  id,
  children,
  tight = false,
}: {
  id: string;
  children: ReactNode;
  tight?: boolean;
}) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-6 ${tight ? "py-10" : "py-20"}`}>
      {children}
    </section>
  );
}

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent ${className}`}
    >
      {children}
    </span>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
        {title} <span className="text-gradient">{highlight}</span>
      </h2>
      {subtitle && <p className="mt-3 text-slate-400">{subtitle}</p>}
    </Reveal>
  );
}

/** Round amber glow arrow used by every carousel */
export function ArrowButton({
  dir,
  onClick,
  className = "",
}: {
  dir: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className={`grid h-11 w-11 place-items-center rounded-full bg-cta text-slate-950 shadow-[0_0_26px_rgba(245,158,11,0.65)] transition hover:scale-105 hover:brightness-110 active:scale-95 ${className}`}
    >
      <Icon size={22} />
    </button>
  );
}

export function Counter({ index, total, className = "" }: { index: number; total: number; className?: string }) {
  return (
    <span
      aria-live="polite"
      className={`rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-xs font-semibold tabular-nums text-white backdrop-blur ${className}`}
    >
      {index + 1} / {total}
    </span>
  );
}

export function useArrowKeys(active: boolean, prev: () => void, next: () => void) {
  useEffect(() => {
    if (!active) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active, prev, next]);
}

/** Modal with no inner scrolling: content must fit. Use carousels for more. */
export function Modal({
  open,
  onClose,
  label,
  children,
  className = "max-w-3xl",
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={`${glass} relative w-full ${className} rounded-3xl p-4 sm:p-5`}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-6 right-6 z-20 rounded-full border border-slate-600 bg-slate-950/80 p-2 text-slate-200 backdrop-blur transition hover:text-white sm:top-7 sm:right-7"
            >
              <X size={16} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
