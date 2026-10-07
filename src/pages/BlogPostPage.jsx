import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight, ArrowLeft, ArrowRight, Phone } from "lucide-react";
import SmartLink from "../components/SmartLink";
import Reveal from "../components/Reveal";
import { unsplash } from "../lib/unsplash";
import { blog, contact } from "../data/siteData";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blog.posts.find((p) => p.slug === slug);
  const others = blog.posts.filter((p) => p.slug !== slug);

  useEffect(() => {
    if (!post) return;
    const previous = document.title;
    document.title = `${post.title} | Rajiv Madan CPA`;
    return () => {
      document.title = previous;
    };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      {/* ===== Banner with the post photo ===== */}
      <section className="relative isolate overflow-hidden bg-navy-950">
        <img
          src={unsplash(post.image, 1920)}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full animate-[banner-zoom_18s_ease-out_both] object-cover motion-reduce:animate-none"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/60" />
        <div className="container-x py-16 sm:py-20 lg:py-28">
          <nav
            aria-label="Breadcrumb"
            className="flex animate-slide-in-left flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-400 motion-reduce:animate-none"
          >
            <SmartLink href="#home" className="transition hover:text-brand-400">
              Home
            </SmartLink>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link to="/blog" className="transition hover:text-brand-400">
              {blog.banner.title}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-brand-400" aria-current="page">
              {post.title}
            </span>
          </nav>
          <p
            className="mt-6 animate-slide-in-left text-[11px] font-bold uppercase tracking-[0.18em] text-brand-400 motion-reduce:animate-none"
            style={{ animationDelay: "100ms" }}
          >
            {post.category}
          </p>
          <h1
            className="mt-3 max-w-3xl animate-slide-in-left font-display text-[32px] font-extrabold leading-[1.08] tracking-tight text-white motion-reduce:animate-none sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "200ms" }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      <section className="bg-white py-12 dark:bg-navy-950 sm:py-14 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          {/* ===== Article ===== */}
          <Reveal as="article">
            <img
              src={unsplash(post.image, 1200)}
              alt={post.imageAlt}
              className="aspect-[16/9] w-full rounded-2xl object-cover shadow-panel sm:rounded-3xl"
            />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:mt-10 sm:text-[17px]">
              {post.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <Link
              to="/blog"
              className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-brand-700 dark:text-white dark:hover:text-brand-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>
          </Reveal>

          {/* ===== Sidebar ===== */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal from="right" className="rounded-3xl bg-navy-900 p-6 text-white shadow-panel dark:bg-navy-800 dark:ring-1 dark:ring-white/10 sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-400">Need help?</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight">Speak directly with Rajiv</h2>
              <p className="mt-2 text-sm text-slate-300">Free consultation for individuals and businesses across the GTA.</p>
              <a
                href={contact.phoneHref}
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-navy-950 transition hover:bg-brand-400"
              >
                <Phone className="h-4 w-4" />
                {contact.phone}
              </a>
            </Reveal>

            <Reveal from="right" delay={120} className="rounded-3xl bg-surface p-6 ring-1 ring-slate-200/70 dark:bg-navy-900 dark:ring-white/10">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">More posts</p>
              <ul className="mt-4 space-y-4">
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/blog/${p.slug}`} className="group flex items-center gap-4">
                      <img
                        src={unsplash(p.image, 200)}
                        alt=""
                        loading="lazy"
                        className="h-16 w-16 shrink-0 rounded-xl object-cover"
                      />
                      <span className="flex-1 font-display text-base font-bold leading-snug text-navy-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400">
                        {p.title}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-600" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
