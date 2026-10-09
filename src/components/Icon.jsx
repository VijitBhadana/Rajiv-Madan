import {
  ShieldCheck,
  BadgeCheck,
  MapPin,
  BookOpen,
  ReceiptText,
  Building2,
  ChartPie,
  Award,
  Clock,
  PiggyBank,
  TrendingUp,
  Plane,
  Users,
  Quote,
  Layers,
} from "lucide-react";

const icons = {
  shield: ShieldCheck,
  check: BadgeCheck,
  pin: MapPin,
  book: BookOpen,
  receipt: ReceiptText,
  building: Building2,
  chart: ChartPie,
  badge: Award,
  clock: Clock,
  piggy: PiggyBank,
  trend: TrendingUp,
  plane: Plane,
  users: Users,
  quote: Quote,
  layers: Layers,
};

export default function Icon({ name, className = "h-5 w-5", strokeWidth = 2 }) {
  const Cmp = icons[name] || BadgeCheck;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

// Soft tinted tiles (Core Accounting cards)
export const softTile = {
  blue: "bg-blue-50 text-blue-600 ring-blue-100 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-400/20",
  green: "bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/20",
  indigo: "bg-indigo-50 text-indigo-600 ring-indigo-100 dark:bg-indigo-500/15 dark:text-indigo-300 dark:ring-indigo-400/20",
  teal: "bg-teal-50 text-teal-600 ring-teal-100 dark:bg-teal-500/15 dark:text-teal-300 dark:ring-teal-400/20",
  amber: "bg-amber-50 text-amber-600 ring-amber-100 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-400/20",
};
