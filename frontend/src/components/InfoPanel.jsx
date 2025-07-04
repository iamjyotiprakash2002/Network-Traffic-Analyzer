import React from "react";

const InfoPanel = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <div
      style={{
        background: isDark ? "#1f2937" : "#f3f4f6",         // Dark: slate-800, Light: gray-100
        color: isDark ? "#f9fafb" : "#111827",              // Dark: slate-100, Light: gray-900
        border: `1px solid ${isDark ? "#374151" : "#d1d5db"}`, // border for both themes
        borderRadius: "10px",
        padding: "1.5rem",
        marginBottom: "20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <h2>🔍 Network Traffic Analysis & Packet Sniffing</h2>
      <p>
        <strong>Network Traffic Analysis</strong> is the process of capturing and inspecting data packets moving through a network. It helps monitor performance, detect intrusions, and understand how data flows.
      </p>
      <p>
        <strong>Packet Sniffing</strong> involves collecting low-level data packets to analyze protocols, IPs, ports, and payloads. It's essential for diagnosing issues, detecting anomalies, and enhancing cybersecurity.
      </p>
      <p style={{ fontStyle: "italic", color: isDark ? "#cbd5e1" : "#555" }}>
        🤖 <strong>AI Insight:</strong> Analyzing real-time traffic lets us uncover suspicious behaviors like port scans, floods, and tunneling — often invisible to the human eye but critical for defending networks.
      </p>
    </div>
  );
};

export default InfoPanel;
