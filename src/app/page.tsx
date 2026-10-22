"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Slide00Hero from "@/components/Slide00Hero";
import Slide01Problem from "@/components/Slide01Problem";
import Slide02Ecosystem from "@/components/Slide02Ecosystem";
import Slide03CSuite from "@/components/Slide03CSuite";
import DeepDiveSection from "@/components/DeepDiveSection";
import Slide10HowWeEngage from "@/components/Slide10HowWeEngage";
import CaseStudySection from "@/components/CaseStudySection";
import Slide15WhereToStart from "@/components/Slide15WhereToStart";
import SlideNavigator from "@/components/SlideNavigator";
import AuditModal from "@/components/AuditModal";

export default function Home() {
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  const handleOpenAudit = () => setAuditModalOpen(true);
  const handleCloseAudit = () => setAuditModalOpen(false);

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      {/* Global Navbar */}
      <Navbar onOpenAudit={handleOpenAudit} />

      {/* Main Slide Deck Container */}
      <main>
        {/* Slide 1: Page 1 (00) Overview Hero */}
        <Slide00Hero onOpenAudit={handleOpenAudit} />

        {/* Slide 2: Page 2 (01) The Problem */}
        <Slide01Problem />

        {/* Slide 3: Page 3 (02) The Business Ecosystem */}
        <Slide02Ecosystem />

        {/* Slide 4: Page 4 (03) Deep Dive: C-Suite */}
        <Slide03CSuite />

        {/* Slide 5: Page 5 (04) Deep Dive: Finance */}
        <DeepDiveSection
          id="slide-04"
          tagNum="(04)"
          tagTitle="DEEP DIVE FINANCE"
          headingMain="FINANCE"
          headingItalic="Close faster. See cash sooner."
          breaksToday={[
            "Invoices keyed in by hand and reconciled line by line",
            "Receivables chased one email at a time",
            "Cash forecast lives in a spreadsheet updated monthly",
          ]}
          kpisWeMove="Month-end close time, DSO, cost per invoice, cash forecast accuracy"
          stepsIn={{
            simplify: "Invoice capture, three-way matching and automatic bank reconciliation.",
            reduceCost: "Fewer month-end hours, lower late-payment and financing costs.",
            accessData: "Live P&L, cash position and receivables ageing by customer.",
            seePatterns: "Spend anomalies, duplicate payments and margin leakage flagged early.",
          }}
          leadershipMetrics={[
            { label: "CLOSE TIME", value: "4 days", subtext: "from 11" },
            { label: "DSO", value: "48 days", subtext: "from 67" },
            { label: "INVOICES AUTO-MATCHED", value: "86%" },
          ]}
          patternDetected="Duplicate supplier payment detected: AED 23,400, held for review"
          pageNum="05"
        />

        {/* Slide 6: Page 6 (05) Deep Dive: Sales & Customer */}
        <DeepDiveSection
          id="slide-05"
          tagNum="(05)"
          tagTitle="DEEP DIVE SALES AND CUSTOMER"
          headingMain="SALES & CUSTOMER"
          headingItalic="Every lead worked. Every customer kept."
          breaksToday={[
            "Enquiries wait hours or days for a first reply",
            "CRM data is incomplete, so the pipeline is a guess",
            "Order status questions flood WhatsApp and phones",
          ]}
          kpisWeMove="Speed to lead, win rate, repeat purchase rate, cost to serve"
          stepsIn={{
            simplify: "Enquiry-to-quote automated, CRM updated from email and WhatsApp.",
            reduceCost: "Less admin per deal and self-serve order updates that cut support load.",
            accessData: "Pipeline, conversion by source and rep, and customer value, live.",
            seePatterns: "Deal scoring, churn signals, reorder timing and cross-sell prompts.",
          }}
          leadershipMetrics={[
            { label: "SPEED TO LEAD", value: "4 min", subtext: "from 6 hrs" },
            { label: "WIN RATE", value: "27%", subtext: "from 19%" },
            { label: "REPEAT RATE", value: "+24%" },
          ]}
          patternDetected="14 key accounts past their usual reorder date, total value AED 212K"
          pageNum="06"
        />

        {/* Slide 7: Page 7 (06) Deep Dive: Marketing */}
        <DeepDiveSection
          id="slide-06"
          tagNum="(06)"
          tagTitle="DEEP DIVE MARKETING"
          headingMain="MARKETING"
          headingItalic="Spend smarter. See what returns."
          breaksToday={[
            "Budget spread across channels with no single view of return",
            "Performance reports assembled by hand every month",
            "Campaign roll-out slowed by manual resizing and approvals",
          ]}
          kpisWeMove="Cost per acquisition, marketing ROI, reporting hours, time to launch"
          stepsIn={{
            simplify: "Automated reporting, approval workflows, auto-publishing and ad variants from approved key visuals.",
            reduceCost: "Lower production cost per asset and budget moved away from what does not convert.",
            accessData: "Spend to lead to revenue attribution across every channel, live.",
            seePatterns: "Winning audiences and creative elements, with alerts on spend and cost per lead.",
          }}
          leadershipMetrics={[
            { label: "COST PER LEAD", value: "-28%" },
            { label: "REPORT PREPARATION", value: "1 hr", subtext: "from 3 days" },
            { label: "TIME TO LAUNCH", value: "2 days", subtext: "from 9" },
          ]}
          patternDetected="Cost per lead on Meta up 34% this week, AED 9K reallocation to Search suggested"
          pageNum="07"
        />

        {/* Slide 8: Page 8 (07) Deep Dive: Operations & Supply Chain */}
        <DeepDiveSection
          id="slide-07"
          tagNum="(07)"
          tagTitle="DEEP DIVE OPERATIONS AND SUPPLY CHAIN"
          headingMain="OPERATIONS & SUPPLY CHAIN"
          headingItalic="Leaner stock. Fewer surprises."
          breaksToday={[
            "Stock-outs and dead stock at the same time",
            "Purchase orders placed on instinct, not demand",
            "Delivery planning run from spreadsheets and calls",
          ]}
          kpisWeMove="Stock-outs, inventory turns, order-to-dispatch time, cost per delivery"
          stepsIn={{
            simplify: "Auto-replenishment, PO generation and supplier lead-time tracking.",
            reduceCost: "Lower carrying cost, fewer emergency buys, consolidated deliveries.",
            accessData: "Live stock by location, fulfilment status and supplier performance.",
            seePatterns: "Demand forecasts by SKU and season, including Ramadan, summer and Q4.",
          }}
          leadershipMetrics={[
            { label: "STOCK-OUTS", value: "-41%" },
            { label: "INVENTORY TURNS", value: "7.2x", subtext: "from 4.9x" },
            { label: "DISPATCH TIME", value: "9 hrs", subtext: "from 26" },
          ]}
          patternDetected="Supplier lead time up 6 days on 38 SKUs, reorder points adjusted"
          pageNum="08"
        />

        {/* Slide 9: Page 9 (08) Deep Dive: People & HR */}
        <DeepDiveSection
          id="slide-08"
          tagNum="(08)"
          tagTitle="DEEP DIVE PEOPLE AND HR"
          headingMain="PEOPLE & HR"
          headingItalic="Hire faster. Run lighter."
          breaksToday={[
            "CVs screened manually for every role",
            "Onboarding runs on checklists and email threads",
            "HR answers the same policy questions every day",
          ]}
          kpisWeMove="Time to hire, cost per hire, HR tickets per employee, attrition"
          extraQuote="People decisions stay with people. AI prepares, managers decide."
          stepsIn={{
            simplify: "CV screening and shortlisting, onboarding workflows, self-serve requests.",
            reduceCost: "Shorter time to hire, lower agency spend, fewer admin hours.",
            accessData: "Headcount cost by department, attrition and capacity, live.",
            seePatterns: "Attrition risk, overtime trends and workload against capacity.",
          }}
          leadershipMetrics={[
            { label: "TIME TO HIRE", value: "19 days", subtext: "from 41" },
            { label: "HR TICKETS", value: "-58%" },
            { label: "AGENCY SPEND", value: "-35%" },
          ]}
          patternDetected="Overtime in Warehouse team up 22% for 3 weeks, capacity review suggested"
          pageNum="09"
        />

        {/* Slide 10: Page 10 (09) Deep Dive: Admin, Legal & Compliance */}
        <DeepDiveSection
          id="slide-09"
          tagNum="(09)"
          tagTitle="DEEP DIVE ADMIN, LEGAL AND COMPLIANCE"
          headingMain="ADMIN, LEGAL & COMPLIANCE"
          headingItalic="Control without the paperwork."
          breaksToday={[
            "Contracts live in inboxes and shared drives",
            "Renewals and expiries are missed or caught late",
            "Approvals stall in email chains",
          ]}
          kpisWeMove="Missed renewals, approval cycle time, contract turnaround"
          stepsIn={{
            simplify: "Contract repository with clause extraction and approval workflows.",
            reduceCost: "Avoided penalties and auto-renewals, less review time on standard documents.",
            accessData: "One calendar of obligations, licences, visas and vendor terms.",
            seePatterns: "Risky clauses flagged, spend against contract terms, vendor concentration.",
          }}
          leadershipMetrics={[
            { label: "MISSED RENEWALS", value: "0", subtext: "from 9 per year" },
            { label: "APPROVAL CYCLE", value: "1.5 days", subtext: "from 6" },
            { label: "CONTRACT REVIEW", value: "-60%", subtext: "time" },
          ]}
          patternDetected="Trade licence and 4 employee visas expire within 45 days"
          pageNum="10"
        />

        {/* Slide 11: Page 11 (10) How We Engage */}
        <Slide10HowWeEngage />

        {/* Slide 12: Page 12 (12) Case Study 01 E-Commerce & Distribution */}
        <CaseStudySection
          id="slide-12"
          tagNum="(12)"
          tagTitle="CASE STUDY 01 E-COMMERCE AND DISTRIBUTION"
          subHeader="UAE cleaning and hygiene e-commerce · 1,500+ SKUs · 2 warehouses · Web, app and WhatsApp · UAE-wide delivery"
          engagementTitle="Inventory, e-commerce and customer automation"
          engagementTimeline="10 weeks to live | Audit, Automate, Optimize"
          clientTitle="cleaning superstore™"
          imageSrc="/assets/case-cleaning.jpg"
          challengeText="Stock-outs on fast movers alongside dead stock on slow ones. Orders confirmed manually, customers chasing delivery updates on WhatsApp, and no single view of margin by product."
          results={[
            { label: "STOCK-OUTS", value: "-43%" },
            { label: "INVENTORY CARRYING COST", value: "-24%" },
            { label: "ORDER TO DISPATCH", value: "9 hrs", subtext: "from 26 hrs" },
            { label: "REPEAT PURCHASE RATE", value: "+31%" },
            { label: "CUSTOMER SERVICE QUERIES", value: "-46%" },
            { label: "MANUAL HOURS SAVED", value: "210", subtext: "per month" },
          ]}
          whatWeBuilt={[
            "Demand forecasting and auto-replenishment across both warehouses",
            "Live inventory sync across website, app and WhatsApp orders",
            "WhatsApp and email automation: order confirmed, dispatched, delivered, reorder reminders",
            "Supplier PO automation with lead-time tracking",
            "Leadership dashboard: sales, margin by SKU, stock health, cash",
          ]}
          headlineImpact={{
            clientLogoText: "cleaning superstore™",
            amount: "AED 740K",
            amountLabel: "annualised savings",
            operatingCost: "-19%",
            weeksToLive: "10 wks",
            savingsBreakdown: [
              { category: "Inventory carrying and dead stock", amount: "AED 310K", percent: 85 },
              { category: "Order and admin labour", amount: "AED 190K", percent: 55 },
              { category: "Delivery consolidation", amount: "AED 145K", percent: 42 },
              { category: "Customer service load", amount: "AED 95K", percent: 28 },
            ],
          }}
          pageNum="12"
        />

        {/* Slide 13: Page 13 (13) Case Study 02 Event Rentals */}
        <CaseStudySection
          id="slide-13"
          tagNum="(13)"
          tagTitle="CASE STUDY 02 EVENT RENTALS"
          subHeader="Dubai event furniture and decor rentals · Weddings, corporate and exhibitions · Large rental inventory · Delivery and setup crews"
          engagementTitle="Bookings, fleet and logistics transformation"
          engagementTimeline="8 weeks to live | Audit, Automate, Optimize"
          clientTitle="MINT EVENT RENTALS"
          imageSrc="/assets/case-mint.jpg"
          challengeText="Quotes built by hand from spreadsheets, availability checked by phone, and occasional double bookings. Trucks and crews planned day by day, and damaged items tracked on paper."
          results={[
            { label: "QUOTE TURNAROUND", value: "90 min", subtext: "from 26 hrs" },
            { label: "ASSET UTILISATION", value: "64%", subtext: "from 47%" },
            { label: "DOUBLE BOOKINGS", value: "-92%" },
            { label: "LOGISTICS COST PER EVENT", value: "-22%" },
            { label: "DAMAGE AND LOSS WRITE-OFFS", value: "-35%" },
            { label: "EVENT CAPACITY", value: "+14%", subtext: "same fleet" },
          ]}
          whatWeBuilt={[
            "Enquiry-to-quote agent with live availability and pricing",
            "Tagged asset register with utilisation analytics",
            "Crew and truck scheduling optimised by event and location",
            "Damage and maintenance logging with photo evidence",
            "Automated deposits, invoicing and collections, with a bookings and fleet dashboard",
          ]}
          headlineImpact={{
            clientLogoText: "MINT EVENT RENTALS",
            amount: "AED 560K",
            amountLabel: "annualised savings",
            operatingCost: "-17%",
            weeksToLive: "8 wks",
            savingsBreakdown: [
              { category: "Logistics and crew", amount: "AED 210K", percent: 80 },
              { category: "Sales and admin hours", amount: "AED 140K", percent: 54 },
              { category: "Damage and loss", amount: "AED 120K", percent: 46 },
              { category: "Deferred asset purchases", amount: "AED 90K", percent: 34 },
            ],
          }}
          pageNum="13"
        />

        {/* Slide 14: Page 14 (14) Case Study 03 B2B Workspace Solutions */}
        <CaseStudySection
          id="slide-14"
          tagNum="(14)"
          tagTitle="CASE STUDY 03 B2B WORKSPACE SOLUTIONS"
          subHeader="Dubai office furniture and workspace solutions · Corporate clients · Design consultation · Imported ranges · Delivery and installation"
          engagementTitle="Sales, projects and cash-flow transformation"
          engagementTimeline="12 weeks to live | Audit, Automate, Optimize"
          clientTitle="prowork"
          imageSrc="/assets/case-prowork.jpg"
          challengeText="BOQs and quotes took days to prepare, follow-ups depended on individual reps, and long receivable cycles strained cash. Installation delays came from supplier lead times nobody could see."
          results={[
            { label: "QUOTE AND BOQ PREP", value: "5 hrs", subtext: "from 3 days" },
            { label: "WIN RATE", value: "27%", subtext: "from 19%" },
            { label: "DSO", value: "48 days", subtext: "from 71 days" },
            { label: "INSTALLATION RE-VISITS", value: "-38%" },
            { label: "SALES ADMIN TIME", value: "-55%" },
            { label: "PROJECTS PER PM", value: "+30%" },
          ]}
          whatWeBuilt={[
            "Requirement-to-BOQ agent: headcount and floor plan to spec, BOQ and quote",
            "CRM pipeline scoring with automated follow-ups",
            "Supplier lead-time and shipment tracking tied to project dates",
            "Installation scheduling with digital snag capture",
            "Receivables automation and a leadership dashboard for pipeline, project margin and cash",
          ]}
          headlineImpact={{
            clientLogoText: "prowork",
            amount: "AED 910K",
            amountLabel: "annualised impact",
            operatingCost: "-15%",
            weeksToLive: "12 wks",
            savingsBreakdown: [
              { category: "Sales operations time", amount: "AED 260K", percent: 85 },
              { category: "Procurement and freight", amount: "AED 260K", percent: 85 },
              { category: "Installation re-work", amount: "AED 210K", percent: 68 },
              { category: "Receivables and financing cost", amount: "AED 180K", percent: 58 },
            ],
          }}
          pageNum="14"
        />

        {/* Slide 15: Page 15 (15) Where To Start */}
        <Slide15WhereToStart onOpenAudit={handleOpenAudit} />
      </main>

      {/* Slide Deck Keyboard & Quick Jump Navigator */}
      <SlideNavigator />

      {/* Book an Audit Interactive Modal */}
      <AuditModal isOpen={auditModalOpen} onClose={handleCloseAudit} />
    </div>
  );
}
