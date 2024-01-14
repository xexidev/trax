import Pulse from "./Pulse/Pulse"
import { useContext } from 'react'
import { TrackerContext } from "../../context/trackerContext"

export default function Track({ trackRowIndex }) {
  const { track } = useContext(TrackerContext)  

  return (
      <div className='track'>
        {
          track[0].map((_, index) => (
              <Pulse key={index} trackRowIndex={trackRowIndex} pulseIndex={index}/>
          ))
        }
      </div>
  )
}