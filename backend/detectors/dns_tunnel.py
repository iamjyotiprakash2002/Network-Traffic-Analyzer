from config import DNS_TUNNEL_LABEL_LIMIT, DNS_TUNNEL_PARTS_THRESHOLD

TRUSTED_DOMAINS = [
    "googlesyndication.com",
    "data.microsoft.com",
    "mobile.events.data.microsoft.com",
    "googlecast",
    "windows.com",
    "local",
    "microsoft.com",
    "google.com"
]

# def detect_dns_tunnel(pkt):
#     if pkt.haslayer("DNS") and pkt["DNS"].qd:
#         query = pkt["DNS"].qd.qname.decode(errors="ignore").rstrip(".")
#         parts = query.split(".")

#         # ✅ Skip if domain ends with any trusted one
#         if any(query.endswith(td) for td in TRUSTED_DOMAINS):
#             return None

#         if len(parts) > DNS_TUNNEL_PARTS_THRESHOLD or any(len(p) > DNS_TUNNEL_LABEL_LIMIT for p in parts):
#             return f"Possible DNS tunneling detected in query: {query}"

#     return None

def detect_dns_tunnel(pkt):
    if pkt.haslayer("DNS") and pkt["DNS"].qd:
        query = pkt["DNS"].qd.qname.decode(errors="ignore").rstrip(".")
        parts = query.split(".")

        print(f"[DEBUG] DNS Query: {query}")  # 👈 Add this

        if any(query.endswith(td) for td in TRUSTED_DOMAINS):
            print(f"[DEBUG] Whitelisted domain matched: {query}")  # 👈 Add this
            return None

        if len(parts) > DNS_TUNNEL_PARTS_THRESHOLD or any(len(p) > DNS_TUNNEL_LABEL_LIMIT for p in parts):
            return f"Possible DNS tunneling detected in query: {query}"

    return None



# from config import DNS_TUNNEL_LABEL_LIMIT, DNS_TUNNEL_PARTS_THRESHOLD

# TRUSTED_DOMAINS = [
#     "googlesyndication.com",
#     "data.microsoft.com",
#     "mobile.events.data.microsoft.com",
#     "googlecast",
#     "windows.com",
#     "local",
#     "microsoft.com",
#     "google.com"
# ]

# def detect_dns_tunnel(pkt):
#     if pkt.haslayer("DNS") and pkt["DNS"].qd:
#         query = pkt["DNS"].qd.qname.decode(errors="ignore").rstrip(".")
#         parts = query.split(".")

#         # 🔐 Whitelist check: if ends with any trusted domain, skip alert
#         for domain in TRUSTED_DOMAINS:
#             if query.endswith(domain):
#                 return None

#         if len(parts) > DNS_TUNNEL_PARTS_THRESHOLD or any(len(p) > DNS_TUNNEL_LABEL_LIMIT for p in parts):
#             return f"Possible DNS tunneling detected in query: {query}"

#     return None
