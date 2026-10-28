import type { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaLinkedinIn, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  CV_URL,
  EMAIL,
  PHONE_DISPLAY,
  quoteServices,
  socialLinks,
  whatsappLink,
  type CreativeTab,
} from "../data";
import { scrollToId } from "./ui";

const socialIcons: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
  X: FaXTwitter,
  YouTube: FaYoutube,
  Instagram: FaInstagram,
  TikTok: FaTiktok,
};

const linkCls = "text-sm text-slate-400 transition hover:text-accent";

const go = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  scrollToId(id);
};

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold tracking-wide text-white uppercase">{title}</h4>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

export function Footer({
  onCreative,
  onBook,
}: {
  onCreative: (f: CreativeTab) => void;
  onBook: () => void;
}) {
  const creativeLink = (label: string, filter: CreativeTab) => (
    <li>
      <a
        href="#creatives"
        onClick={(e) => {
          e.preventDefault();
          onCreative(filter);
        }}
        className={linkCls}
      >
        {label}
      </a>
    </li>
  );

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl font-bold">
              Frank<span className="text-cta">.M.Tech</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              AI Systems Developer &amp; Creative Media Producer based in Nyeri, Kenya.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-slate-700 text-slate-300 transition hover:border-cta hover:text-cta"
                  >
                    {Icon && <Icon size={15} />}
                  </a>
                );
              })}
            </div>
            <p className="mt-6 text-xs text-slate-500">
              © {new Date().getFullYear()} Franklin Muriithi Kinyua. All rights reserved.
            </p>
          </div>

          {/* Portfolio */}
          <Column title="Portfolio">
            <li><a href="#about" onClick={go("about")} className={linkCls}>About</a></li>
            <li><a href="#cases" onClick={go("cases")} className={linkCls}>Case Studies</a></li>
            <li><a href="#experience" onClick={go("experience")} className={linkCls}>Experience</a></li>
            {creativeLink("Videos", "Video Reels")}
            {creativeLink("Photography", "Photography")}
            {creativeLink("Design Work", "Graphic Design")}
            <li><a href="#blog" onClick={go("blog")} className={linkCls}>Blog</a></li>
          </Column>

          {/* Services */}
          <Column title="Services">
            {quoteServices.map((s) => (
              <li key={s.id}>
                <a href="#contact" onClick={go("contact")} className={linkCls}>
                  {s.name}
                </a>
              </li>
            ))}
            <li><a href="#contact" onClick={go("contact")} className={linkCls}>Quote Calculator</a></li>
            <li>
              <button onClick={onBook} className={linkCls}>Book a Strategy Call</button>
            </li>
          </Column>

          {/* Contact */}
          <Column title="Connect">
            <li>
              <a href={CV_URL} target="_blank" rel="noreferrer" className={linkCls}>View CV</a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className={linkCls}>
                Chat on WhatsApp
              </a>
            </li>
            <li className="pt-2">
              <a href={`mailto:${EMAIL}`} className={`${linkCls} flex items-center gap-3 break-all`}>
                <Mail size={15} className="shrink-0 text-cta" /> {EMAIL}
              </a>
            </li>
            <li>
              <a href="tel:+254716205591" className={`${linkCls} flex items-center gap-3`}>
                <Phone size={15} className="shrink-0 text-cta" /> {PHONE_DISPLAY}
              </a>
            </li>
            <li className={`${linkCls} flex items-center gap-3`}>
              <MapPin size={15} className="shrink-0 text-cta" /> Nyeri, Kenya
            </li>
          </Column>
        </div>

        {/* Divider + bottom bar */}
        <div className="mt-14 border-t border-slate-800/80 pt-6">
          <div className="flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">
            <p>Frank.M.Tech | Web, AI &amp; Creative Media, Nyeri, Kenya</p>
            <p>Built &amp; maintained by Franklin Muriithi Kinyua</p>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-slate-500">
            Frank.M.Tech: AI systems developer and creative media producer in Nyeri, Kenya. Offering web
            development, M-Pesa integrations, video editing and brand design for SMEs and institutions across
            Kenya.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hello Franklin, I'd like to talk about a project.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,0.7)] transition hover:scale-105"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
      <MessageCircle size={26} className="relative" />
    </a>
  );
}