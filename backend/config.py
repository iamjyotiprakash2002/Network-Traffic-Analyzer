import netifaces

def get_active_interface():
    import re
    wifi_ifaces = []
    fallback = None

    print("[config] Scanning available interfaces:")

    for iface in netifaces.interfaces():
        addrs = netifaces.ifaddresses(iface)
        print(f"  - {iface}: {addrs.get(netifaces.AF_INET)}")
        if netifaces.AF_INET in addrs:
            ip_info = addrs[netifaces.AF_INET][0]
            ip = ip_info.get("addr")
            if ip and not ip.startswith("127."):
                # Prefer Wi-Fi interfaces by name pattern
                if re.search(r"wlan|wlo|wifi", iface, re.IGNORECASE):
                    wifi_ifaces.append(iface)
                elif not fallback:
                    fallback = iface

    if wifi_ifaces:
        print(f"[config] Preferred Wi-Fi interface detected: {wifi_ifaces[0]}")
        return wifi_ifaces[0]

    print(f"[config] Falling back to: {fallback or 'lo'}")
    return fallback or "lo"


# Automatically detect the network interface
INTERFACE = get_active_interface()

# ✅ Print selected interface for confirmation
print(f"[config] Selected interface: {INTERFACE}")

# Detection thresholds
PORT_SCAN_THRESHOLD = 20
PORT_SCAN_TIME_WINDOW = 5
ICMP_FLOOD_THRESHOLD = 100

# Logging settings
LOG_SAVE_INTERVAL = 60  # seconds

# DNS tunneling detection settings
DNS_TUNNEL_LABEL_LIMIT = 30
DNS_TUNNEL_PARTS_THRESHOLD = 5
