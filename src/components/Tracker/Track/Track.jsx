import Pulse from "./Pulse/Pulse"

export default function Track({track, setInstance, trackRowIndex, currentStep, pulseSpan}) {

    return (
        <div className='track'>
          {
            track[0].map((_, index) => (
                <Pulse key={index} track={track} setInstance={setInstance} trackRowIndex={trackRowIndex} pulseIndex={index} pulseNumber={index + 1} currentStep={currentStep} pulseSpan={pulseSpan}/>
            ))
          }
        </div>
    )
}