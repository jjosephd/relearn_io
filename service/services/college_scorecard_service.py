# services/college_scorecard_service.py

import os
import requests

COLLEGE_API_KEY = os.getenv("COLLEGE_API_KEY")
BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools"

def query_college_scorecard(per_page=100):
    """
    Fetches a general list of schools from the College Scorecard API.
    Used as a fallback when cache misses. Does not filter by state or program.
    """
    params = {
        "api_key": COLLEGE_API_KEY,
        "school.name": "tech",  # Returns a broad sample; change to rotate if needed
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
        print(f"✅ API returned {len(response.json().get('results', []))} schools.")
        return response.json().get("results", [])
    except requests.RequestException as e:
        print(f"[College API] Error: {e}")
        return []
    
def direct_api_query(school_name=None, program=None, state=None, per_page=100):

    """
    Direct query to College Scorecard API with filtering.
    Only used for debugging or /test-query endpoint.
    """
    if not COLLEGE_API_KEY:
        raise ValueError("COLLEGE_API_KEY is not set")

    params = {
    "api_key": COLLEGE_API_KEY,
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

    if school_name:
        params["school.name"] = school_name

    try:
        response = requests.get(BASE_URL, params=params, timeout=10)
        response.raise_for_status()
        return response.json().get("results", [])
    except requests.RequestException as e:
        print(f"[Direct API Query] Error: {e}")
        return []
