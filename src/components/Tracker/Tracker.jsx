import Track from './Track/Track'
import { useContext } from 'react'
import { TrackerContext } from '../context/trackerContext'

export default function Tracker () {
  const { track } = useContext(TrackerContext)

  return (
    <div className='trackerContainer'>
      <div className='tracker'>
        {
          track.map((_, index) => (
            <Track key={index} trackRowIndex={index}/>
          ))
        }
      </div>
    </div>
  )
}
