"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Slide00HeroProps {
  onOpenAudit: () => void;
}

export default function Slide00Hero({ onOpenAudit }: Slide00HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const blobRef = useRef<SVGSVGElement>(null);
  const starRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text entrance animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-tag",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.5"
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".hero-cta-group",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          blobRef.current,
          { opacity: 0, scale: 0.85, rotate: -5 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1.4, ease: "power2.out" },
          "-=1.2"
        );

      // 2. Continuous floating animation for 3D metaball
      gsap.to(blobRef.current, {
        y: -15,
        rotate: 3,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Shimmer & gentle pulse on the 4-pointed star
      gsap.to(starRef.current, {
        scale: 1.08,
        rotate: 8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 4. Subtle mouse parallax
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(blobRef.current, {
          x: xPos,
          y: yPos - 8,
          duration: 1.2,
          ease: "power1.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-00"
      ref={containerRef}
      className="slide-section slide-dark"
      style={{
        position: "relative",
        background: "radial-gradient(ellipse 90% 80% at 75% 65%, rgba(232, 92, 51, 0.16) 0%, rgba(10, 11, 13, 0.95) 70%, #0A0B0D 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Main Center Grid: Text on Left, Metallic Sculpture on Right */}
      <div className="slide-content-wrap" style={{ flex: "1 1 auto", display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            width: "100%",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Column */}
          <div style={{ maxWidth: "620px" }}>
            <div className="hero-tag slide-tag">
              <span className="tag-num">(00)</span>
              <span className="tag-text">BUSINESS TRANSFORMATION 2026</span>
            </div>

            <h1
              ref={headlineRef}
              style={{
                fontSize: "clamp(2.75rem, 6.2vw, 5.25rem)",
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                marginBottom: "2rem",
              }}
            >
              THE WHOLE<br />
              BUSINESS, <span className="serif-italic" style={{ textTransform: "none", color: "#F0F0F0", fontWeight: 400 }}>in view.</span>
            </h1>

            <p
              ref={textRef}
              style={{
                fontSize: "clamp(1.05rem, 1.35vw, 1.25rem)",
                lineHeight: 1.6,
                color: "var(--text-light-secondary)",
                maxWidth: "520px",
                marginBottom: "2.5rem",
                fontWeight: 300,
              }}
            >
              AI that gives leadership a live view of the organisation, then
              makes every department simpler, leaner and smarter. Measured
              against your P&L.
            </p>

            <div className="hero-cta-group" style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
              <button
                onClick={onOpenAudit}
                style={{
                  padding: "0.85rem 2rem",
                  backgroundColor: "#FF5722",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  borderRadius: "9999px",
                  boxShadow: "0 4px 25px rgba(255, 87, 34, 0.45)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 30px rgba(255, 87, 34, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 25px rgba(255, 87, 34, 0.45)";
                }}
              >
                Book an Audit
              </button>

              <a
                href="#slide-02"
                style={{
                  padding: "0.85rem 1.75rem",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#FF5722")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)")}
              >
                Explore Ecosystem ↓
              </a>
            </div>
          </div>

          {/* Right Column: 3D Metallic Organic Blob & Star Graphic */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              minHeight: "420px",
            }}
          >
            <svg
              ref={blobRef}
              viewBox="0 0 650 550"
              style={{
                width: "100%",
                maxWidth: "560px",
                height: "auto",
                overflow: "visible",
                filter: "drop-shadow(0 20px 45px rgba(0,0,0,0.85))",
              }}
            >
              <defs>
                {/* Metallic Chrome Gradient */}
                <linearGradient id="chromeGradient" x1="20%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#D8DDE3" />
                  <stop offset="50%" stopColor="#9CA3AF" />
                  <stop offset="75%" stopColor="#E5E7EB" />
                  <stop offset="100%" stopColor="#71717A" />
                </linearGradient>

                {/* Orange Neon Rim Glow Filter */}
                <filter id="orangeRimGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComponentTransfer in="blur" result="glow1">
                    <feFuncA type="linear" slope="2" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="glow1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Specular 3D Highlight */}
                <radialGradient id="specularHighlight" cx="35%" cy="25%" r="45%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#D4D4D8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#D4D4D8" />
                  <stop offset="70%" stopColor="#71717A" />
                  <stop offset="100%" stopColor="#3F3F46" />
                </linearGradient>
              </defs>

              {/* Glowing Orange Contour Outline */}
              <path
                d="M 230 80
                   C 320 40, 390 120, 360 210
                   C 340 270, 420 300, 490 320
                   C 570 340, 560 460, 470 490
                   C 390 520, 320 450, 270 410
                   C 210 360, 160 410, 100 370
                   C 30 320, 40 210, 110 170
                   C 170 130, 170 100, 230 80 Z"
                fill="none"
                stroke="#FF5722"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#orangeRimGlow)"
                opacity="0.95"
              />

              {/* Main Metallic Blob Body */}
              <path
                d="M 230 80
                   C 320 40, 390 120, 360 210
                   C 340 270, 420 300, 490 320
                   C 570 340, 560 460, 470 490
                   C 390 520, 320 450, 270 410
                   C 210 360, 160 410, 100 370
                   C 30 320, 40 210, 110 170
                   C 170 130, 170 100, 230 80 Z"
                fill="url(#chromeGradient)"
              />

              {/* Surface Specular Shimmer */}
              <path
                d="M 230 80
                   C 320 40, 390 120, 360 210
                   C 340 270, 420 300, 490 320
                   C 570 340, 560 460, 470 490
                   C 390 520, 320 450, 270 410
                   C 210 360, 160 410, 100 370
                   C 30 320, 40 210, 110 170
                   C 170 130, 170 100, 230 80 Z"
                fill="url(#specularHighlight)"
                opacity="0.75"
              />

              {/* Floating 4-Pointed Metallic Diamond Star */}
              <g ref={starRef} transform="translate(530, 250)">
                <path
                  d="M 0 -105
                     Q 8 -25, 65 0
                     Q 8 25, 0 105
                     Q -8 25, -65 0
                     Q -8 -25, 0 -105 Z"
                  fill="url(#starGradient)"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.5"
                  filter="drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Footer Meta */}
      <div className="slide-content-wrap" style={{ flex: "0 0 auto" }}>
        <div className="slide-footer">
          <span style={{ fontWeight: 600, letterSpacing: "0.08em" }}>
            C-SUITE OVERSIGHT &nbsp;|&nbsp; DEPARTMENT TRANSFORMATION
          </span>
          <span style={{ fontWeight: 500, letterSpacing: "0.08em" }}>
            DUBAI, UAE &nbsp;|&nbsp; <a href="mailto:hello@beacon.ai" style={{ color: "#FF5722" }}>HELLO@BEACON.AI</a>
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
