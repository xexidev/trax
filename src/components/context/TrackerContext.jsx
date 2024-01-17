import { createContext, useState, useEffect, useMemo, useRef } from 'react'
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

  const [track, setTrack] = useState(Array.from({ length: Object.keys(soundPack).length }, () => Array.from({ length: trackLength }).fill(false)))

  const pulseSpan = useMemo(() =>
    60000 / (bpm * pulse)
  , [bpm, pulse])

  useEffect(() => {
    if (bpm > 999) {
      setBpm(999)
    } else if (bpm < 1) {
      setBpm(1)
    }
  }, [bpm])

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
      clearTimeout(playTimeoutId)
      setCurrentStep(0)
    }

    return () => {
      clearTimeout(playTimeoutId)
    }
  }, [isPlaying, currentStep])

  const audioContext = useRef(new (window.AudioContext || window.webkitAudioContext)())

  const setInstance = async (trackRowIndex, pulseIndex, isChecked) => {
    const newTrack = [...track]
    if (isChecked) {
      const response = await fetch(soundPack[trackRowIndex])
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await audioContext.current.decodeAudioData(arrayBuffer)
      newTrack[trackRowIndex][pulseIndex] = audioBuffer
      if (!isPlaying) {
        const source = audioContext.current.createBufferSource()
        source.buffer = audioBuffer
        source.connect(audioContext.current.destination)
        source.start()
      }
    } else {
      newTrack[trackRowIndex][pulseIndex] = null
    }
  }

  useEffect(() => {
    for (const trackRow of track) {
      const audioBuffer = trackRow[currentStep - 1]

      if (audioBuffer instanceof AudioBuffer) {
        const source = audioContext.current.createBufferSource()
        source.buffer = audioBuffer
        source.connect(audioContext.current.destination)
        source.start()
      }
    }
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
      {children}
    </TrackerContext.Provider>
  )
}
