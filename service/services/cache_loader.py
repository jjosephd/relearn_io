import json

def load_cached_schools():
    print("🟡 Loading cached data from file...")
    with open("data/cached_schools.json", "r", encoding="utf-8") as f:
        return json.load(f)
