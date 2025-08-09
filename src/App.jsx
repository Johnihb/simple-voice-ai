// external modules
import { CiMicrophoneOn } from "react-icons/ci";



// internal modules
import va from './assets/ai.png'
import './App.css'
import { dataContext } from "./context/UserContext";
import { useContext, useEffect } from "react";


const App = () => {

  
  const {
    startListening,
    stopListening,
    isListening,
    transcript,
    error,
    isSupported
  } = useContext(dataContext);

  // Check if the app is served over HTTPS
  const isHTTPS = window.location.protocol === 'https:' || window.location.hostname === 'localhost';

  return (
    <div className='main'>
      <img src={va} alt="virtual assistant" id="shifra"/>
      <span>I am chantak, a virtual assistant</span>
      
      {/* Display error messages */}
      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '10px',
          margin: '10px 0',
          borderRadius: '5px',
          border: '1px solid #ffcdd2'
        }}>
          ⚠️ {error}
        </div>
      )}
      
      {/* Display HTTPS warning */}
      {!isHTTPS && (
        <div style={{
          backgroundColor: '#fff3e0',
          color: '#ef6c00',
          padding: '10px',
          margin: '10px 0',
          borderRadius: '5px',
          border: '1px solid #ffcc02'
        }}>
          🔒 For speech recognition to work properly, please serve this app over HTTPS or localhost
        </div>
      )}
      
      {/* Display transcript */}
      {transcript && (
        <div style={{
          backgroundColor: '#e8f5e8',
          color: '#2e7d32',
          padding: '10px',
          margin: '10px 0',
          borderRadius: '5px',
          border: '1px solid #c8e6c9'
        }}>
          You said: "{transcript}"
        </div>
      )}
      
      <button 
        onClick={startListening}
        disabled={!isSupported || isListening}
        style={{
          backgroundColor: isListening ? '#ff5722' : '#4caf50',
          color: 'white',
          opacity: !isSupported ? 0.5 : 1,
          cursor: !isSupported ? 'not-allowed' : 'pointer'
        }}
      >
        {isListening ? 'Listening...' : 'Click Me!'} <CiMicrophoneOn size={25} />
      </button>
      
      {isListening && (
        <button 
          onClick={stopListening}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            marginLeft: '10px'
          }}
        >
          Stop Listening
        </button>
      )}
    </div>
  )
}

export default App