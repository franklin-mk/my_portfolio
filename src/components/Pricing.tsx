import { useMemo, useState } from "react";
import { CheckCircle2, MessageSquare } from "lucide-react";
import { ESTIMATOR, formatKES, packages, whatsappLink } from "../data";
import { Badge, btnPrimary, glass, glow, Reveal, Section, SectionHeading } from "./ui";

function Slider({
  label,
  hint,
  value,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="font-display text-lg font-semibold text-accent">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        aria-label={label}
      />
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </div>
  );
}

export default function Pricing() {
  const [pkgId, setPkgId] = useState(packages[1].id);
  const [pages, setPages] = useState(0);
  const [features, setFeatures] = useState(0);

  const pkg = packages.find((p) => p.id === pkgId) ?? packages[0];
  const total = useMemo(
    () => pkg.from + pages * ESTIMATOR.extraPage + features * ESTIMATOR.extraFeature,
    [pkg, pages, features],
  );
  const deposit = Math.round(total * ESTIMATOR.depositRate);

  const message = `Hello Franklin, I used the estimator on your site.\nPackage: ${pkg.name}\nExtra pages: ${pages}\nExtra features: ${features}\nEstimated investment: ${formatKES(total)}\nI'd like to discuss this project.`;

  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Transparent Pricing"
        title="Packages that"
        highlight="pay for themselves"
        subtitle="Clear prices in KES, no hidden fees. Start with 50% via M-Pesa, pay the balance on delivery."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {packages.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <div
              className={`${glass} ${glow} relative flex h-full flex-col rounded-3xl p-6 ${
                p.popular ? "border-accent/50 shadow-[0_0_50px_-18px_rgba(0,242,254,0.5)]" : ""
              }`}
            >
              {p.popular && <Badge className="absolute -top-3 left-6 bg-ink">Most popular</Badge>}
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{p.blurb}</p>
              <p className="mt-5">
                <span className="text-xs uppercase tracking-wider text-slate-500">From</span>
                <span className="mt-1 block font-display text-3xl font-bold text-gradient">
                  {formatKES(p.from)}
                </span>
              </p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setPkgId(p.id);
                  document.getElementById("estimator")?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="mt-6 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-medium transition hover:border-accent/60 hover:text-accent"
              >
                Estimate this package
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <div id="estimator" className={`${glass} grid gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]`}>
          <div>
            <h3 className="font-display text-xl font-semibold">Live investment estimator</h3>
            <p className="mt-1 text-sm text-slate-400">Pick a package and slide to see your indicative budget.</p>

            <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Package">
              {packages.map((p) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={p.id === pkgId}
                  onClick={() => setPkgId(p.id)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    p.id === pkgId
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-slate-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {p.short}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-6">
              <Slider
                label="Extra pages"
                hint={`+${formatKES(ESTIMATOR.extraPage)} per page`}
                value={pages}
                max={ESTIMATOR.maxPages}
                onChange={setPages}
              />
              <Slider
                label="Extra features (booking, chat, reports…)"
                hint={`+${formatKES(ESTIMATOR.extraFeature)} per feature`}
                value={features}
                max={ESTIMATOR.maxFeatures}
                onChange={setFeatures}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-accent/30 bg-accent/5 p-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">Estimated investment</p>
              <p className="mt-2 font-display text-4xl font-bold text-gradient" aria-live="polite">
                {formatKES(total)}
              </p>
              <p className="mt-3 text-sm text-slate-300">
                Start with <span className="font-semibold text-white">{formatKES(deposit)}</span> via M-Pesa.
                Balance on delivery.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Indicative only. Your final quote is confirmed after a free consultation.
              </p>
            </div>
            <a href={whatsappLink(message)} target="_blank" rel="noreferrer" className={`${btnPrimary} mt-6`}>
              <MessageSquare size={16} /> Send this estimate on WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}