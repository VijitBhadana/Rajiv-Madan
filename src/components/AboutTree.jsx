// "About" as a glowing circuit tree: a bundle of lines rises from the bottom,
// peels off left and right, and ends in circles that hold the About content.
// Desktop (xl+) draws the tree on a fixed 1200x1300 canvas that scales with its
// width; smaller screens get a vertical trunk with the circles hanging off it.
// Sits on white in the light theme and navy in the dark one; the circles stay
// dark in both. Styles live in index.css (.tree-*).
import { useEffect, useRef, useState } from "react";
import { Calculator, ChartPie, Phone, PiggyBank } from "lucide-react";
import photo from "../assets/rajiv-madan.webp";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { socialIcons } from "./SocialLinks";
import { cn } from "../lib/utils";
import { about, contact, socials } from "../data/siteData";

const W = 1200;
const H = 1300; // the trunk runs down to the bottom of the section
const TEAL = "#2dd4bf";
const SKY = "#38bdf8";
const DIM = "#2b4a74";

const mirror = ([x, y, ...rest]) => [W - x, y, ...rest];

// Left half, top to bottom (matches about.tree.left). node = [x, y, radius].
// Outer lines peel off the trunk lower, so no two lines ever cross.
const LEFT = [
  { node: [438, 110, 80], line: [[585, H], [585, 1030], [438, 883], [438, 110]], color: TEAL },
  { node: [320, 300, 95], line: [[575, H], [575, 1050], [424, 899], [424, 300], [320, 300]], color: SKY },
  { node: [130, 470, 95], line: [[565, H], [565, 1070], [410, 915], [410, 470], [130, 470]], color: TEAL },
  { node: [295, 700, 95], line: [[555, H], [555, 1090], [396, 931], [396, 700], [295, 700]], color: SKY },
  { node: [165, 905, 100], line: [[545, H], [545, 1110], [340, 905], [165, 905]], color: TEAL },
];
const RIGHT = LEFT.map(({ node, line, color }) => ({
  node: mirror(node),
  line: line.map(mirror),
  color: color === TEAL ? SKY : TEAL,
}));

// Small leaf circles hanging off the big ones (socials + a few decorative icons)
const LEFT_LEAVES = [
  { node: [285, 120, 26], line: [[320, 300], [320, 155], [285, 120]] },
  { node: [175, 225, 30], line: [[130, 470], [130, 270], [175, 225]] },
  { node: [80, 700, 28], line: [[130, 470], [130, 650], [80, 700]] },
  { node: [390, 1055, 28], line: [[490, 1055], [390, 1055]] },
];
const RIGHT_LEAVES = LEFT_LEAVES.map(({ node, line }) => ({ node: mirror(node), line: line.map(mirror) }));
const decor = [PiggyBank, ChartPie, Calculator];
const LEAVES = [...LEFT_LEAVES.slice(0, 3), ...RIGHT_LEAVES.slice(0, 2), LEFT_LEAVES[3], ...RIGHT_LEAVES.slice(2)].map(
  (leaf, i) => ({ ...leaf, social: socials[i], Decor: decor[i - socials.length] })
);

const PHOTO = [600, 420, 140];
const PHONE = [600, 125, 66];
const CENTER_LINES = [
  { line: [[595, H], [595, 420]], color: TEAL },
  { line: [[605, H], [605, 420]], color: SKY },
  { line: [[588, 420], [588, 125]], color: SKY },
  { line: [[612, 420], [612, 125]], color: TEAL },
];

const MAIN_LINES = [...LEFT, ...RIGHT, ...CENTER_LINES];
const toPath = (pts) => "M" + pts.map(([x, y]) => `${x} ${y}`).join(" L");
const pct = (v, of) => `${(v / of) * 100}%`;

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ---------- circle contents (sized in em so desktop and mobile share them) ---------- */

function Orb({ as: Tag = "div", color, className, style, children, ...rest }) {
  return (
    <Tag className={cn("tree-orb relative block aspect-square", className)} style={{ "--c": color, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

function InfoContent({ item }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-[15%] text-center">
      <Icon name={item.icon} className="h-[1.6em] w-[1.6em] text-[color:var(--c)]" />
      <p className="mt-[0.5em] text-[0.68em] font-bold uppercase tracking-[0.18em] text-[color:var(--c)]">{item.label}</p>
      {item.stat && <p className="mt-[0.15em] font-display text-[3em] font-extrabold leading-none text-white">{item.stat}</p>}
      {item.title && (
        <p className="mt-[0.3em] font-display text-[1.15em] font-extrabold leading-tight text-white">{item.title}</p>
      )}
      {item.text && <p className="mt-[0.35em] text-[0.92em] leading-snug text-slate-300">{item.text}</p>}
    </div>
  );
}

function PhotoContent() {
  return (
    <>
      <img
        src={photo}
        alt={`${about.name}, ${about.role}`}
        width="640"
        height="640"
        loading="lazy"
        className="h-full w-full rounded-full object-cover object-[45%_35%] p-[3%]"
      />
      <div className="absolute left-1/2 top-full w-max -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--c)] bg-navy-900 px-[1.1em] py-[0.45em] text-center">
        <p className="font-display text-[1.15em] font-extrabold leading-tight text-white">{about.name}</p>
        <p className="text-[0.7em] font-semibold text-slate-400">{about.role}</p>
      </div>
    </>
  );
}

function PhoneContent() {
  return (
    <span className="flex h-full flex-col items-center justify-center px-[8%] text-center">
      <Phone className="h-[1.4em] w-[1.4em] text-[color:var(--c)]" aria-hidden="true" />
      <span className="mt-[0.35em] text-[0.62em] font-bold uppercase tracking-[0.16em] text-[color:var(--c)]">Talk to Rajiv</span>
      <span className="mt-[0.15em] whitespace-nowrap text-[0.85em] font-bold text-white">{contact.phone}</span>
    </span>
  );
}

function LeafContent({ social, Decor }) {
  const Cmp = social ? socialIcons[social.icon] : Decor;
  return (
    <span className="flex h-full items-center justify-center">
      <Cmp className="h-[1.15em] w-[1.15em] text-slate-200" aria-hidden="true" />
    </span>
  );
}

function leafProps(social) {
  return social
    ? {
        as: "a",
        href: social.href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `Rajiv Madan CPA on ${social.label}`,
        title: social.label,
        className: "tree-orb-link",
      }
    : { "aria-hidden": true };
}

/* ---------- desktop tree ---------- */

function Placed({ node: [x, y, r], children }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: pct(x, W), top: pct(y, H), width: pct(2 * r, W) }}
    >
      {children}
    </div>
  );
}

function DesktopTree() {
  const [ref, inView] = useInView(0.2);
  const all = [...MAIN_LINES, ...LEAVES.map((l) => ({ ...l, color: DIM }))];
  // circles pop in after their lines have mostly drawn
  const pop = (i) => ({ transitionDelay: `${1100 + i * 70}ms` });

  return (
    <div ref={ref} className={cn("tree tree-canvas relative mx-auto hidden aspect-[1200/1300] w-full max-w-[1200px] xl:block", inView && "is-in")}>
      <svg viewBox={`0 0 ${W} ${H}`} className="tree-svg absolute inset-0 h-full w-full" aria-hidden="true" fill="none">
        <g strokeLinejoin="round">
          {all.map(({ line, color }, i) => (
            <path
              key={i}
              d={toPath(line)}
              pathLength="1"
              stroke={color}
              strokeWidth={i < MAIN_LINES.length ? 3 : 2}
              className="tree-draw"
              style={{ transitionDelay: `${i < MAIN_LINES.length ? i * 60 : 900 + i * 30}ms` }}
            />
          ))}
        </g>
        {/* light pulses running up the lines */}
        <g strokeLinecap="round">
          {MAIN_LINES.map(({ line }, i) => (
            <path
              key={i}
              d={toPath(line)}
              pathLength="1"
              stroke="#e6fffb"
              strokeWidth="3"
              className="tree-pulse"
              style={{ "--dur": `${3.2 + (i % 5) * 0.45}s`, "--delay": `${2 + ((i * 7) % 11) * 0.35}s` }}
            />
          ))}
        </g>
      </svg>

      {LEAVES.map(({ node, social, Decor }, i) => {
        const { className, ...props } = leafProps(social);
        return (
          <Placed key={i} node={node}>
            <Orb color={DIM} className={cn("tree-pop", className)} style={pop(12 + i)} {...props}>
              <LeafContent social={social} Decor={Decor} />
            </Orb>
          </Placed>
        );
      })}

      {[...LEFT.map((g, i) => [g, about.tree.left[i]]), ...RIGHT.map((g, i) => [g, about.tree.right[i]])].map(
        ([{ node, color }, item], i) => (
          <Placed key={item.label} node={node}>
            <Orb color={color} className="tree-pop" style={pop(i % 5)}>
              <InfoContent item={item} />
            </Orb>
          </Placed>
        )
      )}

      <Placed node={PHONE}>
        <Orb as="a" href={contact.phoneHref} color={SKY} className="tree-pop tree-orb-link" style={pop(6)}>
          <PhoneContent />
        </Orb>
      </Placed>

      <Placed node={PHOTO}>
        <Orb color={TEAL} className="tree-pop tree-orb-photo" style={pop(0)}>
          <PhotoContent />
        </Orb>
      </Placed>
    </div>
  );
}

/* ---------- phones and tablets: vertical trunk ---------- */

function Branch({ color, long }) {
  return <span className={cn("tree-branch h-[2px] shrink-0", long ? "flex-1" : "w-6 sm:w-10")} style={{ "--c": color }} />;
}

function MobileTree() {
  const items = [
    ...about.tree.left.slice(0, 4).map((item, i) => [item, LEFT[i].color]),
    ...about.tree.right.map((item, i) => [item, RIGHT[i].color]),
    [about.tree.left[4], LEFT[4].color],
  ];

  return (
    <ul className="relative mx-auto max-w-xl space-y-8 pl-7 pr-3 text-[14px] sm:text-[15px] xl:hidden">
      <li className="tree-trunk pointer-events-none absolute -bottom-20 left-3 top-0 w-4 lg:-bottom-28" aria-hidden="true">
        <span className="left-0" style={{ "--c": TEAL }} />
        <span className="left-[7px]" style={{ "--c": SKY }} />
        <span className="left-[14px]" style={{ "--c": TEAL }} />
      </li>

      <li className="flex items-center">
        <Branch color={TEAL} long />
        <Reveal from="zoom" className="mr-[8%]">
          <Orb color={TEAL} className="tree-orb-photo mb-8 w-[230px] sm:w-[260px]">
            <PhotoContent />
          </Orb>
        </Reveal>
      </li>

      {items.map(([item, color], i) => (
        <li key={item.label} className="flex items-center">
          <Branch color={color} long={i % 2 === 1} />
          <Reveal from="zoom">
            <Orb color={color} className="w-[205px] sm:w-[230px]">
              <InfoContent item={item} />
            </Orb>
          </Reveal>
        </li>
      ))}

      <li className="flex items-center">
        <Branch color={SKY} long />
        <Reveal from="zoom">
          <Orb as="a" href={contact.phoneHref} color={SKY} className="tree-orb-link w-[150px]">
            <PhoneContent />
          </Orb>
        </Reveal>
      </li>

      <li className="flex items-center">
        <Branch color={DIM} />
        <ul className="flex flex-wrap gap-3">
          {socials.map((social) => {
            const { className, ...props } = leafProps(social);
            return (
              <li key={social.label}>
                <Orb color={DIM} className={cn("w-12", className)} {...props}>
                  <LeafContent social={social} />
                </Orb>
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
}

export default function AboutTree() {
  return (
    <div className="container-x relative pb-20 lg:pb-28 xl:pb-0">
      <h2 className="sr-only">{about.title}</h2>
      <DesktopTree />
      <MobileTree />
    </div>
  );
}
