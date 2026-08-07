"use client";

import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
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
    <section id="work" className={styles.section}>
      <div className="container howItWorkContainer">
        {/* Header Section (Matching dual column layouts) */}
        <div className={styles.headerGrid}>
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
        <div className={styles.stepsList}>
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

              {/* Description (Supports <br /> rendering) */}
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
