import Pulse from "./Pulse/Pulse"

export default function track({track, setTrack, setInstance, trackRowIndex, currentStep, clear, pulseSpan}) {

    return (
        <div className='track'>
          {
            track[0].map((_, index) => (
                <Pulse key={index} track={track} setTrack={setTrack} setInstance={setInstance} trackRowIndex={trackRowIndex} pulseIndex={index} pulseNumber={index + 1} currentStep={currentStep} clear={clear} pulseSpan={pulseSpan}/>
            ))
          }
        </div>
    )
}