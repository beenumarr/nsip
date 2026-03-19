import sqlite3
from pathlib import Path
from typing import Any

from config import Config


def get_db_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(Config.DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def init_db() -> None:
    Path(Config.DATABASE).parent.mkdir(parents=True, exist_ok=True)

    with get_db_connection() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS threats (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                lat REAL NOT NULL,
                lng REAL NOT NULL,
                type TEXT NOT NULL,
                location TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        connection.commit()


def get_all_threats() -> list[dict[str, Any]]:
    with get_db_connection() as connection:
        rows = connection.execute(
            """
            SELECT id, lat, lng, type, location, created_at
            FROM threats
            ORDER BY id DESC
            """
        ).fetchall()

    return [dict(row) for row in rows]


def create_threat(
    *,
    lat: float,
    lng: float,
    threat_type: str,
    location: str,
    created_at: str,
) -> dict[str, Any]:
    with get_db_connection() as connection:
        cursor = connection.execute(
            """
            INSERT INTO threats (lat, lng, type, location, created_at)
            VALUES (?, ?, ?, ?, ?)
            """,
            (lat, lng, threat_type, location, created_at),
        )
        connection.commit()

        threat_id = cursor.lastrowid
        row = connection.execute(
            """
            SELECT id, lat, lng, type, location, created_at
            FROM threats
            WHERE id = ?
            """,
            (threat_id,),
        ).fetchone()

    return dict(row) if row is not None else {}
