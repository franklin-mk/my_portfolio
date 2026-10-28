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
import { glass, glow, Reveal, Section, SectionHeading } from "./ui";

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
    <Section id="services">
      <SectionHeading
        eyebrow="What I Build"
        title="Services built for"
        highlight="Kenyan businesses"
        subtitle="From a first website to full AI-powered systems, one engineer from idea to launch."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <Reveal key={s.id} delay={(i % 4) * 0.06}>
              <div className={`${glass} ${glow} h-full rounded-2xl p-5`}>
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}