# 🎤 Voice AI Project

A modern voice-based user interface built with React, Web Speech API, and Google's Gemini AI. This project allows users to interact with an intelligent virtual assistant using natural voice commands and receive spoken responses.

![Voice AI Demo](https://img.shields.io/badge/Status-Active-success) ![React](https://img.shields.io/badge/React-18+-blue) ![Gemini API](https://img.shields.io/badge/Gemini-2.0--flash-orange)

## ✨ Features

- 🎯 **Voice Command Interaction** – Speak naturally to the AI assistant
- 🔊 **Speech Recognition** – Real-time voice-to-text using Web Speech API  
- 🗣️ **Voice Responses** – AI responds with natural speech synthesis
- 🤖 **Gemini AI Integration** – Powered by Google's advanced language model
- 📱 **Responsive Design** – Works seamlessly across all devices
- 🎨 **Clean UI** – Minimalist interface for distraction-free interaction
- 🔧 **Role-Based AI** – Customizable AI personalities (teacher, assistant, friend)

## 🎬 Demo

```
User: "What is React?"
AI: "React is a popular JavaScript library for building user interfaces..."
```

## ⚙️ How It Works

1. **🎤 Activate** – Click the microphone button to start listening
2. **🗣️ Speak** – Ask your question or give a command naturally
3. **🔍 Process** – Web Speech API transcribes your voice to text
4. **🧠 Think** – Gemini AI processes your request intelligently  
5. **💬 Respond** – Get both text and spoken responses from the AI

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React** | Frontend framework |
| **Gemini AI** | Natural language processing |
| **Web Speech API** | Voice recognition & synthesis |
| **Vite** | Build tool and dev server |
| **CSS3** | Responsive styling |

## 📂 Project Structure

```
voice_ai/
├── 📁 public/
│   ├── index.html
│   └── favicon.ico
├── 📁 src/
│   ├── App.jsx              # Main application component
│   ├── App.css              # Global styles
│   ├── main.jsx             # React entry point
│   ├── gemini.js            # Gemini AI integration
│   ├── 📁 context/
│   │   └── UserContext.jsx  # Global state management
│   └── 📁 assets/
│       ├── ai.png           # AI avatar image
│       └── logo.png         # App logo
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Modern browser with microphone access

### Installation

```bash
# Clone the repository
git clone https://github.com/Johnihb/simple-voice-ai
.git

# Navigate to project directory
cd voice_ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Gemini API key to .env file
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ **Security Note**: Never commit your API key to version control. The `.env` file should be in your `.gitignore`.
> ⚠️ ** since this is sample project i have directly integrated api key on gemini.js file which is not recommonded create `.env` file and import from there.
### Run Development Server

```bash
npm run dev
```

🎉 Open [http://localhost:5173](http://localhost:5173) in your browser!

## 🎯 Usage Examples

### Basic Voice Interaction
- "What is artificial intelligence?"
- "Explain React hooks"
- "Tell me a joke"

### Role-Based Interactions
- Teacher mode: "Explain photosynthesis like I'm 10 years old"
- Coach mode: "Give me motivation for my workout"
- Friend mode: "How was your day?"

## 📱 Browser Compatibility

| Browser | Voice Recognition | Speech Synthesis |
|---------|-------------------|------------------|
| Chrome | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| Safari | ✅ | ✅ |
| Edge | ✅ | ✅ |

## 🔧 Configuration

### Customize AI Behavior

Edit `src/gemini.js` to modify:
- Response length (`maxOutputTokens`)
- AI personality (`temperature`)  
- Safety settings
- Role-based prompts

### Voice Settings

Modify speech recognition and synthesis in your components:
```javascript
// Speech recognition settings
recognition.lang = 'en-US';
recognition.continuous = false;
recognition.interimResults = false;

// Speech synthesis settings
utterance.rate = 0.9;
utterance.pitch = 1.0;
utterance.volume = 1.0;
```

## 🐛 Troubleshooting

### Common Issues

**Microphone not working?**
- Check browser permissions
- Ensure HTTPS (required for microphone access)
- Try refreshing the page

**API errors?**
- Verify your Gemini API key is correct
- Check your API quota limits
- Ensure stable internet connection

**No voice output?**
- Check browser's speech synthesis support
- Verify system audio settings
- Try different browsers

## 🎨 Customization

### Adding New AI Roles
```javascript
const newRole = {
  scientist: `You are a brilliant scientist. Explain concepts with 
             scientific accuracy and fascinating examples.`
};
```

### Styling
- Modify `src/App.css` for visual changes
- Update responsive breakpoints
- Customize color scheme and animations

## 📈 Roadmap

- [ ] 🌐 Multi-language support
- [ ] 💾 Conversation history  
- [ ] 🔗 External API integrations (weather, news)
- [ ] 📊 Voice analytics dashboard
- [ ] 🎵 Background music/ambient sounds
- [ ] 📱 Mobile app version
- [ ] 🔒 User authentication
- [ ] ☁️ Cloud deployment guide

## 🤝 Contributing

We welcome contributions! 
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This is a sample project.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for the language model
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for voice capabilities
- [React](https://reactjs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for the lightning-fast build tool

## 📞 Support

- 📧 Email: keshwor12@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com//simple-voice-ai/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/simple-voice-ai/discussions)

---

⭐ **Star this repo if you found it helpful!** ⭐
