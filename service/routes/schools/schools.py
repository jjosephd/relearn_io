import os
import json
from flask import jsonify
from flask import Blueprint
from flask import request
from services.college_scorecard_service import query_college_scorecard
from services.college_filtering import filter_schools
school_bp = Blueprint('school_bp', __name__)


@school_bp.route('/programs', methods=['GET'])
def get_program_titles():
    """
    Handles GET requests to the '/programs' endpoint.

    Reads a JSON file containing program titles and returns a sorted list of these titles 
    as a JSON response with a status code of 200.
    """

    file_path = os.path.join(os.path.dirname(__file__), '../../data/program_titles.json')
    with open(file_path, 'r', encoding='utf-8') as f:
        titles = json.load(f)
    return jsonify(sorted(titles)), 200

@school_bp.route('/test-query', methods=['GET'])
def test_college_query():
    program = request.args.get("program")
    state = request.args.get("state")
    school_name = request.args.get("school_name")

    results = query_college_scorecard(program=program, state=state, school_name=school_name)
    return jsonify(results), 200

@school_bp.route('/discover', methods=['GET'])

def discover_schools():
    """
    Returns a filtered list of schools based on state, program, and max_tuition.
    Query params:
    - state=VA
    - program=Computer and Information Sciences, General
    - max_tuition=14000
    """
    # Grab query params
    state = request.args.get("state")
    program = request.args.get("program")
    max_tuition = request.args.get("max_tuition")

    # Validate and convert tuition if provided
    try:
        max_tuition = int(max_tuition) if max_tuition else None
    except ValueError:
        return jsonify({"error": "max_tuition must be a number"}), 400

    # Step 1: Fetch raw school data (up to 100)
    raw_schools = query_college_scorecard()

    # Step 2: Apply backend filtering
    filtered_schools = filter_schools(
        raw_schools,
        state=state,
        program=program,
        max_tuition=max_tuition
    )

    # Step 3: Return results
    return jsonify({
        "count": len(filtered_schools),
        "schools": filtered_schools
    }), 200
