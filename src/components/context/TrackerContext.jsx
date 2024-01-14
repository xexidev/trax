import { createContext, useState, useEffect, useMemo} from 'react'
import soundPackCollection from '../../utils/soundPack'

export const TrackerContext = createContext()

export function TrackerProvider ({ children }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [bpm, setBpm] = useState(120)
    const [bar, setBar] = useState(4)
    const [pulse, setPulse] = useState(4)
    const trackLength = useMemo(() =>
        bar * pulse
    , [bar, pulse])

    const soundPack = useMemo(() =>
        soundPackCollection
    , [])
  
    const [track, setTrack] = useState(Array.from({ length: Object.keys(soundPack).length }, () => Array.from({ length: trackLength }).fill(false)));
  
    const pulseSpan = useMemo(() =>
      60000 / (bpm * pulse)
    , [bpm, pulse])
 
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
  
    const setInstance = (trackRowIndex, pulseIndex, isChecked) => {
      const newTrack = [...track]
      if (isChecked) {
        newTrack[trackRowIndex][pulseIndex] = new Audio(soundPack[trackRowIndex])
      } else {
        newTrack[trackRowIndex][pulseIndex].remove()
        newTrack[trackRowIndex][pulseIndex] = false
      }
      setTrack(newTrack)
    }
  
    useEffect(() => {
      track.map((trackRow) => {
        if (trackRow[currentStep - 1] && trackRow[currentStep - 1] instanceof Audio) {
          trackRow[currentStep - 1].play()
        }
      })
    }, [currentStep])
  
    const clear = (track) => {
      const newTrack = track.map((trackRow) => {
        return trackRow.map((trackCol) => {
          if (trackCol instanceof Audio) {
            trackCol.remove()
          }
          return false
        })
      })
      setTrack(newTrack)
    }

  return (
    <TrackerContext.Provider value={{ track, setInstance, currentStep, isPlaying, setIsPlaying, clear, bpm, setBpm }}>
      { children }
    </TrackerContext.Provider>
  )
}
