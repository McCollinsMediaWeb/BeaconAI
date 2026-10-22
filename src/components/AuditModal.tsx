"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    department: "C-Suite / Executive",
    message: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        "#audit-modal-backdrop",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        "#audit-modal-content",
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, delay: 0.1, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
      setSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      id="audit-modal-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="audit-modal-content"
        style={{
          width: "100%",
          maxWidth: "580px",
          backgroundColor: "#111215",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "16px",
          padding: "2.5rem",
          color: "#FFFFFF",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 87, 34, 0.15)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            color: "#8E9199",
            fontSize: "1.5rem",
            lineHeight: 1,
            padding: "0.25rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span style={{ color: "#FF5722", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em" }}>
                (00) ENGAGEMENT
              </span>
            </div>
            <h3
              style={{
                fontSize: "1.85rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
              }}
            >
              BOOK A THREE-WEEK <span className="serif-italic" style={{ textTransform: "none", color: "#FF6E40" }}>Audit.</span>
            </h3>
            <p style={{ color: "#A0A4B0", fontSize: "0.9375rem", marginBottom: "1.75rem", lineHeight: 1.5 }}>
              We map your data, identify manual handoffs, and calculate exact ROI before you commit to building.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#8E9199", marginBottom: "0.35rem" }}>
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Tariq Al Mansoor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#8E9199", marginBottom: "0.35rem" }}>
                    Work Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#8E9199", marginBottom: "0.35rem" }}>
                    Company
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#8E9199", marginBottom: "0.35rem" }}>
                  Primary Focus Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    backgroundColor: "#1a1b20",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    outline: "none",
                  }}
                >
                  <option value="C-Suite / Executive">C-Suite Command Centre</option>
                  <option value="Finance">Finance & Cash Flow</option>
                  <option value="Sales & Customer">Sales & Customer Service</option>
                  <option value="Marketing">Marketing & Attribution</option>
                  <option value="Operations & Supply Chain">Operations & Supply Chain</option>
                  <option value="People & HR">People & HR</option>
                  <option value="Admin & Legal">Admin, Legal & Compliance</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#8E9199", marginBottom: "0.35rem" }}>
                  Notes / Core Bottlenecks
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about current systems or reporting delays..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: "0.5rem",
                  padding: "0.9rem 1.5rem",
                  backgroundColor: "#FF5722",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 20px rgba(255, 87, 34, 0.4)",
                  transition: "transform 0.2s, background-color 0.2s",
                }}
              >
                Schedule Consultation
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 87, 34, 0.15)",
                color: "#FF5722",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem auto",
                fontSize: "1.75rem",
              }}
            >
              ✓
            </div>
            <h3 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>
              Request Received
            </h3>
            <p style={{ color: "#A0A4B0", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Thank you, <strong style={{ color: "#fff" }}>{formData.name}</strong>. A Beacon AI partner will reach out to <span style={{ color: "#FF6E40" }}>{formData.email}</span> within 24 hours to schedule the initial briefing.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: "0.75rem 2rem",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#fff",
                borderRadius: "9999px",
                fontWeight: 600,
              }}
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
