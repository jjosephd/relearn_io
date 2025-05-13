import os
import json
from flask import jsonify, Blueprint, request

from services.college_filtering import filter_schools
from services.cache_loader import load_all_cached_schools  # New cache loader
from services.cache_loader import is_cache_hit

from services.college_scorecard_service import query_college_scorecard
from services.college_scorecard_service import direct_api_query
from services.openai_parser import parse_filters_with_openai

school_bp = Blueprint('school_bp', __name__)


@school_bp.route('/query', methods=['POST'])
def query_chatbot():
    data = request.get_json()
    user_query = data.get("query", "")

    try:
        filters = parse_filters_with_openai(user_query)
        return {
            "filters": filters,
            "explanation": f"We interpreted your query as: {filters}"
        }
    except Exception as e:
        return {
            "filters": {},
            "explanation": "Sorry, we couldn't understand your request."
        }, 500

@school_bp.route('/discover', methods=['GET'])
def discover_schools():
    state = request.args.get("state")
    program = request.args.get("program")
    max_tuition = request.args.get("max_tuition")
    school_name = request.args.get("school_name")

    try:
        max_tuition = int(max_tuition) if max_tuition else None
    except ValueError:
        return jsonify({"error": "max_tuition must be a number"}), 400

    # Load from cache
    print("📦 Trying cache first...")
    raw_schools = load_all_cached_schools()
    print(f"📚 Loaded {len(raw_schools)} schools from cache")

    if not raw_schools:
        print("⚠️ Cache is empty — falling back to live API")
        live_data = direct_api_query(state=state, program=program, school_name=school_name)
        filtered_live = filter_schools(
            live_data,
            state=state,
            program=program,
            max_tuition=max_tuition,
            school_name=school_name
        )
        return jsonify({
            "count": len(filtered_live),
            "schools": filtered_live,
            "from_cache": False,
            "message": (
                "No schools matched your search filters."
                if not filtered_live
                else f"Found {len(filtered_live)} schools from live API."
            )
        }), 200

    # Filter cache
    filtered = filter_schools(
        raw_schools,
        state=state,
        program=program,
        max_tuition=max_tuition,
        school_name=school_name
    )
    print(f"🔎 {len(filtered)} school(s) matched filters from cache")

    if len(filtered) == 0:
        print("⚠️ No cache matches — falling back to live API")
        live_data = direct_api_query(state=state, program=program, school_name=school_name)
        filtered_live = filter_schools(
            live_data,
            state=state,
            program=program,
            max_tuition=max_tuition,
            school_name=school_name
        )
        return jsonify({
            "count": len(filtered_live),
            "schools": filtered_live,
            "from_cache": False,
            "message": (
                "No schools matched your search filters."
                if not filtered_live
                else f"Found {len(filtered_live)} schools from live API."
            )
        }), 200

    # Return filtered cache results
    return jsonify({
        "count": len(filtered),
        "schools": filtered,
        "from_cache": True,
        "message": f"Found {len(filtered)} schools from cached data."
    }), 200
