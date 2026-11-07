"use client";
import { useEffect, useState } from "react";

type Props = { text: string; speed?: number; onDone?: () => void };

export default function Typewriter({ text, speed = 80, onDone }: Props) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, onDone]);

  return <span className="border-r-4 border-white pr-1">{shown}</span>;
}