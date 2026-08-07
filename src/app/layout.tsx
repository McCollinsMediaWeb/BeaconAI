import type { Metadata } from "next";
import { Inter, Playfair_Display, Manrope, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope-local",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const helveticaNeue = localFont({
  src: [
    { path: "../../public/fonts/HelveticaNeueUltraLight.otf", weight: "100", style: "normal" },
    { path: "../../public/fonts/HelveticaNeueUltraLightItalic.otf", weight: "100", style: "italic" },

    { path: "../../public/fonts/HelveticaNeueThin.otf", weight: "200", style: "normal" },
    { path: "../../public/fonts/HelveticaNeueThinItalic.otf", weight: "200", style: "italic" },

    { path: "../../public/fonts/HelveticaNeueLight.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/HelveticaNeueLightItalic.otf", weight: "300", style: "italic" },

    { path: "../../public/fonts/HelveticaNeueRoman.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/HelveticaNeueItalic.ttf", weight: "400", style: "italic" },

    { path: "../../public/fonts/HelveticaNeueMedium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/HelveticaNeueMediumItalic.otf", weight: "500", style: "italic" },

    { path: "../../public/fonts/HelveticaNeueBold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/HelveticaNeueBoldItalic.otf", weight: "700", style: "italic" },

    { path: "../../public/fonts/HelveticaNeueHeavy.otf", weight: "800", style: "normal" },
    { path: "../../public/fonts/HelveticaNeueHeavyItalic.otf", weight: "800", style: "italic" },

    { path: "../../public/fonts/HelveticaNeueBlack.otf", weight: "900", style: "normal" },
    { path: "../../public/fonts/HelveticaNeueBlackItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-helvetica-neue",
});

export const metadata: Metadata = {
  title: "Beacon AI — Audit, Automate, Optimize",
  description: "Beacon turns AI from pilot theatre into measurable operating leverage built around return.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${manrope.variable} ${helveticaNeue.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
