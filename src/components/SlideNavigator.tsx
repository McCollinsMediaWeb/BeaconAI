"use client";

import { useState, useEffect } from "react";

const SLIDE_IDS = [
  "slide-00",
  "slide-01",
  "slide-02",
  "slide-03",
  "slide-04",
  "slide-05",
  "slide-06",
  "slide-07",
  "slide-08",
  "slide-09",
  "slide-10",
  "slide-12",
  "slide-13",
  "slide-14",
  "slide-15",
];

const SLIDE_TITLES = [
  "(00) Overview — The Whole Business, In View",
  "(01) The Problem — Most Leadership Teams",
  "(02) Ecosystem — One Operating System",
  "(03) C-Suite — The Whole Business At A Glance",
  "(04) Finance — Close Faster. See Cash Sooner",
  "(05) Sales & Customer — Every Lead Worked",
  "(06) Marketing — Spend Smarter. See What Returns",
  "(07) Operations & Supply Chain — Leaner Stock",
  "(08) People & HR — Hire Faster. Run Lighter",
  "(09) Admin, Legal & Compliance — Control Without Paperwork",
  "(10) Engagement — Top Down. Function By Function",
  "(12) Case Study 01 — Cleaning Superstore",
  "(13) Case Study 02 — Mint Event Rentals",
  "(14) Case Study 03 — Prowork Solutions",
  "(15) Where To Start — See The Business First",
];

export default function SlideNavigator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      SLIDE_IDS.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentIndex(idx);
            setIsLightMode(el.classList.contains("slide-light"));
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToSlide = (idx: number) => {
    if (idx < 0 || idx >= SLIDE_IDS.length) return;
    const target = document.getElementById(SLIDE_IDS[idx]);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setDrawerOpen(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goToSlide(currentIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToSlide(currentIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <>
      {/* Floating Control Pill */}
      <div
        style={{
          position: "fixed",
          bottom: "1.75rem",
          right: "2rem",
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.4rem 0.75rem",
          borderRadius: "9999px",
          backgroundColor: isLightMode ? "rgba(255, 255, 255, 0.9)" : "rgba(18, 19, 22, 0.9)",
          color: isLightMode ? "#0A0B0D" : "#FFFFFF",
          border: isLightMode ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Prev Slide Button */}
        <button
          onClick={() => goToSlide(currentIndex - 1)}
          disabled={currentIndex === 0}
          aria-label="Previous Slide"
          style={{
            padding: "0.3rem 0.5rem",
            color: currentIndex === 0 ? "#8E9199" : "inherit",
            cursor: currentIndex === 0 ? "default" : "pointer",
            fontWeight: 700,
          }}
        >
          ↑
        </button>

        {/* Slide Counter / Drawer Trigger */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          style={{
            fontSize: "0.8125rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            padding: "0.2rem 0.5rem",
            borderRadius: "6px",
            backgroundColor: isLightMode ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.08)",
          }}
        >
          <span style={{ color: "#FF5722" }}>{String(currentIndex + 1).padStart(2, "0")}</span> / {String(SLIDE_IDS.length).padStart(2, "0")} ☰
        </button>

        {/* Next Slide Button */}
        <button
          onClick={() => goToSlide(currentIndex + 1)}
          disabled={currentIndex === SLIDE_IDS.length - 1}
          aria-label="Next Slide"
          style={{
            padding: "0.3rem 0.5rem",
            color: currentIndex === SLIDE_IDS.length - 1 ? "#8E9199" : "inherit",
            cursor: currentIndex === SLIDE_IDS.length - 1 ? "default" : "pointer",
            fontWeight: 700,
          }}
        >
          ↓
        </button>
      </div>

      {/* Slide Overview Drawer */}
      {drawerOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "5rem",
            right: "2rem",
            width: "320px",
            maxHeight: "65vh",
            overflowY: "auto",
            backgroundColor: "#111215",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "16px",
            padding: "1rem",
            zIndex: 45,
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
            color: "#FFFFFF",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", color: "#FF5722", textTransform: "uppercase" }}>
              Table of Contents (15 Slides)
            </span>
            <button onClick={() => setDrawerOpen(false)} style={{ color: "#8E9199", fontSize: "1rem" }}>✕</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {SLIDE_TITLES.map((title, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                style={{
                  textAlign: "left",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "8px",
                  fontSize: "0.8125rem",
                  fontWeight: currentIndex === idx ? 700 : 500,
                  backgroundColor: currentIndex === idx ? "rgba(255, 87, 34, 0.2)" : "transparent",
                  color: currentIndex === idx ? "#FF6E40" : "#C5C8D0",
                  transition: "background-color 0.15s ease",
                  display: "block",
                  width: "100%",
                }}
              >
                {title}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
