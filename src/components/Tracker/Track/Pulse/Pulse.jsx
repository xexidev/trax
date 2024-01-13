import { useEffect, useState } from "react"

export default function Pulse({track, setTrack, trackRowIndex, pulseIndex, currentStep}) {
  const [isChecked, setIsChecked] = useState(track[trackRowIndex][pulseIndex])
  const isPlaying = currentStep === pulseIndex + 1

  const togglePulse = (e) => {
    setIsChecked(!isChecked)
    const newTrack = [...track]
    newTrack[trackRowIndex][pulseIndex] = e.target.checked
    setTrack(newTrack)
  }

  useEffect(() => {
    setIsChecked(track[trackRowIndex][pulseIndex])
  }, [track])

  return (
    <input 
      type="checkBox"
      checked={isChecked}
      onChange={(e) => togglePulse(e)}
      className={ isPlaying ? 'beat playing' : 'beat'}
    >
    </input>
  )
}