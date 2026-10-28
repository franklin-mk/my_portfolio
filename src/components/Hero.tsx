import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Code2, GraduationCap, Palette, Smartphone, Video } from "lucide-react";
import { PROFILE_PIC } from "../data";
import { Badge, btnOutline, btnPrimary, glass, scrollToId } from "./ui";

const chips = [
  { icon: GraduationCap, label: "3rd Year CS @ DeKUT" },
  { icon: Smartphone, label: "M-Pesa Integrations" },
  { icon: Palette, label: "Web + Creative Media" },
];

export default function Hero({ onBook }: { onBook: () => void }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              AI Systems Developer &amp; Creative Media — Nyeri, Kenya
            </Badge>
          </motion.div>

          <motion.h1
            className="mt-6 font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            Engineering Web Systems &amp; Visual Creatives That Drive{" "}
            <span className="text-gradient">Real Local Growth</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
          >
            Building high-speed web apps, M-Pesa payment integrations, and high-converting visual media for
            SMEs and institutions.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
          >
            <button onClick={onBook} className={btnPrimary}>
              Book Strategy Call
            </button>
            <button onClick={() => scrollToId("creatives")} className={btnOutline}>
              Explore Creatives &amp; Code
            </button>
          </motion.div>

          <motion.ul
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
          >
            {chips.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className={`${glass} flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium`}
              >
                <Icon size={16} className="text-accent" />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className={`${glass} overflow-hidden rounded-3xl p-3 shadow-[0_0_60px_-20px_rgba(0,242,254,0.5)]`}>
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950">
              {imgOk ? (
                <img
                  src={PROFILE_PIC}
                  alt="Franklin Muriithi, founder of Frank.M.Tech"
                  className="h-full w-full object-cover"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="grid h-full place-items-center">
                  <span className="font-display text-7xl font-bold text-gradient">FM</span>
                </div>
              )}
            </div>
            <div className="px-2 pt-3 pb-1">
              <p className="font-display font-semibold">Franklin M.</p>
              <p className="text-xs text-slate-400">Developer &amp; creative · Frank.M.Tech</p>
            </div>
          </div>

          <motion.div
            className={`${glass} absolute -left-3 top-10 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium sm:-left-8`}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Code2 size={14} className="text-accent" />
            Web &amp; AI
          </motion.div>
          <motion.div
            className={`${glass} absolute -right-3 top-1/2 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium sm:-right-8`}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Video size={14} className="text-cta" />
            Video
          </motion.div>
          <motion.div
            className={`${glass} absolute -left-3 bottom-20 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium sm:-left-8`}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Camera size={14} className="text-indigo-300" />
            Photography
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
