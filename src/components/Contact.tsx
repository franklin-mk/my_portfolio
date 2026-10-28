import { useState, type FormEvent } from "react";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { budgetOptions, EMAIL, packages, PHONE_DISPLAY, whatsappLink } from "../data";
import { btnPrimary, glass, inputCls, Reveal, Section, SectionHeading } from "./ui";

const serviceOptions = [
  ...packages.map((p) => p.name),
  "Video Editing & Reels",
  "Graphic Design & Branding",
  "Something else / not sure yet",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    business: "",
    service: serviceOptions[0],
    budget: budgetOptions[budgetOptions.length - 1],
  });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const msg = [
      "Hello Franklin, I found you via Frank.M.Tech and I'd like a quote.",
      "",
      `Name: ${form.name}`,
      `Phone/WhatsApp: ${form.phone}`,
      `Business: ${form.business || "N/A"}`,
      `Service needed: ${form.service}`,
      `Estimated budget: ${form.budget}`,
    ].join("\n");
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Get a Quote"
        title="Let's build something"
        highlight="that earns"
        subtitle="Fill in the form and it opens WhatsApp with your details pre-filled. You'll hear back from me directly."
      />

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Call", value: PHONE_DISPLAY, href: "tel:+254716205591" },
              { icon: MessageSquare, label: "WhatsApp", value: PHONE_DISPLAY, href: whatsappLink() },
              { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
              { icon: MapPin, label: "Based in", value: "Nyeri, Kenya", href: undefined },
            ].map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-slate-500">{label}</span>
                    <span className="block truncate text-sm font-medium">{value}</span>
                  </span>
                </>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className={`${glass} flex items-center gap-4 rounded-2xl p-4 transition hover:border-accent/50`}
                >
                  {inner}
                </a>
              ) : (
                <div key={label} className={`${glass} flex items-center gap-4 rounded-2xl p-4`}>
                  {inner}
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className={`${glass} space-y-4 rounded-3xl p-6 sm:p-8`}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm text-slate-300">
                  Name
                </label>
                <input id="name" required value={form.name} onChange={set("name")} placeholder="Jane Wanjiru" className={inputCls} />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm text-slate-300">
                  Phone / WhatsApp
                </label>
                <input
                  id="phone"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="07XX XXX XXX"
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label htmlFor="business" className="mb-1.5 block text-sm text-slate-300">
                Business name
              </label>
              <input id="business" value={form.business} onChange={set("business")} placeholder="Optional" className={inputCls} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="service" className="mb-1.5 block text-sm text-slate-300">
                  Service needed
                </label>
                <select id="service" value={form.service} onChange={set("service")} className={inputCls}>
                  {serviceOptions.map((o) => (
                    <option key={o} className="bg-slate-900">
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="mb-1.5 block text-sm text-slate-300">
                  Estimated budget
                </label>
                <select id="budget" value={form.budget} onChange={set("budget")} className={inputCls}>
                  {budgetOptions.map((o) => (
                    <option key={o} className="bg-slate-900">
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className={`${btnPrimary} w-full`}>
              <MessageSquare size={16} /> Send on WhatsApp
            </button>
            {sent && (
              <p className="text-center text-sm text-emerald-400" role="status">
                WhatsApp should be open with your message ready to send. Just tap send.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}