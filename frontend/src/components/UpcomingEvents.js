import { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import {db} from '../appwrite/appwriteConfig'

import '../sass/styles.scss'

const localizer = momentLocalizer(moment)

const UpcomingEvents = (props) => {
    const {global} = props
    const [events, setEvents] = useState({event: ''})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const getEvents = db.listDocuments("firstClevelandMasjidDB", "upcomingEvents")
        getEvents.then(
            function(response) {setEvents({...events, event:response.documents})}, function(error) {console.log(error)}
        )

        setIsLoading(false)
    },[])
 
    return <>
        <div className="w-full ml-auto mr-auto xl:text-2xl text-lg p-1 xl:p-5 xl:space-y-2">
            <h1 className="flex justify-center xl:w-1/2 xl:ml-auto xl:mr-auto xl:text-3xl text-2xl">Upcoming Events</h1>
            <hr className='xl:hidden xl:py-0 py-2' />
            {isLoading ?  <p>Loading...</p> : 
                <Calendar
                    localizer={localizer}
                    events={events.event}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 650 }}
                    views={['month', 'agenda']}
                />
            }
        </div>

    </>
}

export default UpcomingEvents