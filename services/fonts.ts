import { Oswald, Roboto } from "next/font/google";

export const headlineFont = Oswald({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-headline",
});

export const bodyFont = Roboto({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300"],
});
