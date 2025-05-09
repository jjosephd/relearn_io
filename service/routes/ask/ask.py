from flask import Blueprint, request, jsonify
from services.openai_parser import parse_filters_with_openai

ask_bp = Blueprint('ask_bp', __name__)

@ask_bp.route('/ask', methods=['POST'])
def ask_school_bot():
    data = request.get_json()
    user_query = data.get("query", "")

    try:
        filters = parse_filters_with_openai(user_query)
        return jsonify({
            "filters": filters,
            "explanation": f"Filters extracted from your query: {filters}"
        })
    except Exception as e:
        print(f"OpenAI parsing failed: {e}")
        return jsonify({
            "error": "Could not interpret your query. Try rephrasing."
        }), 500
