import os
import json
from services.college_scorecard_service import direct_api_query
from cache.cache_schools import save_to_segmented_cache
from utils.fragment_generator import generate_fragments

def refresh_next_fragment():
    filepath = "data/cached_schools.json"
    fragments = generate_fragments()
    cache = {}

    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            cache = json.load(f)
            if isinstance(cache, list):
                print("⚠️ Detected old flat cache format. Refresh aborted.")
                return

    stale_fragments = sorted(
        fragments,
        key=lambda frag: cache.get(frag, {}).get("last_updated", "")
    )

    for frag in stale_fragments:
        print(f"🔁 Attempting fragment '{frag}'...")
        results = direct_api_query(school_name=frag, per_page=100)

        if results:
            save_to_segmented_cache(frag, results, filepath)
            print(f"✅ Saved {len(results)} schools for '{frag}'")
            break
        else:
            print(f"⚠️ No results for '{frag}'. Trying next.")
    else:
        print("❌ No valid fragments returned results. Nothing refreshed.")

if __name__ == "__main__":
    refresh_next_fragment()
    print("✅ Finished refreshing cache")
