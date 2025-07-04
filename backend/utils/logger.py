import os
from datetime import datetime
from scapy.all import wrpcap

# Set the log directory to the top-level "logs/" folder
LOG_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "logs")
os.makedirs(LOG_DIR, exist_ok=True)

# Generate a .pcap filename based on the current date
def get_pcap_filename():
    today = datetime.now().strftime("%Y-%m-%d")
    return os.path.join(LOG_DIR, f"traffic_log_{today}.pcap")

# Save packet list to a .pcap file
def save_packets_to_pcap(packet_list):
    if not packet_list:
        return
    pcap_path = get_pcap_filename()
    wrpcap(pcap_path, packet_list, append=os.path.exists(pcap_path))

# Append intrusion alert to alert_log.txt with timestamp
def log_alert(message):
    if not message or not message.strip():
        return  # ✅ Skip logging empty/whitespace-only messages

    print(f"[DEBUG] Logging alert: {message}")
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    alert_path = os.path.join(LOG_DIR, "alert_log.txt")
    with open(alert_path, "a") as f:
        f.write(f"[{timestamp}] {message.strip()}\n")


# Read and return all alert entries as a list
def read_alert_log():
    alert_path = os.path.join(LOG_DIR, "alert_log.txt")
    if not os.path.exists(alert_path):
        return []
    with open(alert_path, "r") as f:
        return [line.strip() for line in f.readlines()]
    
from datetime import datetime, timedelta

def get_recent_alerts(limit=10, minutes=5):
    alert_path = os.path.join(LOG_DIR, "alert_log.txt")
    alerts = []
    try:
        cutoff = datetime.now() - timedelta(minutes=minutes)
        with open(alert_path, "r") as f:
            for line in reversed(f.readlines()):
                if line.strip():
                    try:
                        ts_part, msg = line.strip().split("] ", 1)
                        timestamp = datetime.strptime(ts_part[1:], "%Y-%m-%d %H:%M:%S")
                        if timestamp >= cutoff:
                            alerts.append({
                                "timestamp": timestamp.strftime("%Y-%m-%d %H:%M:%S"),
                                "message": msg
                            })
                    except:
                        continue
                if len(alerts) >= limit:
                    break
    except FileNotFoundError:
        return []
    return list(reversed(alerts))


# def get_recent_alerts(limit=10):
#     alerts = []
#     alert_path = os.path.join(LOG_DIR, "alert_log.txt")
#     if os.path.exists(alert_path):
#         with open(alert_path, "r") as f:
#             lines = f.readlines()[-limit:]
#             for line in lines:
#                 if "] " in line:
#                     ts, msg = line.strip().split("] ", 1)
#                     alerts.append({
#                         "timestamp": ts.strip("["),  # remove brackets
#                         "message": msg.strip()
#                     })
#     return alerts

