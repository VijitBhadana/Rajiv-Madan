import { useEffect, useState } from "react";

const TYPE_MS = 90;
const DELETE_MS = 45;
const HOLD_FULL_MS = 1800;
const HOLD_EMPTY_MS = 400;

// Types each word, holds it, deletes it, then moves on to the next one (looping).
export default function Typewriter({ words, className = "" }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reduceMotion) return;
    const word = words[index % words.length];

    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (!deleting && text === word) delay = HOLD_FULL_MS;
    if (deleting && text === "") delay = HOLD_EMPTY_MS;

    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words, reduceMotion]);

  return (
    <span className="whitespace-nowrap">
      <span className={className}>{reduceMotion ? words[0] : text}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] rounded-full bg-brand-500 animate-caret"
      />
    </span>
  );
}
