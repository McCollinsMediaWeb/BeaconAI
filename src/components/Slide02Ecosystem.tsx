"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FUNCTIONS = [
  { id: "slide-04", num: "05", title: "FINANCE", desc: "Close, cash, receivables, spend control" },
  { id: "slide-05", num: "06", title: "SALES & CUSTOMER", desc: "Pipeline, quoting, orders, service" },
  { id: "slide-06", num: "07", title: "MARKETING", desc: "Spend, content, campaigns, attribution" },
  { id: "slide-07", num: "08", title: "OPERATIONS & SUPPLY CHAIN", desc: "Inventory, procurement, fulfilment" },
  { id: "slide-08", num: "09", title: "PEOPLE & HR", desc: "Hiring, onboarding, workforce" },
  { id: "slide-09", num: "10", title: "ADMIN, LEGAL & COMPLIANCE", desc: "Contracts, approvals, renewals" },
];

export default function Slide02Ecosystem() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Stagger layer entrance
      gsap.fromTo(
        ".ecosystem-layer",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Stagger right sidebar items
      gsap.fromTo(
        ".ecosystem-applied-item",
        { opacity: 0, x: 25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".ecosystem-applied-wrap",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSlide = (slideId: string) => {
    const el = document.getElementById(slideId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="slide-02"
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
        <div className="slide-tag">
          <span className="tag-num">(02)</span>
          <span className="tag-text">THE BUSINESS ECOSYSTEM</span>
        </div>

        {/* Big Heading */}
        <h2
          className="slide-heading"
          style={{
            fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            marginBottom: "2.75rem",
          }}
        >
          ONE OPERATING SYSTEM{" "}
          <span className="serif-italic" style={{ textTransform: "none", fontWeight: 400, color: "#E0E3EC" }}>
            for the whole business.
          </span>
        </h2>

        {/* Split Layout: 4 Stacked Layers on Left/Center, "Applied In Every Function" on Right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="ecosystem-grid"
        >
          {/* Main Layers Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* LAYER 01 | OVERSIGHT */}
            <div className="ecosystem-layer">
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#FF5722",
                  fontWeight: 700,
                  marginBottom: "0.45rem",
                }}
              >
                LAYER 01 &nbsp;|&nbsp; OVERSIGHT
              </span>

              <div
                onClick={() => scrollToSlide("slide-03")}
                style={{
                  backgroundColor: "#111216",
                  border: "1px solid #FF5722",
                  borderRadius: "14px",
                  padding: "1.25rem 1.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(255, 87, 34, 0.15)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(255, 87, 34, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(255, 87, 34, 0.15)";
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 800, letterSpacing: "0.04em", marginBottom: "0.25rem" }}>
                    C-SUITE COMMAND CENTRE
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#C5C8D0" }}>
                    Live dashboards, daily leadership brief, alerts and plain-language questions across every function.
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className="serif-italic" style={{ color: "#FF5722", fontSize: "1.5rem", fontWeight: 400 }}>
                    04
                  </span>
                  <span style={{ color: "#FF5722", fontSize: "1.25rem" }}>→</span>
                </div>
              </div>
            </div>

            {/* Dotted Connection Line Indicator */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "-0.5rem 0",
                color: "#FF5722",
                opacity: 0.5,
                letterSpacing: "4px",
                fontSize: "0.75rem",
              }}
            >
              · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
            </div>

            {/* LAYER 02 | FUNCTIONS */}
            <div className="ecosystem-layer">
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#8E9199",
                  fontWeight: 700,
                  marginBottom: "0.45rem",
                }}
              >
                LAYER 02 &nbsp;|&nbsp; FUNCTIONS
              </span>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {FUNCTIONS.map((f) => (
                  <div
                    key={f.num}
                    onClick={() => scrollToSlide(f.id)}
                    style={{
                      backgroundColor: "#16171B",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "12px",
                      padding: "1rem 0.85rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: "145px",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#FF5722";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.backgroundColor = "#1A1B22";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.backgroundColor = "#16171B";
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.35rem", marginBottom: "0.5rem" }}>
                        <h4 style={{ fontSize: "0.785rem", fontWeight: 800, letterSpacing: "0.03em", lineHeight: 1.25, flex: 1 }}>
                          {f.title}
                        </h4>
                        <span className="serif-italic" style={{ color: "#FF8A65", fontSize: "1.1rem", lineHeight: 1 }}>
                          {f.num}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "#8E9199", lineHeight: 1.35 }}>
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* LAYER 03 | INTELLIGENCE */}
            <div className="ecosystem-layer">
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#8E9199",
                  fontWeight: 700,
                  marginBottom: "0.45rem",
                }}
              >
                LAYER 03 &nbsp;|&nbsp; INTELLIGENCE
              </span>

              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#0A0B0D",
                  borderRadius: "14px",
                  padding: "1.1rem 1.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                }}
              >
                <h4 style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "0.04em" }}>
                  BEACON AI LAYER
                </h4>
                <p style={{ fontSize: "0.875rem", color: "#4A4D55", fontWeight: 500 }}>
                  Agents · Workflow automation · Forecasting · Pattern recognition · Alerts
                </p>
              </div>
            </div>

            {/* LAYER 04 | FOUNDATION */}
            <div className="ecosystem-layer">
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#8E9199",
                  fontWeight: 700,
                  marginBottom: "0.45rem",
                }}
              >
                LAYER 04 &nbsp;|&nbsp; FOUNDATION
              </span>

              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#0A0B0D",
                  borderRadius: "14px",
                  padding: "1.1rem 1.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                }}
              >
                <h4 style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "0.04em" }}>
                  UNIFIED DATA LAYER
                </h4>
                <p style={{ fontSize: "0.875rem", color: "#4A4D55", fontWeight: 500 }}>
                  ERP · Accounting · CRM · POS and e-commerce · HRIS · WhatsApp and email · Spreadsheets
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar: APPLIED IN EVERY FUNCTION */}
          <div
            className="ecosystem-applied-wrap"
            style={{
              paddingLeft: "1.5rem",
              borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "2.25rem",
            }}
          >
            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#8E9199",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                }}
              >
                APPLIED IN EVERY FUNCTION
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                {/* 1. Simplify */}
                <div className="ecosystem-applied-item">
                  <h4 className="serif-italic" style={{ color: "#E85C33", fontSize: "1.65rem", fontWeight: 400, marginBottom: "0.35rem" }}>
                    Simplify
                  </h4>
                  <p style={{ color: "#A0A4B0", fontSize: "0.875rem", lineHeight: 1.45 }}>
                    Remove steps, handoffs and re-keying.
                  </p>
                </div>

                {/* 2. Reduce cost */}
                <div className="ecosystem-applied-item">
                  <h4 className="serif-italic" style={{ color: "#E85C33", fontSize: "1.65rem", fontWeight: 400, marginBottom: "0.35rem" }}>
                    Reduce cost
                  </h4>
                  <p style={{ color: "#A0A4B0", fontSize: "0.875rem", lineHeight: 1.45 }}>
                    Lower cost to run each process.
                  </p>
                </div>

                {/* 3. Access data */}
                <div className="ecosystem-applied-item">
                  <h4 className="serif-italic" style={{ color: "#E85C33", fontSize: "1.65rem", fontWeight: 400, marginBottom: "0.35rem" }}>
                    Access data
                  </h4>
                  <p style={{ color: "#A0A4B0", fontSize: "0.875rem", lineHeight: 1.45 }}>
                    The right numbers, live, for every owner.
                  </p>
                </div>

                {/* 4. See patterns */}
                <div className="ecosystem-applied-item">
                  <h4 className="serif-italic" style={{ color: "#E85C33", fontSize: "1.65rem", fontWeight: 400, marginBottom: "0.35rem" }}>
                    See patterns
                  </h4>
                  <p style={{ color: "#A0A4B0", fontSize: "0.875rem", lineHeight: 1.45 }}>
                    Forecasts, anomalies and signals surfaced early.
                  </p>
                </div>
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
              style={{ objectFit: "contain" }}
            />
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#8E9199" }}>
            03
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .ecosystem-grid {
            grid-template-columns: 1fr 300px !important;
          }
        }
      `}</style>
    </section>
  );
}
