import json
from services.college_scorecard_service import query_college_scorecard

fragments = ["uni", "tech", "comm", "vir", "sou", "cen", "nor", "sta", "col", "ins"]
all_results = []

for frag in fragments:
    schools = query_college_scorecard(school_name=frag)
    all_results.extend(schools)

# Deduplicate by name
seen = set()
unique = []
for s in all_results:
    name = s.get("school.name")
    if name and name not in seen:
        seen.add(name)
        unique.append(s)

with open("data/cached_schools.json", "w") as f:
    json.dump(unique, f, indent=2)

print(f"✅ Cached {len(unique)} schools to data/cached_schools.json")
