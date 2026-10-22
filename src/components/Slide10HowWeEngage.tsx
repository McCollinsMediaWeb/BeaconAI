"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Slide10HowWeEngage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        ".engage-fade",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // 3 cards staggered entrance
      gsap.fromTo(
        ".engage-card",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".engage-cards-row",
            start: "top 80%",
          },
        }
      );

      // Animate bottom timeline dashed line expansion
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { width: "0%" },
          {
            width: "100%",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineLineRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-10"
      ref={sectionRef}
      className="slide-section slide-dark"
      style={{
        backgroundColor: "#0C0D0E",
        color: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="slide-content-wrap" style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/* Slide Tag */}
        <div className="engage-fade slide-tag">
          <span className="tag-num">(10)</span>
          <span className="tag-text">HOW WE ENGAGE</span>
        </div>

        {/* Heading */}
        <h2
          className="engage-fade slide-heading"
          style={{
            fontSize: "clamp(2.4rem, 5.2vw, 4.4rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            marginBottom: "3rem",
          }}
        >
          TOP DOWN.<br />
          <span className="serif-italic" style={{ textTransform: "none", fontWeight: 400, color: "#E0E3EC" }}>
            Function by function.
          </span>
        </h2>

        {/* 3 Large Engagement Cards */}
        <div
          className="engage-cards-row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3.5rem",
          }}
        >
          {/* Card 1: Business Audit */}
          <div
            className="engage-card"
            style={{
              backgroundColor: "#111216",
              borderRadius: "16px",
              padding: "2.25rem 2rem",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "360px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.25s ease, border-color 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "#FF5722";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#8E9199", fontWeight: 700, textTransform: "uppercase" }}>
                  WEEKS 1 TO 3
                </span>
                <span style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#C5C8D0", fontWeight: 700, textTransform: "uppercase" }}>
                  FIXED FEE
                </span>
              </div>

              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "0.02em", marginBottom: "0.5rem" }}>
                BUSINESS AUDIT
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#A0A4B0", lineHeight: 1.45, marginBottom: "1.75rem" }}>
                We map the organisation, its data and its processes, then price the opportunity.
              </p>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                "Systems, data and process map by function",
                "Cost and time baseline for priority processes",
                "Ranked opportunities with savings, build cost and payback",
                "Transformation roadmap",
              ].map((pt, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.875rem", color: "#C5C8D0" }}>
                  <span style={{ color: "#FF5722", fontSize: "1.1rem", lineHeight: 1 }}>•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Build (Peach) */}
          <div
            className="engage-card"
            style={{
              backgroundColor: "#FDEEE7",
              color: "#0A0B0D",
              borderRadius: "16px",
              padding: "2.25rem 2rem",
              border: "1px solid rgba(232, 92, 51, 0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "360px",
              boxShadow: "0 10px 30px rgba(232, 92, 51, 0.08)",
              transition: "transform 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#6E717A", fontWeight: 700, textTransform: "uppercase" }}>
                  WEEKS 4 TO 10
                </span>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.08em",
                    color: "#FF5722",
                    backgroundColor: "rgba(255, 87, 34, 0.12)",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "4px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  FIXED SCOPE
                </span>
              </div>

              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "0.02em", marginBottom: "0.5rem" }}>
                BUILD
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#4A4D55", lineHeight: 1.45, marginBottom: "1.75rem" }}>
                Command Centre first, then the highest-return function.
              </p>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                "Unified data layer and C-suite dashboards",
                "Priority function automated end to end",
                "Human approval points where they matter",
                "Team training and new SOPs",
              ].map((pt, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.875rem", color: "#2B2D33" }}>
                  <span style={{ color: "#FF5722", fontSize: "1.1rem", lineHeight: 1 }}>•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Run and Expand (Lavender) */}
          <div
            className="engage-card"
            style={{
              backgroundColor: "#F2F3F9",
              color: "#0A0B0D",
              borderRadius: "16px",
              padding: "2.25rem 2rem",
              border: "1px solid rgba(130, 140, 180, 0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "360px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              transition: "transform 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#6E717A", fontWeight: 700, textTransform: "uppercase" }}>
                  ONGOING
                </span>
                <span style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#6E717A", fontWeight: 700, textTransform: "uppercase" }}>
                  MONTHLY
                </span>
              </div>

              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "0.02em", marginBottom: "0.5rem" }}>
                RUN AND EXPAND
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#4A4D55", lineHeight: 1.45, marginBottom: "1.75rem" }}>
                We keep systems tuned and roll out the next function each quarter.
              </p>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                "Monitoring, fixes and model tuning",
                "Next function added each quarter",
                "Monthly savings report against baseline",
                "A named Beacon lead",
              ].map((pt, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.875rem", color: "#2B2D33" }}>
                  <span style={{ color: "#FF5722", fontSize: "1.1rem", lineHeight: 1 }}>•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Timeline Indicator */}
        <div style={{ position: "relative", width: "100%", marginBottom: "1rem" }}>
          {/* Dashed Line */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "2px",
              borderTop: "1px dashed rgba(255, 87, 34, 0.4)",
              marginBottom: "1rem",
            }}
          >
            <div
              ref={timelineLineRef}
              style={{
                position: "absolute",
                top: "-1px",
                left: 0,
                height: "2px",
                borderTop: "1px dashed #FF5722",
                width: "0%",
              }}
            />
          </div>

          {/* Steps Labels */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.8125rem", color: "#FF8A65", fontWeight: 700, letterSpacing: "0.05em" }}>
              01 AUDIT
            </span>
            <span style={{ fontSize: "0.8125rem", color: "#FF8A65", fontWeight: 700, letterSpacing: "0.05em" }}>
              02 AUTOMATE
            </span>
            <span style={{ fontSize: "0.8125rem", color: "#FF8A65", fontWeight: 700, letterSpacing: "0.05em" }}>
              03 OPTIMIZE
            </span>
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
              style={{ objectFit: "contain" }}
            />
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#8E9199" }}>
            11
          </span>
        </div>
      </div>
    </section>
  );
}
