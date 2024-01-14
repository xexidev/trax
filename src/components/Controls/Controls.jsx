import { useContext } from 'react'
import { TrackerContext } from '../context/trackerContext'

export default function Controls() {
    const { currentStep, isPlaying, setIsPlaying, clear, track, bpm, setBpm } = useContext(TrackerContext)
    return (       
    <>
      <div>{currentStep}</div>
      {
        isPlaying
        ? <button onClick={() => setIsPlaying(false)}>Stop</button>
        : <button onClick={() => setIsPlaying(true)}>Play</button>
      }
      <button onClick={() => clear(track)}>Clear</button>
      <input type='number' value={bpm} min={1} onChange={(e) => setBpm(e.target.value)}></input>
    </> 
    )
}