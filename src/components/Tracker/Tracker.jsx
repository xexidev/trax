import Track from './Track/Track'

export default function Tracker({track, setInstance, currentStep, pulseSpan}) {
  
  return (
    <div className='tracker'>
      {
        track.map((_, index) => (
          <Track key={index} trackRowIndex={index} track={track} setInstance={setInstance} currentStep={currentStep} pulseSpan={pulseSpan}/>
        ))
      }
    </div>
  )
}