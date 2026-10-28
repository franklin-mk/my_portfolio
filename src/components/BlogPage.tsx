import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Clock, MessageSquare } from "lucide-react";
import { articles, readingMinutes, whatsappLink, type Block } from "../data";
import { btnPrimary, glass, glow } from "./ui";

function renderBlock(b: Block, i: number) {
  switch (b.t) {
    case "h":
      return (
        <h3 key={i} className="mt-10 font-display text-xl font-semibold text-white">
          {b.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="mt-4 leading-relaxed text-slate-300">
          {b.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mt-4 space-y-2.5">
          {b.items.map((it) => (
            <li key={it} className="flex gap-3 text-slate-300">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="leading-relaxed">{it}</span>
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre
          key={i}
          className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs leading-relaxed whitespace-pre-wrap break-words text-cyan-200 sm:text-sm"
        >
          <code>{b.text}</code>
        </pre>
      );
  }
}

export default function BlogPage({ articleId }: { articleId: string | null }) {
  const article = articles.find((a) => a.id === articleId) ?? null;
  const others = articles.filter((a) => a.id !== article?.id);

  useEffect(() => {
    document.title = article
      ? `${article.title} | Frank.M.Tech`
      : "Blog | Frank.M.Tech";
    return () => {
      document.title = "Frank.M.Tech | Software & AI Solutions, Nyeri, Kenya";
    };
  }, [article]);

  return (
    <div className="min-h-screen">
      {/* Slim header for the blog page */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-5xl items-center justify-between px-6">
          <a href="#/" className="flex items-center gap-3" aria-label="Frank.M.Tech home">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-accent/50 bg-accent/10 font-display text-xs font-bold text-accent">
              FM
            </span>
            <span className="font-display text-lg font-semibold">Frank.M.Tech</span>
          </a>
          <a
            href="#/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-accent/60 hover:text-accent"
          >
            <ArrowLeft size={14} /> Return to Portfolio
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14">
        {article ? (
          <article className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-slate-400">
              <a href="#/blog" className="hover:text-white">
                Blog
              </a>
              <span aria-hidden>/</span>
              <span className="truncate text-slate-200">{article.title}</span>
            </nav>

            <p className="text-xs font-medium uppercase tracking-wider text-accent">{article.tag}</p>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400">
              <Clock size={14} /> {readingMinutes(article)} min read · By Franklin M.
            </p>

            <div className="mt-4 border-t border-slate-800/80 pt-2">{article.blocks.map(renderBlock)}</div>

            <div className={`${glass} mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6`}>
              <p className="max-w-sm text-slate-200">Want this built for your business? Let's talk about it.</p>
              <a
                href={whatsappLink(`Hello Franklin, I read "${article.title}" and I'd like to talk about a project.`)}
                target="_blank"
                rel="noreferrer"
                className={btnPrimary}
              >
                <MessageSquare size={16} /> Chat on WhatsApp
              </a>
            </div>

            <h2 className="mt-16 mb-5 font-display text-xl font-semibold">More articles</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {others.map((a) => (
                <a key={a.id} href={`#/blog/${a.id}`} className={`${glass} ${glow} rounded-2xl p-5`}>
                  <p className="text-xs font-medium uppercase tracking-wider text-accent">{a.tag}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold leading-snug">{a.title}</h3>
                  <p className="mt-2 text-xs text-slate-400">{readingMinutes(a)} min read</p>
                </a>
              ))}
            </div>
          </article>
        ) : (
          <>
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-400">
              <a href="#/" className="inline-flex items-center gap-1.5 text-accent hover:underline">
                <ArrowLeft size={14} /> Return to Portfolio
              </a>
              <span className="mx-2" aria-hidden>
                /
              </span>
              <span className="text-slate-200">Blog</span>
            </nav>
            <h1 className="font-display text-4xl font-bold sm:text-5xl">
              Blog &amp; <span className="text-gradient">Knowledge Hub</span>
            </h1>
            <p className="mt-3 max-w-xl text-slate-400">
              Plain-language, actionable guides on AI, M-Pesa and getting found online, written for Kenyan SMEs.
            </p>

            <div className="mt-10 space-y-5">
              {articles.map((a) => (
                <a
                  key={a.id}
                  href={`#/blog/${a.id}`}
                  className={`${glass} ${glow} group flex flex-col gap-4 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between`}
                >
                  <div className="max-w-2xl">
                    <p className="text-xs font-medium uppercase tracking-wider text-accent">{a.tag}</p>
                    <h2 className="mt-1 font-display text-xl font-semibold sm:text-2xl">{a.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{a.excerpt}</p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={13} /> {readingMinutes(a)} min read
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-sm text-cta transition group-hover:gap-3">
                    Read article <ArrowRight size={15} />
                  </span>
                </a>
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Frank.M.Tech · Franklin Muriithi Kinyua · Nyeri, Kenya
      </footer>
    </div>
  );
}