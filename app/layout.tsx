import type { Metadata } from "next";
import "./globals.css";
import { Italianno, Manrope } from "next/font/google";
const italianno = Italianno({ weight: "400", subsets: ["latin"], variable: "--font-italianno", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
export const metadata: Metadata = { title: "Verdant & Veil | Beauty, Considered", description: "A considered beauty experience. Explore salon rituals, thoughtful treatments and the Verdant & Veil studio." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${italianno.variable} ${manrope.variable}`}>{children}</body></html>; }
