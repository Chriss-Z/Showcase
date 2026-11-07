"use client";
import { useState, useCallback } from "react";
import Typewriter from "./components/Typewriter";
import { projects } from "./data/projects";

const links = [
  { label: "About Me", href: "#about" },
  { label: "Project", href: "#projects" },
  { label: "Contact Me", href: "#contact" },
];

export default function Home() {
  const [done, setDone] = useState(false);

  const handleDone = useCallback(
    () => setTimeout(() => setDone(true), 500),
    [],
  );

  return (
    <main className="bg-[#0f0f14] text-gray-100">
      {/* Navbar */}
      {done && (
        <header className="fade-in fixed top-0 z-10 w-full bg-[#0f0f14]/80 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <span className="font-semibold">Chriss</span>
            <ul className="flex gap-6">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition hover:text-indigo-400">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      )}

      {/* Intro */}
     <section 
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpeg')" }}
      >
        {/* Overlay gelap */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Teks langsung muncul tanpa tombol */}
        <div className="relative z-10 text-center">
          <h1 className="px-6 text-4xl font-bold md:text-6xl text-white">
            <Typewriter text="Hi, I'm Chriss ......." onDone={handleDone} />
          </h1>
        </div>
      </section>

      {/* Konten */}
      {done && (
        <div className="fade-in mx-auto max-w-5xl px-6">
          <section id="about" className="min-h-screen pt-28">
            <h2 className="mb-4 text-3xl font-bold">About Me</h2>
            <p className="max-w-2xl text-gray-300">
              Ceritakan tentang dirimu di sini.
            </p>
          </section>

          <section id="projects" className="min-h-screen pt-28">
            <h2 className="mb-6 text-3xl font-bold">Project</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <article
                  key={p.title}
                  className="rounded-xl bg-[#1a1a22] p-5 transition hover:-translate-y-1"
                >
                  <h3 className="mb-2 text-xl font-semibold">{p.title}</h3>
                  <p className="mb-3 text-sm text-gray-400">{p.description}</p>
                  <div className="mb-3 flex flex-wrap gap-2">
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
                      className="text-sm text-indigo-400 hover:underline"
                    >
                      Lihat project →
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="min-h-[60vh] pt-28 pb-20">
            <h2 className="mb-4 text-3xl font-bold">Contact Me</h2>
            <p className="text-gray-300">email@kamu.com</p>
          </section>
        </div>
      )}
    </main>
  );
}
