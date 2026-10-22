"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Slide03CSuite() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade in left elements
      gsap.fromTo(
        ".csuite-fade",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Animate dashboard mock window
      gsap.fromTo(
        ".csuite-dashboard-mock",
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".csuite-dashboard-mock",
            start: "top 80%",
          },
        }
      );

      // Animate progress bars
      if (barsRef.current) {
        const bars = barsRef.current.querySelectorAll(".metric-progress-bar");
        bars.forEach((bar) => {
          const targetWidth = bar.getAttribute("data-width") || "50%";
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: targetWidth,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 85%",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-03"
      ref={sectionRef}
      className="slide-section slide-light"
      style={{
        backgroundColor: "#F3F2EE",
        color: "#0A0B0D",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="slide-content-wrap" style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/* Slide Tag */}
        <div className="csuite-fade slide-tag">
          <span className="tag-num">(03)</span>
          <span className="tag-text">DEEP DIVE &nbsp; C-SUITE COMMAND CENTRE</span>
        </div>

        {/* Heading */}
        <h2
          className="csuite-fade slide-heading"
          style={{
            fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}
        >
          C-SUITE<br />
          <span className="serif-italic" style={{ textTransform: "none", fontWeight: 400, color: "#18191E" }}>
            The whole business, at a glance.
          </span>
        </h2>

        {/* Split: Left Context & Cards, Right Dashboard Interface */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
          className="csuite-main-grid"
        >
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* WHERE IT BREAKS TODAY */}
            <div className="csuite-fade">
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#FF5722",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                WHERE IT BREAKS TODAY
              </span>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  "Management reports arrive weeks after month-end",
                  "Each department reports its own version of the numbers",
                  "Leaders spend hours chasing updates instead of deciding",
                ].map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.9375rem", color: "#4A4D55" }}>
                    <span style={{ color: "#FF5722", fontSize: "1.2rem", lineHeight: 1 }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WHAT WE BUILD */}
            <div className="csuite-fade">
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#71717A",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                WHAT WE BUILD
              </span>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {[
                  { title: "COMMAND DASHBOARD", desc: "Revenue, margin, cash, pipeline and operations health, live." },
                  { title: "DAILY LEADERSHIP BRIEF", desc: "What changed, what is at risk, what needs a decision." },
                  { title: "ASK YOUR DATA", desc: "Plain-language questions in English or Arabic, answered from company data." },
                  { title: "BOARD PACK AUTOMATION", desc: "Monthly management and board reports built automatically." },
                ].map((card, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      padding: "1.25rem 1rem",
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    <h4 style={{ fontSize: "0.8125rem", fontWeight: 800, letterSpacing: "0.04em", marginBottom: "0.35rem" }}>
                      {card.title}
                    </h4>
                    <p style={{ fontSize: "0.8125rem", color: "#6E717A", lineHeight: 1.4 }}>
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* KPIS WE MOVE */}
            <div className="csuite-fade">
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#FF5722",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "0.35rem",
                }}
              >
                KPIS WE MOVE
              </span>
              <p style={{ fontSize: "0.875rem", color: "#4A4D55", fontWeight: 500 }}>
                Reporting hours, decision speed, forecast accuracy, time to spot issues
              </p>
            </div>
          </div>

          {/* Right Column: Illustrative Interface Mock */}
          <div
            className="csuite-dashboard-mock"
            style={{
              backgroundColor: "#0C0D0E",
              color: "#FFFFFF",
              borderRadius: "16px",
              padding: "1.5rem",
              boxShadow: "0 20px 45px rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Window Top Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "1rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                marginBottom: "1.25rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#FF5F56" }}></span>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#FFBD2E" }}></span>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#27C93F" }}></span>
              </div>
              <span style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#8E9199", textTransform: "uppercase", fontWeight: 600 }}>
                BEACON COMMAND CENTRE &nbsp;|&nbsp; ILLUSTRATIVE INTERFACE
              </span>
            </div>

            {/* 4 Metrics Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(115px, 1fr))",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              {/* REVENUE MTD */}
              <div style={{ backgroundColor: "#15161A", padding: "0.85rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: "0.65rem", color: "#8E9199", display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  REVENUE MTD
                </span>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, margin: "0.2rem 0" }}>AED 4.82M</div>
                <span style={{ fontSize: "0.6875rem", color: "#10B981", fontWeight: 600 }}>+6.4% vs target</span>
                {/* Mini sparkline */}
                <svg viewBox="0 0 80 16" style={{ width: "100%", height: "14px", marginTop: "0.25rem" }}>
                  <path d="M 0 12 Q 20 8, 40 10 T 80 2" fill="none" stroke="#10B981" strokeWidth="1.5" />
                </svg>
              </div>

              {/* GROSS MARGIN */}
              <div style={{ backgroundColor: "#15161A", padding: "0.85rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: "0.65rem", color: "#8E9199", display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  GROSS MARGIN
                </span>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, margin: "0.2rem 0" }}>31.2%</div>
                <span style={{ fontSize: "0.6875rem", color: "#EF4444", fontWeight: 600 }}>-0.8 pts WoW</span>
                <svg viewBox="0 0 80 16" style={{ width: "100%", height: "14px", marginTop: "0.25rem" }}>
                  <path d="M 0 4 Q 25 2, 50 8 T 80 14" fill="none" stroke="#EF4444" strokeWidth="1.5" />
                </svg>
              </div>

              {/* CASH POSITION */}
              <div style={{ backgroundColor: "#15161A", padding: "0.85rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: "0.65rem", color: "#8E9199", display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  CASH POSITION
                </span>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, margin: "0.2rem 0" }}>AED 2.14M</div>
                <span style={{ fontSize: "0.6875rem", color: "#10B981", fontWeight: 600 }}>+AED 180K this week</span>
                <svg viewBox="0 0 80 16" style={{ width: "100%", height: "14px", marginTop: "0.25rem" }}>
                  <path d="M 0 14 Q 25 10, 50 6 T 80 3" fill="none" stroke="#10B981" strokeWidth="1.5" />
                </svg>
              </div>

              {/* OPEN PIPELINE */}
              <div style={{ backgroundColor: "#15161A", padding: "0.85rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: "0.65rem", color: "#8E9199", display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  OPEN PIPELINE
                </span>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, margin: "0.2rem 0" }}>AED 11.6M</div>
                <span style={{ fontSize: "0.6875rem", color: "#10B981", fontWeight: 600 }}>+9 deals this week</span>
                <svg viewBox="0 0 80 16" style={{ width: "100%", height: "14px", marginTop: "0.25rem" }}>
                  <path d="M 0 15 Q 30 11, 55 5 T 80 2" fill="none" stroke="#10B981" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Middle Section: Progress Bars & Today's Brief */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1fr",
                gap: "1rem",
                marginBottom: "1.25rem",
              }}
              className="csuite-mock-mid"
            >
              {/* REVENUE VS TARGET BY FUNCTION */}
              <div ref={barsRef} style={{ backgroundColor: "#15161A", padding: "1rem", borderRadius: "10px" }}>
                <span style={{ fontSize: "0.6875rem", color: "#8E9199", display: "block", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
                  REVENUE VS TARGET, BY FUNCTION
                </span>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {[
                    { label: "Retail", width: "78%", color: "#10B981" },
                    { label: "B2B", width: "95%", color: "#10B981" },
                    { label: "Online", width: "65%", color: "#E0E3EC" },
                    { label: "Projects", width: "45%", color: "#FF5722" },
                  ].map((bar, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.2rem", color: "#C5C8D0" }}>
                        <span>{bar.label}</span>
                      </div>
                      <div style={{ width: "100%", height: "7px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
                        <div
                          className="metric-progress-bar"
                          data-width={bar.width}
                          style={{
                            height: "100%",
                            width: "0%",
                            backgroundColor: bar.color,
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TODAY'S BRIEF */}
              <div style={{ backgroundColor: "#15161A", padding: "1rem", borderRadius: "10px" }}>
                <span style={{ fontSize: "0.6875rem", color: "#8E9199", display: "block", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
                  TODAY&apos;S BRIEF
                </span>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                  {[
                    "Margin on Category B down 3.1 pts after supplier price change",
                    "3 invoices over 90 days, AED 186K outstanding",
                    "Stock-out risk on 12 SKUs in Warehouse 2 within 10 days",
                  ].map((brief, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.75rem", color: "#C5C8D0", lineHeight: 1.35 }}>
                      <span style={{ color: "#EF4444", fontSize: "1.1rem", lineHeight: 1 }}>•</span>
                      <span>{brief}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row of 4 Metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0.5rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                textAlign: "center",
              }}
            >
              <div>
                <span style={{ fontSize: "0.65rem", color: "#8E9199", display: "block" }}>DSO</span>
                <span style={{ fontSize: "1rem", fontWeight: 800 }}>52 days</span>
              </div>
              <div>
                <span style={{ fontSize: "0.65rem", color: "#8E9199", display: "block" }}>STOCK HEALTH</span>
                <span style={{ fontSize: "1rem", fontWeight: 800 }}>94%</span>
              </div>
              <div>
                <span style={{ fontSize: "0.65rem", color: "#8E9199", display: "block" }}>HEADCOUNT COST</span>
                <span style={{ fontSize: "1rem", fontWeight: 800 }}>AED 1.31M</span>
              </div>
              <div>
                <span style={{ fontSize: "0.65rem", color: "#8E9199", display: "block" }}>ON-TIME DELIVERY</span>
                <span style={{ fontSize: "1rem", fontWeight: 800 }}>96.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="slide-content-wrap" style={{ flex: "0 0 auto" }}>
        <div className="slide-footer">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Image
              src="/logo.png"
              alt="Beacon AI"
              width={110}
              height={26}
              className="logo-invert"
              style={{ objectFit: "contain" }}
            />
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#8E9199" }}>
            04
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .csuite-main-grid {
            grid-template-columns: 1fr 1.25fr !important;
          }
        }
        @media (max-width: 640px) {
          .csuite-mock-mid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
