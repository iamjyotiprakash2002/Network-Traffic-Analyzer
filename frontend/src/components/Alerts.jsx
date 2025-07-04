import React, { useEffect, useState } from "react";

function SecurityAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const res = await fetch("/api/alerts");
      const data = await res.json();
      setAlerts(data.alerts || []);
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card p-4 shadow-lg bg-white dark:bg-gray-800 rounded-2xl">
      <h2 className="text-xl font-bold mb-3 text-red-600 dark:text-red-400">🚨 Security Alerts</h2>

      {alerts.length === 0 ? (
        <p className="text-green-600 dark:text-green-400">🟢 No security alerts</p>
      ) : (
        <ul className="list-disc list-inside text-sm text-red-500 dark:text-red-300 space-y-1 max-h-64 overflow-y-auto">
          {alerts.map((alert, idx) => {
            // handle alert as plain string
            const cleaned = alert.trim();
            return cleaned ? (
              <li key={idx}>🔴 {cleaned}</li>
            ) : null;
          })}
        </ul>
      )}
    </div>
  );
}

export default SecurityAlerts;



// import React from "react";

// const Alerts = ({ alerts, theme }) => {
//   console.log("🚨 Incoming alerts from backend:", alerts); // 👈 Add this line

//   if (!alerts || alerts.length === 0) {
//     return (
//       <div style={{ marginTop: "20px" }}>
//         <h2>Security Alerts</h2>
//         <p>No suspicious activity detected.</p>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         marginTop: "20px",
//         border: "1px solid red",
//         padding: "1rem",
//         background: theme === "dark" ? "#4b5563" : "#ffe4e6",
//         color: theme === "dark" ? "#f8fafc" : "#7f1d1d",
//         borderRadius: "10px",
//       }}
//     >
//       <h2>🚨 Security Alerts</h2>
//       <ul>
//         {alerts.map((alert, index) => (
//           <li key={index} style={{ margin: "8px 0", fontWeight: "bold" }}>
//             🔴 {alert}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Alerts;

// import React, { useEffect, useState } from "react";

// function SecurityAlerts() {
//   const [alerts, setAlerts] = useState([]);

//   useEffect(() => {
//     const fetchAlerts = async () => {
//       const res = await fetch("/api/alerts");
//       const data = await res.json();
//       setAlerts(data.alerts || []);
//     };

//     fetchAlerts();
//     const interval = setInterval(fetchAlerts, 5000); // auto-refresh
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="card p-4 shadow-lg bg-white dark:bg-gray-800 rounded-2xl">
//       <h2 className="text-xl font-bold mb-3 text-red-600 dark:text-red-400">🚨 Security Alerts</h2>

//       {alerts.length === 0 ? (
//         <p className="text-green-600 dark:text-green-400">🟢 No security alerts</p>
//       ) : (
//         <ul className="list-disc list-inside text-sm text-red-500 dark:text-red-300 space-y-1 max-h-64 overflow-y-auto">
//           {alerts.map((alert, idx) => (
//             <li key={idx}>🔴 [{alert.timestamp}] {alert.message}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default SecurityAlerts;
