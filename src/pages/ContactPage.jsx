import { useEffect, useState } from "react";
import {
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
  Printer,
  Mail,
  Copy,
  Check,
  Send,
  Navigation,
  Plane,
  User,
  MessageSquareText,
  CircleCheck,
} from "lucide-react";
import SmartLink from "../components/SmartLink";
import Reveal from "../components/Reveal";
import SocialLinks from "../components/SocialLinks";
import { unsplash } from "../lib/unsplash";
import { contactPage, about } from "../data/siteData";

const { banner, address, form } = contactPage;

const mapQuery = encodeURIComponent(address.query);
const mapEmbed = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

const channels = [
  {
    icon: MapPin,
    label: "Visit the Office",
    value: address.lines.join(", "),
    lines: address.lines,
    href: directionsUrl,
    external: true,
    action: "Get directions",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: contactPage.phone,
    href: contactPage.phoneHref,
    action: "Call now",
  },
  {
    icon: Mail,
    label: "Email",
    value: contactPage.email,
    href: `mailto:${contactPage.email}`,
    action: "Write to us",
  },
  {
    icon: Printer,
    label: "Fax",
    value: contactPage.fax,
    action: "Fax line",
  },
];

// Copies `text` and flips to a check mark for a moment
function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure origin / permissions) - nothing else to do
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      title={copied ? "Copied!" : "Copy"}
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 transition duration-300 ${
        copied
          ? "bg-brand-500 text-navy-950 ring-brand-500"
          : "bg-white text-slate-500 ring-slate-200 hover:text-brand-600 hover:ring-brand-400 dark:bg-navy-900 dark:text-slate-400 dark:ring-white/10 dark:hover:text-brand-400 dark:hover:ring-brand-400"
      }`}
    >
      <Copy
        className={`absolute h-4 w-4 transition duration-300 ${copied ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
      />
      <Check
        strokeWidth={3}
        className={`absolute h-4 w-4 transition duration-300 ${copied ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
      />
    </button>
  );
}

function ChannelCard({ channel, index }) {
  const Icon = channel.icon;
  const Body = channel.href ? "a" : "div";
  const linkProps = channel.href
    ? { href: channel.href, ...(channel.external && { target: "_blank", rel: "noopener noreferrer" }) }
    : {};

  return (
    <Reveal delay={index * 110} className="h-full">
      <div className="group relative h-full rounded-3xl p-px">
        <div className="absolute inset-0 rounded-3xl bg-slate-200/80 dark:bg-white/10" />
        <div className="careers-gradient absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-400 via-teal-200 to-gold-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="careers-shine relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-white p-6 shadow-card transition duration-500 dark:bg-navy-800 group-hover:-translate-y-1 group-hover:shadow-panel">
          <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-brand-100/0 blur-2xl transition duration-500 group-hover:bg-brand-100/80 dark:group-hover:bg-brand-500/15" />

          <div className="relative flex items-start justify-between gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-brand-400 shadow-lg ring-white/10 transition duration-500 dark:bg-navy-950 dark:ring-1 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <CopyButton text={channel.value} label={channel.label.toLowerCase()} />
          </div>

          <p className="relative mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            {channel.label}
          </p>
          {channel.lines ? (
            <address className="relative mt-1.5 not-italic font-display text-lg font-extrabold leading-snug text-navy-900 dark:text-white">
              {channel.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          ) : (
            <p className="relative mt-1.5 break-all font-display text-xl font-extrabold text-navy-900 dark:text-white">
              {channel.value}
            </p>
          )}

          <div className="relative mt-auto pt-5">
            <Body
              {...linkProps}
              className={`inline-flex items-center gap-1.5 text-sm font-bold ${
                channel.href ? "text-brand-700 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-200" : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {channel.action}
              {channel.href && (
                <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              )}
            </Body>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// Text input / textarea with a label that floats up on focus or once filled
function Field({ id, label, icon: Icon, as = "input", error, ...props }) {
  const Tag = as;
  return (
    <div>
      <div className="group relative">
        <Tag
          id={id}
          name={id}
          placeholder=" "
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`peer block w-full rounded-2xl bg-surface px-4 pb-2.5 pl-11 pt-6 text-[15px] text-navy-900 outline-none ring-1 transition duration-300 placeholder:text-transparent focus:bg-white focus:shadow-[0_0_0_4px_rgba(20,184,166,0.15)] dark:bg-navy-950/60 dark:text-white dark:focus:bg-navy-950 ${
            as === "textarea" ? "min-h-[150px] resize-y" : ""
          } ${error ? "ring-rose-400 focus:ring-rose-500" : "ring-slate-200 hover:ring-slate-300 focus:ring-brand-500 dark:ring-white/10 dark:hover:ring-white/20 dark:focus:ring-brand-500"}`}
          {...props}
        />
        <Icon
          aria-hidden="true"
          className={`pointer-events-none absolute left-4 top-[1.15rem] h-4 w-4 transition-colors duration-300 peer-focus:text-brand-600 ${
            error ? "text-rose-500" : "text-slate-400 dark:text-slate-500"
          }`}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-11 top-1.5 origin-left text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-slate-400 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.1em] peer-focus:text-brand-700 dark:text-slate-400 dark:peer-focus:text-brand-400"
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="contact-shake mt-1.5 pl-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}

const emptyForm = { name: "", email: "", phone: "", topic: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10) errors.message = "A short note (10+ characters) helps us prepare.";
  return errors;
}

function ContactForm() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    const subject = `Website enquiry${values.topic ? ` - ${values.topic}` : ""} - ${values.name.trim()}`;
    const body = [
      values.message.trim(),
      "",
      "---",
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      values.phone.trim() && `Phone: ${values.phone.trim()}`,
      values.topic && `Topic: ${values.topic}`,
    ]
      .filter((line) => line !== false && line !== "")
      .join("\n");

    window.location.href = `mailto:${contactPage.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="contact-pop flex min-h-[460px] flex-col items-center justify-center text-center">
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-200 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/30">
          <span className="contact-ring absolute inset-0 rounded-full ring-2 ring-brand-400" />
          <CircleCheck className="h-10 w-10" strokeWidth={1.75} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-extrabold text-navy-900 dark:text-white">Your email is ready to send</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          We opened your email app with your message filled in - just press send. If nothing opened, write to{" "}
          <a href={`mailto:${contactPage.email}`} className="font-semibold text-brand-700 hover:underline dark:text-brand-400">
            {contactPage.email}
          </a>{" "}
          or call{" "}
          <a href={contactPage.phoneHref} className="font-semibold text-brand-700 hover:underline dark:text-brand-400">
            {contactPage.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(emptyForm);
            setSent(false);
          }}
          className="mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-navy-900 ring-1 ring-slate-200 transition hover:bg-surface hover:ring-brand-400 dark:text-white dark:ring-white/15 dark:hover:bg-white/5 dark:hover:ring-brand-400"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Full name" icon={User} value={values.name} onChange={update} error={errors.name} autoComplete="name" />
        <Field
          id="email"
          type="email"
          label="Email address"
          icon={Mail}
          value={values.email}
          onChange={update}
          error={errors.email}
          autoComplete="email"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="phone" type="tel" label="Phone (optional)" icon={Phone} value={values.phone} onChange={update} autoComplete="tel" />
        <div className="relative">
          <label htmlFor="topic" className="sr-only">
            I need help with
          </label>
          <select
            id="topic"
            name="topic"
            value={values.topic}
            onChange={update}
            className={`block h-full min-h-[3.5rem] w-full appearance-none rounded-2xl bg-surface px-4 pr-10 text-[15px] outline-none ring-1 ring-slate-200 transition duration-300 hover:ring-slate-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(20,184,166,0.15)] focus:ring-brand-500 dark:bg-navy-950/60 dark:ring-white/10 dark:hover:ring-white/20 dark:focus:bg-navy-950 dark:focus:ring-brand-500 ${
              values.topic ? "text-navy-900 dark:text-white" : "text-slate-400 dark:text-slate-500"
            }`}
          >
            <option value="" className="dark:bg-navy-900">I need help with…</option>
            {form.topics.map((t) => (
              <option key={t} value={t} className="text-navy-900 dark:bg-navy-900 dark:text-white">
                {t}
              </option>
            ))}
          </select>
          <ChevronRight
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400"
          />
        </div>
      </div>

      {/* Quick-pick chips mirror the dropdown */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Quick topic">
        {form.topics.slice(0, 4).map((t) => {
          const active = values.topic === t;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={active}
              onClick={() => setValues((v) => ({ ...v, topic: active ? "" : t }))}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition duration-300 ${
                active
                  ? "bg-navy-900 text-white shadow-md shadow-navy-900/20 dark:bg-white dark:text-navy-900 dark:shadow-black/30"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:-translate-y-0.5 hover:text-navy-900 hover:ring-brand-400 dark:bg-navy-950/60 dark:text-slate-300 dark:ring-white/10 dark:hover:text-white dark:hover:ring-brand-400"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <Field
        id="message"
        as="textarea"
        label="How can we help?"
        icon={MessageSquareText}
        value={values.message}
        onChange={update}
        error={errors.message}
        rows={5}
      />

      <div className="flex flex-col-reverse items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
        <p className="text-xs text-slate-400 dark:text-slate-500">Your details are only used to reply to your enquiry.</p>
        <button
          type="submit"
          className="careers-shine group relative inline-flex w-full items-center justify-between gap-2.5 overflow-hidden rounded-full bg-navy-900 py-2 pl-6 pr-2 text-sm font-bold text-white shadow-lg shadow-navy-900/25 transition hover:-translate-y-0.5 hover:bg-navy-800 dark:bg-white dark:text-navy-900 dark:shadow-black/30 dark:hover:bg-slate-200 sm:w-auto sm:justify-start"
        >
          Send message
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-navy-950 transition duration-300 group-hover:rotate-[-20deg] group-hover:scale-110">
            <Send className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5" />
          </span>
        </button>
      </div>
    </form>
  );
}

export default function ContactPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Contact | Rajiv Madan CPA";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      {/* ===== Banner ===== */}
      <section className="relative isolate overflow-hidden bg-navy-950">
        <img
          src={unsplash(banner.image, 1920)}
          alt=""
          className="careers-zoom absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/60" />
        <div className="bg-dot-grid-light mask-fade pointer-events-none absolute inset-0 -z-10" />
        <div className="careers-float pointer-events-none absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div
          className="careers-float pointer-events-none absolute -bottom-24 left-1/3 -z-10 h-64 w-64 rounded-full bg-gold-400/15 blur-3xl"
          style={{ animationDelay: "-3s" }}
        />

        <div className="container-x grid items-center gap-12 pb-32 pt-16 sm:pb-36 sm:pt-20 lg:grid-cols-[1.3fr_1fr] lg:pb-44 lg:pt-28">
          <div className="max-w-2xl">
            <nav
              aria-label="Breadcrumb"
              className="flex animate-slide-in-left items-center gap-1.5 text-xs font-semibold text-slate-400 motion-reduce:animate-none"
            >
              <SmartLink href="#home" className="transition hover:text-brand-400">
                Home
              </SmartLink>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-brand-400" aria-current="page">
                {banner.title}
              </span>
            </nav>
            <h1
              className="mt-5 animate-slide-in-left font-display text-[34px] font-extrabold leading-[1.05] tracking-tight text-white motion-reduce:animate-none sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "120ms" }}
            >
              {banner.heading}{" "}
              <span className="careers-gradient bg-gradient-to-r from-brand-400 via-teal-200 to-gold-400 bg-clip-text text-transparent">
                {banner.highlight}
              </span>
            </h1>
            <p
              className="mt-5 max-w-xl animate-slide-in-left text-[15px] leading-relaxed text-slate-300 motion-reduce:animate-none"
              style={{ animationDelay: "240ms" }}
            >
              {banner.text}
            </p>
            <div
              className="mt-8 flex animate-slide-in-left flex-wrap gap-3 motion-reduce:animate-none"
              style={{ animationDelay: "360ms" }}
            >
              <a
                href={contactPage.phoneHref}
                className="group inline-flex items-center gap-2.5 rounded-full bg-brand-500 py-2 pl-2 pr-5 text-sm font-bold text-navy-950 transition hover:bg-brand-400"
              >
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-navy-950 text-brand-400">
                  <span className="absolute inset-0 animate-ping rounded-full bg-navy-950/40 motion-reduce:animate-none" />
                  <Phone className="relative h-4 w-4" />
                </span>
                Call {contactPage.phone}
              </a>
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/10"
              >
                Send a message
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Floating glass card: animated map pin */}
          <div className="relative hidden h-72 lg:block">
            <div
              className="absolute right-4 top-0 w-72 animate-slide-in-right rounded-3xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-xl motion-reduce:animate-none"
              style={{ animationDelay: "300ms" }}
            >
              <div className="careers-float flex items-center gap-5">
                <span className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                  <span className="contact-ripple absolute inset-0 rounded-full bg-brand-400/30" />
                  <span
                    className="contact-ripple absolute inset-0 rounded-full bg-brand-400/30"
                    style={{ animationDelay: "1.2s" }}
                  />
                  <span className="contact-pin relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-navy-950 shadow-lg shadow-brand-500/40">
                    <MapPin className="h-6 w-6" />
                  </span>
                </span>
                <div>
                  <p className="font-display text-lg font-extrabold leading-tight text-white">Mississauga</p>
                  <p className="mt-1 text-xs text-slate-400">{address.lines[0]}</p>
                </div>
              </div>
            </div>
            <div
              className="absolute bottom-4 left-0 w-72 animate-slide-in-right rounded-3xl bg-white p-5 shadow-panel dark:bg-navy-800 dark:ring-1 dark:ring-white/10 motion-reduce:animate-none"
              style={{ animationDelay: "480ms" }}
            >
              <div className="careers-float flex items-center gap-4" style={{ animationDelay: "-2s" }}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-200 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/30">
                  <Plane className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-base font-extrabold text-navy-900 dark:text-white">Easy to reach</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{about.airport}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact channels (overlap the banner) ===== */}
      <section className="relative z-10 -mt-24 pb-16 lg:-mt-28 lg:pb-24">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel, i) => (
            <ChannelCard key={channel.label} channel={channel} index={i} />
          ))}
        </div>
      </section>

      {/* ===== Form + map ===== */}
      <section id="contact-form" className="relative overflow-hidden bg-surface py-16 dark:bg-navy-900 lg:py-24">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl dark:bg-brand-500/10" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />

        <div className="container-x relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <Reveal from="left">
            <div className="h-full rounded-3xl bg-white p-5 shadow-panel ring-1 ring-slate-200/70 dark:bg-navy-800 dark:ring-white/10 sm:rounded-[2rem] sm:p-10">
              <p className="eyebrow">{form.eyebrow}</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy-900 dark:text-white sm:text-4xl">
                {form.title}
              </h2>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{form.text}</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal from="right" delay={120} className="flex flex-col gap-6">
            <div className="group relative min-h-[300px] flex-1 overflow-hidden rounded-3xl bg-slate-200 shadow-panel ring-1 ring-slate-200/70 dark:bg-navy-800 dark:ring-white/10 sm:min-h-[360px] sm:rounded-[2rem]">
              <iframe
                title={`Map of ${address.query}`}
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[35%] transition duration-700 group-hover:grayscale-0 dark:hue-rotate-180 dark:invert-[0.92]"
              />
              {/* Address chip over the map */}
              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-center sm:justify-start">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto inline-flex items-center gap-3 rounded-2xl bg-navy-950/90 py-2.5 pl-2.5 pr-4 text-white shadow-xl ring-1 ring-white/10 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-navy-900"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-navy-950">
                    <Navigation className="h-4 w-4" />
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-bold">Get directions</span>
                    <span className="block text-[11px] text-slate-400">{address.lines.slice(0, 2).join(", ")}</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="careers-gradient relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-800 to-brand-700 p-6 dark:ring-1 dark:ring-white/10 sm:rounded-[2rem] sm:p-8">
              <div className="bg-dot-grid-light mask-fade pointer-events-none absolute inset-0" />
              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-200">Prefer to talk?</p>
                <a
                  href={contactPage.phoneHref}
                  className="mt-2 block font-display text-[26px] font-extrabold text-white sm:text-3xl transition hover:text-brand-400"
                >
                  {contactPage.phone}
                </a>
                <p className="mt-2 text-sm text-slate-300">Speak directly with Rajiv about your accounting and tax needs.</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <span className="text-xs font-semibold text-slate-400">Follow us</span>
                  <SocialLinks linkClassName="bg-white/10 text-slate-200 ring-1 ring-white/15 hover:-translate-y-0.5 hover:bg-brand-500 hover:text-navy-950 hover:ring-brand-400" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
