import { createContext } from 'react'
import run from '../gemini'


// context for window.speechSynthesis (text-to-speech) and SpeechRecognition (speech-to-text)
/* 
// Triggered when speech starts
const utterance = new SpeechSynthesisUtterance("Hello! I am speaking.");
utterance.lang = "en-US";

// Triggered when speech starts
utterance.onstart = () => {
    console.log("Speaking started");
};

// Triggered when speech ends
utterance.onend = () => {
    console.log("Speaking ended");
};

// Triggered if there's an error
utterance.onerror = (e) => {
    console.error("Speech error:", e);
};

// Speak the text
window.speechSynthesis.speak(utterance);


*/


/*
const recognition = new window.SpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

// When listening starts
recognition.onstart = () => {
    console.log("Listening started");
};

// When listening ends
recognition.onend = () => {
    console.log("Listening ended");
};

// When an error occurs
recognition.onerror = (event) => {
    console.error("Listening error:", event.error);
};

// Start listening
recognition.start();
*/ 


export const dataContext = createContext();

const UserContext = ({children}) => {

  // ai function 
  async function aiResponse(prompt){
    let text = await run(prompt);
    speak(text);
  }





  // speech recognition setup
  let speechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;// webkitSpeechRecognition for Safari and SpeechRecognition for other browsers
  let recognition = new speechRecognition();
  recognition.continuous = false; // stop after one phrase
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  
  recognition.onresult = e=>{
    let transcript = e.results[0][0].transcript
    console.log(transcript);
    aiResponse(transcript);
  }

  recognition.onerror = (e) => {
    console.error('Speech recognition error:', e);
  };


  // speak function
  function speak(text){

      const synth = window.speechSynthesis;

      // Stop ongoing speech so we can restart
  if (synth.speaking) {
    synth.cancel();
  }
    function actuallySpeak() {

      const voices = synth.getVoices();
    // Try to pick an English female voice
      const femaleVoice = voices.find(v =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("woman") ||
        v.name.toLowerCase().includes("samantha") || // Mac OS example
        v.name.toLowerCase().includes("zira")       // Windows example
      ) || voices[0];

    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1.05; // slightly faster for playful tone
    text_speak.pitch = 1.4; // higher pitch for feminine vibe
    text_speak.lang = 'en-US';
    if (femaleVoice) text_speak.voice = femaleVoice;

    synth.speak(text_speak);
    }

    
       // Ensure voices are loaded before speaking
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => actuallySpeak(), { once: true });
      } else {
        actuallySpeak();
      }
    }
    
  const value = { recognition };

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext