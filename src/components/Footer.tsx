"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const logoRef = useRef<HTMLDivElement>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed ${email} to signal notes!`);
      setEmail("");
    }
  };

  // GSAP Character Fall-In animation using standard useEffect and gsap.context
  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = logoRef.current?.querySelectorAll(".char");
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: -150,       /* Fall from top */
            rotateX: -45,   /* 3D tilt perspective */
            scale: 0.85,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.3,
            stagger: 0.05,  /* Waterfall delay between chars */
            ease: "back.out(1.5)", /* Smooth spring bounce as characters land */
            scrollTrigger: {
              trigger: logoRef.current,
              start: "top 90%", /* Starts when footer reaches 90% of screen */
              toggleActions: "play none none none",
            },
            clearProps: "transform",
          }
        );
      }
    }, logoRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        {/* Top Row: Massive Filled Logo with animated characters */}
        <div className={styles.outlinedLogo} ref={logoRef}>
          <span className="char">B</span>
          <span className="char">E</span>
          <span className="char">A</span>
          <span className="char">C</span>
          <span className="char">
            <svg viewBox="0 0 100 140" className={styles.logoO} aria-label="O">
              <defs>
                <mask id="o-mask-svg">
                  <rect x="0" y="0" width="100" height="140" fill="#ffffff" />
                  <rect x="32" y="32" width="36" height="76" rx="4" fill="#000000" />
                </mask>
              </defs>
              <g mask="url(#o-mask-svg)" fill="currentColor">
                <rect x="30" y="4" width="40" height="132" rx="8" />
                <rect x="4" y="38" width="92" height="64" rx="8" />
                <rect x="16" y="16" width="68" height="108" rx="12" />
              </g>
            </svg>
          </span>
          <span className="char">N</span>
          <span className={styles.logoSpace}>&nbsp;</span>
          <span className="char">A</span>
          <span className="char">I</span>
        </div>

        {/* Middle Row: Contact and Newsletter Signup */}
        <div className={styles.topGrid}>
          {/* Contact Details */}
          <div className={styles.colContact}>
            <span className={styles.contactLabel}>
              New Business:
            </span>
            <a
              href="mailto:hello@beacon.ai"
              className={styles.contactEmail}
            >
              hello@beacon.ai
            </a>
          </div>

          {/* Newsletter Form */}
          <div className={styles.colNewsletter}>
            <h3 className={styles.newsletterTitle}>
              Sign up for signal notes. No spam.
            </h3>
            <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
              <input
                type="email"
                required
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.emailInput}
              />
              <button
                type="submit"
                className={styles.submitBtn}
                aria-label="Subscribe"
              >
                <svg
                  className={styles.btnArrowSvg}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Row: Link Columns and Copyright */}
        <div className={styles.bottomGrid}>
          {/* Navigation Links */}
          <div className={styles.column}>
            <Link href="#home" className={styles.link}>Home</Link>
            <Link href="#work" className={styles.link}>Work</Link>
            <Link href="#about" className={styles.link}>About</Link>
            <Link href="#services" className={styles.link}>Services</Link>
            <Link href="#contact" className={styles.link}>Contact</Link>
          </div>

          {/* Social Links */}
          <div className={styles.column}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
              <svg className={styles.linkArrowSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              Instagram
              <svg className={styles.linkArrowSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
              <svg className={styles.linkArrowSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              LinkedIn
              <svg className={styles.linkArrowSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>

          {/* Location */}
          <div className={styles.column}>
            <span className={styles.locationText}>Dubai—UAE</span>
          </div>

          {/* Legal / Copyright */}
          <div className={styles.colLegal}>
            <span className={styles.legalText}>Terms of use ©26</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
