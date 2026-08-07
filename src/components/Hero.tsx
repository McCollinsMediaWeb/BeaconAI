"use client";

import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section
      id="home"
      className={styles.heroSection}
      style={{
        backgroundImage: "url('/hero-background.png')",
      }}
    >
      {/* Hero Image Overlay (hills and sculpture) */}
      <img
        src="/hero-image.png"
        alt="Beacon AI Metallic Art"
        className={styles.imageOverlay}
      />

      {/* Hero Text and Buttons Content */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className={styles.textWrapper}>
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
