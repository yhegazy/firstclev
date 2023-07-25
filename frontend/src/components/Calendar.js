import { useEffect, useState } from 'react'
import {db} from '../appwrite/appwriteConfig'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list';

const Calendar = (props) => {
    const [events, setEvents] = useState({event: ''})
    const [isLoading, setIsLoading] = useState(false)

    const getCalendarData = async() => {
        setIsLoading(true)
        const getEvents = db.listDocuments("firstClevelandMasjidDB", "upcomingEvents")
        getEvents.then(
            function(response) {setEvents({...events, event:response.documents})}, function(error) {console.log(error)}
        )

        setIsLoading(false)
    }
    
    useEffect(() => {
        getCalendarData()

        return () => {console.info("This will be logged on unmount")}
    },[])
 
    return <>
        <div className="w-full flex flex-col items-center pb-8">
            <p className="text-4xl font-semibold inline border-b-4 border-lime-600"> Calendar</p>
        </div>
        {!props.flag ? <div className="px-4 py-4">
            <FullCalendar
                plugins={[listPlugin  ]}
                initialView="listMonth"
                events={events.event}
                height={600}
                
            />
        </div> : ''}
    </>
}

export default Calendar