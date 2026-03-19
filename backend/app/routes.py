from datetime import datetime, timezone

from flask import Blueprint, current_app, jsonify, request

from app.models import create_threat, get_all_threats
from app.socket import emit_threat_created


threats_bp = Blueprint("threats", __name__)


@threats_bp.get("/threats")
def list_threats():
    try:
        threats = get_all_threats()
        return jsonify(threats), 200
    except Exception:
        current_app.logger.exception("Failed to fetch threats.")
        return jsonify({"error": "Failed to fetch threats"}), 500


@threats_bp.post("/threats")
def add_threat():
    payload = request.get_json(silent=True)

    if payload is None:
        return jsonify({"error": "Request body must be valid JSON"}), 400

    required_fields = ("lat", "lng", "type", "location")
    missing_fields = [field for field in required_fields if field not in payload]
    if missing_fields:
        return (
            jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}),
            400,
        )

    try:
        lat = float(payload["lat"])
        lng = float(payload["lng"])
    except (TypeError, ValueError):
        return jsonify({"error": "lat and lng must be numbers"}), 400

    threat_type = str(payload["type"]).strip()
    location = str(payload["location"]).strip()

    if not threat_type or not location:
        return jsonify({"error": "type and location cannot be empty"}), 400

    created_at = datetime.now(timezone.utc).isoformat()

    try:
        threat = create_threat(
            lat=lat,
            lng=lng,
            threat_type=threat_type,
            location=location,
            created_at=created_at,
        )
        emit_threat_created(threat)
        return (
            jsonify({"message": "Threat created successfully", "threat": threat}),
            201,
        )
    except Exception:
        current_app.logger.exception("Failed to create threat.")
        return jsonify({"error": "Failed to create threat"}), 500
