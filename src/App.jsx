// external modules
import { CiMicrophoneOn } from "react-icons/ci";



// internal modules
import va from './assets/ai.png'
import './App.css'
import { dataContext } from "./context/UserContext";
import { useContext, useEffect } from "react";


const App = () => {

  
  const {recognition} = useContext(dataContext);


  return (
    <div className='main'>
      <img src={va} alt="virtual assistant" id="shifra"/>
      <span>I am chantak, a virtual assistant</span>
      <button onClick={() => recognition.start()}>Click Me !<CiMicrophoneOn size={25} /></button>
    </div>
  )
}

export default App