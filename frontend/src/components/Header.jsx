import React from "react";

const Header = ({ theme, toggleTheme }) => {
  return (
    <header
      style={{
        backgroundColor: theme === "dark" ? "#1e293b" : "#e2e8f0",
        color: theme === "dark" ? "white" : "#1e293b",
        padding: "1.5rem",
        textAlign: "center",
        borderRadius: "0 0 10px 10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        marginBottom: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", margin: "0.5rem 0" }}>🛡️ NetSentry</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
        Real-Time Network Traffic Analysis & Packet Sniffing Tool
      </p>
      <button
        onClick={toggleTheme}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          background: theme === "dark" ? "#38bdf8" : "#1e293b",
          color: theme === "dark" ? "#1e293b" : "#f8fafc",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
