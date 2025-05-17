## app.py

from flask import Flask, request, render_template, jsonify
import os
from crewai import Agent, Task, Crew, LLM
from dotenv import load_dotenv
from flask_cors import CORS



# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

CORS(app)

# Set API key (in production, use environment variables or secure storage)
google_api_key = os.environ.get('GOOGLE_API_KEY')

# Configure the LLM
llm = LLM(
    model="gemini/gemini-1.5-flash",
    temperature=0.7,
    api_key=google_api_key 
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_safety_advice', methods=['POST'])
def get_safety_advice():
    try:
        data = request.json
        user_query = data.get('query', '')
        
        if not user_query:
            return jsonify({'error': 'No query provided'}), 400
        
        # Create the safety expert agent
        safety_professional = Agent(
            role="Senior safety expert",
            goal="Give the best safety advise and analysis",
            backstory="You work at a top firm with global insights.",
            verbose=True,
            llm=llm
        )
        
        # Create task based on user query
        task = Task(
            description=f"Provide comprehensive safety analysis regarding: {user_query}",
            expected_output="Detailed safety report with specific risks and recommendations.",
            agent=safety_professional
        )
        
        # Set up the crew with our agent and task
        crew = Crew(agents=[safety_professional], tasks=[task], verbose=True)
        
        # Execute the task
        result = crew.kickoff()

        result_str = str(result)
        
        # return jsonify({'result': result})
        return jsonify({'result': result_str})    
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
     app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
