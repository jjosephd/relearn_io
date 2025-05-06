# services/college_scorecard_service.py

import os
import requests

COLLEGE_API_KEY = os.getenv("COLLEGE_API_KEY")
BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools"

def query_college_scorecard(per_page=100):
    params = {
        "api_key": COLLEGE_API_KEY,
        "school.name": "tech",  # Required pseudo-filter to get general results
        "fields": (
            "school.name,"
            "school.city,"
            "school.state,"
            "latest.admissions.admission_rate.overall,"
            "latest.cost.tuition.in_state,"
            "latest.cost.tuition.out_of_state,"
            "latest.programs.cip_4_digit.title"
        ),
        "per_page": per_page
    }

    try:
        response = requests.get(BASE_URL, params=params, timeout=10)
        response.raise_for_status()
        return response.json().get("results", [])
    except requests.RequestException as e:
        print(f"[College API] Error: {e}")
        return []
