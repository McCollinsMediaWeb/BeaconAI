"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CLIENTS = [
  { name: "Toshiba", src: "/assets/clients/toshiba.webp" },
  { name: "Pioneer", src: "/assets/clients/pioneer.webp" },
  { name: "Costa Coffee", src: "/assets/clients/costa-coffee.webp" },
  { name: "MMI", src: "/assets/clients/mmi.webp" },
  { name: "Oak Berry", src: "/assets/clients/oak-berry.webp" },
  { name: "Dubai Airport Freezone", src: "/assets/clients/dxb.webp" },
  { name: "Fujifilm", src: "/assets/clients/fujifilm.webp" },
  { name: "Trader Vic's", src: "/assets/clients/trader-vics.webp" },
  { name: "Wagamama", src: "/assets/clients/wagamama.webp" },
  { name: "RTA", src: "/assets/clients/rta.webp" },
  { name: "Energizer", src: "/assets/clients/energizer.webp" },
  { name: "Damac", src: "/assets/clients/damac.webp" },
];

const FOCUS_OPTIONS = [
  { label: "Leadership view", value: "Command Centre" },
  { label: "Finance", value: "Finance" },
  { label: "Sales & customer", value: "Sales & customer" },
  { label: "Marketing", value: "Marketing" },
  { label: "Operations", value: "Operations & supply chain" },
  { label: "People & HR", value: "People & HR" },
  { label: "Admin & legal", value: "Admin, legal & compliance" },
  { label: "Not sure yet", value: "Not sure" },
];

export default function LandingPage() {
  const [formStep, setFormStep] = useState(0);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    size: "",
    focus: [] as string[],
    systems: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        ".lp-hero-anim",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out" }
      );

      // Dash mock float entrance
      gsap.fromTo(
        ".lp-dash-anim",
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      );

      // Scroll reveals for Areas
      gsap.fromTo(
        ".area-card",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".areas",
            start: "top 85%",
          },
        }
      );

      // Scroll reveals for Deliverables
      gsap.fromTo(
        ".deliverable-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".get",
            start: "top 85%",
          },
        }
      );

      // Scroll reveals for Flow steps
      gsap.fromTo(
        ".flow-step",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".flow",
            start: "top 85%",
          },
        }
      );

      // Scroll reveals for Proof stats
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, scale: 0.96, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats",
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (formData.name.trim().length <= 1) errs.name = "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim()))
      errs.email = "Enter a valid work email";
    if (formData.phone.replace(/[^\d]/g, "").length < 8)
      errs.phone = "Enter a mobile number we can call or WhatsApp";
    if (formData.company.trim().length <= 1)
      errs.company = "Enter your company name";

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.role) errs.role = "Select your role";
    if (!formData.size) errs.size = "Select your team size";

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setFormStep(1);
    }
  };

  const handleBack = () => {
    setFormStep(0);
  };

  const handleFocusToggle = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      focus: prev.focus.includes(value)
        ? prev.focus.filter((item) => item !== value)
        : [...prev.focus, value],
    }));
  };

  const handleAreaClick = (focusValue: string) => {
    if (!formData.focus.includes(focusValue)) {
      setFormData((prev) => ({
        ...prev,
        focus: [...prev.focus, focusValue],
      }));
    }
    const bookEl = document.getElementById("book");
    if (bookEl) {
      bookEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setFormSubmitting(true);
    // Simulate webhook POST / Hubspot push
    await new Promise((resolve) => setTimeout(resolve, 600));
    setFormSubmitting(false);
    setFormSubmitted(true);
  };

  const firstName = formData.name.trim().split(" ")[0] || "there";

  return (
    <div ref={containerRef}>
      {/* Landing Nav */}
      <nav className="nav lp-nav" aria-label="Landing">
        <div className="wrap">
          <Link href="/" className="logo">
            <Image
              src="/assets/logo.png"
              alt="Beacon AI"
              width={123}
              height={22}
              priority
              style={{ width: "auto", height: "22px" }}
            />
          </Link>
          <div className="right">
            <a
              className="wa"
              href="https://wa.me/971559564135"
              target="_blank"
              rel="noopener"
            >
              WhatsApp us
            </a>
            <a className="btn btn-accent" href="#book">
              Book your audit
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="lp-hero" id="top">
        <div className="wrap">
          <div>
            <p className="tag lp-hero-anim">
              <b>Business audit</b> 3 weeks · Fixed fee · UAE
            </p>
            <h1 className="h-xl lp-hero-anim">
              Know where AI saves you money{" "}
              <span className="it">before you build anything.</span>
            </h1>
            <p className="lede lp-hero-anim" style={{ marginTop: "24px" }}>
              We map your data and processes, baseline what they cost today, and
              hand you a ranked list of savings with build cost and payback for
              each.
            </p>
            <ul className="ticks lp-hero-anim">
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                A priced roadmap in three weeks, not a six-month consulting
                project
              </li>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                Works with your current ERP, CRM, accounting and spreadsheets
              </li>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                Fixed fee agreed upfront. The roadmap is yours to keep
              </li>
            </ul>
            <div className="hero-cta lp-hero-anim">
              <a className="btn btn-accent" href="#book">
                Book your audit call
              </a>
              <a
                className="btn btn-ghost"
                href="https://wa.me/971559564135"
                target="_blank"
                rel="noopener"
              >
                WhatsApp us
              </a>
            </div>
          </div>

          {/* Illustrative Dashboard Mock */}
          <div
            className="dash lp-dash-anim"
            aria-label="Illustrative command centre"
          >
            <div className="dash-top">
              <i></i>
              <i></i>
              <i></i>&nbsp;What leadership sees after the build
            </div>
            <div className="dash-body">
              <div className="tile">
                <div className="k">Revenue MTD</div>
                <div className="v">AED 4.82M</div>
                <div className="d">+6.4% vs target</div>
              </div>
              <div className="tile">
                <div className="k">Cash position</div>
                <div className="v">AED 2.14M</div>
                <div className="d">+AED 180K this week</div>
              </div>
              <div className="tile">
                <div className="k">Close time</div>
                <div className="v">4 days</div>
                <div className="d">from 11</div>
              </div>
              <div className="tile alert">
                <div className="k">Today&apos;s brief</div>
                <div className="v">
                  3 invoices over 90 days, AED 186K outstanding
                </div>
              </div>
            </div>
            <p
              className="disclaim"
              style={{ padding: "0 18px 14px", margin: 0 }}
            >
              Dashboard values are illustrative.
            </p>
          </div>
        </div>
      </header>

      {/* Two-row Client Logo Marquee */}
      <section className="logos" aria-label="Brands">
        <p className="logos-cap">
          Built by the McCollins Media team, trusted by brands across the UAE
        </p>
        <div className="lrow">
          <div className="ltrack">
            <div className="lset">
              {CLIENTS.map((c, i) => (
                <Image
                  key={`r1-a-${i}`}
                  src={c.src}
                  alt={c.name}
                  width={140}
                  height={54}
                  style={{ width: "auto", height: "54px", objectFit: "contain" }}
                  loading="lazy"
                />
              ))}
            </div>
            <div className="lset" aria-hidden="true">
              {CLIENTS.map((c, i) => (
                <Image
                  key={`r1-b-${i}`}
                  src={c.src}
                  alt=""
                  width={140}
                  height={54}
                  style={{ width: "auto", height: "54px", objectFit: "contain" }}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="lrow rev">
          <div className="ltrack">
            <div className="lset">
              {[...CLIENTS].reverse().map((c, i) => (
                <Image
                  key={`r2-a-${i}`}
                  src={c.src}
                  alt={c.name}
                  width={140}
                  height={54}
                  style={{ width: "auto", height: "54px", objectFit: "contain" }}
                  loading="lazy"
                />
              ))}
            </div>
            <div className="lset" aria-hidden="true">
              {[...CLIENTS].reverse().map((c, i) => (
                <Image
                  key={`r2-b-${i}`}
                  src={c.src}
                  alt=""
                  width={140}
                  height={54}
                  style={{ width: "auto", height: "54px", objectFit: "contain" }}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="sec white" id="areas">
        <div className="wrap">
          <h2 className="h-lg">
            We look across <span className="it">every function.</span>
          </h2>
          <p className="lede" style={{ marginTop: "20px" }}>
            Or start with the one that hurts most. Tick it in the form and we
            will go there first.
          </p>
          <div className="areas">
            <div
              className="area area-card"
              onClick={() => handleAreaClick("Command Centre")}
              style={{ cursor: "pointer" }}
            >
              <span className="it">Leadership</span>
              <b>C-suite command centre</b>
              <span>Live dashboards, daily brief, board packs</span>
            </div>
            <div
              className="area area-card"
              onClick={() => handleAreaClick("Finance")}
              style={{ cursor: "pointer" }}
            >
              <span className="it">Finance</span>
              <b>Close faster, see cash sooner</b>
              <span>Invoices, reconciliation, receivables</span>
            </div>
            <div
              className="area area-card"
              onClick={() => handleAreaClick("Sales & customer")}
              style={{ cursor: "pointer" }}
            >
              <span className="it">Sales</span>
              <b>Every lead worked</b>
              <span>Enquiry to quote, CRM, WhatsApp orders</span>
            </div>
            <div
              className="area area-card"
              onClick={() => handleAreaClick("Marketing")}
              style={{ cursor: "pointer" }}
            >
              <span className="it">Marketing</span>
              <b>Spend smarter</b>
              <span>Attribution, reporting, creative roll-out</span>
            </div>
            <div
              className="area area-card"
              onClick={() => handleAreaClick("Operations & supply chain")}
              style={{ cursor: "pointer" }}
            >
              <span className="it">Operations</span>
              <b>Leaner stock</b>
              <span>Forecasting, replenishment, delivery</span>
            </div>
            <div
              className="area area-card"
              onClick={() => handleAreaClick("People & HR")}
              style={{ cursor: "pointer" }}
            >
              <span className="it">People &amp; HR</span>
              <b>Hire faster</b>
              <span>Screening, onboarding, self-serve HR</span>
            </div>
            <div
              className="area area-card"
              onClick={() => handleAreaClick("Admin, legal & compliance")}
              style={{ cursor: "pointer" }}
            >
              <span className="it">Admin &amp; legal</span>
              <b>Control without paperwork</b>
              <span>Contracts, renewals, licences, visas</span>
            </div>
            <div
              className="area area-card"
              style={{ background: "var(--ink)", color: "#fff", cursor: "pointer" }}
              onClick={() => handleAreaClick("Not sure")}
            >
              <span className="it">Not sure?</span>
              <b>Tell us the problem</b>
              <a href="#book" style={{ fontSize: "14px", color: "var(--accent)" }}>
                Start the form →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="sec" id="deliverables">
        <div className="wrap">
          <h2 className="h-lg">
            What you walk away with <span className="it">after three weeks.</span>
          </h2>
          <div className="get">
            <div className="g deliverable-card">
              <span className="num">01</span>
              <h3>A map of your systems, data and processes</h3>
              <p>
                Function by function, so you can see where work is duplicated and
                where data gets stuck.
              </p>
            </div>
            <div className="g deliverable-card">
              <span className="num">02</span>
              <h3>A cost and time baseline</h3>
              <p>
                What your priority processes cost today in hours and AED, so
                savings can be measured later.
              </p>
            </div>
            <div className="g deliverable-card">
              <span className="num">03</span>
              <h3>Ranked opportunities</h3>
              <p>
                Each with expected savings, build cost and payback period,
                highest return first.
              </p>
            </div>
            <div className="g deliverable-card">
              <span className="num">04</span>
              <h3>A transformation roadmap</h3>
              <p>
                Command centre first, then the function with the best return,
                quarter by quarter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="sec white" id="process">
        <div className="wrap">
          <h2 className="h-lg">
            How the audit <span className="it">runs.</span>
          </h2>
          <div className="flow">
            <div className="flow-step">
              <span className="k">Week 1</span>
              <h3>Discover</h3>
              <p>
                Interviews with leadership and function heads, plus read access
                to the systems that matter.
              </p>
            </div>
            <div className="flow-step">
              <span className="k">Week 2</span>
              <h3>Baseline</h3>
              <p>
                We time and cost the priority processes and trace where data
                breaks between systems.
              </p>
            </div>
            <div className="flow-step">
              <span className="k">Week 3</span>
              <h3>Price and present</h3>
              <p>
                A ranked opportunity list with savings, build cost and payback,
                presented to your leadership team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section (Dark) */}
      <section className="sec dark" id="proof">
        <div className="wrap">
          <h2 className="h-lg">
            What happens <span className="it">after the audit.</span>
          </h2>
          <p className="lede" style={{ marginTop: "20px" }}>
            The audit prices the opportunity. The build delivers it. Three UAE
            businesses that went from audit to live systems:
          </p>
          <div className="stats">
            <div className="stat stat-card">
              <span className="v">AED 740K</span>
              <span className="it">annualised savings</span>
              <p>
                Cleaning Superstore · inventory, e-commerce and customer
                automation · live in 10 weeks
              </p>
            </div>
            <div className="stat stat-card">
              <span className="v">AED 560K</span>
              <span className="it">annualised savings</span>
              <p>
                Mint Event Rentals · bookings, fleet and logistics · live in 8
                weeks
              </p>
            </div>
            <div className="stat stat-card">
              <span className="v">AED 910K</span>
              <span className="it">annualised impact</span>
              <p>
                Prowork · sales, projects and cash flow · live in 12 weeks
              </p>
            </div>
          </div>
          <span className="flag">
            Illustrative figures · replace with verified actuals before launch
          </span>
        </div>
      </section>

      {/* Booking Section */}
      <section className="sec" id="book">
        <div className="wrap book">
          <div>
            <p className="tag">
              <b>Book your audit</b> Takes 40 seconds
            </p>
            <h2 className="h-lg">
              Start with a three-week audit.{" "}
              <span className="it">Decide with real numbers.</span>
            </h2>
            <p className="lede" style={{ marginTop: "22px" }}>
              Tell us a little about your business. A Beacon lead will come back
              to book a 30-minute discovery call.
            </p>
            <ul className="ticks dark-ticks">
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                Fixed fee, agreed before we start
              </li>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                NDA from the first call
              </li>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                The roadmap is yours to keep
              </li>
            </ul>
          </div>

          <div className="formcard">
            {!formSubmitted ? (
              <form
                id="lp-form"
                noValidate
                className="form"
                onSubmit={handleSubmit}
              >
                <div className="steps-ind">
                  <span>Step {formStep + 1} of 2</span>
                  <i className={formStep >= 0 ? "on" : ""}></i>
                  <i className={formStep >= 1 ? "on" : ""}></i>
                </div>

                {/* Step 1 */}
                {formStep === 0 && (
                  <div className="form">
                    <div className="row">
                      <div className={`field ${formErrors.name ? "bad" : ""}`}>
                        <label htmlFor="lp-form-name">Full name</label>
                        <input
                          id="lp-form-name"
                          name="name"
                          autoComplete="name"
                          placeholder="Ahmed Al Mansoori"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (formErrors.name)
                              setFormErrors({ ...formErrors, name: "" });
                          }}
                        />
                        {formErrors.name && (
                          <span className="err">{formErrors.name}</span>
                        )}
                      </div>
                      <div className={`field ${formErrors.email ? "bad" : ""}`}>
                        <label htmlFor="lp-form-email">Work email</label>
                        <input
                          id="lp-form-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="ahmed@company.ae"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (formErrors.email)
                              setFormErrors({ ...formErrors, email: "" });
                          }}
                        />
                        {formErrors.email && (
                          <span className="err">{formErrors.email}</span>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className={`field ${formErrors.phone ? "bad" : ""}`}>
                        <label htmlFor="lp-form-phone">Mobile / WhatsApp</label>
                        <input
                          id="lp-form-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+971 50 000 0000"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (formErrors.phone)
                              setFormErrors({ ...formErrors, phone: "" });
                          }}
                        />
                        {formErrors.phone && (
                          <span className="err">{formErrors.phone}</span>
                        )}
                      </div>
                      <div
                        className={`field ${formErrors.company ? "bad" : ""}`}
                      >
                        <label htmlFor="lp-form-company">Company</label>
                        <input
                          id="lp-form-company"
                          name="company"
                          autoComplete="organization"
                          placeholder="Company name"
                          value={formData.company}
                          onChange={(e) => {
                            setFormData({ ...formData, company: e.target.value });
                            if (formErrors.company)
                              setFormErrors({ ...formErrors, company: "" });
                          }}
                        />
                        {formErrors.company && (
                          <span className="err">{formErrors.company}</span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-accent"
                      onClick={handleNext}
                    >
                      Continue{" "}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ width: "16px", height: "16px" }}
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                    <p className="consent">
                      Takes 40 seconds. No sales sequence, just one call with a
                      Beacon lead.
                    </p>
                  </div>
                )}

                {/* Step 2 */}
                {formStep === 1 && (
                  <div className="form">
                    <div className="row">
                      <div className={`field ${formErrors.role ? "bad" : ""}`}>
                        <label htmlFor="lp-form-role">Your role</label>
                        <select
                          id="lp-form-role"
                          name="role"
                          value={formData.role}
                          onChange={(e) => {
                            setFormData({ ...formData, role: e.target.value });
                            if (formErrors.role)
                              setFormErrors({ ...formErrors, role: "" });
                          }}
                        >
                          <option value="">Select</option>
                          <option>Founder / CEO / MD</option>
                          <option>CFO / Finance</option>
                          <option>COO / Operations</option>
                          <option>Sales or marketing head</option>
                          <option>IT / Digital</option>
                          <option>Other</option>
                        </select>
                        {formErrors.role && (
                          <span className="err">{formErrors.role}</span>
                        )}
                      </div>
                      <div className={`field ${formErrors.size ? "bad" : ""}`}>
                        <label htmlFor="lp-form-size">Team size</label>
                        <select
                          id="lp-form-size"
                          name="size"
                          value={formData.size}
                          onChange={(e) => {
                            setFormData({ ...formData, size: e.target.value });
                            if (formErrors.size)
                              setFormErrors({ ...formErrors, size: "" });
                          }}
                        >
                          <option value="">Select</option>
                          <option>1–25</option>
                          <option>26–100</option>
                          <option>101–250</option>
                          <option>251–1,000</option>
                          <option>1,000+</option>
                        </select>
                        {formErrors.size && (
                          <span className="err">{formErrors.size}</span>
                        )}
                      </div>
                    </div>

                    <div className="field">
                      <label>Where should we look first?</label>
                      <div className="chips">
                        {FOCUS_OPTIONS.map((opt) => (
                          <label key={opt.value} className="chip">
                            <input
                              type="checkbox"
                              name="focus"
                              value={opt.value}
                              checked={formData.focus.includes(opt.value)}
                              onChange={() => handleFocusToggle(opt.value)}
                            />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="lp-form-systems">
                        Systems you run today{" "}
                        <span
                          style={{
                            textTransform: "none",
                            letterSpacing: 0,
                            fontWeight: 400,
                          }}
                        >
                          (optional)
                        </span>
                      </label>
                      <input
                        id="lp-form-systems"
                        name="systems"
                        placeholder="e.g. Zoho, Odoo, SAP B1, Tally, Shopify, Excel"
                        value={formData.systems}
                        onChange={(e) =>
                          setFormData({ ...formData, systems: e.target.value })
                        }
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={handleBack}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn btn-accent"
                        style={{ flex: 1 }}
                        disabled={formSubmitting}
                      >
                        {formSubmitting ? "Sending…" : "Book my audit call"}
                      </button>
                    </div>

                    <p className="consent">
                      We use your details only to contact you about Beacon. Your
                      data stays private.
                    </p>
                  </div>
                )}
              </form>
            ) : (
              <div tabIndex={-1} className="success">
                <div className="tick">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </div>
                <h3 className="h-md">
                  Thanks, <span>{firstName}</span>.{" "}
                  <span className="it">We have it.</span>
                </h3>
                <ol>
                  <li>
                    A Beacon lead reviews your answers within one working day.
                  </li>
                  <li>
                    We call or WhatsApp you to book a 30-minute discovery call.
                  </li>
                  <li>
                    If there is a fit, you get a fixed-fee audit proposal in
                    writing.
                  </li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Common Questions FAQ */}
      <section className="sec white" id="faq">
        <div className="wrap" style={{ maxWidth: "900px" }}>
          <h2 className="h-lg" style={{ marginBottom: "32px" }}>
            Common <span className="it">questions.</span>
          </h2>
          <div className="faq">
            <details open>
              <summary>What does the audit cost?</summary>
              <p>
                A fixed fee, quoted after a 30-minute discovery call once we
                understand your size and scope. No hourly billing and no surprises.
              </p>
            </details>
            <details>
              <summary>Do we have to build with Beacon afterwards?</summary>
              <p>
                No. The roadmap is yours to keep. Most clients continue to the
                build because the business case is already priced.
              </p>
            </details>
            <details>
              <summary>Will we need to change our systems?</summary>
              <p>
                No. We work with SAP, Oracle, Odoo, Zoho, Tally, Shopify, POS
                systems and spreadsheets, and connect them rather than replace
                them.
              </p>
            </details>
            <details>
              <summary>How much of our team&apos;s time does it take?</summary>
              <p>
                A kickoff with leadership and around an hour with each function
                head. We do the rest.
              </p>
            </details>
            <details>
              <summary>Is our data safe?</summary>
              <p>
                We work under NDA from the first call, with read-only access
                where possible. Your data stays in your systems.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="final">
        <div className="wrap">
          <h2 className="h-lg">
            Ready to see the numbers?{" "}
            <span className="it">Book the audit call.</span>
          </h2>
          <a className="btn btn-ink" href="#book">
            Book your audit call
          </a>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="foot" style={{ paddingBlock: "36px" }}>
        <div
          className="wrap"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            fontSize: "13px",
            color: "#a9a9af",
          }}
        >
          <span>© 2026 Beacon AI · Dubai, UAE</span>
          <span>hello@beacon.ai</span>
          <span>Privacy policy · Terms of use</span>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        className="wa-float"
        href="https://wa.me/971559564135"
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z" />
        </svg>
      </a>

      {/* Mobile Sticky Bar */}
      <div className="mbar">
        <a
          className="btn btn-wa"
          href="https://wa.me/971559564135"
          target="_blank"
          rel="noopener"
          style={{ flex: "0 0 auto", padding: "0 18px" }}
        >
          WhatsApp
        </a>
        <a className="btn btn-accent" href="#book">
          Book your audit
        </a>
      </div>
    </div>
  );
}
