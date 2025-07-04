import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes"; // ✅ import theme hook

const Dashboard = ({ packets, alerts }) => {
  const [summary, setSummary] = useState({
    total: 0,
    tcp: 0,
    udp: 0,
    icmp: 0,
  });

  const { theme } = useTheme(); // ✅ get current theme (light/dark)

  useEffect(() => {
    const counts = { tcp: 0, udp: 0, icmp: 0 };
    packets.forEach((pkt) => {
      const proto = String(pkt.proto).toUpperCase();
      if (proto === "TCP" || proto === "6") counts.tcp++;
      else if (proto === "UDP" || proto === "17") counts.udp++;
      else if (proto === "ICMP" || proto === "1") counts.icmp++;
    });
    setSummary({
      total: packets.length,
      tcp: counts.tcp,
      udp: counts.udp,
      icmp: counts.icmp,
    });
  }, [packets]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <Card title="📦 Total Packets" value={summary.total} theme={theme} />
        <Card title="🔴 Suspicious Alerts" value={alerts.length} theme={theme} />
        <Card title="📡 TCP Packets" value={summary.tcp} theme={theme} />
        <Card title="📡 UDP Packets" value={summary.udp} theme={theme} />
        <Card title="📡 ICMP Packets" value={summary.icmp} theme={theme} />
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#f87171" : "#b91c1c", // red for alert text
          borderRadius: "12px",
          boxShadow:
            theme === "dark"
              ? "0 2px 10px rgba(255,255,255,0.05)"
              : "0 2px 10px rgba(0,0,0,0.05)",
          width: "100%",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", marginBottom: "10px" }}>🚨 Security Alerts</h2>
        {alerts.length === 0 ? (
          <p style={{ color: theme === "dark" ? "#10b981" : "#065f46" }}>
            🟢 No security alerts
          </p>
        ) : (
          <ul
            style={{
              listStyle: "disc",
              paddingLeft: "20px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {alerts.map((alert, idx) => (
              <li key={idx} style={{ marginBottom: "4px" }}>
                🔴 [{alert.timestamp}] {alert.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const Card = ({ title, value, theme }) => {
  const isDark = theme === "dark";

  return (
    <div
      style={{
        padding: "20px",
        background: isDark ? "#1f2937" : "#f3f4f6",
        color: isDark ? "#f9fafb" : "#1f2937",
        borderRadius: "12px",
        minWidth: "150px",
        textAlign: "center",
        boxShadow: isDark
          ? "0 4px 10px rgba(255,255,255,0.1)"
          : "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
    </div>
  );
};

export default Dashboard;



// import React, { useEffect, useState } from "react";
// import { useTheme } from "next-themes"; // ✅ import theme hook

// const Dashboard = ({ packets, alerts }) => {
//   const [summary, setSummary] = useState({
//     total: 0,
//     tcp: 0,
//     udp: 0,
//     icmp: 0,
//   });

//   const { theme } = useTheme(); // ✅ get current theme (light/dark)

//   useEffect(() => {
//     const counts = { tcp: 0, udp: 0, icmp: 0 };
//     packets.forEach((pkt) => {
//       const proto = String(pkt.proto).toUpperCase();
//       if (proto === "TCP" || proto === "6") counts.tcp++;
//       else if (proto === "UDP" || proto === "17") counts.udp++;
//       else if (proto === "ICMP" || proto === "1") counts.icmp++;
//     });
//     setSummary({
//       total: packets.length,
//       tcp: counts.tcp,
//       udp: counts.udp,
//       icmp: counts.icmp,
//     });
//   }, [packets]);

//   return (
//     <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
//       <Card title="📦 Total Packets" value={summary.total} theme={theme} />
//       <Card title="🔴 Suspicious Alerts" value={alerts.length} theme={theme} />
//       <Card title="📡 TCP Packets" value={summary.tcp} theme={theme} />
//       <Card title="📡 UDP Packets" value={summary.udp} theme={theme} />
//       <Card title="📡 ICMP Packets" value={summary.icmp} theme={theme} />
//     </div>
//   );
// };

// const Card = ({ title, value, theme }) => {
//   const isDark = theme === "dark";

//   return (
//     <div
//       style={{
//         padding: "20px",
//         background: isDark ? "#1f2937" : "#f3f4f6",  // dark or light bg
//         color: isDark ? "#f9fafb" : "#1f2937",       // light or dark text
//         borderRadius: "12px",
//         minWidth: "150px",
//         textAlign: "center",
//         boxShadow: isDark ? "0 4px 10px rgba(255,255,255,0.1)" : "0 4px 10px rgba(0,0,0,0.1)",
//       }}
//     >
//       <h3 style={{ marginBottom: "10px" }}>{title}</h3>
//       <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
//     </div>
//   );
// };

// export default Dashboard;
