from flask import jsonify

class APIError(Exception):
    def __init__(self, status_code, message):
        super().__init__(message)
        self.message = message
        self.staus_code = status_code

def register_error_handlers(app):
    @app.errorHandler(APIError)
    def handle_api_error(error):
        response = jsonify({"error": error.message})
        response.status_code = error.status_code
        return response
    @app.errorHandler(400)