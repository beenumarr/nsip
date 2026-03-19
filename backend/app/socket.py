from flask import Flask
from flask_socketio import SocketIO


socketio = SocketIO(cors_allowed_origins="*", async_mode="threading")


def init_socketio(app: Flask) -> None:
    socketio.init_app(app)


def emit_threat_created(threat: dict) -> None:
    socketio.emit("threat_created", threat)
