import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beacon AI Business Audit | 3 Weeks · Fixed Fee · UAE",
  description:
    "A three-week, fixed-fee AI business audit for UAE companies. Know where AI will save money and time before you commit to a build.",
  icons: {
    icon: [
      { url: "/assets/favicon.png" },
      { url: "/icon.png" },
    ],
    shortcut: "/assets/favicon.png",
    apple: "/assets/favicon.png",
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
