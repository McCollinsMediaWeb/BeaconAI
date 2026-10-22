"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface DeepDiveProps {
  id: string;
  tagNum: string;
  tagTitle: string;
  headingMain: string;
  headingItalic: string;
  breaksToday: string[];
  kpisWeMove: string;
  extraQuote?: string;
  stepsIn: {
    simplify: string;
    reduceCost: string;
    accessData: string;
    seePatterns: string;
  };
  leadershipMetrics: {
    label: string;
    value: string;
    subtext?: string;
  }[];
  patternDetected: string;
  pageNum: string;
}

export default function DeepDiveSection(props: DeepDiveProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Staggered fade for texts
      gsap.fromTo(
        `.${props.id}-fade`,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // 2. Center cards animation
      gsap.fromTo(
        `.${props.id}-card`,
        { opacity: 0, scale: 0.95, y: 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${props.id}-cards-grid`,
            start: "top 80%",
          },
        }
      );

      // 3. Right terminal entrance
      gsap.fromTo(
        `.${props.id}-terminal`,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${props.id}-terminal`,
            start: "top 80%",
          },
        }
      );
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
        {/* Slide Tag */}
        <div className={`${props.id}-fade slide-tag`}>
          <span className="tag-num">{props.tagNum}</span>
          <span className="tag-text">{props.tagTitle}</span>
        </div>

        {/* Heading */}
        <h2
          className={`${props.id}-fade slide-heading`}
          style={{
            fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            marginBottom: "2.75rem",
          }}
        >
          {props.headingMain}<br />
          <span className="serif-italic" style={{ textTransform: "none", fontWeight: 400, color: "#18191E" }}>
            {props.headingItalic}
          </span>
        </h2>

        {/* 3-Column Layout: Left Narrative, Center 4 Cards, Right Leadership Terminal */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            alignItems: "start",
          }}
          className="deepdive-main-grid"
        >
          {/* Left Column: WHERE IT BREAKS & KPIS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem", maxWidth: "340px" }}>
            {/* WHERE IT BREAKS TODAY */}
            <div className={`${props.id}-fade`}>
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#FF5722",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "0.85rem",
                }}
              >
                WHERE IT BREAKS TODAY
              </span>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {props.breaksToday.map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.9375rem", color: "#4A4D55", lineHeight: 1.45 }}>
                    <span style={{ color: "#FF5722", fontSize: "1.2rem", lineHeight: 1 }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* KPIS WE MOVE */}
            <div className={`${props.id}-fade`}>
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#FF5722",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "0.45rem",
                }}
              >
                KPIS WE MOVE
              </span>
              <p style={{ fontSize: "0.875rem", color: "#4A4D55", fontWeight: 500, lineHeight: 1.45 }}>
                {props.kpisWeMove}
              </p>
              {props.extraQuote && (
                <p className="serif-italic" style={{ fontSize: "0.875rem", color: "#6E717A", marginTop: "0.6rem", lineHeight: 1.4 }}>
                  {props.extraQuote}
                </p>
              )}
            </div>
          </div>

          {/* Center Column: WHERE AI STEPS IN (4 Cards) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <span
              className={`${props.id}-fade`}
              style={{
                display: "block",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                color: "#71717A",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: "0.35rem",
              }}
            >
              WHERE AI STEPS IN
            </span>

            <div
              className={`${props.id}-cards-grid`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {/* Card 01 - White */}
              <div
                className={`${props.id}-card`}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "14px",
                  padding: "1.5rem 1.25rem",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "155px",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.5rem" }}>
                  <span className="serif-italic" style={{ color: "#FF5722", fontSize: "1.25rem", fontWeight: 400 }}>
                    01
                  </span>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 800, letterSpacing: "0.05em" }}>
                    SIMPLIFY
                  </span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "#4A4D55", lineHeight: 1.45 }}>
                  {props.stepsIn.simplify}
                </p>
              </div>

              {/* Card 02 - White */}
              <div
                className={`${props.id}-card`}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "14px",
                  padding: "1.5rem 1.25rem",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "155px",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.5rem" }}>
                  <span className="serif-italic" style={{ color: "#FF5722", fontSize: "1.25rem", fontWeight: 400 }}>
                    02
                  </span>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 800, letterSpacing: "0.05em" }}>
                    REDUCE COST
                  </span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "#4A4D55", lineHeight: 1.45 }}>
                  {props.stepsIn.reduceCost}
                </p>
              </div>

              {/* Card 03 - Soft Peach */}
              <div
                className={`${props.id}-card`}
                style={{
                  backgroundColor: "#FDEEE7",
                  borderRadius: "14px",
                  padding: "1.5rem 1.25rem",
                  border: "1px solid rgba(232, 92, 51, 0.12)",
                  boxShadow: "0 4px 15px rgba(232, 92, 51, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "155px",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.5rem" }}>
                  <span className="serif-italic" style={{ color: "#FF5722", fontSize: "1.25rem", fontWeight: 400 }}>
                    03
                  </span>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 800, letterSpacing: "0.05em" }}>
                    ACCESS DATA
                  </span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "#4A4D55", lineHeight: 1.45 }}>
                  {props.stepsIn.accessData}
                </p>
              </div>

              {/* Card 04 - Pale Lavender */}
              <div
                className={`${props.id}-card`}
                style={{
                  backgroundColor: "#F2F3F9",
                  borderRadius: "14px",
                  padding: "1.5rem 1.25rem",
                  border: "1px solid rgba(130, 140, 180, 0.12)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "155px",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.5rem" }}>
                  <span className="serif-italic" style={{ color: "#FF5722", fontSize: "1.25rem", fontWeight: 400 }}>
                    04
                  </span>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 800, letterSpacing: "0.05em" }}>
                    SEE PATTERNS
                  </span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "#4A4D55", lineHeight: 1.45 }}>
                  {props.stepsIn.seePatterns}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: WHAT LEADERSHIP SEES (Dark Terminal Mock) */}
          <div
            className={`${props.id}-terminal`}
            style={{
              backgroundColor: "#0C0D0E",
              color: "#FFFFFF",
              borderRadius: "16px",
              padding: "1.5rem",
              boxShadow: "0 18px 40px rgba(0, 0, 0, 0.22)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              minWidth: "290px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                marginBottom: "1.25rem",
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#555" }}></span>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#555" }}></span>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#555" }}></span>
              <span style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#8E9199", textTransform: "uppercase", marginLeft: "0.5rem", fontWeight: 600 }}>
                WHAT LEADERSHIP SEES
              </span>
            </div>

            {/* Metrics List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {props.leadershipMetrics.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#15161A",
                    padding: "1rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <span style={{ fontSize: "0.6875rem", color: "#8E9199", display: "block", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>
                    {m.label}
                  </span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                      {m.value}
                    </span>
                    {m.subtext && (
                      <span className="serif-italic" style={{ fontSize: "0.875rem", color: "#A0A4B0" }}>
                        {m.subtext}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* PATTERN DETECTED ALERT BOX */}
              <div
                style={{
                  backgroundColor: "rgba(255, 87, 34, 0.08)",
                  border: "1px solid rgba(255, 87, 34, 0.25)",
                  borderRadius: "10px",
                  padding: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#FF5722" }}></span>
                  <span style={{ fontSize: "0.6875rem", color: "#FF5722", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    PATTERN DETECTED
                  </span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "#E0E3EC", lineHeight: 1.4 }}>
                  {props.patternDetected}
                </p>
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
              Dashboard values are illustrative.
            </span>
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#8E9199" }}>
            {props.pageNum}
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1100px) {
          .deepdive-main-grid {
            grid-template-columns: 0.95fr 1.35fr 0.95fr !important;
          }
        }
      `}</style>
    </section>
  );
}
