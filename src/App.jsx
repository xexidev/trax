import './App.css'
import { useEffect, useState, useMemo, useRef } from 'react'
import Tracker from './components/Tracker/Tracker'
import kick from './assets/sounds/kick.mp3'
import snare from './assets/sounds/snare.mp3'
import chh from './assets/sounds/chh.mp3'
import ohh from './assets/sounds/ohh.mp3'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [bpm, setBpm] = useState(120)
  const [bar, setBar] = useState(4)
  const [pulse, setPulse] = useState(4)
  const trackLength = bar * pulse

  const soundPack = useMemo(() => {
    return ({
      0: kick,
      1: snare,
      2: chh,
      3: ohh
    })
  }, [])

  const [track, setTrack] = useState(Array.from({ length: Object.keys(soundPack).length }, () => Array.from({ length: bar * pulse }).fill(false)));

  const pulseSpan = useMemo(() => {
    return 60000 / (bpm * pulse);
  }, [bpm, pulse])
 
  useEffect(() => {
    let playTimeoutId

    if (isPlaying) {
      playTimeoutId = setTimeout(() => {
        if (currentStep >= trackLength) {
          setCurrentStep(1)
        } else {
          setCurrentStep(step => step + 1)
        }
      }, pulseSpan)
    } else {
      clearTimeout(playTimeoutId);
      setCurrentStep(0)
    }

    return () => {
      clearTimeout(playTimeoutId);
    };
  }, [isPlaying, currentStep])

  const instanceArrayRef = useRef(Array.from({ length: Object.keys(soundPack).length }, () => Array.from({ length: bar * pulse }).fill(false)))
  const setInstance = (trackRowIndex, pulseIndex, isChecked) => {
    if (isChecked) {
      instanceArrayRef.current[trackRowIndex][pulseIndex] = new Audio(soundPack[trackRowIndex])
    } else {
      instanceArrayRef.current[trackRowIndex][pulseIndex].remove()
      instanceArrayRef.current[trackRowIndex][pulseIndex] = null
    }
  }

  useEffect(() => {
   instanceArrayRef.current.map((trackRow) => {
      if (trackRow[currentStep - 1]) {
        trackRow[currentStep - 1].play()
      }
    })
  }, [currentStep])

  const clear = () => {
    setTrack(Array.from({ length: Object.keys(soundPack).length }, () => Array.from({ length: bar * pulse }).fill(false)))
  }

  return (
    <>
      <Tracker bar={bar} pulse={pulse} track={track} setTrack={setTrack} setInstance={setInstance} currentStep={currentStep} pulseSpan={pulseSpan} />
      <div>{currentStep}</div>
      {
        isPlaying
        ? <button onClick={() => setIsPlaying(false)}>Stop</button>
        : <button onClick={() => setIsPlaying(true)}>Play</button>
      }
      <button onClick={clear}>Clear</button>
      <input type='number' value={bpm} min={1} onChange={(e) => setBpm(e.target.value)}></input>
    </>
  )
}

export default App
