from socketio_server import socketio  # ✅ Add this at the top
import threading
import time
from config import LOG_SAVE_INTERVAL
from utils.logger import save_packets_to_pcap
from scapy.all import sniff
from detectors.port_scan import detect_port_scan
from detectors.icmp import detect_icmp_flood
from detectors.dns_tunnel import detect_dns_tunnel
from utils.logger import log_alert, save_packets_to_pcap
from utils.formatter import format_packet

formatted_packets = []
captured_packets = []

# List of detection functions
DETECTORS = [detect_port_scan, detect_icmp_flood, detect_dns_tunnel]

def run_detectors(pkt):
    alerts = []
    for detector in DETECTORS:
        result = detector(pkt)
        if result:
            alerts.append(result)
    return alerts

# def process_packet(pkt):
#     captured_packets.append(pkt)

#     formatted = format_packet(pkt)
#     if formatted:
#         formatted_packets.append(formatted)

#     alerts = run_detectors(pkt)
#     for alert in alerts:
#         print(f"[ALERT] {alert}")
#         log_alert(alert)

def process_packet(pkt):
    captured_packets.append(pkt)

    formatted = format_packet(pkt)
    if formatted:
        formatted_packets.append(formatted)

    alerts = run_detectors(pkt)
    for alert in alerts:
        print(f"[ALERT] {alert}")
        log_alert(alert)
        socketio.emit("alert", {"data": alert})  # ✅ Real-time push to frontend

def start_sniffing(interface=None):
    from config import INTERFACE
    if not interface:
        interface = INTERFACE
    print(f"[*] Capturing packets on {interface}")
    try:
        sniff(prn=process_packet, store=False, iface=interface)
    except KeyboardInterrupt:
        print("[*] Stopping packet capture and saving to file.")
        save_packets_to_pcap(captured_packets)
        print("[*] Packets saved to logs/traffic_log_YYYY-MM-DD.pcap")

# ✅ Background thread to auto-save .pcap every LOG_SAVE_INTERVAL seconds
def auto_save_loop():
    while True:
        time.sleep(LOG_SAVE_INTERVAL)
        if captured_packets:
            print("[auto-save] Saving packets to PCAP...")
            save_packets_to_pcap(captured_packets)
            print("[auto-save] PCAP saved.")



