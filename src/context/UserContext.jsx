import React, { createContext, useState, useEffect } from 'react'

export const dataContext = createContext();

const UserContext = ({children}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(false);

  // Check if speech recognition is supported
  const speechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  
  useEffect(() => {
    if (speechRecognition) {
      setIsSupported(true);
    } else {
      setError('Speech recognition is not supported in this browser');
    }
  }, []);

  let recognition = null;
  
  if (speechRecognition) {
    recognition = new speechRecognition();
    recognition.continuous = false; // stop after one phrase
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      console.log('Speech recognition started');
    };
    
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setTranscript(transcript);
      setIsListening(false);
      console.log('Speech recognition result:', transcript);
    };

    recognition.onerror = (e) => {
      setIsListening(false);
      console.error('Speech recognition error:', e);
      
      switch(e.error) {
        case 'network':
          setError('Network error - please check your internet connection and ensure the site is served over HTTPS');
          break;
        case 'not-allowed':
          setError('Microphone access denied. Please allow microphone access and try again.');
          break;
        case 'no-speech':
          setError('No speech detected. Please try speaking again.');
          break;
        case 'audio-capture':
          setError('Audio capture failed. Please check your microphone.');
          break;
        case 'service-not-allowed':
          setError('Speech recognition service not allowed. Please ensure HTTPS is enabled.');
          break;
        default:
          setError(`Speech recognition error: ${e.error}`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('Speech recognition ended');
    };
  }


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
  




  // Enhanced start function with error handling
  const startListening = () => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser');
      return;
    }
    
    if (!navigator.onLine) {
      setError('No internet connection. Speech recognition requires an internet connection.');
      return;
    }
    
    if (isListening) {
      recognition.stop();
      return;
    }
    
    try {
      recognition.start();
    } catch (error) {
      setError('Failed to start speech recognition: ' + error.message);
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };
  
  const value = { 
    recognition,
    isListening,
    transcript,
    error,
    isSupported,
    startListening,
    stopListening,
    speak
  };

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext