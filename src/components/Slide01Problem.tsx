"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Slide01Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading & text animation
      gsap.fromTo(
        ".problem-fade",
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

      // 4 cards staggered entrance
      gsap.fromTo(
        ".problem-card",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".problem-cards-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-01"
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
        {/* Section Index Tag */}
        <div className="problem-fade slide-tag">
          <span className="tag-num">(01)</span>
          <span className="tag-text" style={{ color: "#71717A" }}>THE PROBLEM</span>
        </div>

        {/* Big Heading */}
        <h2
          className="problem-fade slide-heading"
          style={{
            fontSize: "clamp(2.4rem, 5.2vw, 4.4rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            color: "#0A0B0D",
            marginBottom: "3.5rem",
          }}
        >
          MOST LEADERSHIP TEAMS<br />
          <span className="serif-italic" style={{ textTransform: "none", fontWeight: 400, color: "#18191E" }}>
            run on last month&apos;s data.
          </span>
        </h2>

        {/* 2-Column Split: Story on Left, 2x2 Grid of Cards on Right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3.5rem",
            alignItems: "start",
          }}
          className="problem-main-grid"
        >
          {/* Left: Narrative */}
          <div style={{ maxWidth: "560px" }}>
            <p
              className="problem-fade"
              style={{
                fontSize: "clamp(1.05rem, 1.35vw, 1.25rem)",
                lineHeight: 1.6,
                color: "#4A4D55",
                marginBottom: "2rem",
                fontWeight: 400,
              }}
            >
              Data sits in ten systems and a hundred spreadsheets. Reports arrive weeks
              late and every department has its own version of the truth. Processes grew
              by accident, cost crept in with them, and nobody can see the patterns that matter.
            </p>

            <p
              className="problem-fade"
              style={{
                fontSize: "clamp(1.05rem, 1.35vw, 1.25rem)",
                lineHeight: 1.6,
                color: "#18191E",
                fontWeight: 500,
              }}
            >
              Beacon fixes this from the top down. First we give leadership one live view
              of the business. Then we go function by function, making each one simpler,
              cheaper to run and easier to understand.
            </p>
          </div>

          {/* Right: 2x2 Cards Grid */}
          <div
            className="problem-cards-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
              width: "100%",
            }}
          >
            {/* Card 01 - Black */}
            <div
              className="problem-card"
              style={{
                backgroundColor: "#0C0D0E",
                color: "#FFFFFF",
                borderRadius: "16px",
                padding: "2rem 1.75rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "185px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <span className="serif-italic" style={{ color: "#FF8A65", fontSize: "1.75rem", lineHeight: 1 }}>
                01
              </span>
              <div>
                <h4 style={{ fontSize: "1.125rem", fontWeight: 800, letterSpacing: "0.04em", marginBottom: "0.5rem" }}>
                  SEE
                </h4>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.45, color: "#C5C8D0" }}>
                  A bird&apos;s-eye view of the whole organisation, live, in one place.
                </p>
              </div>
            </div>

            {/* Card 02 - White */}
            <div
              className="problem-card"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#0A0B0D",
                borderRadius: "16px",
                padding: "2rem 1.75rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "185px",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.04)",
                transition: "transform 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <span className="serif-italic" style={{ color: "#E85C33", fontSize: "1.75rem", lineHeight: 1 }}>
                02
              </span>
              <div>
                <h4 style={{ fontSize: "1.125rem", fontWeight: 800, letterSpacing: "0.04em", marginBottom: "0.5rem" }}>
                  SIMPLIFY
                </h4>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.45, color: "#4A4D55" }}>
                  Fewer steps, fewer handoffs, less manual work in every function.
                </p>
              </div>
            </div>

            {/* Card 03 - Warm Peach */}
            <div
              className="problem-card"
              style={{
                backgroundColor: "#FDEEE7",
                color: "#0A0B0D",
                borderRadius: "16px",
                padding: "2rem 1.75rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "185px",
                border: "1px solid rgba(232, 92, 51, 0.12)",
                boxShadow: "0 6px 20px rgba(232, 92, 51, 0.06)",
                transition: "transform 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <span className="serif-italic" style={{ color: "#E85C33", fontSize: "1.75rem", lineHeight: 1 }}>
                03
              </span>
              <div>
                <h4 style={{ fontSize: "1.125rem", fontWeight: 800, letterSpacing: "0.04em", marginBottom: "0.5rem" }}>
                  REDUCE COST
                </h4>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.45, color: "#4A4D55" }}>
                  Leaner operations with savings tracked against a baseline.
                </p>
              </div>
            </div>

            {/* Card 04 - Pale Lavender */}
            <div
              className="problem-card"
              style={{
                backgroundColor: "#F2F3F9",
                color: "#0A0B0D",
                borderRadius: "16px",
                padding: "2rem 1.75rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "185px",
                border: "1px solid rgba(130, 140, 180, 0.12)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.04)",
                transition: "transform 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <span className="serif-italic" style={{ color: "#E85C33", fontSize: "1.75rem", lineHeight: 1 }}>
                04
              </span>
              <div>
                <h4 style={{ fontSize: "1.125rem", fontWeight: 800, letterSpacing: "0.04em", marginBottom: "0.5rem" }}>
                  DECIDE
                </h4>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.45, color: "#4A4D55" }}>
                  Pattern recognition that surfaces risks and opportunities early.
                </p>
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
            02
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .problem-main-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
      `}</style>
    </section>
  );
}
