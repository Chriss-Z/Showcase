"use client";
import Typewriter from "./components/Typewriter";
import { projects } from "./data/projects";
import { useState, useCallback, useEffect } from "react";

const links = [
  { label: "About Me", href: "#about" },
  { label: "Project", href: "#projects" },
  { label: "Contact Me", href: "#contact" },
];

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Git & GitHub",
];

const contacts = [
  { label: "Email", value: "email@kamu.com", href: "mailto:email@kamu.com" },
  {
    label: "GitHub",
    value: "github.com/username",
    href: "https://github.com/",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/username",
    href: "https://linkedin.com/",
  },
];

export default function Home() {
  const [done, setDone] = useState(false);
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDone = useCallback(
    () => setTimeout(() => setDone(true), 500),
    [],
  );

  // Scroll to About once the intro typing has finished
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(t);
  }, [done]);

  // Highlight (underline) the link of the section currently in view
  useEffect(() => {
    if (!done) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [done]);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setActive(href.slice(1));
    document.getElementById(href.slice(1))?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="bg-[#0f0f14] text-gray-100">
      {/* Navbar: white rounded pill */}
      {done && (
        <header className="fade-in fixed inset-x-0 top-0 z-20 px-4 pt-4">
          <nav
            aria-label="Main"
            className="mx-auto max-w-5xl rounded-3xl bg-white px-6 py-3 text-gray-900 shadow-lg shadow-black/30 sm:rounded-full sm:px-8"
          >
            <div className="flex items-center justify-between">
              <a
                href="#about"
                onClick={(e) => goTo(e, "#about")}
                className="text-lg font-semibold"
              >
                Chriss
              </a>

              {/* Desktop links */}
              <ul className="hidden items-center gap-5 sm:flex">
                {links.map((l) => {
                  const isActive = active === l.href.slice(1);
                  return (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={(e) => goTo(e, l.href)}
                        aria-current={isActive ? "page" : undefined}
                        className={`underline-offset-4 transition hover:text-indigo-600 ${
                          isActive ? "underline" : ""
                        }`}
                      >
                        {l.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile toggle */}
              <button
                type="button"
                className="rounded-md p-1 sm:hidden"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  {menuOpen ? (
                    <path d="M6 6l12 12M18 6L6 18" />
                  ) : (
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile links */}
            {menuOpen && (
              <ul className="mt-3 flex flex-col gap-3 border-t border-gray-200 pt-3 sm:hidden">
                {links.map((l) => {
                  const isActive = active === l.href.slice(1);
                  return (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={(e) => goTo(e, l.href)}
                        className={`underline-offset-4 ${
                          isActive ? "underline" : ""
                        }`}
                      >
                        {l.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>
        </header>
      )}

      {/* Intro */}
      <section
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center">
          <h1 className="px-6 text-4xl font-bold text-white md:text-6xl">
            <Typewriter text="Hi, I'm Chriss ......." onDone={handleDone} />
          </h1>
        </div>
      </section>

      {/* Content */}
      {done && (
        <div className="fade-in mx-auto max-w-5xl px-6">
          {/* About */}
          <section id="about" className="min-h-screen pt-32">
            <h2 className="mb-6 text-3xl font-bold">About Me</h2>
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
              <div className="max-w-xl space-y-4 text-gray-300">
                <p>
                  I&apos;m Chriss, a web developer who builds clean, fast and
                  accessible websites. Write a short introduction here: where
                  you are from, what you study or do, and what kind of work you
                  enjoy.
                </p>
                <p>
                  Add one or two sentences about what you are currently learning
                  or looking for, such as an internship, a junior role, or
                  freelance projects.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold">Skills</h3>
                <ul className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-full bg-[#2a2a36] px-3 py-1 text-sm"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="min-h-screen pt-28">
            <h2 className="mb-6 text-3xl font-bold">Project</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <article
                  key={p.title}
                  className="flex flex-col rounded-xl bg-[#1a1a22] p-5 transition hover:-translate-y-1"
                >
                  <h3 className="mb-2 text-xl font-semibold">{p.title}</h3>
                  <p className="mb-3 text-sm text-gray-400">{p.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-[#2a2a36] px-3 py-1 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto text-sm text-indigo-400 hover:underline"
                    >
                      View project →
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="min-h-[70vh] pt-28 pb-20">
            <h2 className="mb-4 text-3xl font-bold">Contact Me</h2>
            <p className="mb-8 max-w-xl text-gray-300">
              Interested in working together or have a question? Send me a
              message and I&apos;ll reply as soon as I can.
            </p>

            <a
              href="mailto:email@kamu.com"
              className="inline-block rounded-full bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-indigo-100"
            >
              Send an email
            </a>

            <ul className="mt-10 max-w-md divide-y divide-white/10">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-3 text-gray-300 transition hover:text-indigo-400"
                  >
                    <span className="font-medium text-gray-100">{c.label}</span>
                    <span className="text-sm">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <footer className="border-t border-white/10 py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} Chriss. All rights reserved.
          </footer>
        </div>
      )}
    </main>
  );
}
