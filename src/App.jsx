import './App.css'
import { TrackerProvider } from './components/context/trackerContext'
import Tracker from './components/Tracker/Tracker'
import Controls from './components/Controls/Controls'

function App() {

  return (
    <>
    <TrackerProvider>
      <Tracker/>
      <Controls />
    </TrackerProvider>
    </>
  )
}

export default App
