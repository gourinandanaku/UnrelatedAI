# Unrelated AI Conversation 🤪

> **Tagline:** *"You Ask. AI Ignores."*

---

## 📌 Project Overview

**Unrelated AI Conversation** is an intentionally funny and useless full-stack web application designed as a BTech Computer Science & Engineering (CSE) project. 

While conventional AI assistants work hard to provide precise and accurate answers, **Unrelated AI** does the exact opposite: it contextually understands what topic the user is talking about **only to deliberately ignore it** and switch to a completely unrelated, hilarious, casual, and absurd monologue in English, Malayalam, or Manglish.

---

## 🚀 Features

1. **Text Chat Input**: Send questions or thoughts via standard text input.
2. **Browser Voice Input (Speech-to-Text)**:
   - Microphone button `🎤` using the native Web Speech API (`SpeechRecognition`).
   - Supports English and Malayalam/Manglish speech recognition without requiring external paid speech APIs.
   - Animated visual listening pulse state.
3. **OpenAI API Integration**:
   - Uses the official OpenAI Python SDK (`OpenAI()`) and chat completions.
   - Dynamic prompt engineering enforcing topic divergence, Malayalam/Manglish flavor, absurd logic, auto-driver philosophy, ceiling fans, coconut trees, and CEO crows.
4. **Unrelatedness Score & Chaos Meter 🌪️**:
   - **Unrelatedness Score**: Indicates how completely unrelated the response is (labeled *"Just for fun 😭"*).
   - **Chaos Meter**: Visual animated gauge showing response absurdity.
5. **Browser AI Voice Output (Text-to-Speech)**:
   - Speaks AI responses aloud via `SpeechSynthesis`.
   - Dedicated replay button `🔊` beside every AI message bubble.
   - Auto voice toggle and emergency stop button `⏹️`.
6. **Chaos Modes Selector**:
   - 🟢 **Normal Chaos**: Witty, off-topic responses.
   - 💥 **Maximum Chaos**: Surreal logic, extreme random monologues.
   - 🌴 **Malayalam Chaos**: Strongly prefers Malayalam/Manglish with Kerala tea-shop humor & pop culture tropes.
7. **Landing State & Suggestion Chips**:
   - Empty chat screen featuring quick-start question chips (*"Entha kazhiche?"*, *"Exam engane undayi?"*, etc.).

---

## ⚠️ SECURITY WARNING

> [!CAUTION]
> **NEVER commit your `.env` file or expose your `OPENAI_API_KEY`!**
> Always keep your `.env` listed inside `.gitignore`. Secrets are handled exclusively on the Flask backend and never sent to frontend JavaScript or HTML.

---

## 🛠️ Tech Stack

- **Backend**: Python 3.13, Flask
- **Frontend**: HTML5, CSS3 (Glassmorphic dark design), JavaScript (ES6+)
- **AI Engine**: OpenAI API (`gpt-4o-mini` / `gpt-3.5-turbo`)
- **Speech Engine**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
- **Environment**: Windows 11, VS Code, Python `venv`

---

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser Frontend (Client)                │
│  - Text Input / Suggestion Chips                            │
│  - Web Speech STT (Microphone) & TTS (Speaker Output)       │
│  - Unrelatedness Score & Chaos Meter Visualizer             │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP POST /api/chat
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     Flask Backend Server                    │
│  - app.py (Route handling & Input Validation)               │
│  - dotenv (.env variable loading)                           │
│  - generate_unrelated_response() Prompt Engine              │
└──────────────────────────────┬──────────────────────────────┘
                               │ JSON Payload
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     OpenAI API Service                      │
│  - Analyzes user topic to explicitly AVOID it              │
│  - Returns funny off-topic JSON response + scores           │
└──────────────────────────────┬──────────────────────────────┘
```

---

## 📥 Installation & Setup Instructions (Windows 11)

### Step 1: Open VS Code Terminal
Open your project directory in VS Code and open a terminal (`Ctrl + ~`).

### Step 2: Create & Activate Virtual Environment
```powershell
# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1
```

### Step 3: Install Dependencies
```powershell
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables
Create a file named `.env` in the project root:
```env
OPENAI_API_KEY=your_actual_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

---

## 🏃 How to Run the Application

```powershell
python app.py
```
Open your web browser and navigate to:
```
http://127.0.0.1:5000
```

---

## 💡 How the Unrelated Prompt Works

The backend uses a developer system prompt that instructs OpenAI:
1. Identify the core topic/intent of the user's message.
2. Explicitly avoid that topic and any related concept.
3. Switch immediately to a hilarious, completely unrelated topic (e.g. clockwise ceiling fans, emotional pressure cookers, auto driver quotes).
4. Return a structured JSON containing the response text, unrelatedness percentage, and chaos level.

---

## 🔮 Future Enhancements

- 🎭 **Custom Voice Clones**: Integration with ElevenLabs for custom regional voices.
- 🎨 **Visual Memes Generator**: Auto-generate meme images related to the off-topic response.
- 📱 **PWA Support**: Installable mobile web application.
