network-traffic-analyzer/
├── backend/                            # 🔧 Flask + Packet Sniffing Backend
│   ├── app.py                          # ✅ Flask App + API Routes
│   ├── packet_sniffer.py              # ✅ Scapy-based Real-time Packet Capture
│   ├── detectors/                     # ✅ Intrusion Detection Logic
│   │   ├── icmp.py                     # ✅ ICMP flood / ping of death detection
│   │   ├── dns_tunnel.py               # ✅ DNS tunneling detection
│   │   ├── port_scan.py                # ✅ Port scanning detection (SYN scan)
│   ├── utils/                         # ✅ Utility Functions
│   │   ├── formatter.py                # ✅ Packet formatting, protocol mapping
│   │   ├── logger.py                   # ✅ Logging packets to .txt or .pcap
│   │   ├── filters.py                  # ✅ Packet filtering functions (IP, protocol, port)
│   ├── socketio_server.py             # ✅ Real-time Packet Push (Socket.IO optional)
│   ├── config.py                      # ✅ Configuration settings (interfaces, thresholds)
│   └── requirements.txt               # ✅ Python dependencies (Flask, Scapy, etc.)

├── frontend/                          # 🎨 React.js Frontend for UI
│   ├── public/
│   ├── src/
│   │   ├── App.jsx                     # ✅ Main React component
│   │   ├── index.js                    # ✅ Entry point
│   │   ├── services/
│   │   │   ├── api.js                  # ✅ Axios/Fetch wrapper for Flask APIs
│   │   ├── components/
│   │   │   ├── PacketTable.jsx         # ✅ Live table showing captured packets
│   │   │   ├── PacketStats.jsx         # ✅ Charts for protocol traffic (TCP, UDP, ICMP)
│   │   │   ├── Alerts.jsx              # ✅ Show detection alerts (Port scan, ICMP flood, etc.)
│   │   │   ├── FilterBar.jsx           # ✅ Search/filter by IP, protocol, port
│   │   │   ├── LogExport.jsx           # ✅ Button to download packet logs
│   │   │   ├── Dashboard.jsx           # ✅ Live summary cards (total packets, suspicious count, etc.)
│   └── package.json                  # ✅ React dependencies (chart.js, axios, socket.io-client)

├── logs/                              # 📦 Stored packet logs
│   ├── traffic_log_2025-07-03.pcap     # ✅ Saved pcap file (from backend/utils/logger.py)
│   ├── alert_log.txt                   # ✅ Suspicious activity log

├── README.md                         # 📘 Setup instructions and feature list

├── .env                              # 🔐 Configuration variables (if needed)

└── report/                           # 📑 Final-year documentation (optional)
    ├── final_report.docx              # ✅ 6000-word project report
    ├── ppt_presentation.pptx          # ✅ Project presentation
    └── demo_video_link.txt            # ✅ Demo video link (if recorded)
