from collections import defaultdict
from time import time
from config import PORT_SCAN_THRESHOLD, PORT_SCAN_TIME_WINDOW  # ✅ imported from config

recent_ports = defaultdict(set)
timestamp_record = {}

# def detect_port_scan(pkt):
#     if pkt.haslayer("IP") and pkt.haslayer("TCP"):
#         print("[DEBUG] Checking TCP packet for port scan")
#         src = pkt["IP"].src
#         dst_port = pkt["TCP"].dport

#         now = time()
#         if src not in timestamp_record or now - timestamp_record[src] > PORT_SCAN_TIME_WINDOW:
#             recent_ports[src] = set()
#             timestamp_record[src] = now

#         recent_ports[src].add(dst_port)

#         if len(recent_ports[src]) > PORT_SCAN_THRESHOLD:
#             return f"Port scan detected from {src}"
#     return None

def detect_port_scan(pkt):
    if pkt.haslayer("IP") and pkt.haslayer("TCP"):
        print("[DEBUG] detect_port_scan CALLED")  # ✅ Add this line

        from config import PORT_SCAN_THRESHOLD, PORT_SCAN_TIME_WINDOW
        from collections import defaultdict
        from time import time

        src = pkt["IP"].src
        dst_port = pkt["TCP"].dport

        now = time()
        if src not in timestamp_record or now - timestamp_record[src] > PORT_SCAN_TIME_WINDOW:
            recent_ports[src] = set()
            timestamp_record[src] = now

        recent_ports[src].add(dst_port)

        if len(recent_ports[src]) > PORT_SCAN_THRESHOLD:
            return f"Port scan detected from {src}"
    return None
