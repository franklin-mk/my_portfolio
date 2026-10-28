import { ArrowRight, Clock } from "lucide-react";
import { articles, readingMinutes } from "../data";
import { glass, glow, Reveal, Section, SectionHeading } from "./ui";

export default function Blog() {
  return (
    <Section id="blog">
      <SectionHeading
        eyebrow="Blog & Knowledge Hub"
        title="Practical guides for"
        highlight="Kenyan SMEs"
        subtitle="Plain-language, actionable write-ups on AI, M-Pesa and getting found online."
      />
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {articles.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.08}>
            <a
              href={`#/blog/${a.id}`}
              className={`${glass} ${glow} group flex h-full flex-col rounded-3xl p-6`}
            >
              <p className="text-xs font-medium uppercase tracking-wider text-accent">{a.tag}</p>
              <h3 className="mt-2 font-display text-xl font-semibold leading-snug">{a.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{a.excerpt}</p>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1.5 text-slate-400">
                  <Clock size={14} /> {readingMinutes(a)} min read
                </span>
                <span className="inline-flex items-center gap-1.5 text-cta transition group-hover:gap-2.5">
                  Read <ArrowRight size={14} />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a href="#/blog" className="inline-flex items-center gap-2 text-sm text-accent hover:underline">
          View all articles <ArrowRight size={14} />
        </a>
      </div>
    </Section>
  );
}