import json

def load_cached_schools():
    print("🟡 Loading cached data from file...")
    with open("data/cached_schools.json", "r", encoding="utf-8") as f:
        return json.load(f)
def is_cache_hit(schools, state=None, program=None):
    for school in schools:
        if state and school.get("school.state") != state:
            continue
        if program:
            programs = [p["title"] for p in school.get("latest.programs.cip_4_digit", [])]
            if not any(program.lower() in p.lower() for p in programs):
                continue
        return True  # Found a match
    return False  # No matches found

