from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from socketio_server import socketio
from packet_sniffer import start_sniffing, captured_packets, formatted_packets
from utils.logger import save_packets_to_pcap, get_recent_alerts
import os
import signal
import sys
import glob
import threading

app = Flask(__name__)
CORS(app)
socketio.init_app(app)

@app.route('/')
def index():
    return jsonify({"message": "Backend Running"})

# ✅ Route that sends both latest packets and recent alerts
@app.route('/api/packets')
def get_packets():
    alerts = get_recent_alerts(limit=10)
    return jsonify({
        "packets": formatted_packets[-100:],  # show last 100 packets
        "alerts": alerts                      # show last 10 alerts
    })

# ✅ Download any log file (.txt or .pcap)
@app.route('/logs/<path:filename>')
def download_log(filename):
    # Relative path for compatibility on Render
    logs_path = os.path.join(os.path.dirname(__file__), "../logs")
    print(f"[DEBUG] Attempting to serve: {os.path.join(logs_path, filename)}")
    return send_from_directory(logs_path, filename, as_attachment=True)

# ✅ Return the name of the latest PCAP file
@app.route('/api/latest-pcap')
def get_latest_pcap_file():
    logs_path = os.path.join(os.path.dirname(__file__), "../logs")
    try:
        pcaps = sorted(glob.glob(os.path.join(logs_path, "traffic_log_*.pcap")), reverse=True)
        if pcaps:
            latest_filename = os.path.basename(pcaps[0])
            return jsonify({"filename": latest_filename})
        else:
            return jsonify({"error": "No PCAP file found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ Gracefully save packets when exiting
def handle_exit(sig, frame):
    print("\n[+] Ctrl+C received. Saving packets to PCAP...")
    save_packets_to_pcap(captured_packets)
    print("[+] Saved to logs/traffic_log_*.pcap. Exiting.")
    sys.exit(0)

# Register signal handler
signal.signal(signal.SIGINT, handle_exit)

if __name__ == '__main__':
    print("[*] Starting sniffer in background thread...")
    t = threading.Thread(target=start_sniffing, daemon=True)
    t.start()

    print("[*] Running Flask server at http://0.0.0.0:5000")
    port = int(os.environ.get("PORT", 5000))
    socketio.run(app, host='0.0.0.0', port=port)



# from flask import Flask, jsonify, send_from_directory
# from flask_cors import CORS
# from socketio_server import socketio
# from packet_sniffer import start_sniffing, captured_packets, formatted_packets
# from utils.logger import save_packets_to_pcap, get_recent_alerts
# import os
# import signal
# import sys
# import glob
# import threading

# app = Flask(__name__)
# CORS(app)
# socketio.init_app(app)

# @app.route('/')
# def index():
#     return jsonify({"message": "Backend Running"})

# # ✅ Route that sends both latest packets and recent alerts
# @app.route('/api/packets')
# def get_packets():
#     alerts = get_recent_alerts(limit=10)
#     return jsonify({
#         "packets": formatted_packets[-100:],  # show last 100 packets
#         "alerts": alerts                      # show last 10 alerts
#     })

# # ✅ Download any log file (.txt or .pcap)
# @app.route('/logs/<path:filename>')
# def download_log(filename):
#     logs_path = "/home/beyounop/Documents/PROJECT/Network_Traffic_Analyzer/logs"
#     # logs_path = os.path.join(os.path.dirname(__file__), "../logs")
#     print(f"[DEBUG] Attempting to serve: {os.path.join(logs_path, filename)}")
#     return send_from_directory(logs_path, filename, as_attachment=True)

# # ✅ Return the name of the latest PCAP file
# @app.route('/api/latest-pcap')
# def get_latest_pcap_file():
#     logs_path = os.path.join(os.path.dirname(__file__), "logs")
#     try:
#         pcaps = sorted(glob.glob(os.path.join(logs_path, "traffic_log_*.pcap")), reverse=True)
#         if pcaps:
#             latest_filename = os.path.basename(pcaps[0])
#             return jsonify({"filename": latest_filename})
#         else:
#             return jsonify({"error": "No PCAP file found"}), 404
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # ✅ Gracefully save packets when exiting
# def handle_exit(sig, frame):
#     print("\n[+] Ctrl+C received. Saving packets to PCAP...")
#     save_packets_to_pcap(captured_packets)
#     print("[+] Saved to logs/traffic_log_*.pcap. Exiting.")
#     sys.exit(0)

# # Register signal handler
# signal.signal(signal.SIGINT, handle_exit)

# if __name__ == '__main__':
#     print("[*] Starting sniffer in background thread...")
#     t = threading.Thread(target=start_sniffing, daemon=True)
#     t.start()

#     print("[*] Running Flask server at http://localhost:5000")
#     port = int(os.environ.get("PORT", 5000))
#     socketio.run(app, host='0.0.0.0', port=port)

