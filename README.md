# URAI 🤖💀

> **You ask. AI ignores.**

## Basic Details

### Team Name: Pixel Pulse

### Team Members

- Team Lead: Gouri Nandana K.U - ASIET, Kalady
- Member 2: Deril K Shaju - ASIET, Kalady

### Project Description

URAI (Unrelated AI Conversation) is a deliberately useless conversational web application that responds to user questions with completely unrelated and random responses.

It provides text and voice interaction, multiple chaos modes, an Unrelatedness Score, a Chaos Meter, and text-to-speech output — because sometimes the best answer is absolutely irrelevant.

### The Problem (that doesn't exist)

People are already surrounded by AI systems that try to understand questions and provide relevant answers.

But what if we had an AI that did the exact opposite?

Users clearly need a system that confidently ignores their questions and talks about completely unrelated things such as coconut trees, pressure cookers, mosquitoes, slippers, ceiling fans, and random college nonsense.

Unfortunately, no one asked for this problem.

So we created it anyway.

### The Solution (that nobody asked for)

Introducing **URAI — Unrelated AI Conversation**.

URAI intentionally ignores the meaning of the user's input and responds with a completely unrelated random response.

The system includes:

- 💬 Text-based conversation
- 🎙️ Voice input
- 🔊 Text-to-speech voice output
- 🤪 Multiple chaos modes
- 📊 Unrelatedness Score
- 🌪️ Chaos Meter
- 😂 Malayalam/Manglish responses
- 🔊 Response replay
- 💡 Suggested conversation prompts
- 🔄 Randomized responses

The goal is simple:

> **You ask. URAI ignores.**

## Technical Details

### Technologies/Components Used

For Software:

- **Languages used**
  - Python
  - JavaScript
  - HTML
  - CSS

- **Frameworks used**
  - Flask

- **Libraries/APIs used**
  - Flask
  - Web Speech API
  - Browser Speech Synthesis API

- **Tools used**
  - Visual Studio Code
  - Git
  - GitHub
  - Render

For Hardware:

- Laptop/Desktop
- Microphone for voice input
- Speakers/Headphones for voice output
- Internet connection

### Implementation

For Software:

URAI follows a simple client-server architecture.

1. The user enters a question using text input or speaks through the microphone.
2. Voice input is converted into text using the browser's Speech Recognition API.
3. The input is sent from the JavaScript frontend to the Flask backend.
4. The Flask backend selects a completely unrelated response from a predefined collection of random responses.
5. An Unrelatedness Score and Chaos Level are generated.
6. The unrelated response is returned to the frontend.
7. The response is displayed as text in the chat interface.
8. The browser's Text-to-Speech functionality can read the response aloud.
9. Users can replay the response or change the chaos mode.

The application does not attempt to understand the meaning of the user's question. Its primary purpose is to produce deliberately irrelevant and humorous responses.

# Installation

Clone the repository:

```bash
git clone :https://github.com/gourinandanaku/UnrelatedAI

Navigate to the project directory:

cd URAI

Create a Python virtual environment:

python -m venv venv

Activate the virtual environment on Windows:

venv\Scripts\activate

Install the required dependencies:

pip install -r requirements.txt
Run

Start the Flask application:

python app.py

Open the application in your browser:

http://127.0.0.1:5000

For voice interaction:

Allow microphone permission when requested.
Click the microphone button.
Speak your question.
URAI converts the speech into text.
URAI responds with a completely unrelated response.
The response can be played using text-to-speech.
Project Documentation
Main Features
1. Text Conversation

Users can type any question or statement into the chat interface.

URAI responds with a completely unrelated random statement.

2. Voice Input

Users can speak directly using the microphone instead of typing.

The browser's Speech Recognition API converts the spoken input into text.

3. Random Unrelated Responses

URAI selects responses randomly from a predefined collection.

The responses are intentionally unrelated to the user's input.

4. Voice Output

URAI can read its response aloud using the browser's Text-to-Speech functionality.

5. Chaos Modes

Users can choose between different conversation modes:

Normal Chaos
Maximum Chaos
Malayalam/Manglish Chaos

Each mode provides a different level of randomness and chaos.

6. Unrelatedness Score

URAI displays a percentage-like score representing how unrelated the response is intended to be.

7. Chaos Meter

A Chaos Meter visually represents the current level of conversational chaos.

8. Response Replay

Users can click the speaker button associated with an AI response to hear it again.

9. Suggested Prompts

The interface provides suggested prompts to help users start a conversation with URAI.

Screenshots (Add at least 3)




Diagrams

Workflow of URAI showing user input, frontend processing, Flask backend, random response generation, and text/audio output.

System Architecture
                    ┌──────────────────┐
                    │      USER        │
                    └────────┬─────────┘
                             │
                 ┌───────────┴───────────┐
                 │                       │
            Text Input              Voice Input
                 │                       │
                 │                Speech Recognition
                 │                       │
                 └───────────┬───────────┘
                             │
                             ↓
                 ┌───────────────────────┐
                 │   JavaScript Frontend │
                 └───────────┬───────────┘
                             │
                         API Request
                             │
                             ↓
                 ┌───────────────────────┐
                 │     Flask Backend     │
                 │                       │
                 │  Random Response      │
                 │  Selection Engine     │
                 │                       │
                 │  Score Generation     │
                 │  Chaos Generation     │
                 └───────────┬───────────┘
                             │
                             ↓
                 ┌───────────────────────┐
                 │  Unrelated Response   │
                 └───────────┬───────────┘
                             │
                 ┌───────────┴───────────┐
                 │                       │
             Text Output            Voice Output
                 │                       │
                 └───────────┬───────────┘
                             ↓
                        🤖 URAI
Project Demo
Video

Demo video demonstrating the main features of URAI including text input, voice input, unrelated responses, chaos modes, Unrelatedness Score, Chaos Meter, and voice output.

Additional Demos
🌐 Live Demo: [YOUR-RENDER-LINK]
💻 GitHub Repository: [YOUR-GITHUB-REPOSITORY-LINK]
Team Contributions
Gouri Nandana K.U: Flask backend development, API implementation, random response system, application integration, testing, and deployment.
Deril K Shaju: Frontend development, UI design, JavaScript functionality, voice interaction, text-to-speech integration, and project documentation.

