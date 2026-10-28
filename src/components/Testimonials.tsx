import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../data";
import { glass, Reveal, Section, SectionHeading } from "./ui";

function Avatar({ src, name }: { src: string; name: string }) {
  const [ok, setOk] = useState(true);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return ok ? (
    <img
      src={src}
      alt={name}
      className="h-12 w-12 rounded-full object-cover ring-2 ring-accent/40"
      onError={() => setOk(false)}
    />
  ) : (
    <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 font-display font-semibold text-accent ring-2 ring-accent/40">
      {initials}
    </span>
  );
}

export default function Testimonials() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((n) => (n + d + testimonials.length) % testimonials.length);

  return (
    <Section id="testimonials">
      <SectionHeading eyebrow="Kind Words" title="What collaborators" highlight="say" />
      <Reveal>
        <div className={`${glass} mx-auto max-w-3xl rounded-3xl p-6 sm:p-10`}>
          {/* Every slide shares ONE grid cell, so the card is always as tall as the longest review */}
          <div className="grid">
            {testimonials.map((t, idx) => {
              const active = idx === i;
              return (
                <motion.figure
                  key={t.name}
                  className="col-start-1 row-start-1 flex flex-col justify-between"
                  initial={false}
                  animate={{ opacity: active ? 1 : 0, x: active ? 0 : 24 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden={!active}
                  style={{ pointerEvents: active ? "auto" : "none" }}
                >
                  <blockquote className="text-lg leading-relaxed text-slate-200">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-4">
                    <Avatar src={t.image} name={t.name} />
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-slate-400">{t.role}</p>
                    </div>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((x, idx) => (
                <button
                  key={x.name}
                  onClick={() => setI(idx)}
                  aria-label={`Show review ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-6 bg-accent" : "w-1.5 bg-slate-700"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous review"
                className="rounded-full border border-slate-700 p-2 text-slate-300 hover:border-accent/60 hover:text-accent"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next review"
                className="rounded-full border border-slate-700 p-2 text-slate-300 hover:border-accent/60 hover:text-accent"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}