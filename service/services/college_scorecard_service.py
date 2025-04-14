import requests
import os
from flask import jsonify
from flask import Blueprint
import flask
from flask import request

api_key = os.getenv("COLLEGE_API_KEY")
BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools"
school_bp = Blueprint('school_bp', __name__)

def get_college_names():
    """
    Fetches a list of tuples containing the name, city, and state of a number
    of colleges from the College Scorecard API.

    Returns:
        A list of tuples of (name, city, state) for each college.

    Raises:
        requests.exceptions.RequestException: If there is an error fetching data.
    """
    url = "https://api.data.gov/ed/collegescorecard/v1/schools"
    params = {
    "api_key": api_key,
    "fields": "school.name,school.city,school.state,latest.admissions.admission_rate.overall,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state",
    "per_page": 10
}

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        results = data.get("results", [])
        
        return results
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return ["Error fetching school names"]

@school_bp.route('/explore', methods=['GET'])
def get_college_data():
    
    print("🚀 Received request!")
    school_name = request.args.get('school_name')
    
    if not school_name:
        return jsonify({"error": "Please provide a 'school_name' query parameter in the request'"}), 400
    
    params = {
        "api_key": api_key,
        "school.name": school_name.replace(" ", "+"),
        "fields": "school.name,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state,latest.admissions.admission_rate.overall",
        "per_page": 10       
    }
    
    try:
        response = requests.get(BASE_URL, params=params, timeout=10)
        response.raise_for_status()
        results = response.json().get("results", [])
        
        if not results:
            return jsonify({"error": f"No data found for school: {school_name}"}), 404
            
        tuition_info = []
        # Iterate over the results and extract tuition information
        for school in results:
            tuition_info.append({
                "school_name": school.get("school.name", "N/A"),
                "in_state_tuition": school.get("latest.cost.tuition.in_state", "N/A"),
                "out_of_state_tuition": school.get("latest.cost.tuition.out_of_state", "N/A"),
                "admission_rate": school.get("latest.admissions.admission_rate.overall", "N/A")
            })
        
        
        return jsonify(tuition_info), 200
        
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
