"use client";

import Image from "next/image";
import styles from "./Services.module.css";

export default function Services() {
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
    <section id="services" className={styles.section}>
      <div className="container">
        {/* Services Section Header (matching layout structure of The Gap) */}
        <div className={styles.headerGrid}>
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
        <div className={styles.grid}>
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

              {/* Bottom Content Area (Overlayed on top of graphic background) */}
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
