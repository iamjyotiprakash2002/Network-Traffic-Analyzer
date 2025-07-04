import React, { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import Header from "./components/Header";
import InfoPanel from "./components/InfoPanel";
import Dashboard from "./components/Dashboard";
import PacketTable from "./components/PacketTable";
import FilterBar from "./components/FilterBar";
import Alerts from "./components/Alerts";
import PacketStats from "./components/PacketStats";
import LogExport from "./components/LogExport";
import { fetchPackets } from "./services/api";
import io from "socket.io-client";

// Connect to backend socket server
const socket = io("http://localhost:5000");

function App() {
  const [theme, setTheme] = useState("dark");
  const [packets, setPackets] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [filters, setFilters] = useState({ srcIP: "", dstIP: "", protocol: "" });
  const [loading, setLoading] = useState(true);

  // const loadPackets = async () => {
  //   try {
  //     const data = await fetchPackets();
  //     setPackets(data.packets || []);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error loading packets:", error);
  //   }
  // };

  const loadPackets = async () => {
  try {
    const data = await fetchPackets();  // ✅ This must return { alerts: [...] }
    setPackets(data.packets || []);
    setAlerts(data.alerts || []);       // ✅ This must update alerts
    setLoading(false);
  } catch (error) {
    console.error("Error loading packets:", error);
  }
};


  useEffect(() => {
    loadPackets();
    const interval = setInterval(loadPackets, 3000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Socket.IO listener for alerts
  useEffect(() => {
    socket.on("alert", (data) => {
      setAlerts((prev) => [...prev, data.data]);
      console.log("🚨 New alert received:", data.data);
    });

    return () => {
      socket.off("alert");
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider attribute="class">
      <div
        className={`App ${theme}`}
        style={{
          backgroundColor: theme === "dark" ? "#0f172a" : "#f1f5f9",
          color: theme === "dark" ? "#f8fafc" : "#1e293b",
          minHeight: "100vh",
          padding: "2rem",
          transition: "all 0.3s ease",
        }}
      >
        <Header theme={theme} toggleTheme={toggleTheme} />
        <InfoPanel theme={theme} />
        <Dashboard packets={packets} alerts={alerts} />
        <FilterBar onFilterChange={setFilters} theme={theme} />
        <PacketTable
          packets={packets.filter((pkt) => {
            const matchSrc = filters.srcIP === "" || pkt.src.includes(filters.srcIP);
            const matchDst = filters.dstIP === "" || pkt.dst.includes(filters.dstIP);
            const matchProto = filters.protocol === "" || pkt.protocol === filters.protocol;
            return matchSrc && matchDst && matchProto;
          })}
          loading={loading}
        />
        <PacketStats packets={packets} />
        <Alerts alerts={alerts} theme={theme} />
        <LogExport theme={theme} />
        <button onClick={loadPackets} style={{ marginTop: "20px", padding: "10px 20px" }}>
          🔄 Refresh Now
        </button>
      </div>
    </ThemeProvider>
  );
}

export default App;




// import Header from "./components/Header";
// import InfoPanel from "./components/InfoPanel"; // 👈 Add this
// import Dashboard from "./components/Dashboard";
// import LogExport from "./components/LogExport";
// import FilterBar from "./components/FilterBar";
// import Alerts from "./components/Alerts";
// import PacketStats from "./components/PacketStats";
// import React, { useEffect, useState } from "react";
// import { fetchPackets } from "./services/api";
// import PacketTable from "./components/PacketTable";

// function App() {
//   const [packets, setPackets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [alerts, setAlerts] = useState([]);  // ✅ Add this
//   const [filters, setFilters] = useState({ srcIP: "", dstIP: "", protocol: "" });
//   const [lastUpdated, setLastUpdated] = useState(null);  // 🕒 Track refresh time

// const loadPackets = async () => {
//   try {
//     const data = await fetchPackets();
//     setPackets(data.packets || []);
//     setAlerts(data.alerts || []);
//     setLastUpdated(new Date());  // 🕒 Update timestamp
//     setLoading(false);
//   } catch (error) {
//     console.error("Error loading packets:", error);
//   }
// };
// ;


//   useEffect(() => {
//     loadPackets();
//     const interval = setInterval(loadPackets, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//   <div className="App" style={{ padding: "2rem" }}>
//     <Header />
//     <InfoPanel /> 
//     <h1>Network Packet Monitor</h1>
//     <p>Showing the latest captured packets from your network interface.</p>

//     <Dashboard packets={packets} alerts={alerts} />            {/* 📊 Live summary cards */}
//     <FilterBar onFilterChange={setFilters} />                  {/* 🔍 Filter inputs */}
//     <PacketTable
//       packets={packets.filter((pkt) => {
//         const matchSrc = filters.srcIP === "" || pkt.src.includes(filters.srcIP);
//         const matchDst = filters.dstIP === "" || pkt.dst.includes(filters.dstIP);
//         const matchProto = filters.protocol === "" || pkt.proto === filters.protocol;
//         return matchSrc && matchDst && matchProto;
//       })}
//       loading={loading}
//     />
//     <PacketStats packets={packets} />                          {/* 📊 Bar chart of protocol counts */}
//     <Alerts alerts={alerts} />                                 {/* 🚨 Suspicious activity */}
//     <LogExport />                                           {/* ⬇️ Download logs */}
//     <button
//       onClick={loadPackets}
//       style={{ marginTop: "20px", padding: "10px 20px" }}
//     >
//       Refresh Now
//     </button>
//     {lastUpdated && (
//   <p style={{ marginTop: "10px", fontStyle: "italic", color: "#555" }}>
//     Last refreshed at: {lastUpdated.toLocaleTimeString()}
//   </p>
// )}

//   </div>
// );

// }

// export default App;


// import React, { useState, useEffect } from "react";
// import { ThemeProvider } from "next-themes";
// import Header from "./components/Header";
// import InfoPanel from "./components/InfoPanel";
// import Dashboard from "./components/Dashboard";
// import PacketTable from "./components/PacketTable";
// import FilterBar from "./components/FilterBar";
// import Alerts from "./components/Alerts";
// import PacketStats from "./components/PacketStats";
// import LogExport from "./components/LogExport";
// import { fetchPackets } from "./services/api";

// function App() {
//   const [theme, setTheme] = useState("dark"); // 🌙 or 'light'
//   const [packets, setPackets] = useState([]);
//   const [alerts, setAlerts] = useState([]);
//   const [filters, setFilters] = useState({ srcIP: "", dstIP: "", protocol: "" });
//   const [loading, setLoading] = useState(true);

//   const loadPackets = async () => {
//     try {
//       const data = await fetchPackets();
//       setPackets(data.packets || []);
//       setAlerts(data.alerts || []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error loading packets:", error);
//     }
//   };

//   useEffect(() => {
//     loadPackets();
//     const interval = setInterval(loadPackets, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));
//   };

//   return (
//      <ThemeProvider attribute="class">
//     <div
//   className={`App ${theme}`}
//   style={{
//     backgroundColor: theme === "dark" ? "#0f172a" : "#f1f5f9",
//     color: theme === "dark" ? "#f8fafc" : "#1e293b",
//     minHeight: "100vh",
//     padding: "2rem",
//     transition: "all 0.3s ease",
//   }}
// >

//       <Header theme={theme} toggleTheme={toggleTheme} />
//       <InfoPanel theme={theme} />
//       <Dashboard packets={packets} alerts={alerts} />
//       <FilterBar onFilterChange={setFilters} theme={theme} />
//       <PacketTable
//         packets={packets.filter((pkt) => {
//           const matchSrc = filters.srcIP === "" || pkt.src.includes(filters.srcIP);
//           const matchDst = filters.dstIP === "" || pkt.dst.includes(filters.dstIP);
//           const matchProto = filters.protocol === "" || pkt.protocol === filters.protocol;
//           return matchSrc && matchDst && matchProto;
//         })}
//         loading={loading}
//       />
//       <PacketStats packets={packets} />
//       <Alerts alerts={alerts} theme={theme} />
//       <LogExport theme={theme} />
//       <button onClick={loadPackets} style={{ marginTop: "20px", padding: "10px 20px" }}>
//         🔄 Refresh Now
//       </button>
//     </div>
//    </ThemeProvider>
 
//   );
// }

// export default App;
