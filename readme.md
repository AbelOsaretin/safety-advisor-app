# Safety Expert AI Agent 🛡️

A web-based AI-powered safety expert application that provides comprehensive safety analysis and recommendations using CrewAI and Google's Gemini AI model.

Live link - [Safety AI Agent](https://safety-advisor-app.onrender.com/)

**Give render sometime to load the project.**

## 🌟 Features

- **AI-Powered Safety Analysis**: Get expert safety advice powered by Google's Gemini AI
- **Interactive Web Interface**: Clean, user-friendly frontend for easy interaction
- **Real-time Processing**: Dynamic safety assessments based on user queries
- **Template Queries**: Quick-start templates for common safety scenarios
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🚀 Demo

Ask questions like:
- "What are the main safety concerns for traveling to Lagos, Nigeria?"
- "Provide a workplace safety assessment for a manufacturing facility"
- "What safety precautions should I take when visiting Abuja?"

## 🛠️ Technology Stack

- **Backend**: Flask (Python)
- **AI Framework**: CrewAI
- **AI Model**: Google Gemini 1.5 Flash
- **Frontend**: HTML5, CSS3, JavaScript

## 📋 Prerequisites

- Python 3.8 or higher
- Google Cloud API Key with Gemini API access
- Git (for version control)

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/abelosaretin/safety-expert-ai.git
cd safety-expert-ai
```

### 2. Set Up Virtual Environment (Recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Environment Configuration
Create a `.env` file in the project root:
```bash
cp .env.example .env
```

Edit the `.env` file and add your Google API key:
```
GOOGLE_API_KEY=your_actual_api_key_here
```

### 5. Run the Application
```bash
python app.py
```

Visit `http://localhost:5000` in your browser.

## 📁 Project Structure

```
safety-expert-ai/

├── app.py                 # Flask 
application (main backend)

├── requirements.txt       # Python dependencies

├── .env.example          # Environment variables template

├── .gitignore            # Git ignore file

├── README.md             # Project documentation

├── templates/
│   └── index.html        # Main web 
interface

└── static/
    ├── styles.css        # Application styling

    └── script.js         # Frontend functionality
```

## 🌐 Deployment

The application is ready for deployment on various cloud platforms:

### Heroku
```bash
heroku login
heroku create your-app-name
heroku config:set GOOGLE_API_KEY=your_actual_api_key_here
git push heroku main
```

### Railway.app
1. Connect your GitHub repository to Railway
2. Set `GOOGLE_API_KEY` environment variable in Railway dashboard
3. Deploy automatically from main branch

### Other Platforms
- **Render**: Connect repository and set environment variables
- **PythonAnywhere**: Upload files and configure WSGI
- **Google Cloud Run**: Use Cloud Build or deploy directly

## 🔑 API Key Setup

### Getting a Google API Key:
1. Visit the [Google AI Studio](https://aistudio.google.com/)
2. Create or use existing API key.


## 🎯 Usage

1. **Open the Application**: Navigate to your deployed URL or `http://localhost:5000`

2. **Enter Your Query**: Type your safety-related question in the text area

3. **Use Templates**: Click on template buttons for common safety scenarios:
   - Safety in Nigeria
   - Workplace Safety
   - Travel Safety

4. **Get Expert Analysis**: Click "Get Safety Advice" and wait for the AI-powered response

5. **Review Results**: The AI will provide comprehensive safety analysis with specific recommendations


## 🔧 Customization

### Modifying the AI Agent
Edit the agent configuration in `app.py`:
```python
safety_professional = Agent(
    role="Senior safety expert",
    goal="Give the best safety advise and analysis",
    backstory="You work at a top firm with global insights.",
    verbose=True,
    llm=llm
)
```

### Styling Changes
Modify `static/styles.css` to customize the appearance of your application.

### Adding New Templates
Update the `insertTemplate()` function in `static/script.js` to add new quick-start templates.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [CrewAI](https://github.com/joaomdmoura/crewAI) for the AI agent framework
- [Google Gemini](https://ai.google.dev/) for the powerful language model
- [Flask](https://flask.palletsprojects.com/) for the web framework

## 📧 Contact

Your Name - contact.abel321@gmail.com

Project Link: [https://github.com/abelosaretin/safety-expert-ai](https://github.com/abelosaretin/safety-expert-ai)

---

⭐ If you found this project helpful, please give it a star on GitHub!