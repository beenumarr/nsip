from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
INSTANCE_DIR = BASE_DIR / "instance"


class Config:
    DATABASE = INSTANCE_DIR / "database.db"
    JSON_SORT_KEYS = False
