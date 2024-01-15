import { useContext } from 'react'
import { TrackerContext } from '../context/trackerContext'

export default function Controls () {
  const { isPlaying, setIsPlaying, clear, track, bpm, setBpm } = useContext(TrackerContext)
  return (
    <>
      <div className='controls'>
        <div className='bpmControls'>
          <div className='bpmDisplayBox'>
            <input className='bpmDisplay' type='number' value={bpm} min={1} max={999} step={1} onInput={(e) => setBpm(parseInt(e.target.value))}></input>
            <input className='bpmDisplayBg' type='number' value={888} readOnly></input>
          </div>
          <div className='bpmAdjust'>
            <button className='plus' onClick={() => setBpm(bpm => bpm + 1)}>⯅</button>
            <button className='minus' onClick={() => setBpm(bpm => bpm - 1)}>⯆</button>
          </div>
        </div>
        <div className='playbackControls'>
          {
            isPlaying
              ? <button className='controlBtn stop' onClick={() => setIsPlaying(false)}>Stop</button>
              : <button className='controlBtn play' onClick={() => setIsPlaying(true)}>Play</button>
          }
          <button className='controlBtn clear' onClick={() => clear(track)}>Clear</button>
        </div>
      </div>
    </>
  )
}
