from flask import jsonify
from flask import Blueprint
from flask import request
from services.college_scorecard_service import get_college_names
from services.college_scorecard_service import get_college_data

school_bp = Blueprint('school_bp', __name__)

# Mocked local schools
@school_bp.route('/', methods=['GET'])
def get_schools():
    schools = [
        {
            "id": 1,
            "name": "Virginia State University",
            "city": "Petersburg",
            "state": "VA",
            "website": "www.vsu.edu",
            "mode": "Online"
        },
        {
            "id": 2,
            "name": "Virginia Commonwealth University",
            "city": "Richmond",
            "state": "VA",
            "website": "www.vcu.edu",
            "mode": "In-Person"
        }
    ]
    return jsonify(schools)

# External API: Get school names from College Scorecard
@school_bp.route('/names', methods=['GET'])
def get_school_names():
    return jsonify(get_college_names())


@school_bp.route('/explore', methods=['GET'])
def test(): 
    return get_college_data()
