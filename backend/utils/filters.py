def filter_packets(packets, src_ip=None, dst_ip=None, protocol=None):
    def match(pkt):
        try:
            src_match = src_ip in pkt["src"] if src_ip else True
            dst_match = dst_ip in pkt["dst"] if dst_ip else True
            proto_match = protocol.lower() == pkt["proto"].lower() if protocol else True
            return src_match and dst_match and proto_match
        except:
            return False

    return [pkt for pkt in packets if match(pkt)]
