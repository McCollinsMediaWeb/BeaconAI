"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // 1. Mouse Spotlight tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      sectionRef.current.style.setProperty("--mouse-x", `${x}px`);
      sectionRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 2. GSAP Entrance animations
    const ctx = gsap.context(() => {
      // Fade/slide up text elements
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
        );
      }

      // Zoom/fade in background metallic sculpture
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.1, rotate: -2 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1.8, ease: "power2.out" }
        );
      }
    }, sectionRef);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className={styles.heroSection}
      style={{
        backgroundImage: "url('/hero-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      {/* Hero Image Overlay (hills and sculpture) */}
      <img
        ref={imageRef}
        src="/hero-image.png"
        alt="Beacon AI Metallic Art"
        className={styles.imageOverlay}
      />

      {/* Hero Text and Buttons Content */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div ref={textRef} className={styles.textWrapper}>
          {/* Headline / Paragraph text */}
          <p className={styles.description}>
            Beacon turns AI from pilot theatre into measurable operating leverage: audits, agents, workflows, and optimization built around return.
          </p>

          {/* Buttons Row */}
          <div className={styles.btnRow}>
            <Link
              href="#contact"
              className={styles.auditBtn}
            >
              Book an Audit
            </Link>
            <Link
              href="#services"
              className={styles.roiBtn}
            >
              Find ROI
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
