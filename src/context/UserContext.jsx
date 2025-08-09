import React, { createContext } from 'react'

export const dataContext = createContext();

const UserContext = ({children}) => {


  let speechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;// webkitSpeechRecognition for Safari and SpeechRecognition for other browsers
  let recognition = new speechRecognition();
  recognition.continuous = false; // stop after one phrase
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.onresult = e=>{
    
    console.log(e.results[0][0].transcript);
    speak(e.results[0][0].transcript);
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