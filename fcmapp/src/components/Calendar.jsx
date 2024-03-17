import {useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list';


const Calendar = (props) => {
    const {flag, listEvents} = props
    const [events, setEvents] = useState({event: ''})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getCalendarData = async() => {
            listEvents(100).then((response) => {setEvents({...events, event:response.documents})}, (error) => {console.log(error)})
            setIsLoading(false)
        }
        getCalendarData()

    },[])
     
    return <>
        <div className="w-full flex flex-col items-center pb-8">
            <p className="text-4xl font-semibold inline border-b-4 border-lime-600"> Calendar</p>
        </div>
       {isLoading ? <p>Loading...</p> 
       : !flag ? <div className="px-4 py-4">
            <FullCalendar
            plugins={[listPlugin  ]}
            timeZone='America/Detroit'
            initialView="listMonth"
            events={events.event}
            height={600}
            />
        </div> 
        : 
        ''}
    </>
}

export default Calendar
