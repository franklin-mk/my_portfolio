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
      <div className="mb-1.5 flex items-baseline justify-between lg:mb-1">
        <label className="text-xs font-medium sm:text-sm">{label}</label>
        <span className="font-display text-base font-semibold text-accent lg:text-[clamp(1rem,min(1.4vw,2.2vh),1.125rem)]">
          {value}
        </span>
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
      <p className="mt-0.5 text-xs text-slate-500">{hint}</p>
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

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        {packages.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <div
              className={`${glass} ${glow} relative flex h-full flex-col rounded-2xl p-5 sm:rounded-3xl lg:p-[clamp(1.15rem,min(2vw,2.6vh),1.5rem)] ${
                p.popular ? "border-accent/50 shadow-[0_0_50px_-18px_rgba(0,242,254,0.5)]" : ""
              }`}
            >
              {p.popular && <Badge className="absolute -top-3 left-5 bg-ink sm:left-6">Most popular</Badge>}
              <h3 className="font-display text-lg font-semibold sm:text-xl lg:text-[clamp(1.1rem,min(1.5vw,2.4vh),1.25rem)]">
                {p.name}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">{p.blurb}</p>
              <p className="mt-3.5 lg:mt-[clamp(0.75rem,1.8vh,1.25rem)]">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 sm:text-xs">From</span>
                <span className="mt-0.5 block font-display text-2xl font-bold text-gradient sm:text-3xl lg:text-[clamp(1.5rem,min(2.4vw,3.8vh),1.875rem)]">
                  {formatKES(p.from)}
                </span>
              </p>
              <ul className="mt-4 flex-1 space-y-2 lg:mt-[clamp(0.75rem,1.8vh,1.25rem)] lg:space-y-1.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs leading-snug text-slate-300 sm:text-sm lg:gap-2.5">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setPkgId(p.id);
                  document.getElementById("estimator")?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="mt-5 rounded-full border border-slate-700 px-4 py-2 text-xs font-medium transition hover:border-accent/60 hover:text-accent sm:px-5 sm:py-2.5 sm:text-sm lg:mt-[clamp(1rem,2vh,1.5rem)] lg:py-2"
              >
                Estimate this package
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-7 lg:mt-[clamp(1.5rem,3vh,2.5rem)]">
        <div
          id="estimator"
          className={`${glass} grid gap-6 rounded-2xl p-5 sm:rounded-3xl sm:p-6 lg:grid-cols-[1.3fr_1fr] lg:gap-8 lg:p-[clamp(1.25rem,min(2.2vw,3vh),2rem)]`}
        >
          <div>
            <h3 className="font-display text-lg font-semibold sm:text-xl lg:text-[clamp(1.125rem,min(1.6vw,2.5vh),1.25rem)]">
              Live investment estimator
            </h3>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Pick a package and slide to see your indicative budget.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 lg:mt-[clamp(0.75rem,1.8vh,1.25rem)]" role="tablist" aria-label="Package">
              {packages.map((p) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={p.id === pkgId}
                  onClick={() => setPkgId(p.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
                    p.id === pkgId
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-slate-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {p.short}
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-4 sm:space-y-5 lg:mt-[clamp(1rem,2vh,1.5rem)] lg:space-y-4">
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

          <div className="flex flex-col justify-between rounded-2xl border border-accent/30 bg-accent/5 p-5 lg:p-[clamp(1.15rem,min(2vw,2.6vh),1.5rem)]">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 sm:text-xs">Estimated investment</p>
              <p
                className="mt-1.5 font-display text-3xl font-bold text-gradient sm:text-4xl lg:text-[clamp(1.85rem,min(3vw,4.8vh),2.25rem)]"
                aria-live="polite"
              >
                {formatKES(total)}
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm lg:mt-2">
                Start with <span className="font-semibold text-white">{formatKES(deposit)}</span> via M-Pesa.
                Balance on delivery.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Indicative only. Your final quote is confirmed after a free consultation.
              </p>
            </div>
            <a href={whatsappLink(message)} target="_blank" rel="noreferrer" className={`${btnPrimary} mt-5 lg:mt-4`}>
              <MessageSquare size={16} /> Send this estimate on WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}