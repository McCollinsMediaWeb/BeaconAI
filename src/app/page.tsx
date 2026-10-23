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

const FUNCTIONS_DATA = [
  {
    id: "command",
    tab: "Command centre",
    title: "C-suite",
    tag: "The whole business, at a glance.",
    short: "Live dashboards, daily brief",
    breaks: [
      "Management reports arrive weeks after month-end",
      "Each department reports its own version of the numbers",
      "Leaders spend hours chasing updates instead of deciding",
    ],
    steps: [
      ["Command dashboard", "Revenue, margin, cash, pipeline and operations health, live."],
      ["Daily leadership brief", "What changed, what is at risk, what needs a decision."],
      ["Ask your data", "Plain-language questions in English or Arabic, answered from company data."],
      ["Board pack automation", "Monthly management and board reports built automatically."],
    ],
    kpis: "Reporting hours, decision speed, forecast accuracy, time to spot issues",
    tiles: [
      { k: "Revenue MTD", v: "AED 4.82M", d: "+6.4% vs target" },
      { k: "Gross margin", v: "31.2%", d: "-0.8 pts WoW" },
      { k: "Cash position", v: "AED 2.14M", d: "+AED 180K this week" },
      { k: "Today's brief", v: "Margin on Category B down 3.1 pts after supplier price change", alert: true },
    ],
  },
  {
    id: "finance",
    tab: "Finance",
    title: "Finance",
    tag: "Close faster. See cash sooner.",
    short: "Close, cash, receivables, spend control",
    breaks: [
      "Invoices keyed in by hand and reconciled line by line",
      "Receivables chased one email at a time",
      "Cash forecast lives in a spreadsheet updated monthly",
    ],
    steps: [
      ["Simplify", "Invoice capture, three-way matching and automatic bank reconciliation."],
      ["Reduce cost", "Fewer month-end hours, lower late-payment and financing costs."],
      ["Access data", "Live P&L, cash position and receivables ageing by customer."],
      ["See patterns", "Spend anomalies, duplicate payments and margin leakage flagged early."],
    ],
    kpis: "Month-end close time, DSO, cost per invoice, cash forecast accuracy",
    tiles: [
      { k: "Close time", v: "4 days", d: "from 11" },
      { k: "DSO", v: "48 days", d: "from 67" },
      { k: "Invoices auto-matched", v: "86%" },
      { k: "Pattern detected", v: "Duplicate supplier payment: AED 23,400, held for review", alert: true },
    ],
  },
  {
    id: "sales",
    tab: "Sales & customer",
    title: "Sales & customer",
    tag: "Every lead worked. Every customer kept.",
    short: "Pipeline, quoting, orders, service",
    breaks: [
      "Enquiries wait hours or days for a first reply",
      "CRM data is incomplete, so the pipeline is a guess",
      "Order status questions flood WhatsApp and phones",
    ],
    steps: [
      ["Simplify", "Enquiry-to-quote automated, CRM updated from email and WhatsApp."],
      ["Reduce cost", "Less admin per deal and self-serve order updates that cut support load."],
      ["Access data", "Pipeline, conversion by source and rep, and customer value, live."],
      ["See patterns", "Deal scoring, churn signals, reorder timing and cross-sell prompts."],
    ],
    kpis: "Speed to lead, win rate, repeat purchase rate, cost to serve",
    tiles: [
      { k: "Speed to lead", v: "4 min", d: "from 6 hrs" },
      { k: "Win rate", v: "27%", d: "from 19%" },
      { k: "Repeat rate", v: "+24%" },
      { k: "Pattern detected", v: "14 key accounts past their usual reorder date, total value AED 212K", alert: true },
    ],
  },
  {
    id: "marketing",
    tab: "Marketing",
    title: "Marketing",
    tag: "Spend smarter. See what returns.",
    short: "Spend, content, campaigns, attribution",
    breaks: [
      "Budget spread across channels with no single view of return",
      "Performance reports assembled by hand every month",
      "Campaign roll-out slowed by manual resizing and approvals",
    ],
    steps: [
      ["Simplify", "Automated reporting, approval workflows, auto-publishing and ad variants from approved key visuals."],
      ["Reduce cost", "Lower production cost per asset and budget moved away from what does not convert."],
      ["Access data", "Spend to lead to revenue attribution across every channel, live."],
      ["See patterns", "Winning audiences and creative elements, with alerts on spend and cost per lead."],
    ],
    kpis: "Cost per acquisition, marketing ROI, reporting hours, time to launch",
    tiles: [
      { k: "Cost per lead", v: "-28%" },
      { k: "Report preparation", v: "1 hr", d: "from 3 days" },
      { k: "Time to launch", v: "2 days", d: "from 9" },
      { k: "Pattern detected", v: "Cost per lead on Meta up 34% this week, AED 9K reallocation to Search suggested", alert: true },
    ],
  },
  {
    id: "ops",
    tab: "Operations & supply chain",
    title: "Operations & supply chain",
    tag: "Leaner stock. Fewer surprises.",
    short: "Inventory, procurement, fulfilment",
    breaks: [
      "Stock-outs and dead stock at the same time",
      "Purchase orders placed on instinct, not demand",
      "Delivery planning run from spreadsheets and calls",
    ],
    steps: [
      ["Simplify", "Auto-replenishment, PO generation and supplier lead-time tracking."],
      ["Reduce cost", "Lower carrying cost, fewer emergency buys, consolidated deliveries."],
      ["Access data", "Live stock by location, fulfilment status and supplier performance."],
      ["See patterns", "Demand forecasts by SKU and season, including Ramadan, summer and Q4."],
    ],
    kpis: "Stock-outs, inventory turns, order-to-dispatch time, cost per delivery",
    tiles: [
      { k: "Stock-outs", v: "-41%" },
      { k: "Inventory turns", v: "7.2x", d: "from 4.9x" },
      { k: "Dispatch time", v: "9 hrs", d: "from 26" },
      { k: "Pattern detected", v: "Supplier lead time up 6 days on 38 SKUs, reorder points adjusted", alert: true },
    ],
  },
  {
    id: "hr",
    tab: "People & HR",
    title: "People & HR",
    tag: "Hire faster. Run lighter.",
    short: "Hiring, onboarding, workforce",
    breaks: [
      "CVs screened manually for every role",
      "Onboarding runs on checklists and email threads",
      "HR answers the same policy questions every day",
    ],
    steps: [
      ["Simplify", "CV screening and shortlisting, onboarding workflows, self-serve requests."],
      ["Reduce cost", "Shorter time to hire, lower agency spend, fewer admin hours."],
      ["Access data", "Headcount cost by department, attrition and capacity, live."],
      ["See patterns", "Attrition risk, overtime trends and workload against capacity."],
    ],
    kpis: "Time to hire, cost per hire, HR tickets per employee, attrition",
    tiles: [
      { k: "Time to hire", v: "19 days", d: "from 41" },
      { k: "HR tickets", v: "-58%" },
      { k: "Agency spend", v: "-35%" },
      { k: "Pattern detected", v: "Overtime in warehouse team up 22% for 3 weeks, capacity review suggested", alert: true },
    ],
  },
  {
    id: "admin",
    tab: "Admin, legal & compliance",
    title: "Admin, legal & compliance",
    tag: "Control without the paperwork.",
    short: "Contracts, approvals, renewals",
    breaks: [
      "Contracts live in inboxes and shared drives",
      "Renewals and expiries are missed or caught late",
      "Approvals stall in email chains",
    ],
    steps: [
      ["Simplify", "Contract repository with clause extraction and approval workflows."],
      ["Reduce cost", "Avoided penalties and auto-renewals, less review time on standard documents."],
      ["Access data", "One calendar of obligations, licences, visas and vendor terms."],
      ["See patterns", "Risky clauses flagged, spend against contract terms, vendor concentration."],
    ],
    kpis: "Missed renewals, approval cycle time, contract turnaround",
    tiles: [
      { k: "Missed renewals", v: "0", d: "from 9 per year" },
      { k: "Approval cycle", v: "1.5 days", d: "from 6" },
      { k: "Contract review", v: "-60%", d: "time" },
      { k: "Pattern detected", v: "Trade licence and 4 employee visas expire within 45 days", alert: true },
    ],
  },
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

export default function Home() {
  const [activeTab, setActiveTab] = useState("command");
  const [people, setPeople] = useState(20);
  const [hours, setHours] = useState(8);
  const [salary, setSalary] = useState(12000);
  const [copyStatus, setCopyStatus] = useState("hello@beacon.ai · copy");

  // Multi-step form state
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
  const [formSubmitError, setFormSubmitError] = useState<string | null>(null);

  const mainRef = useRef<HTMLDivElement>(null);
  const svcRef = useRef<HTMLDivElement>(null);
  const formStepRef = useRef<HTMLDivElement>(null);

  // Smooth Estimator calculations via GSAP number interpolation
  const calcObj = useRef({
    hours: 20 * 8 * 48,
    cost: 20 * 8 * 48 * (12000 / 173),
  });
  const [animHours, setAnimHours] = useState(calcObj.current.hours);
  const [animCost, setAnimCost] = useState(calcObj.current.cost);

  useEffect(() => {
    const targetHours = people * hours * 48;
    const targetCost = targetHours * (salary / 173);

    gsap.to(calcObj.current, {
      hours: targetHours,
      cost: targetCost,
      duration: 0.45,
      ease: "power2.out",
      onUpdate: () => {
        setAnimHours(Math.round(calcObj.current.hours));
        setAnimCost(Math.round(calcObj.current.cost));
      },
    });
  }, [people, hours, salary]);

  const formattedHours = Math.round(animHours).toLocaleString("en-US");
  const formattedCost =
    animCost >= 1e6
      ? `AED ${(animCost / 1e6).toFixed(2)}M`
      : `AED ${Math.round(animCost / 1000).toLocaleString("en-US")}K`;

  // GSAP Entrance & ScrollTrigger animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero entrance
      gsap.fromTo(
        ".hero-anim",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }
      );

      // 2. Hero subtle background parallax on scroll
      gsap.to(".hero", {
        backgroundPosition: "75% 65%",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 3. Client logos marquee entrance
      gsap.fromTo(
        ".logos",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".logos",
            start: "top 88%",
          },
        }
      );

      // 4. Section headings reveal
      const sections = document.querySelectorAll(".sec");
      sections.forEach((sec) => {
        const head = sec.querySelector(".head-row, .h-lg");
        if (head) {
          gsap.fromTo(
            head,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sec,
                start: "top 82%",
              },
            }
          );
        }
      });

      // 5. System Layer elements 3D entrance
      gsap.fromTo(
        ".layer-anim",
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".layers",
            start: "top 82%",
          },
        }
      );

      // 6. Applied outcomes cards in Layer section
      gsap.fromTo(
        ".applied div",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".applied",
            start: "top 85%",
          },
        }
      );

      // 7. Problem pillars 4-cards reveal
      gsap.fromTo(
        ".pillar",
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pillars",
            start: "top 85%",
          },
        }
      );

      // 8. Callout band reveal
      gsap.fromTo(
        ".band",
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".band",
            start: "top 88%",
          },
        }
      );

      // 9. ROI Estimator card reveal
      gsap.fromTo(
        ".est-card",
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".est",
            start: "top 82%",
          },
        }
      );

      // 10. How We Work (3 Engagement Tiers)
      gsap.fromTo(
        ".eng .eg",
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".eng",
            start: "top 85%",
          },
        }
      );

      // 11. Case cards in Results
      gsap.fromTo(
        ".case-anim",
        { opacity: 0, y: 45, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cases",
            start: "top 85%",
          },
        }
      );

      // 12. Why Beacon (5 Operating Principles)
      gsap.fromTo(
        ".prin div",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".prin",
            start: "top 85%",
          },
        }
      );

      // 13. Next steps ordered list in Where to Start
      gsap.fromTo(
        ".next li",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".next",
            start: "top 85%",
          },
        }
      );

      // 14. Contact formcard entrance
      gsap.fromTo(
        "#contact .formcard",
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#contact",
            start: "top 85%",
          },
        }
      );

      // 15. FAQ details cards reveal
      gsap.fromTo(
        ".faq details",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq",
            start: "top 85%",
          },
        }
      );

      // 16. Massive Footer BEACON AI text tracking expansion
      gsap.fromTo(
        ".foot .big",
        { opacity: 0.25, letterSpacing: "-0.075em", y: 25 },
        {
          opacity: 1,
          letterSpacing: "-0.05em",
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".foot",
            start: "top 88%",
          },
        }
      );

      // 17. Floating WhatsApp button continuous gentle bob
      gsap.to(".wa-float", {
        y: -6,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Animate tab content change with staggered micro-animations
  useEffect(() => {
    if (svcRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".svc-title, .svc-tag",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
        gsap.fromTo(
          ".breaks li",
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }
        );
        gsap.fromTo(
          ".steps4 .s4",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" }
        );
        gsap.fromTo(
          ".dash-body .tile",
          { opacity: 0, scale: 0.94, y: 12 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "back.out(1.5)" }
        );
      }, svcRef);

      return () => ctx.revert();
    }
  }, [activeTab]);

  // Animate form step transition
  useEffect(() => {
    if (formStepRef.current) {
      gsap.fromTo(
        formStepRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [formStep]);

  // Animate form submission success checkmark
  useEffect(() => {
    if (formSubmitted) {
      gsap.fromTo(
        ".success .tick",
        { scale: 0, rotation: -30 },
        { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" }
      );
      gsap.fromTo(
        ".success h3, .success ol li",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.1, delay: 0.15, ease: "power2.out" }
      );
    }
  }, [formSubmitted]);

  // Function selection jump
  const handleSelectFunction = (id: string) => {
    setActiveTab(id);
    const target = document.getElementById("services");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Prefill focus in form
  const handleAuditFocus = (focusName: string) => {
    if (!formData.focus.includes(focusName)) {
      setFormData((prev) => ({ ...prev, focus: [...prev.focus, focusName] }));
    }
    const target = document.getElementById("contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Copy email handler
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@beacon.ai");
      setCopyStatus("Copied ✓");
    } catch {
      setCopyStatus("hello@beacon.ai");
    }
    setTimeout(() => setCopyStatus("hello@beacon.ai · copy"), 2000);
  };

  // Form Validation & Navigation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim()))
      errs.email = "Enter a valid work email";
    if (formData.phone.replace(/[^\d]/g, "").length < 8)
      errs.phone = "Enter a mobile number we can call or WhatsApp";
    if (!formData.company.trim()) errs.company = "Enter your company name";

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

  const handleNextStep = () => {
    if (validateStep1()) {
      setFormStep(1);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setFormSubmitting(true);
    setFormSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "Homepage Audit Form",
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(
          data?.message || "Something went wrong while submitting. Please try again."
        );
      }

      setFormSubmitted(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to submit. Please try again or reach out to hello@beacon.ai";
      setFormSubmitError(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  const currentFn = FUNCTIONS_DATA.find((f) => f.id === activeTab) || FUNCTIONS_DATA[0];
  const isCmd = activeTab === "command";

  return (
    <div ref={mainRef}>
      {/* Top Navigation */}
      <nav className="nav" aria-label="Main">
        <div className="wrap">
          <Link href="#top" className="logo" aria-label="Beacon AI home">
            <Image
              src="/logo-new-tr.png"
              alt="Beacon AI"
              width={200}
              height={42}
              priority
              style={{ height: "52px", width: "auto" }}
            />
          </Link>
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#how">How we work</a></li>
            <li><a href="#results">Results</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <a className="btn btn-accent" href="#contact">
            Book an audit
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero" id="top">
        <div className="wrap">
          <p className="tag hero-anim">
            <b>(00)</b> AI business transformation · Dubai, UAE
          </p>
          <h1 className="h-xl hero-anim">
            The whole<br />
            business, <span className="it">in view.</span>
          </h1>
          <p className="lede hero-anim">
            AI that gives leadership a live view of the organisation, then makes
            every department simpler, leaner and smarter. Measured against your
            P&amp;L.
          </p>
          <div className="hero-cta hero-anim">
            <a className="btn btn-accent" href="#contact">
              Book a business audit
            </a>
            <a className="btn btn-ghost" href="#services">
              See what we build
            </a>
          </div>
          <div className="trust hero-anim">
            <span>Three-week audit, fixed fee</span>
            <span>Works with the systems you already run</span>
            <span>English and Arabic</span>
            <span>You own everything we build</span>
          </div>
        </div>
      </header>

      {/* Client Logos Marquee */}
      <section className="logos" aria-label="Brands">
        <p className="logos-cap">
          Built by the McCollins Media team, trusted by brands across the UAE
        </p>

        {/* Row 1 */}
        <div className="lrow">
          <div className="ltrack">
            <div className="lset">
              {CLIENTS.map((c, i) => (
                <img key={i} src={c.src} alt={c.name} loading="lazy" />
              ))}
            </div>
            <div className="lset" aria-hidden="true">
              {CLIENTS.map((c, i) => (
                <img key={`dup1-${i}`} src={c.src} alt="" loading="lazy" />
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 (Reverse) */}
        <div className="lrow rev">
          <div className="ltrack">
            <div className="lset">
              {[...CLIENTS].reverse().map((c, i) => (
                <img key={i} src={c.src} alt={c.name} loading="lazy" />
              ))}
            </div>
            <div className="lset" aria-hidden="true">
              {[...CLIENTS].reverse().map((c, i) => (
                <img key={`dup2-${i}`} src={c.src} alt="" loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section (01): The Business Ecosystem */}
      <section className="sec dark" id="system">
        <div className="wrap">
          <div className="head-row">
            <div>
              <p className="tag"><b>(01)</b> How it fits together</p>
              <h2 className="h-lg">
                One operating system <span className="it">for the whole business.</span>
              </h2>
            </div>
            <p className="lede">
              Four layers. Your existing data at the bottom, an AI layer that does the
              work, and one command centre on top. Pick a function to see what changes.
            </p>
          </div>

          <div className="layers">
            {/* Layer 01 */}
            <div
              className="layer l1 layer-anim"
              onClick={() => handleSelectFunction("command")}
              style={{ cursor: "pointer" }}
            >
              <div>
                <div className="lk">Layer 01 · Oversight</div>
                <h3>C-suite command centre</h3>
              </div>
              <p>
                Live dashboards, a daily leadership brief, alerts and
                plain-language questions across every function.
              </p>
            </div>

            {/* Layer 02 */}
            <div className="layer-anim">
              <div
                className="lk"
                style={{
                  fontSize: "11px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#8a8a90",
                  fontWeight: 600,
                  margin: "6px 0 10px",
                }}
              >
                Layer 02 · Functions
              </div>
              <div className="fns">
                {FUNCTIONS_DATA.slice(1).map((f, idx) => (
                  <button
                    key={f.id}
                    className="fn"
                    onClick={() => handleSelectFunction(f.id)}
                  >
                    <span className="num">{String(idx + 5).padStart(2, "0")}</span>
                    <b>{f.tab}</b>
                    <span>{f.short}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Layer 03 */}
            <div className="layer l3 layer-anim">
              <div>
                <div className="lk">Layer 03 · Intelligence</div>
                <h3>Beacon AI layer</h3>
              </div>
              <p>
                Agents · Workflow automation · Forecasting · Pattern recognition ·
                Alerts
              </p>
            </div>

            {/* Layer 04 */}
            <div className="layer l4 layer-anim">
              <div>
                <div className="lk">Layer 04 · Foundation</div>
                <h3>Unified data layer</h3>
              </div>
              <p>
                ERP · Accounting · CRM · POS and e-commerce · HRIS · WhatsApp and
                email · Spreadsheets
              </p>
            </div>
          </div>

          {/* Applied in every function */}
          <div className="applied">
            <div>
              <h4>Simplify</h4>
              <p>Remove steps, handoffs and re-keying.</p>
            </div>
            <div>
              <h4>Reduce cost</h4>
              <p>Lower cost to run each process.</p>
            </div>
            <div>
              <h4>Access data</h4>
              <p>The right numbers, live, for every owner.</p>
            </div>
            <div>
              <h4>See patterns</h4>
              <p>Forecasts, anomalies and signals surfaced early.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section (02): Services Tabs */}
      <section className="sec" id="services">
        <div className="wrap">
          <div className="head-row">
            <div>
              <p className="tag"><b>(02)</b> Services</p>
              <h2 className="h-lg">
                What we build, <span className="it">function by function.</span>
              </h2>
            </div>
            <p className="lede">
              Every engagement starts with the command centre, then moves to the
              function with the highest return. Each one is measured on the KPIs it
              moves.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="tabs" role="tablist" aria-label="Services">
            {FUNCTIONS_DATA.map((f) => (
              <button
                key={f.id}
                className="tab"
                role="tab"
                aria-selected={activeTab === f.id}
                onClick={() => setActiveTab(f.id)}
              >
                {f.tab}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div ref={svcRef} className="svc" role="tabpanel" aria-live="polite">
            <div>
              <h3 className="svc-title">{currentFn.title}</h3>
              <p className="svc-tag">{currentFn.tag}</p>

              <div className="svc-cols">
                <div>
                  <p className="lbl">Where it breaks today</p>
                  <ul className="breaks">
                    {currentFn.breaks.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>

                  <div className="kpis">
                    <p className="lbl acc" style={{ marginBottom: "6px" }}>
                      KPIs we move
                    </p>
                    {currentFn.kpis}
                  </div>
                </div>

                <div>
                  <p className="lbl">{isCmd ? "What we build" : "Where AI steps in"}</p>
                  <div className="steps4">
                    {currentFn.steps.map((s, idx) => (
                      <div key={idx} className="s4">
                        <h5>
                          <span className="num">0{idx + 1}</span>
                          {s[0]}
                        </h5>
                        <p>{s[1]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="svc-cta">
                <button
                  type="button"
                  className="btn btn-accent"
                  onClick={() => handleAuditFocus(currentFn.tab)}
                >
                  Audit my {isCmd ? "leadership reporting" : currentFn.tab.toLowerCase()}
                </button>
                <span className="small">Dashboard values are illustrative.</span>
              </div>
            </div>

            {/* Illustrative Dashboard Mock */}
            <div className="dash" aria-label="Illustrative dashboard">
              <div className="dash-top">
                <i></i><i></i><i></i>&nbsp;What leadership sees
              </div>
              <div className="dash-body">
                {currentFn.tiles.map((t, idx) => (
                  <div key={idx} className={`tile ${t.alert ? "alert" : ""}`}>
                    <div className="k">{t.k}</div>
                    <div className="v">{t.v}</div>
                    {t.d && <div className="d">{t.d}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section (03): The Problem */}
      <section className="sec white" id="problem">
        <div className="wrap split">
          <div>
            <p className="tag"><b>(03)</b> Why it matters</p>
            <h2 className="h-lg">
              Most leadership teams <span className="it">run on last month&apos;s data.</span>
            </h2>
            <p className="lede" style={{ marginTop: "28px" }}>
              Data sits in ten systems and a hundred spreadsheets. Reports arrive weeks
              late and every department has its own version of the truth. Processes grew
              by accident, cost crept in with them, and nobody can see the patterns that
              matter.
            </p>
            <p className="lede">
              Beacon fixes this from the top down. First we give leadership one live view
              of the business. Then we go function by function, making each one simpler,
              cheaper to run and easier to understand.
            </p>
          </div>

          <div className="pillars">
            <div className="pillar k">
              <span className="num">01</span>
              <h3>See</h3>
              <p>A bird&apos;s-eye view of the whole organisation, live, in one place.</p>
            </div>
            <div className="pillar">
              <span className="num">02</span>
              <h3>Simplify</h3>
              <p>Fewer steps, fewer handoffs, less manual work in every function.</p>
            </div>
            <div className="pillar p">
              <span className="num">03</span>
              <h3>Reduce cost</h3>
              <p>Leaner operations with savings tracked against a baseline.</p>
            </div>
            <div className="pillar l">
              <span className="num">04</span>
              <h3>Decide</h3>
              <p>Pattern recognition that surfaces risks and opportunities early.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Orange Accent Banner */}
      <div className="band">
        <div className="wrap">
          <p>Know where AI will save money before you commit to a build.</p>
          <a className="btn btn-ink" href="#contact">
            Start with a three-week audit
          </a>
        </div>
      </div>

      {/* Section (04): Quick ROI Estimator */}
      <section className="sec white" id="estimate">
        <div className="wrap est">
          <div>
            <p className="tag"><b>(04)</b> Quick estimate</p>
            <h2 className="h-lg">
              What manual work <span className="it">costs you today.</span>
            </h2>
            <p className="lede" style={{ marginTop: "24px" }}>
              Move the sliders to see what repetitive work like re-keying, report
              building and chasing updates costs each year. The audit tells you how much
              of it can go.
            </p>
            <a className="btn btn-accent" href="#contact" style={{ marginTop: "12px" }}>
              Get the real number for my business
            </a>
          </div>

          <div className="est-card">
            {/* Slider 1 */}
            <div className="rng">
              <div className="rng-top">
                <label htmlFor="e-ppl">People doing repetitive admin or reporting</label>
                <output id="o-ppl">{people}</output>
              </div>
              <input
                id="e-ppl"
                type="range"
                min="1"
                max="300"
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
              />
            </div>

            {/* Slider 2 */}
            <div className="rng">
              <div className="rng-top">
                <label htmlFor="e-hrs">Hours each spends on it per week</label>
                <output id="o-hrs">{hours}</output>
              </div>
              <input
                id="e-hrs"
                type="range"
                min="1"
                max="30"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
              />
            </div>

            {/* Slider 3 */}
            <div className="rng">
              <div className="rng-top">
                <label htmlFor="e-sal">Average monthly salary (AED)</label>
                <output id="o-sal">{salary.toLocaleString("en-US")}</output>
              </div>
              <input
                id="e-sal"
                type="range"
                min="3000"
                max="60000"
                step="500"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
              />
            </div>

            {/* Outputs */}
            <div className="est-out">
              <div>
                <div className="k">Hours per year</div>
                <div className="v" id="r-hrs">{formattedHours}</div>
              </div>
              <div>
                <div className="k">Cost per year</div>
                <div className="v acc" id="r-cost">{formattedCost}</div>
              </div>
            </div>

            <p className="small" style={{ margin: 0 }}>
              Assumes 48 working weeks and 173 paid hours per month. Salary cost only,
              before visas, housing and overheads.
            </p>
          </div>
        </div>
      </section>

      {/* Section (05): How We Work */}
      <section className="sec dark" id="how">
        <div className="wrap">
          <div className="head-row">
            <div>
              <p className="tag"><b>(05)</b> How we work</p>
              <h2 className="h-lg">
                Top down. <span className="it">Function by function.</span>
              </h2>
            </div>
            <p className="lede">
              A fixed-fee audit first, so you see the opportunity priced before you
              commit to a build.
            </p>
          </div>

          <div className="eng">
            <div className="eg e1">
              <div className="meta">
                <span>Weeks 1 to 3</span>
                <b>Fixed fee</b>
              </div>
              <h3>Business audit</h3>
              <p>We map the organisation, its data and its processes, then price the opportunity.</p>
              <ul>
                <li>Systems, data and process map by function</li>
                <li>Cost and time baseline for priority processes</li>
                <li>Ranked opportunities with savings, build cost and payback</li>
                <li>Transformation roadmap</li>
              </ul>
            </div>

            <div className="eg e2">
              <div className="meta">
                <span>Weeks 4 to 10</span>
                <b>Fixed scope</b>
              </div>
              <h3>Build</h3>
              <p>Command centre first, then the highest-return function.</p>
              <ul>
                <li>Unified data layer and C-suite dashboards</li>
                <li>Priority function automated end to end</li>
                <li>Human approval points where they matter</li>
                <li>Team training and new SOPs</li>
              </ul>
            </div>

            <div className="eg e3">
              <div className="meta">
                <span>Ongoing</span>
                <b>Monthly</b>
              </div>
              <h3>Run and expand</h3>
              <p>We keep systems tuned and roll out the next function each quarter.</p>
              <ul>
                <li>Monitoring, fixes and model tuning</li>
                <li>Next function added each quarter</li>
                <li>Monthly savings report against baseline</li>
                <li>A named Beacon lead</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section (06): Results */}
      <section className="sec" id="results">
        <div className="wrap">
          <div className="head-row">
            <div>
              <p className="tag"><b>(06)</b> Results</p>
              <h2 className="h-lg">
                The only KPI that matters: <span className="it" style={{ color: "var(--accent)" }}>your P&amp;L.</span>
              </h2>
            </div>
            <p className="lede">
              Three UAE businesses, three different starting points. Each engagement ran
              audit, automate, optimise.
            </p>
          </div>

          <div className="cases">
            {/* Case 1 */}
            <article className="case case-anim">
              <div className="case-head">
                <span className="who">E-commerce and distribution</span>
                <span className="big">AED 740K</span>
                <span className="it">annualised savings · 10 weeks to live</span>
              </div>
              <div className="case-body">
                <span className="draft-flag">Illustrative figures · replace before launch</span>
                <h3>Cleaning Superstore</h3>
                <p>
                  Demand forecasting and auto-replenishment across two warehouses,
                  live inventory sync across web, app and WhatsApp, and order updates
                  that answer customers before they ask.
                </p>
                <div className="mini">
                  <div><b>-43%</b><span>Stock-outs</span></div>
                  <div><b>9 hrs</b><span>Order to dispatch, from 26</span></div>
                  <div><b>-46%</b><span>Service queries</span></div>
                </div>
              </div>
            </article>

            {/* Case 2 */}
            <article className="case case-anim">
              <div className="case-head">
                <span className="who">Event rentals</span>
                <span className="big">AED 560K</span>
                <span className="it">annualised savings · 8 weeks to live</span>
              </div>
              <div className="case-body">
                <span className="draft-flag">Illustrative figures · replace before launch</span>
                <h3>Mint Event Rentals</h3>
                <p>
                  An enquiry-to-quote agent with live availability and pricing, a
                  tagged asset register, and crew and truck scheduling by event and
                  location.
                </p>
                <div className="mini">
                  <div><b>90 min</b><span>Quote turnaround, from 26 hrs</span></div>
                  <div><b>-92%</b><span>Double bookings</span></div>
                  <div><b>64%</b><span>Asset use, from 47%</span></div>
                </div>
              </div>
            </article>

            {/* Case 3 */}
            <article className="case case-anim">
              <div className="case-head">
                <span className="who">B2B workspace solutions</span>
                <span className="big">AED 910K</span>
                <span className="it">annualised impact · 12 weeks to live</span>
              </div>
              <div className="case-body">
                <span className="draft-flag">Illustrative figures · replace before launch</span>
                <h3>Prowork</h3>
                <p>
                  A requirement-to-BOQ agent, CRM scoring with automated follow-ups,
                  supplier lead-time tracking and receivables automation.
                </p>
                <div className="mini">
                  <div><b>5 hrs</b><span>Quote and BOQ, from 3 days</span></div>
                  <div><b>27%</b><span>Win rate, from 19%</span></div>
                  <div><b>48 days</b><span>DSO, from 71</span></div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Section (07): Why Beacon */}
      <section className="sec white" id="why">
        <div className="wrap">
          <div className="head-row">
            <div>
              <p className="tag"><b>(07)</b> Why Beacon</p>
              <h2 className="h-lg">
                No hype. No lock-in. <span className="it">No stranded pilots.</span>
              </h2>
            </div>
            <p className="lede">
              Five operating principles that keep AI tied to the P&amp;L.
            </p>
          </div>

          <div className="prin">
            <div>
              <span className="num">01</span>
              <b>P&amp;L first</b>
              <p>Every recommendation is tied to cost, time, risk, revenue or throughput.</p>
            </div>
            <div>
              <span className="num">02</span>
              <b>Workflow-native</b>
              <p>Automations live inside the systems your team already uses, including WhatsApp.</p>
            </div>
            <div>
              <span className="num">03</span>
              <b>Human-controlled</b>
              <p>AI prepares, people approve. Edge cases are escalated and every action leaves an audit trail.</p>
            </div>
            <div>
              <span className="num">04</span>
              <b>You own it</b>
              <p>You own the stack, the playbooks and the knowledge. Keep the audit roadmap even if you walk away.</p>
            </div>
            <div>
              <span className="num">05</span>
              <b>Continuous tuning</b>
              <p>Models drift and processes change. Beacon keeps the system sharp and reports savings monthly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section (08): Where to Start & Form */}
      <section className="sec dark" id="contact">
        <div className="wrap contact">
          <div className="contact-left">
            <p className="tag"><b>(08)</b> Where to start</p>
            <h2 className="h-lg">
              See the business first. <span className="it">Then make it leaner.</span>
            </h2>
            <p className="lede" style={{ marginTop: "24px" }}>
              Tell us a little about your business. We will come back with a time for a
              30-minute discovery call.
            </p>

            <ol className="next">
              <li>
                <span className="num">01</span>
                <div>
                  <b>Business audit</b>
                  <span>Three weeks to map your data and processes and put a number on the opportunity.</span>
                </div>
              </li>
              <li>
                <span className="num">02</span>
                <div>
                  <b>Command centre</b>
                  <span>Leadership gets one live view of the organisation within weeks, not quarters.</span>
                </div>
              </li>
              <li>
                <span className="num">03</span>
                <div>
                  <b>Function by function</b>
                  <span>We transform the highest-return department first, then roll out quarter by quarter.</span>
                </div>
              </li>
            </ol>

            <div className="reach">
              <a
                className="btn btn-wa"
                href="https://wa.me/971559564135?text=Hi%20Beacon%2C%20I%27d%20like%20to%20discuss%20a%20business%20audit"
                target="_blank"
                rel="noopener"
              >
                WhatsApp us
              </a>
              <button className="copy" type="button" onClick={handleCopyEmail}>
                {copyStatus}
              </button>
            </div>
          </div>

          <div className="contact-right">
            <div className="formcard">
              {!formSubmitted ? (
                <form id="home-form" className="form" onSubmit={handleFormSubmit} noValidate>
                  <div className="steps-ind">
                    <span>Step {formStep + 1} of 2</span>
                    <i className={formStep >= 0 ? "on" : ""}></i>
                    <i className={formStep >= 1 ? "on" : ""}></i>
                  </div>

                  {/* Step 1 */}
                  {formStep === 0 && (
                    <div ref={formStepRef} className="form">
                      <div className="row">
                        <div className={`field ${formErrors.name ? "bad" : ""}`}>
                          <label htmlFor="home-form-name">Full name</label>
                          <input
                            id="home-form-name"
                            name="name"
                            autoComplete="name"
                            placeholder="Ahmed Al Mansoori"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                          {formErrors.name && <span className="err">{formErrors.name}</span>}
                        </div>

                        <div className={`field ${formErrors.email ? "bad" : ""}`}>
                          <label htmlFor="home-form-email">Work email</label>
                          <input
                            id="home-form-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="ahmed@company.ae"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                          {formErrors.email && <span className="err">{formErrors.email}</span>}
                        </div>
                      </div>

                      <div className="row">
                        <div className={`field ${formErrors.phone ? "bad" : ""}`}>
                          <label htmlFor="home-form-phone">Mobile / WhatsApp</label>
                          <input
                            id="home-form-phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="+971 50 000 0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                          {formErrors.phone && <span className="err">{formErrors.phone}</span>}
                        </div>

                        <div className={`field ${formErrors.company ? "bad" : ""}`}>
                          <label htmlFor="home-form-company">Company</label>
                          <input
                            id="home-form-company"
                            name="company"
                            autoComplete="organization"
                            placeholder="Company name"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          />
                          {formErrors.company && <span className="err">{formErrors.company}</span>}
                        </div>
                      </div>

                      <button type="button" className="btn btn-accent" onClick={handleNextStep}>
                        Continue{" "}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </button>
                      <p className="consent">
                        Takes 40 seconds. No sales sequence, just one call with a Beacon lead.
                      </p>
                    </div>
                  )}

                  {/* Step 2 */}
                  {formStep === 1 && (
                    <div ref={formStepRef} className="form">
                      <div className="row">
                        <div className={`field ${formErrors.role ? "bad" : ""}`}>
                          <label htmlFor="home-form-role">Your role</label>
                          <select
                            id="home-form-role"
                            name="role"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          >
                            <option value="">Select</option>
                            <option>Founder / CEO / MD</option>
                            <option>CFO / Finance</option>
                            <option>COO / Operations</option>
                            <option>Sales or marketing head</option>
                            <option>IT / Digital</option>
                            <option>Other</option>
                          </select>
                          {formErrors.role && <span className="err">{formErrors.role}</span>}
                        </div>

                        <div className={`field ${formErrors.size ? "bad" : ""}`}>
                          <label htmlFor="home-form-size">Team size</label>
                          <select
                            id="home-form-size"
                            name="size"
                            value={formData.size}
                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                          >
                            <option value="">Select</option>
                            <option>1–25</option>
                            <option>26–100</option>
                            <option>101–250</option>
                            <option>251–1,000</option>
                            <option>1,000+</option>
                          </select>
                          {formErrors.size && <span className="err">{formErrors.size}</span>}
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
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setFormData((prev) => ({
                                    ...prev,
                                    focus: e.target.checked
                                      ? [...prev.focus, val]
                                      : prev.focus.filter((x) => x !== val),
                                  }));
                                }}
                              />
                              <span>{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="home-form-systems">
                          Systems you run today{" "}
                          <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>
                            (optional)
                          </span>
                        </label>
                        <input
                          id="home-form-systems"
                          name="systems"
                          placeholder="e.g. Zoho, Odoo, SAP B1, Tally, Shopify, Excel"
                          value={formData.systems}
                          onChange={(e) => setFormData({ ...formData, systems: e.target.value })}
                        />
                      </div>

                      {formSubmitError && (
                        <div
                          style={{
                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            color: "#F87171",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            fontSize: "0.85rem",
                            lineHeight: 1.4,
                          }}
                        >
                          {formSubmitError}
                        </div>
                      )}

                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => setFormStep(0)}
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
                        We use your details only to contact you about Beacon. Your data stays private.
                      </p>
                    </div>
                  )}
                </form>
              ) : (
                <div className="success">
                  <div className="tick">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </div>
                  <h3 className="h-md">
                    Thanks, <span>{formData.name.split(" ")[0] || "there"}</span>.{" "}
                    <span className="it">We have it.</span>
                  </h3>
                  <ol>
                    <li>A Beacon lead reviews your answers within one working day.</li>
                    <li>We call or WhatsApp you to book a 30-minute discovery call.</li>
                    <li>If there is a fit, you get a fixed-fee audit proposal in writing.</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section (09): Questions / FAQ */}
      <section className="sec" id="faq">
        <div className="wrap split">
          <div className="faq-left">
            <div className="faq-sticky">
              <p className="tag"><b>(09)</b> Questions</p>
              <h2 className="h-lg">
                Before you <span className="it">book a call.</span>
              </h2>
              <p className="lede" style={{ marginTop: "24px" }}>
                Still unsure? Send us your question and a Beacon lead will answer it directly.
              </p>
              <a className="btn btn-ink" href="#contact" style={{ marginTop: "16px" }}>
                Ask us directly
              </a>
            </div>
          </div>

          <div className="faq">
            <details open>
              <summary>Do we need to replace our ERP, CRM or accounting system?</summary>
              <p>
                No. Beacon connects to what you already run, from SAP, Oracle, Odoo
                and Zoho to Tally, Shopify, POS systems and spreadsheets. The unified
                data layer sits on top and your teams keep working in familiar tools.
              </p>
            </details>
            <details>
              <summary>What does the audit cost and what do we get?</summary>
              <p>
                The audit is a fixed fee agreed upfront and runs for three weeks. You
                get a process and data map by function, a cost and time baseline, a
                ranked list of opportunities with savings, build cost and payback, and a
                roadmap. It is yours to keep whether or not you build with us.
              </p>
            </details>
            <details>
              <summary>How soon will we see results?</summary>
              <p>
                Leadership typically gets the command centre within weeks of the build
                starting. The first automated function goes live inside the 4 to 10
                week build window, with savings reported monthly against the audit
                baseline.
              </p>
            </details>
            <details>
              <summary>Where does our data live, and who can see it?</summary>
              <p>
                Your data stays in your systems and your cloud environment. Access is
                role-based, every AI action is logged, and people sign off on
                decisions that matter. We work under NDA from the first call.
              </p>
            </details>
            <details>
              <summary>Does it work in Arabic?</summary>
              <p>
                Yes. Leaders can ask questions of company data in English or Arabic,
                and customer-facing agents on WhatsApp and email can reply in both.
              </p>
            </details>
            <details>
              <summary>Will this replace our people?</summary>
              <p>
                People decisions stay with people. AI takes the re-keying, chasing
                and report building so your team spends time on customers, suppliers
                and decisions.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="foot">
        <div className="wrap">
          <p className="big" aria-hidden="true">
            BEACON AI
          </p>
          <div className="foot-grid">
            <div>
              <p className="small" style={{ margin: "0 0 6px" }}>New business</p>
              <p style={{ margin: 0, fontSize: "18px" }}>hello@beacon.ai</p>
              <p className="small" style={{ marginTop: "14px" }}>Dubai, UAE</p>
            </div>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#how">How we work</a></li>
              <li><a href="#results">Results</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
            <ul>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noopener">LinkedIn ↗</a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noopener">Instagram ↗</a></li>
            </ul>
            <ul>
              <li className="small">Terms of use</li>
              <li className="small">Privacy policy</li>
              <li className="small">© 2026 Beacon AI</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
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
    </div>
  );
}
