from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from app.models import init_db
from app.routes import threats_bp
from app.socket import init_socketio


def create_app() -> Flask:
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(Config)

    app.instance_path = str(Config.DATABASE.parent)
    Config.DATABASE.parent.mkdir(parents=True, exist_ok=True)

    CORS(app)
    init_socketio(app)

    init_db()
    app.register_blueprint(threats_bp)

    @app.get("/")
    def health_check():
        return jsonify({"message": "NSIP backend is running"}), 200

    return app
