def format_packet(pkt):
    try:
        proto = "Unknown"
        if pkt.haslayer("TCP"):
            proto = "TCP"
        elif pkt.haslayer("UDP"):
            proto = "UDP"
        elif pkt.haslayer("ICMP"):
            proto = "ICMP"

        src = pkt["IP"].src if pkt.haslayer("IP") else "Unknown"
        dst = pkt["IP"].dst if pkt.haslayer("IP") else "Unknown"

        return {
            "timestamp": str(pkt.time),
            "src": src,
            "dst": dst,
            "proto": proto,        # 👈 consistent with frontend naming
            "length": len(pkt)
        }
    except Exception as e:
        return {"error": f"Failed to parse packet: {str(e)}"}
