#
# @description:Collect a diverse sample of schools from the College Scorecard API and save them to a 
# local JSON file (cached_schools.json) so that your app can filter school data locally
# without needing constant API calls.
#
import os
import json
from datetime import datetime, timezone
from services.college_scorecard_service import direct_api_query
from utils.fragment_generator import generate_fragments

def collect_diverse_schools(name_fragments):
    """
    Fetches school data from the API using a list of name fragments.
    Deduplicates schools by their name.
    """
    seen = set()
    all_schools = []

    for frag in name_fragments:
        print(f"🔍 Fetching schools matching fragment: '{frag}'")
        results = direct_api_query(school_name=frag, per_page=100)

        for school in results:
            name = school.get("school.name")
            if name and name not in seen:
                seen.add(name)
                all_schools.append(school)

    print(f"✅ Collected {len(all_schools)} unique schools.")
    return all_schools

def save_to_segmented_cache(fragment, schools, filepath="data/cached_schools.json"):
    cache = {}

    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            cache = json.load(f)

    cache[fragment] = {
        "last_updated": datetime.now(timezone.utc).isoformat(),
        "schools": schools
    }

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2)

    print(f"✅ Saved {len(schools)} schools to {filepath}")
