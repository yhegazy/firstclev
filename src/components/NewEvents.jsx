import {useEffect, useState} from 'react'
import {eventsRef, addDocument} from './hooks/Firebase'

const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


const NewEvents = (global) => {
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState(Date)
    const [endDate, setEndDate] = useState(Date)
    const [allDay, setAllDay] = useState(false)

    const handleCreateEvent = (e) => {
        e.preventDefault()

        const events = [{title: title, start: startDate, end: endDate, allDay: allDay}]

        addDocument(events)

        setTitle("");
        setStartDate(Date)
        setEndDate(Date)
        setAllDay(false)

        alert("Created!")
    }

    // 1
    const [month, setMonth] = useState("")
    const [day, setDay] = useState(0)
    const [hour, setHour] = useState(0)
    const [minutes, setMinutes] = useState(0)


    // 2
    const [month2, setMonth2] = useState("")
    const [day2, setDay2] = useState(0)
    const [year2, setYear2] = useState(0)
    const [hour2, setHour2] = useState(0)
    const [minutes2, setMinutes2] = useState(0)

    useEffect(() => {
        // 'September 3, 2022 03:24:00')
        let combine = `${month} ${day}, 2022 ${hour}:${minutes}:00`
        setStartDate(combine)
    }, [month, day, hour, minutes])

    useEffect(() => {
        let combine = `${month2} ${day2}, ${year2} ${hour2}:${minutes2}:00`
        setEndDate(combine)
    }, [month2, day2, year2, hour2, minutes2])


    let daily = []
    if(month === 'January' || month === 'March' || month === 'May' || month === 'July' || month === 'August' || month === 'October' || month === 'December') {
        for(let i = 1; i < 32; i++){daily.push(i)}
    } else if(month === 'April' || month === 'June' || month === 'September' || month === 'November') {
        for(let i = 1; i < 31; i++){daily.push(i)}
    } else {for(let i = 1; i < 29; i++){daily.push(i)}}

    
    
   

    return <>
        <div>Add an Event</div>

        <div className="flex flex-wrap py-4 justify-evenly">
                <form className="w-full max-w-lg" onSubmit={(e) => handleCreateEvent(e)}>
                    <div className="flex flex-wrap mb-6 -mx-3">
                        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" required>
                                Title:
                            </label>
                            <input id="title" className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white" value={title} onChange={e => setTitle(e.target.value)}  type="text"/>
                        </div>

                        <div className="w-full px-3 md:w-1/2">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-last-name">
                                Start Date:
                            </label>
                            <select className="border-black" name="type" value={month} onChange={e => setMonth(e.target.value) }>
                                {MONTH.map((item) => <option>{item}</option>)}
                            </select>
                            <select className="border-black" name="type" value={day} onChange={e => setDay(e.target.value) }>
                                {daily.map((item) => <option>{item}</option>)}
                            </select>
                            
                        </div>

                    </div>

                    <div className="flex flex-wrap mb-6 -mx-3">
                        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                                End Date:
                            </label>
                            <input id="email" className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white" value={endDate} onChange={e => setEndDate(e.target.value)}  type="text"/>
                        </div>


                        <div className="w-full px-3 md:w-1/2">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="telephone">
                                All Day?:
                            </label>
                            <input className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="telephone" value={allDay} onChange={e => setAllDay(e.target.value)}  type="checkbox"/>
                        </div>
                    </div>

                    <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" type="submit">Update</button>
                </form>                
            </div>
    </>
}

export default NewEvents