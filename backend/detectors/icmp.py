from collections import defaultdict
from time import time
from config import ICMP_FLOOD_THRESHOLD  # ✅ Imported from config

icmp_counts = defaultdict(int)
icmp_times = {}

TIME_WINDOW = 5  # seconds

def detect_icmp_flood(pkt):
    if pkt.haslayer("IP") and pkt.haslayer("ICMP"):
        src = pkt["IP"].src
        now = time()

        if src not in icmp_times or now - icmp_times[src] > TIME_WINDOW:
            icmp_counts[src] = 0
            icmp_times[src] = now

        icmp_counts[src] += 1

        if icmp_counts[src] > ICMP_FLOOD_THRESHOLD:
            return f"ICMP flood detected from {src}"
    return None
