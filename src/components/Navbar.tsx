"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
  ];

  return (
    <header className={styles.header}>
      <div className={`${styles.navContainer} container`}>
        {/* Logo */}
        <Link href="#home" className={styles.logoLink}>
          <Image
            src="/logo.png"
            alt="BEACON AI Logo"
            width={180}
            height={36}
            priority
            className={styles.logoImage}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <nav className={styles.navLinks}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={styles.navLink}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Extra Contact Link & Hamburger Menu */}
          <div className={styles.extraLinks}>
            <Link href="#contact" className={styles.navLink}>
              Contact
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={styles.hamburger}
              aria-label="Toggle menu"
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.mobileMenuBtn}
          aria-label="Toggle navigation menu"
        >
          <svg
            className={styles.menuIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className={styles.mobileDrawer}>
          <nav className="flex flex-col gap-5" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={styles.mobileDrawerLink}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className={`${styles.mobileDrawerLink} ${styles.mobileContactLink}`}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
