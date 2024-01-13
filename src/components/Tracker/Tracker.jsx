import Track from './Track/Track'

export default function Tracker({track, setTrack, setInstance, currentStep, clear, pulseSpan}) {
  
  return (
    <div className='tracker'>
      {
        track.map((_, index) => (
          <Track key={index} trackRowIndex={index} track={track} setTrack={setTrack} setInstance={setInstance} currentStep={currentStep} clear={clear} pulseSpan={pulseSpan}/>
        ))
      }
    </div>
  )
}