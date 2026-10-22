"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

interface NavbarProps {
  onOpenAudit: () => void;
}

const NAV_ITEMS = [
  { label: "(00) Overview", href: "#slide-00" },
  { label: "(01) The Problem", href: "#slide-01" },
  { label: "(02) Ecosystem", href: "#slide-02" },
  { label: "(03) C-Suite", href: "#slide-03" },
  { label: "Deep Dives", href: "#slide-04" },
  { label: "(10) Engagement", href: "#slide-10" },
  { label: "Case Studies", href: "#slide-12" },
  { label: "(15) Start", href: "#slide-15" },
];

export default function Navbar({ onOpenAudit }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("slide-00");
  const [isLightMode, setIsLightMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id^='slide-']");
      const scrollPos = window.scrollY + 200;

      sections.forEach((sec) => {
        const top = (sec as HTMLElement).offsetTop;
        const height = (sec as HTMLElement).offsetHeight;
        const id = sec.getAttribute("id") || "";

        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id);
          setIsLightMode(sec.classList.contains("slide-light"));
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(12px)",
        backgroundColor: isLightMode ? "rgba(243, 242, 238, 0.85)" : "rgba(10, 11, 13, 0.85)",
        borderBottom: isLightMode ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
        transition: "background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease",
        color: isLightMode ? "#0A0B0D" : "#FFFFFF",
      }}
    >
      {/* Brand Logo */}
      <Link href="#slide-00" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Image
          src="/logo.png"
          alt="Beacon AI Logo"
          width={130}
          height={32}
          priority
          style={{
            objectFit: "contain",
            filter: isLightMode ? "brightness(0)" : "none",
            transition: "filter 0.4s ease",
          }}
        />
      </Link>

      {/* Center Slide Jump Pills - Desktop */}
      <div
        style={{
          display: "none",
          alignItems: "center",
          gap: "0.35rem",
          padding: "0.25rem 0.5rem",
          borderRadius: "9999px",
          backgroundColor: isLightMode ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.06)",
          border: isLightMode ? "1px solid rgba(0, 0, 0, 0.06)" : "1px solid rgba(255, 255, 255, 0.08)",
        }}
        className="nav-desktop-links"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => scrollTo(e, item.href)}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              transition: "all 0.2s ease",
              color: isLightMode
                ? activeSection === item.href.replace("#", "")
                  ? "#FF5722"
                  : "#4A4D55"
                : activeSection === item.href.replace("#", "")
                ? "#FF6E40"
                : "#A0A4B0",
              backgroundColor:
                activeSection === item.href.replace("#", "")
                  ? isLightMode
                    ? "rgba(255, 87, 34, 0.1)"
                    : "rgba(255, 87, 34, 0.2)"
                  : "transparent",
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Right Action */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={onOpenAudit}
          style={{
            padding: "0.5rem 1.25rem",
            backgroundColor: "#FF5722",
            color: "#FFFFFF",
            fontSize: "0.8125rem",
            fontWeight: 700,
            borderRadius: "9999px",
            border: "none",
            boxShadow: "0 2px 10px rgba(255, 87, 34, 0.35)",
            cursor: "pointer",
            transition: "transform 0.2s ease, opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Book an Audit
        </button>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile-toggle"
          aria-label="Toggle navigation menu"
          style={{
            display: "block",
            fontSize: "1.25rem",
            color: isLightMode ? "#0A0B0D" : "#FFFFFF",
            padding: "0.25rem",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: isLightMode ? "#F3F2EE" : "#0A0B0D",
            borderBottom: "1px solid rgba(128, 128, 128, 0.2)",
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: activeSection === item.href.replace("#", "") ? "#FF5722" : "inherit",
                padding: "0.4rem 0",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (min-width: 900px) {
          .nav-desktop-links {
            display: flex !important;
          }
          .nav-mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
