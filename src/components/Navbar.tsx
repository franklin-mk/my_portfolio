import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, FileText, Menu, X } from "lucide-react";
import { CV_URL, navItems, type CreativeTab, type NavChild, type NavItem } from "../data";
import { btnPrimary, scrollToId } from "./ui";

interface Props {
  onCreative: (f: CreativeTab) => void;
  // onArticle: (id: string | null) => void;
}

export default function Navbar({ onCreative }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => (e: MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToId(href.slice(1));
  };

    const goChild = (child: NavChild) => (e: MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    const a = child.action;
    if (a?.kind === "creative") onCreative(a.filter);
    else if (a?.kind === "article") window.location.hash = a.id ? `/blog/${a.id}` : "/blog";
    else scrollToId(child.href.slice(1));
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-slate-800/80 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-6">
        <a href="#home" onClick={go("#home")} className="flex shrink-0 items-center gap-3" aria-label="Frank.M.Tech home">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-accent/50 bg-accent/10 font-display text-xs font-bold text-accent shadow-[0_0_20px_rgba(0,242,254,0.35)]">
            FM
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Frank.M.Tech</span>
        </a>

        <ul className="hidden items-center gap-0 xl:flex">
          {navItems.map((item) => (
            <DesktopItem key={item.label} item={item} go={go} goChild={goChild} />
          ))}
        </ul>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            aria-label="View CV"
            href={CV_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-accent/60 hover:text-accent"
          >
            <FileText size={15} /> <span className="hidden 2xl:inline">View CV</span>
          </a>
          <a href="#contact" onClick={go("#contact")} className={`${btnPrimary} !px-5 !py-2`}>
            Get a Free Quote
          </a>
        </div>

        <button
          className="rounded-lg border border-slate-700 p-2 xl:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden xl:hidden"
          >
            <ul className="mx-auto max-w-7xl space-y-1 px-6 pb-5">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      <div className="flex items-center">
                        <a
                          href={item.href}
                          onClick={go(item.href)}
                          className="flex-1 rounded-lg px-3 py-2.5 text-slate-200 hover:bg-white/5"
                        >
                          {item.label}
                        </a>
                        <button
                          onClick={() => setMobileExpanded((c) => (c === item.label ? null : item.label))}
                          aria-expanded={mobileExpanded === item.label}
                          aria-label={`${item.label} menu`}
                          className="rounded-lg p-2.5 text-slate-300 hover:bg-white/5"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>
                      {mobileExpanded === item.label && (
                        <ul className="mb-1 ml-3 space-y-0.5 border-l border-slate-800 pl-3">
                          {item.header && (
                            <li>
                              <a
                                href={item.header.href}
                                onClick={go(item.header.href)}
                                className="block rounded-lg px-3 py-2 text-sm text-accent"
                              >
                                ← {item.header.label}
                              </a>
                            </li>
                          )}
                          {item.children.map((c) => (
                            <li key={c.label}>
                              <a
                                href={c.href}
                                onClick={goChild(c)}
                                className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
                              >
                                {c.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={go(item.href)}
                      className="block rounded-lg px-3 py-2.5 text-slate-200 hover:bg-white/5"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
              <li className="flex gap-3 pt-3">
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-full border border-slate-700 px-4 py-2.5 text-center text-sm"
                >
                  View CV
                </a>
                <a href="#contact" onClick={go("#contact")} className={`${btnPrimary} flex-1 !py-2.5`}>
                  Get a Free Quote
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DesktopItem({
  item,
  go,
  goChild,
}: {
  item: NavItem;
  go: (href: string) => (e: MouseEvent) => void;
  goChild: (c: NavChild) => (e: MouseEvent) => void;
}) {
  const [open, setOpen] = useState(false);
  const linkCls = "inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-sm text-slate-300 transition hover:text-accent";
  //const linkCls = "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-slate-300 transition hover:text-accent";

  if (!item.children) {
    return (
      <li>
        <a href={item.href} onClick={go(item.href)} className={linkCls}>
          {item.label}
        </a>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >

    <div className="flex items-center">
        <a href={item.href} onClick={go(item.href)} className={`${linkCls} !pr-1`}>
          {item.label}
        </a>
        <button
          aria-label={`${item.label} menu`}
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="rounded-full py-2 pr-2 text-slate-300 transition hover:text-accent"
        >
          <ChevronDown size={14} className={`transition ${open ? "rotate-180 text-accent" : ""}`} />
        </button>
    </div>

      <AnimatePresence>
        {open && (
          <div className="absolute top-full left-0 z-50 pt-2">
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="w-80 rounded-2xl border border-slate-800/80 bg-slate-900/95 p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            >
              {item.header && (
                <a
                  role="menuitem"
                  href={item.header.href}
                  onClick={(e) => {
                    setOpen(false);
                    go(item.header!.href)(e);
                  }}
                  className="mb-1 flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/5 px-3 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/10"
                >
                  <ArrowRight size={14} className="rotate-180" /> {item.header.label}
                </a>
              )}
              {item.children!.map((c) => (
                <a
                  key={c.label}
                  role="menuitem"
                  href={c.href}
                  onClick={(e) => {
                    setOpen(false);
                    goChild(c)(e);
                  }}
                  className="block rounded-xl px-3 py-2.5 transition hover:bg-white/5"
                >
                  <span className="block text-sm font-medium text-white">{c.label}</span>
                  {c.description && <span className="mt-0.5 block text-xs text-slate-400">{c.description}</span>}
                </a>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </li>
  );
}
