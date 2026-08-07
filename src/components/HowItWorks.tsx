"use client";

import { useEffect, useRef } from "react";
import styles from "./HowItWorks.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsListRef = useRef<HTMLDivElement>(null);

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

      // 2. Reveal step rows in waterfall stagger sequence
      if (stepsListRef.current) {
        gsap.fromTo(
          stepsListRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stepsListRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Audit",
      timeline: "Weeks 1-2",
      desc: "We map your workflows and hand you an ROI roadmap.<br/>Keep it even if you walk away.",
    },
    {
      num: "02",
      title: "Build",
      timeline: "Weeks 3-6",
      desc: "We ship the highest-ROI automations first. You see<br/>value before we finish.",
    },
    {
      num: "03",
      title: "Optimize",
      timeline: "Ongoing",
      desc: "We monitor, tune, and improve. You own all of it, forever.",
    },
  ];

  return (
    <section ref={sectionRef} id="work" className={styles.section}>
      <div className="container howItWorkContainer">
        {/* Header Section */}
        <div ref={headerRef} className={styles.headerGrid}>
          {/* Label at the very top */}
          <div className={styles.fullWidthLabel}>
            <span className={styles.sectionLabel}>
              How it works
            </span>
          </div>

          <div className={styles.headerMain}>
            {/* Title Column */}
            <div className={styles.colTitle}>
              <h2 className={styles.sectionTitle}>
                FROM AUDIT TO AUTOMATED<br />
                IN WEEKS, <span className={styles.italicSerif}>not quarters.</span>
              </h2>
            </div>

            {/* Description Column */}
            <div className={styles.colDesc}>
              <p className={styles.headerDesc}>
                A de-risked path: strategy first, value early, ownership always.
              </p>
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div ref={stepsListRef} className={styles.stepsList}>
          {steps.map((step) => (
            <div
              key={step.num}
              className={styles.stepRow}
            >
              {/* Number */}
              <div className={styles.colStepNum}>
                <span className={styles.stepNum}>
                  {step.num}
                </span>
              </div>

              {/* Title */}
              <div className={styles.colStepTitle}>
                <h3 className={styles.stepTitle}>
                  {step.title}
                </h3>
              </div>

              {/* Timeline */}
              <div className={styles.colStepTimeline}>
                <span className={styles.stepTimeline}>
                  {step.timeline}
                </span>
              </div>

              {/* Description */}
              <div className={styles.colStepDesc}>
                <p
                  className={styles.stepDesc}
                  dangerouslySetInnerHTML={{ __html: step.desc }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
