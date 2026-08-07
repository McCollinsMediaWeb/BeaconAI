"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Services.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Animate Header Elements
      if (headerRef.current) {
        gsap.fromTo(
          [headerRef.current.querySelector(`.${styles.leftCol}`), headerRef.current.querySelector(`.${styles.rightCol}`)],
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

      // 2. Animate Cards with a staggered fade up
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      id: "01",
      title: "AUDIT",
      desc: "We quantify where AI delivers return<br/> and where it is a distraction.",
      image: "/assets/audit-image.png",
      cardClass: styles.cardDark,
      titleClass: styles.titleLight,
      descClass: styles.descDark,
    },
    {
      id: "02",
      title: "AUTOMATE",
      desc: "Production-grade agents and workflows,<br/> integrated into the systems you already run.",
      video: "/assets/automate-video.mp4",
      cardClass: styles.cardAutomate,
      titleClass: styles.titleDark,
      descClass: styles.descLight,
    },
    {
      id: "03",
      title: "OPTIMIZE",
      desc: "We keep them monitored, tuned, and<br/> improving. Set-and-forget is a myth.",
      image: "/assets/optimize-image.png",
      cardClass: styles.cardOptimize,
      titleClass: styles.titleDark,
      descClass: styles.descLight,
    },
  ];

  return (
    <section ref={sectionRef} id="services" className={styles.section}>
      <div className="container">
        {/* Services Section Header */}
        <div ref={headerRef} className={styles.headerGrid}>
          {/* Left Column: Index & Category */}
          <div className={styles.leftCol}>
            <div className={styles.leftHeader}>
              <span className={styles.indexNum}>(02)</span>
              <span className={styles.categoryTitle}>What We Do</span>
            </div>
          </div>

          {/* Right Column: Title */}
          <div className={styles.rightCol}>
            <h2 className={styles.heading}>
              Selected Signals From
              <span className={styles.italicSerif}>
                the operating layer.
              </span>
            </h2>
          </div>
        </div>

        {/* Grid of Cards */}
        <div ref={cardsRef} className={styles.grid}>
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${styles.card} ${card.cardClass}`}
            >
              {/* Card Graphic Container (Fills 100% of card height) */}
              <div className={styles.imageWrapper}>
                {card.video ? (
                  <video
                    src={card.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.cardVideo}
                  />
                ) : (
                  <Image
                    src={card.image || ""}
                    alt={`${card.title} Illustration`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={card.id === "01"}
                  />
                )}
              </div>

              {/* Bottom Content Area */}
              <div className={styles.cardContent}>
                <h3 className={`${styles.cardTitle} ${card.titleClass}`}>
                  {card.title}
                </h3>
                <p
                  className={`${styles.cardDesc} ${card.descClass}`}
                  dangerouslySetInnerHTML={{ __html: card.desc }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
