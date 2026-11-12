import { ArrowRight, Clock } from "lucide-react";
import { articles, readingMinutes } from "../data";
import { glass, glow, Reveal, SectionHeading } from "./ui";

export default function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-7xl px-6 pt-24 pb-12 lg:pb-16">
      <SectionHeading
        compact
        eyebrow="Blog & Knowledge Hub"
        title="Practical guides for"
        highlight="Kenyan SMEs"
        subtitle="Plain-language, actionable write-ups on AI, M-Pesa and getting found online."
      />
      <div className="mx-auto grid max-w-5xl gap-3 sm:gap-4 md:grid-cols-3">
        {articles.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.08} className="h-full">
            <a
              href={`#/blog/${a.id}`}
              className={`${glass} ${glow} group flex h-full min-w-0 flex-col rounded-2xl p-4 sm:p-5`}
            >
              <p className="text-[11px] font-medium uppercase tracking-wider text-accent">{a.tag}</p>
              <h3 className="mt-1.5 break-words font-display text-base font-semibold leading-snug sm:text-lg">
                {a.title}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-400">{a.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs sm:text-sm">
                <span className="inline-flex items-center gap-1.5 text-slate-400">
                  <Clock size={13} /> {readingMinutes(a)} min read
                </span>
                <span className="inline-flex items-center gap-1.5 text-cta transition group-hover:gap-2.5">
                  Read <ArrowRight size={14} />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
      <div className="mt-6 text-center">
        <a href="#/blog" className="inline-flex items-center gap-2 text-sm text-accent hover:underline">
          View all articles <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}