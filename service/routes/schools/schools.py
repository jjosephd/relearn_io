import os
import json
from flask import jsonify, Blueprint, request

from services.college_filtering import filter_schools
from services.cache_loader import load_cached_schools  # New cache loader
from services.cache_loader import is_cache_hit

from services.college_scorecard_service import query_college_scorecard
from services.college_scorecard_service import direct_api_query

school_bp = Blueprint('school_bp', __name__)


@school_bp.route('/programs', methods=['GET'])
def get_program_titles():
    """
    Returns a sorted list of academic program titles from JSON.
    """
    file_path = os.path.join(os.path.dirname(__file__), '../../data/program_titles.json')
    with open(file_path, 'r', encoding='utf-8') as f:
        titles = json.load(f)
    return jsonify(sorted(titles)), 200


@school_bp.route('/test-query', methods=['GET'])
def test_college_query():
    """
    Used for debugging direct API calls (NOT used in /discover).
    """
    school_name = request.args.get("school_name")
    results = direct_api_query(school_name=school_name)
    return jsonify(results), 200


@school_bp.route('/discover', methods=['GET'])
def discover_schools():
    """
    Filters a locally cached dataset of schools based on query params.
    """
    state = request.args.get("state")
    program = request.args.get("program")
    max_tuition = request.args.get("max_tuition")

    try:
        max_tuition = int(max_tuition) if max_tuition else None
    except ValueError:
        return jsonify({"error": "max_tuition must be a number"}), 400

    cached_schools = load_cached_schools()
    # Check if we can serve this request from cache
    if is_cache_hit(cached_schools, state=state, program=program):
        print("⚡ Using cached data")
        data_source = cached_schools
    else:
        print("🔁 Cache miss – querying live API")
        data_source = query_college_scorecard()
    filtered = filter_schools(
        cached_schools,
        state=state,
        program=program,
        max_tuition=max_tuition
    )

    return jsonify({
        "count": len(filtered),
        "schools": filtered
    }), 200
