import os
import json
from flask import jsonify
from flask import Blueprint
from flask import request
from services.college_scorecard_service import query_college_scorecard
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
