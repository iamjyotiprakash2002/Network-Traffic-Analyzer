from flask_socketio import SocketIO, emit

# Initialize SocketIO in your main app (import this)
socketio = SocketIO(cors_allowed_origins="*")

# Call this when a new packet is processed
def push_packet(pkt_data):
    socketio.emit('new_packet', pkt_data)

def push_alert(alert_msg):
    socketio.emit('new_alert', {'message': alert_msg})
