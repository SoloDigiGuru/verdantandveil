"use client";
import { useState } from "react";

type Props = { src: string; fallback: string; alt: string; className?: string; loading?: "eager" | "lazy" };

/** Prefer a named local image if the user adds it to public/images. If it is not there yet, use the included online demo fallback. */
export default function FallbackImage({ src, fallback, alt, className, loading = "lazy" }: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);
  return <img className={className} src={currentSrc} alt={alt} loading={loading} onError={() => { if (currentSrc !== fallback) setCurrentSrc(fallback); }} />;
}
