import { useEffect, useState, useContext } from 'react'
import { TrackerContext } from '../../../context/trackerContext'

export default function Pulse({trackRowIndex, pulseIndex}) {
  const { track, setInstance, currentStep } = useContext(TrackerContext)
  const [isChecked, setIsChecked] = useState(track[trackRowIndex][pulseIndex])
  const isPlaying = currentStep === pulseIndex + 1

  const togglePulse = (e) => {
    setIsChecked(!isChecked)
    setInstance(trackRowIndex, pulseIndex, e.target.checked)
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