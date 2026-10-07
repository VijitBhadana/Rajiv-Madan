import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, ArrowUpRight } from "lucide-react";
import SmartLink from "../components/SmartLink";
import Reveal from "../components/Reveal";
import CallToAction from "../components/CallToAction";
import { unsplash } from "../lib/unsplash";
import { blog } from "../data/siteData";

export default function BlogPage() {
  const [featured, ...rest] = blog.posts;

  useEffect(() => {
    const previous = document.title;
    document.title = "Blog & Updates | Rajiv Madan CPA";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      {/* ===== Banner ===== */}
      <section className="relative isolate overflow-hidden bg-navy-950">
        <img
          src={unsplash(blog.banner.image, 1920)}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full animate-[banner-zoom_18s_ease-out_both] object-cover motion-reduce:animate-none"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/85 via-navy-950/80 to-navy-950" />
        <div className="container-x py-16 text-center sm:py-20 lg:py-24">
          <nav
            aria-label="Breadcrumb"
            className="flex animate-slide-in-left items-center justify-center gap-1.5 text-xs font-semibold text-slate-400 motion-reduce:animate-none"
          >
            <SmartLink href="#home" className="transition hover:text-brand-400">
              Home
            </SmartLink>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-brand-400" aria-current="page">
              {blog.banner.title}
            </span>
          </nav>
          <h1
            className="mt-4 animate-slide-in-left font-display text-[34px] font-extrabold tracking-tight text-white motion-reduce:animate-none sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            {blog.banner.title}
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl animate-slide-in-left text-[15px] leading-relaxed text-slate-300 motion-reduce:animate-none"
            style={{ animationDelay: "240ms" }}
          >
            {blog.banner.text}
          </p>
        </div>
      </section>

      <section className="bg-surface py-12 dark:bg-navy-900 sm:py-16 lg:py-20">
        <div className="container-x">
          {/* ===== Featured post ===== */}
          <Reveal>
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-slate-200/70 transition duration-300 hover:shadow-panel dark:bg-navy-800 dark:ring-white/10 lg:grid-cols-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={unsplash(featured.image, 1000)}
                  alt={featured.imageAlt}
                  className="aspect-[16/10] h-full w-full object-cover transition duration-700 group-hover:scale-105 lg:aspect-auto"
                />
                <span className="absolute left-5 top-5 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-950">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">{featured.category}</p>
                <h2 className="mt-3 font-display text-[26px] font-extrabold leading-tight tracking-tight text-navy-900 transition group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400 sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{featured.excerpt}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-navy-900 dark:text-white">
                  Read more
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-white transition group-hover:translate-x-1 group-hover:bg-brand-600 dark:bg-white dark:text-navy-900 dark:group-hover:bg-brand-500">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>

          {/* ===== Other posts ===== */}
          <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 md:grid-cols-2">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 120} className="h-full">
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1.5 dark:bg-navy-800 dark:ring-white/10 hover:shadow-panel"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={unsplash(post.image, 800)}
                      alt={post.imageAlt}
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-900 backdrop-blur">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-navy-900 transition group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400">
                      {post.title}
                    </h2>
                    <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 dark:text-brand-400">
                      Read more
                      <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
