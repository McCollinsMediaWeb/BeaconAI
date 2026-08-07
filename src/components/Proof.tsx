"use client";

import styles from "./Proof.module.css";

export default function Proof() {
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
    <section id="about" className={styles.section}>
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

          {/* Right Column (Contains both Header Title and Content Grid) */}
          <div className={styles.rightCol}>
            {/* Header Title at the top of the right block */}
            <div className={styles.titleWrapper}>
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
                <div className={styles.statsList}>
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
              <div className={styles.colGraph}>
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
