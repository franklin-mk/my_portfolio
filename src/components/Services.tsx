import {
  Database,
  Gauge,
  Globe,
  LayoutDashboard,
  Plug,
  Radio,
  Settings,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { services, type ServiceIconKey } from "../data";
import { glass, glow, Reveal, SectionHeading } from "./ui";

const icons: Record<ServiceIconKey, LucideIcon> = {
  globe: Globe,
  cart: ShoppingCart,
  plug: Plug,
  layout: LayoutDashboard,
  database: Database,
  realtime: Radio,
  speed: Gauge,
  cms: Settings,
};

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 pt-24 pb-12 lg:pb-16">
      <SectionHeading
        compact
        eyebrow="What I Build"
        title="Services built for"
        highlight="Kenyan businesses"
        subtitle="From a first website to full AI-powered systems, one engineer from idea to launch."
      />
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <Reveal key={s.id} delay={(i % 4) * 0.06} className="h-full">
              <div
                className={`${glass} ${glow} flex h-full items-start gap-3 rounded-xl p-3 sm:block sm:p-3.5`}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                  <Icon size={17} />
                </span>
                <div className="min-w-0 sm:mt-2.5">
                  <h3 className="break-words font-display text-[15px] font-semibold leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-1 break-words text-xs leading-snug text-slate-400">
                    {s.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}