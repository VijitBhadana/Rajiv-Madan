// CardCourier - a cartoon accountant (drawn after the office-character sheet:
// light blue shirt, orange tie, navy trousers) who walks in carrying the
// profile card like a placard, lifts it into its place on the right, points at
// it, waves, and walks back out.
//
// The card stays a normal element in the page layout; while it is being carried
// it is only transformed, and it ends exactly in its own spot. Everything is
// driven by one `pose` object that GSAP tweens and `render()` turns into SVG
// rotations and CSS transforms, so the legs, arms, hands and card stay in sync.
//
// Render it inside a positioned, overflow-hidden box (the stage it walks across);
// cardRef is the card, also inside that box.
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Character art, in viewBox units
const VB_W = 200;
const VB_H = 432;
const HIP_Y = 232;
const KNEE_Y = 322;
const THIGH = KNEE_Y - HIP_Y;
const SHIN = 426 - KNEE_Y; // knee to sole
const L_HIP_X = 87;
const R_HIP_X = 113;
const SHOULDER_Y = 122;
const ELBOW_Y = 180;
const L_SH_X = 68;
const R_SH_X = 132;
const CARD_TOP_Y = 106; // where the carried card's top edge sits: just under the chin

// Walk cycle (angles in degrees; positive = clockwise in SVG)
const STEP_DUR = 0.42;
const HIP_SWING = 22;
const KNEE_BEND = 38;
const ARM_SWING = 20;

const C = {
  shirt: "#dce6f9",
  shirtShade: "#c3d1ee",
  collar: "#f3f6fd",
  tie: "#f2501b",
  tieShade: "#d4410f",
  pants: "#2c2a4a",
  pantsShade: "#211f38",
  belt: "#1b1a2e",
  shoe: "#111318",
  sock: "#9ca3af",
  skin: "#f1c7a9",
  skinShade: "#e0a888",
  hair: "#15151a",
  ink: "#111111",
};

const rad = (d) => (d * Math.PI) / 180;
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const legExtent = (hip, knee) => THIGH * Math.cos(rad(hip)) + SHIN * Math.cos(rad(hip + knee));

const REST = { lSh: 6, lEl: -8, rSh: -6, rEl: 8 };

function Arm({ side, armRef, foreRef }) {
  const x = side === "left" ? L_SH_X : R_SH_X;
  const fill = side === "left" ? C.shirtShade : C.shirt;
  const skin = side === "left" ? C.skinShade : C.skin;
  return (
    <g ref={armRef}>
      <rect x={x - 10} y="114" width="20" height="72" rx="10" fill={fill} />
      <g ref={foreRef}>
        <rect x={x - 9} y="174" width="18" height="58" rx="9" fill={fill} />
        <rect x={x - 8} y="226" width="16" height="7" rx="2" fill={C.collar} />
        <Hand x={x} skin={skin} line={side === "left" ? "#c98b6c" : C.skinShade} />
      </g>
    </g>
  );
}

// Open hand hanging from the wrist: palm, four fingers and a thumb on the front side
const FINGERS = [
  { dx: -7.6, h: 10.5 },
  { dx: -3.8, h: 12.5 },
  { dx: 0, h: 12 },
  { dx: 3.8, h: 10 },
];

function Hand({ x, skin, line }) {
  return (
    <g>
      <rect
        x={x + 4.5}
        y="231"
        width="4.6"
        height="11"
        rx="2.3"
        fill={skin}
        stroke={line}
        strokeWidth="0.8"
        transform={`rotate(-32 ${x + 6.8} 232)`}
      />
      {FINGERS.map((f) => (
        <rect
          key={f.dx}
          x={x + f.dx - 0.2}
          y="240"
          width="4"
          height={f.h}
          rx="2"
          fill={skin}
          stroke={line}
          strokeWidth="0.8"
        />
      ))}
      <rect x={x - 8.2} y="230" width="16.4" height="14" rx="5" fill={skin} />
    </g>
  );
}

function Leg({ x, legRef, shinRef }) {
  return (
    <g ref={legRef}>
      <rect x={x - 13} y="222" width="26" height="106" rx="12" fill={C.pants} />
      <g ref={shinRef}>
        <rect x={x - 13} y="316" width="26" height="100" rx="11" fill={C.pantsShade} />
        <rect x={x - 8} y="410" width="16" height="8" fill={C.sock} />
        <path d={`M${x - 14} 426 Q${x - 14} 413 ${x - 1} 413 L${x + 10} 414 Q${x + 26} 416 ${x + 27} 426 Z`} fill={C.shoe} />
      </g>
    </g>
  );
}

// A fist gripping the card's edge, drawn for the right-hand side
function Fist() {
  return (
    <svg viewBox="0 0 30 34" className="h-full w-full overflow-visible">
      <rect x="4" y="20" width="16" height="13" rx="3" fill={C.shirt} />
      <rect x="4" y="19" width="16" height="5" rx="2" fill={C.collar} />
      <ellipse cx="13" cy="13" rx="9" ry="10.5" fill={C.skinShade} />
      {/* curled fingers wrapped over the card's edge */}
      {[3, 8, 13, 18].map((y, i) => (
        <rect
          key={y}
          x="5"
          y={y}
          width={i === 3 ? 15 : 17}
          height="5.2"
          rx="2.6"
          fill={C.skin}
          stroke={C.skinShade}
          strokeWidth="0.8"
        />
      ))}
      <rect x="1" y="9" width="6" height="13" rx="3" fill={C.skin} stroke={C.skinShade} strokeWidth="0.8" transform="rotate(-12 4 15)" />
    </svg>
  );
}

export default function CardCourier({ cardRef }) {
  const charRef = useRef(null);
  const handLRef = useRef(null);
  const handRRef = useRef(null);
  const r = {
    legL: useRef(null),
    shinL: useRef(null),
    legR: useRef(null),
    shinR: useRef(null),
    armL: useRef(null),
    foreL: useRef(null),
    armR: useRef(null),
    foreR: useRef(null),
    head: useRef(null),
  };

  useLayoutEffect(() => {
    const char = charRef.current;
    // The parent's ref isn't attached yet when this layout effect runs, so take the DOM parent
    const stage = char?.parentElement;
    const card = cardRef.current;
    const hands = [handLRef.current, handRRef.current];
    if (!stage || !card || !char) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      char.style.display = "none";
      hands.forEach((h) => (h.style.display = "none"));
      return;
    }

    const pose = {
      x: 0, // left edge of the character, px in the stage
      phase: 0, // walk cycle: one step per PI
      walk: 1, // leg swing amount
      armSwing: 0,
      ...REST,
      head: 0,
      lift: 0, // px up, e.g. on tiptoe
      facing: 1,
      arms: 0, // arm opacity: hidden behind the card while carrying
      hands: 1, // fists on the card's edges
      place: 0, // 0 carried -> 1 in its own spot
      pop: 0,
      front: 0, // 1 = character in front of the card
    };

    // Layout of the card and the size of the character, ignoring transforms
    const measure = () => {
      let cardL = 0;
      let cardT = 0;
      for (let el = card; el && el !== stage; el = el.offsetParent) {
        cardL += el.offsetLeft;
        cardT += el.offsetTop;
      }
      const cardW = card.offsetWidth;
      const cardH = card.offsetHeight;
      // About the card's height; on phones, where he stands in front of the card, smaller
      const H = clamp(Math.min(cardH * 0.95, stage.clientWidth * 0.6), 200, 470);
      const k = H / VB_H;
      return { cardL, cardT, cardW, cardH, H, k, charW: VB_W * k, ground: stage.clientHeight - 10 };
    };

    const rot = (ref, a, x, y) => ref.current.setAttribute("transform", `rotate(${a} ${x} ${y})`);

    const render = () => {
      const m = measure();
      const { k, H, charW } = m;
      const s = Math.sin(pose.phase);
      const c = Math.cos(pose.phase);

      const hipL = -HIP_SWING * pose.walk * s;
      const kneeL = KNEE_BEND * pose.walk * Math.max(0, c);
      const hipR = HIP_SWING * pose.walk * s;
      const kneeR = KNEE_BEND * pose.walk * Math.max(0, -c);
      rot(r.legL, hipL, L_HIP_X, HIP_Y);
      rot(r.shinL, kneeL, L_HIP_X, KNEE_Y);
      rot(r.legR, hipR, R_HIP_X, HIP_Y);
      rot(r.shinR, kneeR, R_HIP_X, KNEE_Y);

      // Arms swing against the legs
      const swing = pose.armSwing * ARM_SWING * s;
      rot(r.armL, pose.lSh + swing, L_SH_X, SHOULDER_Y);
      rot(r.foreL, pose.lEl, L_SH_X, ELBOW_Y);
      rot(r.armR, pose.rSh - swing, R_SH_X, SHOULDER_Y);
      rot(r.foreR, pose.rEl, R_SH_X, ELBOW_Y);
      r.armL.current.style.opacity = pose.arms;
      r.armR.current.style.opacity = pose.arms;
      rot(r.head, pose.head, 100, 98);

      // Drop the body so the lower foot stays on the ground
      const drop = (THIGH + SHIN - Math.max(legExtent(hipL, kneeL), legExtent(hipR, kneeR))) * k;
      const top = m.ground - H + drop - pose.lift;
      char.style.width = `${charW}px`;
      char.style.height = `${H}px`;
      char.style.transform = `translate3d(${pose.x}px, ${top}px, 0) scaleX(${pose.facing})`;
      char.style.zIndex = pose.front ? 30 : 10;

      // Card: held against the chest, then lifted into its own spot
      const carryScale = (0.52 * H) / m.cardW;
      const carryCX = pose.x + charW / 2 + 6 * k * pose.facing;
      const carryCY = top + CARD_TOP_Y * k + (carryScale * m.cardH) / 2;
      const cardCX = m.cardL + m.cardW / 2;
      const cardCY = m.cardT + m.cardH / 2;
      const t = pose.place;
      const tx = lerp(carryCX - cardCX, 0, t);
      const ty = lerp(carryCY - cardCY, 0, t) - Math.sin(Math.PI * t) * 30 * k;
      const scale = lerp(carryScale, 1, t) * (1 + pose.pop);
      card.style.transform = t === 1 && !pose.pop ? "" : `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;

      // Fists on the card's top corners
      const handW = 30 * k * 1.15;
      const left = cardCX + tx - (scale * m.cardW) / 2;
      const right = cardCX + tx + (scale * m.cardW) / 2;
      const handY = cardCY + ty - (scale * m.cardH) / 2 + 0.12 * scale * m.cardH;
      hands.forEach((h, i) => {
        h.style.width = `${handW}px`;
        h.style.height = `${handW * (34 / 30)}px`;
        h.style.opacity = pose.hands;
        h.style.transform =
          i === 0
            ? `translate3d(${left - handW * 0.55}px, ${handY}px, 0) scaleX(-1)`
            : `translate3d(${right - handW * 0.45}px, ${handY}px, 0)`;
      });
    };

    const start = () => {
      const m = measure();
      const stride = 2 * (THIGH + SHIN) * Math.sin(rad(HIP_SWING)) * m.k;
      const startX = -m.charW - 40;
      // Stop just left of the card's spot (at the left edge on narrow screens)
      const targetX = Math.max(8, m.cardL - m.charW * 0.8);
      const exitX = -m.charW - 60;
      const stepsIn = Math.max(2, Math.round((targetX - startX) / stride));
      const stepsOut = Math.max(2, Math.round((targetX - exitX) / stride));

      const tl = gsap.timeline({ onUpdate: render, onComplete: finish });
      tl.to(pose, { x: targetX, phase: stepsIn * Math.PI, duration: stepsIn * STEP_DUR, ease: "none" })
        .to(pose, { walk: 0, duration: 0.25, ease: "power1.out" }, ">-0.12")
        .addLabel("place", "+=0.1")
        // Up on tiptoe and push the card up into its spot
        .to(pose, { lift: 8 * m.k, duration: 0.3, ease: "power2.out" }, "place")
        .to(pose, { place: 1, duration: 1, ease: "power2.inOut" }, "place+=0.1")
        .set(pose, { lSh: -95, lEl: -25, rSh: -120, rEl: -15 }, "place+=0.5")
        .to(pose, { hands: 0, arms: 1, duration: 0.15 }, "place+=0.5")
        .to(pose, { pop: 0.035, duration: 0.12, ease: "power1.out" }, "place+=1.1")
        .to(pose, { pop: 0, duration: 0.4, ease: "back.out(3)" })
        .to(pose, { ...REST, lift: 0, duration: 0.45, ease: "power2.inOut" }, "<")
        .set(pose, { front: 1 })
        // "Here it is": open palm towards the card
        .to(pose, { rSh: -82, rEl: -22, head: 5, duration: 0.45, ease: "power2.out" }, "+=0.1")
        .to(pose, { head: 2, duration: 0.8 })
        // Wave hello
        .to(pose, { rSh: -38, rEl: -140, head: -4, duration: 0.4, ease: "power2.inOut" })
        .to(pose, { rEl: -112, duration: 0.2, repeat: 5, yoyo: true, ease: "sine.inOut" })
        .to(pose, { rSh: REST.rSh, rEl: REST.rEl, head: 0, duration: 0.4, ease: "power2.inOut" })
        // Turn round and walk off
        .to(pose, { facing: -1, duration: 0.25, ease: "power2.inOut" }, "+=0.15")
        .to(pose, { walk: 1, armSwing: 1, duration: 0.25 })
        .to(
          pose,
          { x: exitX, phase: `+=${stepsOut * Math.PI}`, duration: stepsOut * STEP_DUR, ease: "none" },
          "<",
        );
      timeline = tl;
    };

    const finish = () => {
      char.style.display = "none";
      hands.forEach((h) => (h.style.display = "none"));
      card.style.transform = "";
    };

    let timeline = null;
    render();

    const trigger = ScrollTrigger.create({
      trigger: stage,
      // When the card's spot is well into view (it sits low in the panel on phones)
      start: () => `top+=${measure().cardT} 65%`,
      end: "bottom top",
      onEnter: () => !timeline && start(),
      onEnterBack: () => !timeline && start(),
    });

    // Keep the waiting card off-stage when the layout changes
    const onResize = () => (!timeline || timeline.isActive()) && render();
    window.addEventListener("resize", onResize);

    return () => {
      trigger.kill();
      timeline?.kill();
      window.removeEventListener("resize", onResize);
      card.style.transform = "";
      char.style.display = "";
      hands.forEach((h) => (h.style.display = ""));
    };
  }, [cardRef]);

  const charClass = "pointer-events-none absolute left-0 top-0 origin-bottom will-change-transform";

  return (
    <>
      <div ref={charRef} aria-hidden="true" className={charClass}>
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="h-full w-full overflow-visible">
          <Arm side="left" armRef={r.armL} foreRef={r.foreL} />
          <Leg x={R_HIP_X} legRef={r.legR} shinRef={r.shinR} />
          <Leg x={L_HIP_X} legRef={r.legL} shinRef={r.shinL} />
          <path d="M74 210 L126 210 L126 250 Q100 256 74 250 Z" fill={C.pants} />
          <rect x="91" y="88" width="18" height="26" rx="6" fill={C.skinShade} />
          <path d="M70 216 L63 130 Q62 112 82 109 L118 109 Q138 112 137 130 L130 216 Z" fill={C.shirt} />
          <path d="M70 216 L63 130 Q62 116 72 112 L78 216 Z" fill={C.shirtShade} />
          <rect x="74" y="208" width="52" height="8" rx="2" fill={C.belt} />
          <path d="M86 106 L100 116 L93 128 L84 112 Z" fill={C.collar} />
          <path d="M114 106 L100 116 L107 128 L116 112 Z" fill={C.collar} />
          <path d="M95 114 L105 114 L103 124 L97 124 Z" fill={C.tieShade} />
          <path d="M97 124 L103 124 L109 190 L100 202 L91 190 Z" fill={C.tie} />
          <g ref={r.head}>
            <ellipse cx="80" cy="64" rx="7" ry="10" fill={C.skinShade} />
            <path d="M78 52 Q78 20 106 22 Q134 24 134 56 Q134 92 106 98 Q80 96 78 68 Z" fill={C.skin} />
            <path
              d="M74 66 Q66 26 98 16 Q128 8 138 34 Q140 48 134 56 Q130 40 114 38 Q118 46 112 50 Q100 40 88 46 Q84 54 82 66 Z"
              fill={C.hair}
            />
            <ellipse cx="104" cy="62" rx="3" ry="4.2" fill={C.ink} />
            <ellipse cx="123" cy="62" rx="3" ry="4.2" fill={C.ink} />
            <path d="M98 52 Q104 49 109 52 M118 52 Q123 49 128 52" stroke={C.ink} strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M116 66 Q120 73 114 75" stroke="#c98b6c" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M102 80 Q114 94 126 79 Q114 84 102 80 Z" fill="#fff" stroke="#3b1d14" strokeWidth="2" strokeLinejoin="round" />
          </g>
          <Arm side="right" armRef={r.armR} foreRef={r.foreR} />
        </svg>
      </div>
      <div ref={handLRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-30">
        <Fist />
      </div>
      <div ref={handRRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-30">
        <Fist />
      </div>
    </>
  );
}
