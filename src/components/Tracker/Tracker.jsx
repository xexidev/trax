import Track from './Track/Track'

export default function Tracker({track, setTrack, currentStep, clear, pulseSpan}) {
  
  return (
    <div className='tracker'>
      {
        track.map((_, index) => (
          <Track key={index} trackRowIndex={index} track={track} setTrack={setTrack} currentStep={currentStep} clear={clear} pulseSpan={pulseSpan}/>
        ))
      }
    </div>
  )
}