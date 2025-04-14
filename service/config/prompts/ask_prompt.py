def prompt(query):
    return f"""
    Help the user find a suitable education program by answering their query:

    User Query: "{query}"

    Use the following APIs to gather relevant data:
    - College Scorecard: retrieve information on colleges and universities
    - IPEDS: retrieve data on institutional characteristics and student outcomes
    - Coursera: retrieve information on online courses and programs

    Task for OpenAI:
    - Provide a natural language answer that addresses the user's query
    - If comparing multiple schools, provide a table or list with the following columns:
        - School Name
        - Cost
        - Flexibility (e.g., online, part-time, etc.)
        - Other relevant factors (e.g., accreditation, graduation rates, etc.)

    Respond in the following format:
    {{
        "answer": "natural language response",
        "comparison": [
            {{
                "school_name": "School A",
                "cost": "$X",
                "flexibility": "online",
                ...
            }},
            {{
                "school_name": "School B",
                "cost": "$Y",
                "flexibility": "part-time",
                ...
            }}
        ]
    }}
    """