"use client";

import { useEffect, useRef } from "react";
import styles from "./Proof.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Proof() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsListRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Reveal Heading Title
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Reveal Stats Checklist Items
      if (statsListRef.current) {
        gsap.fromTo(
          statsListRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsListRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Reveal GIF graphic container card
      if (graphRef.current) {
        gsap.fromTo(
          graphRef.current,
          { opacity: 0, scale: 0.96, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: graphRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      value: "38%",
      label: "RESPONSE TIME<br/> REDUCED",
      highlight: true,
    },
    {
      value: "120",
      label: "ADMIN HOURS<br/> SAVED / MONTH",
      highlight: false,
    },
    {
      value: "22%",
      label: "LEAD-TO-MEETING LIFT",
      highlight: false,
    },
  ];

  return (
    <section ref={sectionRef} id="about" className={styles.section}>
      <div className="container">
        {/* Combined Layout for Sticky Pinning of Left Category Column */}
        <div className={styles.mainGrid}>
          {/* Sticky Left Column */}
          <div className={styles.leftCol}>
            <div className={styles.leftHeader}>
              <span className={styles.indexNum}>(05)</span>
              <span className={styles.categoryTitle}>Proof</span>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightCol}>
            {/* Header Title */}
            <div ref={titleRef} className={styles.titleWrapper}>
              <h2 className={styles.heading}>
                The only kpi that matters:
                <span className={styles.serifOrange}>
                  YOUR P&L.
                </span>
              </h2>
            </div>

            {/* Split Content Grid (Stats & GIF side-by-side) */}
            <div className={styles.contentGrid}>
              {/* Stats Checklist */}
              <div className={styles.colStats}>
                <div ref={statsListRef} className={styles.statsList}>
                  {stats.map((stat, idx) => (
                    <div
                      key={stat.label}
                      className={`${styles.statItem} ${idx === 0 ? styles.statItemFirst : ""}`}
                    >
                      <span
                        className={`${styles.statValue} ${stat.highlight ? styles.statOrange : ""}`}
                      >
                        {stat.value}
                      </span>
                      <span
                        className={styles.statLabel}
                        dangerouslySetInnerHTML={{ __html: stat.label }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* White Box GIF Animation */}
              <div ref={graphRef} className={styles.colGraph}>
                <div className={styles.gifContainer}>
                  <img
                    src="/assets/proof-gif.gif"
                    alt="Proof Animation"
                    className={styles.proofGif}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
