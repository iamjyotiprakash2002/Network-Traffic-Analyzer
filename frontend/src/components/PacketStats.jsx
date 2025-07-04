import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PacketStats = ({ packets }) => {
  const [protocolData, setProtocolData] = useState({ TCP: 0, UDP: 0, ICMP: 0, OTHER: 0 });

  useEffect(() => {
    const counts = { TCP: 0, UDP: 0, ICMP: 0, OTHER: 0 };

    packets.forEach((pkt) => {
      switch (pkt.proto) {
        case 6:
        case "TCP":
          counts.TCP++;
          break;
        case 17:
        case "UDP":
          counts.UDP++;
          break;
        case 1:
        case "ICMP":
          counts.ICMP++;
          break;
        default:
          counts.OTHER++;
      }
    });

    setProtocolData(counts);
  }, [packets]);

  const data = {
    labels: ["TCP", "UDP", "ICMP", "OTHER"],
    datasets: [
      {
        label: "Protocol Traffic",
        data: [protocolData.TCP, protocolData.UDP, protocolData.ICMP, protocolData.OTHER],
        backgroundColor: ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Protocol Traffic Stats</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PacketStats;
