import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, CheckCircle2, ExternalLink, Palette, Share2, Video, type LucideIcon } from "lucide-react";
import { creatives, creativeTabs, type CreativeCategory, type CreativeItem, type CreativeTab } from "../data";
import { ArrowButton, Counter, glass, glow, Modal, Section, SectionHeading, useArrowKeys } from "./ui";

const catIcon: Record<CreativeCategory, LucideIcon> = {
  "Video Reels": Video,
  Photography: Camera,
  "Graphic Design": Palette,
};

const catTint: Record<CreativeCategory, string> = {
  "Video Reels": "from-indigo-500/25 via-slate-900 to-slate-950",
  Photography: "from-emerald-500/20 via-slate-900 to-slate-950",
  "Graphic Design": "from-amber-500/20 via-slate-900 to-slate-950",
};

function Media({ item }: { item: CreativeItem }) {
  const [ok, setOk] = useState(true);
  const Icon = catIcon[item.category];
  if (ok) {
    return (
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="h-full w-full object-cover"
        onError={() => setOk(false)}
      />
    );
  }
  return (
    <div className={`grid h-full w-full place-items-center bg-gradient-to-br ${catTint[item.category]}`}>
      <div className="px-4 text-center">
        <Icon size={34} className="mx-auto text-accent/70" />
        <p className="mt-2 text-[11px] text-slate-500">Add public{item.image}</p>
      </div>
    </div>
  );
}

export default function Creatives({
  filter,
  onFilter,
}: {
  filter: CreativeTab;
  onFilter: (f: CreativeTab) => void;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const visible = creatives.filter((c) => filter === "All" || c.category === filter);
  const total = visible.length;
  const current = index !== null ? visible[index] : null;

  // A different filter means a different list: close the gallery.
  useEffect(() => setIndex(null), [filter]);

  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + total) % total)), [total]);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % total)), [total]);
  useArrowKeys(index !== null, prev, next);

  const share = async () => {
    if (!current) return;
    const url = `${window.location.origin}${window.location.pathname}#creatives`;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: `${current.title} · Frank.M.Tech`, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <Section id="creatives">
      <SectionHeading
        eyebrow="Creatives Showcase"
        title="Video, photography &"
        highlight="design"
        subtitle="The creative side of Frank.M.Tech. Tap any piece to open the gallery."
      />

      <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter creatives">
        {creativeTabs.map((t) => {
          const Icon = t === "All" ? null : catIcon[t];
          return (
            <button
              key={t}
              role="tab"
              aria-selected={t === filter}
              onClick={() => onFilter(t)}
              className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                t === filter ? "border-accent/60 text-accent" : "border-slate-700 text-slate-300 hover:border-slate-500"
              }`}
            >
              {t === filter && (
                <motion.span
                  layoutId="creative-tab"
                  className="absolute inset-0 rounded-full bg-accent/10"
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                />
              )}
              {Icon && <Icon size={15} className="relative" />}
              <span className="relative">{t}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => {
            const Icon = catIcon[item.category];
            return (
              <motion.button
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={() => setIndex(i)}
                className={`${glass} ${glow} group overflow-hidden rounded-2xl text-left`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <div className="h-full w-full transition duration-500 group-hover:scale-105">
                    <Media item={item} />
                  </div>
                </div>
                <div className="p-4">
                  <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-accent">
                    <Icon size={13} /> {item.category}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold">{item.title}</h3>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <Modal open={current !== null} onClose={() => setIndex(null)} label="Creatives gallery" className="max-w-4xl">
        {current && index !== null && (
          <div>
            <div className="relative aspect-[16/10] max-h-[68vh] w-full overflow-hidden rounded-2xl bg-slate-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.2 }}
                >
                  <Media item={current} />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent px-5 pt-16 pb-5 sm:px-8 sm:pb-6">
                <p className="text-xs font-medium uppercase tracking-wider text-accent">{current.category}</p>
                <h3 className="mt-1 font-display text-xl font-semibold sm:text-2xl">{current.title}</h3>
                <p className="mt-1 max-w-xl text-sm text-slate-300">{current.description}</p>
              </div>

              <Counter index={index} total={total} className="absolute top-4 left-4" />
              <ArrowButton dir="prev" onClick={prev} className="absolute top-1/2 left-3 -translate-y-1/2" />
              <ArrowButton dir="next" onClick={next} className="absolute top-1/2 right-3 -translate-y-1/2" />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-1.5" aria-hidden>
                {visible.map((v, i) => (
                  <span
                    key={v.id}
                    className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-cta" : "w-1.5 bg-slate-700"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                {current.href && (
                  <a
                    href={current.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-accent/60 hover:text-accent"
                  >
                    Watch Video <ExternalLink size={14} />
                  </a>
                )}
                <button
                  onClick={share}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-accent/60 hover:text-accent"
                >
                  {copied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                  {copied ? "Link copied" : "Share"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}
