import Track from './Track/Track'
import ScrollIco from './ScrollIco/ScrollIco'
import { useContext } from 'react'
import { TrackerContext } from '../context/trackerContext'

export default function Tracker () {
  const { track, currentStep } = useContext(TrackerContext)
  const smallViewPort = window.matchMedia('(max-width: 730px)').matches

  return (
    <div className='trackerContainer'>
      { smallViewPort && <ScrollIco /> }
      <div className='pulseCount'>
        {
          track[0].map((_, index) => {
            const isOn = currentStep === index + 1
            return <div key={index} className={isOn ? 'pulseNumber on' : 'pulseNumber'}>{index + 1}</div>
          })
        }
      </div>
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
