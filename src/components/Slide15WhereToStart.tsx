"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Slide15WhereToStartProps {
  onOpenAudit: () => void;
}

export default function Slide15WhereToStart({ onOpenAudit }: Slide15WhereToStartProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Heading & Steps stagger
      gsap.fromTo(
        ".start-fade",
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

      // 2. Steps entrance
      gsap.fromTo(
        ".start-step-col",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".start-steps-row",
            start: "top 80%",
          },
        }
      );

      // 3. CTA row entrance
      gsap.fromTo(
        ".start-cta-row",
        { opacity: 0, scale: 0.98, y: 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".start-cta-row",
            start: "top 85%",
          },
        }
      );

      // 4. Subtle breathing glow in bottom right
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          opacity: 0.85,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-15"
      ref={sectionRef}
      className="slide-section slide-dark"
      style={{
        backgroundColor: "#0A0B0D",
        color: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Radiant Glow Arc in Bottom Right */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232, 92, 51, 0.28) 0%, rgba(232, 92, 51, 0.08) 45%, rgba(10, 11, 13, 0) 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div className="slide-content-wrap" style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 2 }}>
        {/* Slide Tag */}
        <div className="start-fade slide-tag">
          <span className="tag-num">(15)</span>
          <span className="tag-text">WHERE TO START</span>
        </div>

        {/* Big Heading */}
        <h2
          className="start-fade slide-heading"
          style={{
            fontSize: "clamp(2.4rem, 5.2vw, 4.4rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            marginBottom: "3.5rem",
          }}
        >
          SEE THE BUSINESS FIRST.<br />
          <span className="serif-italic" style={{ textTransform: "none", fontWeight: 400, color: "#E0E3EC" }}>
            Then make it leaner.
          </span>
        </h2>

        {/* 3 Step Columns across top with orange borders */}
        <div
          className="start-steps-row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2.5rem",
            marginBottom: "5rem",
          }}
        >
          {/* STEP 01 */}
          <div className="start-step-col" style={{ borderTop: "2px solid #FF5722", paddingTop: "1.25rem" }}>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.08em", color: "#8E9199", fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>
              STEP 01
            </span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "0.03em", marginBottom: "0.75rem" }}>
              BUSINESS AUDIT
            </h3>
            <p style={{ fontSize: "0.9375rem", color: "#A0A4B0", lineHeight: 1.55 }}>
              Three weeks to map your data and processes and put a number on the opportunity.
            </p>
          </div>

          {/* STEP 02 */}
          <div className="start-step-col" style={{ borderTop: "2px solid #FF5722", paddingTop: "1.25rem" }}>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.08em", color: "#8E9199", fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>
              STEP 02
            </span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "0.03em", marginBottom: "0.75rem" }}>
              COMMAND CENTRE
            </h3>
            <p style={{ fontSize: "0.9375rem", color: "#A0A4B0", lineHeight: 1.55 }}>
              Leadership gets one live view of the organisation within weeks, not quarters.
            </p>
          </div>

          {/* STEP 03 */}
          <div className="start-step-col" style={{ borderTop: "2px solid #FF5722", paddingTop: "1.25rem" }}>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.08em", color: "#8E9199", fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>
              STEP 03
            </span>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "0.03em", marginBottom: "0.75rem" }}>
              FUNCTION BY FUNCTION
            </h3>
            <p style={{ fontSize: "0.9375rem", color: "#A0A4B0", lineHeight: 1.55 }}>
              We transform the highest-return department first, then roll out quarter by quarter.
            </p>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div
          className="start-cta-row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Left Title */}
          <div>
            <h3
              className="serif-italic"
              style={{
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                fontWeight: 400,
                color: "#FFFFFF",
                marginBottom: "0.5rem",
                lineHeight: 1.15,
              }}
            >
              Start with a three-week audit.
            </h3>
            <p style={{ fontSize: "0.9375rem", color: "#A0A4B0" }}>
              Know where AI will save money and time before you commit to a build.
            </p>
          </div>

          {/* Right Action */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem" }}>
            <button
              onClick={onOpenAudit}
              style={{
                padding: "1rem 2.5rem",
                backgroundColor: "#FF5722",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "1rem",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 30px rgba(255, 87, 34, 0.5)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 35px rgba(255, 87, 34, 0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 30px rgba(255, 87, 34, 0.5)";
              }}
            >
              Book an Audit
            </button>

            <span style={{ fontSize: "0.8125rem", color: "#8E9199" }}>
              <a href="mailto:hello@beacon.ai" style={{ color: "#C5C8D0" }}>hello@beacon.ai</a> &nbsp;|&nbsp; Dubai, UAE
            </span>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="slide-content-wrap" style={{ flex: "0 0 auto", position: "relative", zIndex: 2 }}>
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
            15
          </span>
        </div>
      </div>
    </section>
  );
}
