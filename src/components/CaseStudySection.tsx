"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface CaseStudyProps {
  id: string;
  tagNum: string;
  tagTitle: string;
  subHeader: string;
  engagementTitle: string;
  engagementTimeline: string;
  clientTitle: string;
  imageSrc: string;
  challengeText: string;
  results: {
    label: string;
    value: string;
    subtext?: string;
  }[];
  whatWeBuilt: string[];
  headlineImpact: {
    clientLogoText: string;
    amount: string;
    amountLabel: string;
    operatingCost: string;
    weeksToLive: string;
    savingsBreakdown: {
      category: string;
      amount: string;
      percent: number; // for progress bar width
    }[];
  };
  pageNum: string;
}

export default function CaseStudySection(props: CaseStudyProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade in header & text
      gsap.fromTo(
        `.${props.id}-fade`,
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

      // Results grid stagger
      gsap.fromTo(
        `.${props.id}-metric`,
        { opacity: 0, scale: 0.95, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${props.id}-results-grid`,
            start: "top 80%",
          },
        }
      );

      // Animate savings progress bars
      if (barsRef.current) {
        const bars = barsRef.current.querySelectorAll(".case-progress-bar");
        bars.forEach((bar) => {
          const width = bar.getAttribute("data-width") || "50%";
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: width,
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
  }, [props.id]);

  return (
    <section
      id={props.id}
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
        {/* Top Header Row with Index Tag and Engagement Box */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "1rem",
          }}
          className={`${props.id}-fade`}
        >
          <div>
            <div className="slide-tag" style={{ marginBottom: "0.4rem" }}>
              <span className="tag-num">{props.tagNum}</span>
              <span className="tag-text">{props.tagTitle}</span>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "#6E717A" }}>
              {props.subHeader}
            </p>
          </div>

          <div style={{ textAlign: "right", minWidth: "220px" }}>
            <span style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#71717A", fontWeight: 700, textTransform: "uppercase", display: "block" }}>
              ENGAGEMENT
            </span>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0A0B0D", display: "block" }}>
              {props.engagementTitle}
            </span>
            <span style={{ fontSize: "0.8125rem", color: "#6E717A" }}>
              {props.engagementTimeline}
            </span>
          </div>
        </div>

        {/* Client Big Title */}
        <h2
          className={`${props.id}-fade`}
          style={{
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            marginBottom: "2rem",
            textTransform: "lowercase",
          }}
        >
          {props.clientTitle}
        </h2>

        {/* 3-Column Grid: Left (Image + Challenge), Center (Results + Built), Right (Headline Impact Card) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            alignItems: "start",
          }}
          className="case-main-grid"
        >
          {/* Left Column: Image & Challenge */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "340px" }}>
            <div
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                position: "relative",
                width: "100%",
                height: "200px",
                backgroundColor: "#e0e0e0",
              }}
            >
              <Image
                src={props.imageSrc}
                alt={props.clientTitle}
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className={`${props.id}-fade`}>
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#FF5722",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                THE CHALLENGE
              </span>
              <p style={{ fontSize: "0.875rem", color: "#4A4D55", lineHeight: 1.5 }}>
                {props.challengeText}
              </p>
            </div>
          </div>

          {/* Center Column: Results (6 Metric Blocks) + What We Built */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {/* Results Grid */}
            <div>
              <span
                className={`${props.id}-fade`}
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#71717A",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "0.6rem",
                }}
              >
                RESULTS
              </span>

              <div
                className={`${props.id}-results-grid`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.75rem",
                }}
              >
                {props.results.map((r, i) => (
                  <div
                    key={i}
                    className={`${props.id}-metric`}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "10px",
                      padding: "0.85rem 0.75rem",
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    <span style={{ fontSize: "0.65rem", color: "#71717A", display: "block", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.25rem", lineHeight: 1.25 }}>
                      {r.label}
                    </span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                        {r.value}
                      </span>
                      {r.subtext && (
                        <span className="serif-italic" style={{ fontSize: "0.75rem", color: "#8E9199" }}>
                          {r.subtext}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WHAT WE BUILT */}
            <div className={`${props.id}-fade`}>
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#FF5722",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                WHAT WE BUILT
              </span>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                {props.whatWeBuilt.map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.8125rem", color: "#4A4D55", lineHeight: 1.4 }}>
                    <span style={{ color: "#FF5722", fontSize: "1rem", lineHeight: 1 }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Dark Headline Impact Card */}
          <div
            style={{
              backgroundColor: "#0C0D0E",
              color: "#FFFFFF",
              borderRadius: "16px",
              padding: "1.75rem",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              minWidth: "290px",
            }}
          >
            {/* Logo / Brand header */}
            <div style={{ fontSize: "0.9375rem", fontWeight: 800, marginBottom: "1.25rem", letterSpacing: "0.02em" }}>
              {props.headlineImpact.clientLogoText}
            </div>

            {/* Headline Impact */}
            <span style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#8E9199", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
              HEADLINE IMPACT
            </span>
            <div style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.03em", marginTop: "0.25rem" }}>
              {props.headlineImpact.amount}
            </div>
            <div className="serif-italic" style={{ fontSize: "1.1rem", color: "#C5C8D0", marginBottom: "1rem" }}>
              {props.headlineImpact.amountLabel}
            </div>

            {/* Sub-metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                padding: "0.85rem 0",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                marginBottom: "1.25rem",
              }}
            >
              <div>
                <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "#EF4444", display: "block" }}>
                  {props.headlineImpact.operatingCost}
                </span>
                <span style={{ fontSize: "0.65rem", color: "#8E9199", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  OPERATING COST
                </span>
              </div>
              <div>
                <span className="serif-italic" style={{ fontSize: "1.35rem", fontWeight: 400, color: "#FFFFFF", display: "block" }}>
                  {props.headlineImpact.weeksToLive}
                </span>
                <span style={{ fontSize: "0.65rem", color: "#8E9199", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  TO LIVE
                </span>
              </div>
            </div>

            {/* Savings Breakdown */}
            <div ref={barsRef}>
              <span style={{ fontSize: "0.6875rem", letterSpacing: "0.06em", color: "#8E9199", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "0.75rem" }}>
                WHERE THE SAVINGS CAME FROM
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {props.headlineImpact.savingsBreakdown.map((item, idx) => (
                  <div key={idx}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.2rem", color: "#C5C8D0" }}>
                      <span>{item.category}</span>
                      <span style={{ fontWeight: 700 }}>{item.amount}</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: "3px", overflow: "hidden" }}>
                      <div
                        className="case-progress-bar"
                        data-width={`${item.percent}%`}
                        style={{
                          height: "100%",
                          width: "0%",
                          backgroundColor: "#FF5722",
                          borderRadius: "3px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="slide-content-wrap" style={{ flex: "0 0 auto" }}>
        <div className="slide-footer">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Image
              src="/logo.png"
              alt="Beacon AI"
              width={110}
              height={26}
              className="logo-invert"
              style={{ objectFit: "contain" }}
            />
            <span style={{ fontSize: "0.6875rem", color: "#8E9199" }}>
              Internal draft. Figures are illustrative and will be replaced with actuals.
            </span>
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#8E9199" }}>
            {props.pageNum}
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1100px) {
          .case-main-grid {
            grid-template-columns: 0.95fr 1.35fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
