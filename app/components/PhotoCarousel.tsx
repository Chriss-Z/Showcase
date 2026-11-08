"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
  duration?: number; // ms
};

export default function PhotoCarousel({ images, alt, duration = 4000 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const count = images.length;

  useEffect(() => {
    if (count < 2 || paused || open) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const id = setTimeout(() => setIndex((i) => (i + 1) % count), duration);
    return () => clearTimeout(id);
  }, [index, paused, open, count, duration]);

  const go = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, go]);

  if (count === 0) {
    return (
      <div className="aspect-[16/10] w-full shrink-0 bg-[#2a2a36]">
        <div
          className="flex h-full w-full items-center justify-center text-gray-500"
          role="img"
          aria-label="Tempat foto"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="2" />
            <path d="M21 16l-5-5-8 8" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ===== Carousel di kartu ===== */}
      <div
        className="group relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#2a2a36]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label={`Foto ${alt}`}
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${alt} - foto ${i + 1}`}
            fill
            quality={90}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            aria-hidden={i !== index}
            className={`object-cover object-center transition-opacity duration-700 motion-reduce:transition-none ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Perbesar foto ${alt}`}
          className="absolute inset-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Foto sebelumnya"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2.5 py-1 text-white opacity-0 transition hover:bg-black/70 focus:opacity-100 group-hover:opacity-100"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Foto berikutnya"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2.5 py-1 text-white opacity-0 transition hover:bg-black/70 focus:opacity-100 group-hover:opacity-100"
            >
              ›
            </button>

            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Lihat foto ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ===== Lightbox (dirender ke body supaya tidak terpotong kartu) ===== */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ${alt}`}
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup"
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1.5 text-xl text-white transition hover:bg-white/20"
            >
              ✕
            </button>

            <div
              className="relative h-[85vh] w-[92vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[index]}
                alt={`${alt} - foto ${index + 1}`}
                fill
                quality={90}
                sizes="92vw"
                className="object-contain"
              />
            </div>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(index - 1);
                  }}
                  aria-label="Foto sebelumnya"
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 px-4 py-2 text-2xl text-white transition hover:bg-white/20"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(index + 1);
                  }}
                  aria-label="Foto berikutnya"
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 px-4 py-2 text-2xl text-white transition hover:bg-white/20"
                >
                  ›
                </button>
                <div
                  className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/70"
                  aria-live="polite"
                >
                  {index + 1} / {count}
                </div>
              </>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
