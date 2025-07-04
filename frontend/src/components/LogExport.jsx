import React from "react";

const LogExport = () => {
  const handleDownloadPCAP = () => {
    // Step 1: Get latest PCAP filename from backend
    fetch("http://localhost:5000/api/latest-pcap")
      .then((res) => {
        if (!res.ok) throw new Error("Could not fetch latest PCAP");
        return res.json();
      })
      .then((data) => {
        if (!data.filename) throw new Error("No PCAP file found");

        const pcapUrl = `http://localhost:5000/logs/${data.filename}`;

        // Step 2: Download that file
        return fetch(pcapUrl)
          .then((res) => {
            if (!res.ok) throw new Error("Failed to download PCAP");
            return res.blob();
          })
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = data.filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
          });
      })
      .catch((error) => {
        console.error("PCAP Download error:", error);
        alert("Failed to download PCAP file.");
      });
  };

  const handleDownloadAlertLog = () => {
    fetch("http://localhost:5000/logs/alert_log.txt")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to download alert log.");
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "alert_log.txt";
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((error) => {
        console.error("Alert Log Download error:", error);
        alert("Failed to download alert log.");
      });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>⬇️ Export Logs</h3>
      <button
        onClick={handleDownloadPCAP}
        style={{
          marginRight: "10px",
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Download PCAP
      </button>
      <button
        onClick={handleDownloadAlertLog}
        style={{
          padding: "10px 20px",
          background: "darkred",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Download Alert Log
      </button>
    </div>
  );
};

export default LogExport;
