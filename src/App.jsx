// external modules
import { CiMicrophoneOn } from "react-icons/ci";



// internal modules
import va from './assets/ai.png'
import './App.css'

const App = () => {
  return (
    <div className='main'>
      <img src={va} alt="virtual assistant" id="shifra"/>
      <span>I am chantak, a virtual assistant</span>
      <button>Click Me !<CiMicrophoneOn size={25} /></button>
    </div>
  )
}

export default App