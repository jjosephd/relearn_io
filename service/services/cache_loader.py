import json

def load_all_cached_schools(filepath="data/cached_schools.json"):
    with open(filepath, "r", encoding="utf-8") as f:
        segmented = json.load(f)
    all_schools = []
    for segment_data in segmented.values():
        all_schools.extend(segment_data.get("schools", []))
    return all_schools

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

