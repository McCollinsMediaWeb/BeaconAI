"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TheGap.module.css";

export default function TheGap() {
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register the ScrollTrigger plugin on client mount
    gsap.registerPlugin(ScrollTrigger);

    if (rightColRef.current) {
      const elements = rightColRef.current.children;

      // Animate child elements with a staggered reveal on scroll
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rightColRef.current,
            start: "top 85%", // Triggers when the top of the content is 85% down the viewport
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Scroll Down Line and Divider */}
        <div className={styles.scrollDownWrapper}>
          <span className={styles.scrollDownText}>
            Scroll Down
          </span>
          <hr className={styles.divider} />
        </div>

        {/* Main Grid Content */}
        <div className={styles.mainGrid}>
          {/* Left Column: Index & Category (Sticky Pinned on Scroll) */}
          <div className={styles.leftCol}>
            <div className={styles.leftHeader}>
              <span className={styles.indexNum}>(01)</span>
              <span className={styles.categoryTitle}>The Gap</span>
            </div>
          </div>

          {/* Right Column: Title, Copy, Stats, Subcopy, Button (Revealed via ScrollTrigger) */}
          <div className={styles.rightCol}>
            <div ref={rightColRef} className={styles.rightContent}>
              {/* Heading */}
              <h2 className={styles.heading}>
                AI does not fail in the demo.
                <span className={styles.italicSerif}>
                  It fails in the workflow.
                </span>
              </h2>

              {/* Core copy */}
              <p className={styles.paragraph}>
                The gap is not the technology. It is the implementation: pilots that stall,
                tools that never reach the workflow, and capital with nothing to show for it.
              </p>

              {/* Stats Columns */}
              <div className={styles.statsGrid}>
                {/* Stat 1 */}
                <div className={styles.statItem}>
                  <span className={styles.statValue}>88%</span>
                  <span className={styles.statLabel}>
                    Of companies have deployed AI
                  </span>
                </div>
                {/* Stat 2 */}
                <div className={styles.statItem}>
                  <span className={`${styles.statValue} ${styles.orangeText}`}>6%</span>
                  <span className={styles.statLabel}>
                    See real return on it
                  </span>
                </div>
              </div>

              {/* Supporting copy */}
              <p className={styles.subParagraph}>
                AI won't fix a broken process. It scales the dysfunction. Beacon starts by deciding
                what is worth automating, what should stay human, and what return is realistic.
              </p>

              {/* Action Button */}
              <Link href="#contact" className={styles.auditBtn}>
                Start With Audit
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom divider line */}
        <hr className={styles.divider} style={{ marginTop: '2rem' }} />
      </div>
    </section>
  );
}
