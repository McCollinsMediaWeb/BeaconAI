"use client";

import { useEffect, useRef } from "react";
import styles from "./WhyBeacon.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhyBeacon() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const principlesListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Reveal Header split columns
      if (headerRef.current) {
        gsap.fromTo(
          [headerRef.current.querySelector(`.${styles.colTitle}`), headerRef.current.querySelector(`.${styles.colDesc}`)],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Reveal Principles row items in waterfall stagger sequence
      if (principlesListRef.current) {
        gsap.fromTo(
          principlesListRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: principlesListRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const principles = [
    {
      num: "01",
      title: "P&L First",
      desc: "Every recommendation is tied to cost, time, risk, revenue, or throughput.",
    },
    {
      num: "02",
      title: "Workflow-Native",
      desc: "Automations live inside the systems your team already uses.",
    },
    {
      num: "03",
      title: "Human-Controlled",
      desc: "AI assists decisions, escalates edge cases, and leaves audit trails.",
    },
    {
      num: "04",
      title: "Lean Ownership",
      desc: "You own the stack, the playbooks, and the knowledge.",
    },
    {
      num: "05",
      title: "Continuous Tuning",
      desc: "Models drift. Processes change. Beacon keeps the system sharp.",
    },
  ];

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="container">
        {/* Header Grid */}
        <div ref={headerRef} className={styles.headerGrid}>
          {/* Label at the very top */}
          <div className={styles.fullWidthLabel}>
            <span className={styles.sectionLabel}>
              Why Beacon
            </span>
          </div>

          <div className={styles.headerMain}>
            {/* Title Column */}
            <div className={styles.colTitle}>
              <h2 className={styles.sectionTitle}>
                NO HYPE. NO LOCK-IN. NO<br />
                <span className={styles.italicSerif}>stranded pilots.</span>
              </h2>
            </div>

            {/* Description Column */}
            <div className={styles.colDesc}>
              <p className={styles.headerDesc}>
                Five operating principles that keep AI tied to the P&L.
              </p>
            </div>
          </div>
        </div>

        {/* Principles Table */}
        <div ref={principlesListRef} className={styles.principlesList}>
          {principles.map((p) => (
            <div
              key={p.num}
              className={styles.principleRow}
            >
              {/* Number */}
              <div className={styles.colNum}>
                <span className={styles.rowNum}>
                  {p.num}
                </span>
              </div>

              {/* Title */}
              <div className={styles.colTitleCell}>
                <h3 className={styles.rowTitle}>
                  {p.title}
                </h3>
              </div>

              {/* Description */}
              <div className={styles.colDescCell}>
                <p className={styles.rowDesc}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
