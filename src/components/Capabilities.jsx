import {
  FaAward,
  FaStopwatch,
  FaPiggyBank,
  FaChartLine,
  FaCalculator,
  FaFileInvoiceDollar,
  FaLandmark,
  FaMoneyCheckDollar,
  FaBuilding,
  FaUserTie,
  FaHandshake,
} from "react-icons/fa6";
import { TbReceiptTax } from "react-icons/tb";
import { useEffect, useState } from "react";
import { capabilities } from "../data/siteData";

// react-icons used on the cards, keyed by the `icon` field in siteData
const icons = {
  award: FaAward,
  stopwatch: FaStopwatch,
  "piggy-bank": FaPiggyBank,
  "chart-line": FaChartLine,
  calculator: FaCalculator,
  statement: FaFileInvoiceDollar,
  landmark: FaLandmark,
  payroll: FaMoneyCheckDollar,
  "receipt-tax": TbReceiptTax,
  building: FaBuilding,
  "user-tie": FaUserTie,
  handshake: FaHandshake,
};

// Full class strings per accent colour (kept literal so Tailwind can see them)
const theme = {
  blue: {
    tile: "from-blue-500 to-blue-700 shadow-blue-500/30",
    tag: "bg-blue-50 text-blue-700 ring-blue-100 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-400/20",
    glow: "bg-blue-400/20",
    bar: "from-blue-500 to-blue-300",
    number: "group-hover:text-blue-100",
  },
  amber: {
    tile: "from-amber-500 to-amber-700 shadow-amber-500/30",
    tag: "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-400/20",
    glow: "bg-amber-400/20",
    bar: "from-amber-500 to-amber-300",
    number: "group-hover:text-amber-100",
  },
  green: {
    tile: "from-emerald-500 to-emerald-700 shadow-emerald-500/30",
    tag: "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/20",
    glow: "bg-emerald-400/20",
    bar: "from-emerald-500 to-emerald-300",
    number: "group-hover:text-emerald-100",
  },
  indigo: {
    tile: "from-indigo-500 to-indigo-700 shadow-indigo-500/30",
    tag: "bg-indigo-50 text-indigo-700 ring-indigo-100 dark:bg-indigo-500/15 dark:text-indigo-300 dark:ring-indigo-400/20",
    glow: "bg-indigo-400/20",
    bar: "from-indigo-500 to-indigo-300",
    number: "group-hover:text-indigo-100",
  },
  teal: {
    tile: "from-teal-500 to-teal-700 shadow-teal-500/30",
    tag: "bg-teal-50 text-teal-700 ring-teal-100 dark:bg-teal-500/15 dark:text-teal-300 dark:ring-teal-400/20",
    glow: "bg-teal-400/20",
    bar: "from-teal-500 to-teal-300",
    number: "group-hover:text-teal-100",
  },
  rose: {
    tile: "from-rose-500 to-rose-700 shadow-rose-500/30",
    tag: "bg-rose-50 text-rose-700 ring-rose-100 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-400/20",
    glow: "bg-rose-400/20",
    bar: "from-rose-500 to-rose-300",
    number: "group-hover:text-rose-100",
  },
  sky: {
    tile: "from-sky-500 to-sky-700 shadow-sky-500/30",
    tag: "bg-sky-50 text-sky-700 ring-sky-100 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-400/20",
    glow: "bg-sky-400/20",
    bar: "from-sky-500 to-sky-300",
    number: "group-hover:text-sky-100",
  },
  violet: {
    tile: "from-violet-500 to-violet-700 shadow-violet-500/30",
    tag: "bg-violet-50 text-violet-700 ring-violet-100 dark:bg-violet-500/15 dark:text-violet-300 dark:ring-violet-400/20",
    glow: "bg-violet-400/20",
    bar: "from-violet-500 to-violet-300",
    number: "group-hover:text-violet-100",
  },
};

// Number of ticker columns for the current screen width
function useColumnCount() {
  const get = () =>
    window.matchMedia("(min-width: 1024px)").matches ? 4 : window.matchMedia("(min-width: 640px)").matches ? 2 : 1;
  const [count, setCount] = useState(get);
  useEffect(() => {
    const onResize = () => setCount(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return count;
}

function usePrefersReducedMotion() {
  const [reduce] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  return reduce;
}

export function CapabilityCard({ item, index }) {
  const t = theme[item.color] || theme.blue;
  const Icon = icons[item.icon] || FaAward;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card transition duration-300 hover:border-transparent hover:shadow-panel dark:border-white/10 dark:bg-navy-800 dark:hover:border-white/20 sm:p-7">
      {/* Decorative colour glow + index number */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full blur-2xl transition duration-500 group-hover:scale-150 ${t.glow}`}
      />
      <span
        aria-hidden="true"
        className={`absolute right-6 top-5 font-display text-5xl font-extrabold leading-none text-slate-100 transition-colors duration-300 dark:text-white/5 ${t.number} dark:group-hover:text-white/15`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon tile */}
      <span
        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ring-4 ring-white transition dark:ring-navy-800 duration-300 group-hover:-rotate-6 group-hover:scale-110 ${t.tile}`}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>

      <span
        className={`relative mt-6 inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ring-1 ${t.tag}`}
      >
        {item.tag}
      </span>
      <h3 className="relative mt-3 font-display text-xl font-extrabold leading-snug tracking-tight text-navy-900 dark:text-white">
        {item.title}
      </h3>
      <p className="relative mt-3 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">{item.text}</p>

      {/* Accent bar that grows on hover */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100 ${t.bar}`}
      />
    </article>
  );
}

// Column 1 up, 2 down, 3 up, 4 down
const COLUMN_DIRECTIONS = ["up", "down", "up", "down"];
// Seconds for one full loop of a column (smaller = faster)
const COLUMN_SPEEDS = [30, 26, 32, 28];

export default function Capabilities() {
  const columnCount = useColumnCount();
  const reduceMotion = usePrefersReducedMotion();
  const items = capabilities.items.map((item, index) => ({ item, index }));

  // Deal cards round-robin into columns
  const columns = Array.from({ length: columnCount }, (_, c) => items.filter((_, i) => i % columnCount === c));

  return (
    <section id="capabilities" className="relative overflow-hidden bg-navy-950 pb-20 pt-12 lg:pb-24 lg:pt-14">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-400">{capabilities.eyebrow}</p>
          <h2 className="mt-3 font-display text-[34px] font-extrabold tracking-tight text-white sm:text-5xl">
            {capabilities.title}
          </h2>
          <p className="mt-4 text-sm text-slate-400">{capabilities.description}</p>
        </div>

        {reduceMotion ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(({ item, index }) => (
              <CapabilityCard key={item.title} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="relative mt-10 h-[600px] sm:h-[680px] lg:h-[760px]">
            {/* Big decorative title behind the moving cards (the real heading is above) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center text-center font-display text-[17vw] font-extrabold leading-[0.9] tracking-[-0.04em] text-white lg:text-[min(13vw,170px)]">
              <span>
                Our <br className="lg:hidden" />
                Capabilities
              </span>
            </div>

            {/* Ticker columns: content is doubled so translating by -50% loops seamlessly */}
            <div className="ticker-mask relative z-10 grid h-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {columns.map((col, c) => (
                <div key={c} className="overflow-hidden">
                  <div
                    className="ticker-track flex flex-col"
                    data-direction={COLUMN_DIRECTIONS[c % COLUMN_DIRECTIONS.length]}
                    style={{
                      animationDuration: `${COLUMN_SPEEDS[c % COLUMN_SPEEDS.length]}s`,
                      animationDelay: `-${c * 5}s`,
                    }}
                  >
                    {[0, 1].map((copy) => (
                      <div key={copy} aria-hidden={copy === 1 || undefined} className="flex flex-col gap-5 pb-5">
                        {col.map(({ item, index }) => (
                          <CapabilityCard key={item.title} item={item} index={index} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
