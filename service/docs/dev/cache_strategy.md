# College Scorecard Cache Strategy

## Overview

This strategy reduces API call volume and improves backend filtering by preloading a diverse sample of U.S. schools from the College Scorecard API and storing them in a local cache file.

---

## How It Works

### 1. Fragment-Based Fetching

We use common school name fragments like:

`["uni", "tech", "comm", "vir", "sou", "cen", "nor", "sta", "col", "ins"]`

to hit the API and fetch schools whose names partially match.

---

### 2. Deduplication

Each result is deduplicated by `school_name` to avoid storing repeats.

---

### 3. Local JSON Cache

The final list of unique schools is written to:

`data/cached_schools.json`

This file is read later in the app for filtering in the `/discover` route.

---

### 4. Backend Filtering

Instead of relying on API filters, we:

- Load cached JSON
- Filter based on query params (`state`, `program`, `max_tuition`)
- This eliminates live API latency for 99% of frontend use cases

---

## Developer Flow

```bash
# Run this to refresh the cache
python -m cache.cache_schools

---

##  TODO:
 Add ZIP-code or region-based fragment support

 Add random page sampling (page=2,3,4...) to catch more unique schools

 Track states already cached to ensure coverage

 Add TTL-based cache invalidation (e.g., refresh every 7 days)

 Smart fallback: use live API only when cache returns 0 results
```
