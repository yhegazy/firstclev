import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import {entry} from './hooks/Firebase'

import '../sass/styles.scss'

const localizer = momentLocalizer(moment)

//In the edit page will dictate Month, Day, Year & Time and will populate into events to populate the calendar


const UpcomingEvents = (props) => {
    const {global} = props
    
    // const startDate = new Date('September 3, 2022 03:24:00');
                            // Sun Dec 17 1995 03:24:00 GMT...

    const startDate = new Date('2022-09-03T09:00:00')
    const endDate = new Date('2022-09-03T13:00:00');

    const events = [{title: 'Food Drive!', start: startDate, end: endDate, allDay: false}]

    return <>
        <div className={`w-3/4 ml-auto mr-auto text-2xl p-5 space-y-2 ${global.darkMode && 'bg-gray-700 text-white'}`}>
            <h1 className="flex justify-center w-1/2 ml-auto mr-auto text-3xl">Upcoming Events</h1>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
            
        </div>

    </>
}

export default UpcomingEvents