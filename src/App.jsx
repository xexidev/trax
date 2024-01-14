import './App.css'
import { TrackerProvider } from './components/context/trackerContext'
import Tracker from './components/Tracker/Tracker'
import Controls from './components/Controls/Controls'

function App() {

  return (
    <div className='app'>
      <TrackerProvider>
        <Tracker/>
        <Controls />
      </TrackerProvider>
    </div>
  )
}

export default App
