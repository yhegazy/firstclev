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
        const getEvents = db.listDocuments("637278aa811fb8962b16", "63727c039087bffba695")
        getEvents.then(
            function(response) {setEvents({...events, event:response.documents})}, function(error) {console.log(error)}
        )

        setIsLoading(false)
    },[])
 
    return <>
        <div className={`w-full ml-auto mr-auto text-2xl p-5 space-y-2 ${global.darkMode && 'bg-gray-700 text-white'}`}>
            <h1 className="flex justify-center w-1/2 ml-auto mr-auto text-3xl">Upcoming Events</h1>
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