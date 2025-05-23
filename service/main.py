# Copyright 2025 Jordan Daniel
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#     https://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask
from dotenv import load_dotenv
from routes.schools.schools import school_bp
from flask_cors import CORS
from routes.ask.ask import ask_bp
import openai
import os 

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app, origins="http://localhost:5173", supports_credentials=True)

app.register_blueprint(school_bp, url_prefix='/schools')
app.register_blueprint(ask_bp, url_prefix='/ai')

if __name__ == '__main__':
    app.run(debug=True)