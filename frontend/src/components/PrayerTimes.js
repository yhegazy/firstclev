import {useEffect, useMemo, useState} from 'react'
import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';
import MonthlyCalendar from './pages/MonthlyCalendar';

const FirstClevelandPrayerTimes = () => {   
    const [toggle, setToggle] = useState(false)

    const date = useMemo(() => new Date(), []);
    let coordinates = new Coordinates(41.4932, -81.4609);
    let params = CalculationMethod.NorthAmerica();
    params.madhab = Madhab.Shafi;
    
    let prayerTimes = new PrayerTimes(coordinates, date, params);

    let hijraMonth = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {day: 'numeric', month: 'long'}).format(Date.now());
    let hijraYear = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {year : 'numeric'}).format(Date.now());

    const [monthName, setMonthName] = useState(null)
    const handleGregorianMonthName = (number) => {
        const months = [
          'January', 'February', 'March', 'April',
          'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December'
        ];
      
        return setMonthName(months[number - 1] || null);
      };

    useEffect(() => {
        handleGregorianMonthName(date.getMonth() + 1)
    }, [date])
   

    const formatTime = (prayerTimes) => {
        return new Date(prayerTimes).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
    }
    

    const salahTimes = [
        {
            name:'Fajr',
            time: formatTime(prayerTimes.fajr)
        },
        {
            name:'Dhuhr',
            time: formatTime(prayerTimes.dhuhr)
        },
        {
            name:'Asr',
            time: formatTime(prayerTimes.asr)
        },
        {
            name:'Maghreb',
            time: formatTime(prayerTimes.maghrib)
        },
        {
            name:'Isha',
            time: formatTime(prayerTimes.isha)
        }
    ]

    return <>
        <div>
        {toggle ? 
            <MonthlyCalendar 
                prayerTimes={prayerTimes} 
                coordinates={coordinates} 
                params={params} 
                onToggle={setToggle} 
                toggle={toggle} 
            /> 
        : 
            <div className="max-w-[1000px] mx-auto p-8 flex flex-col items-center">
                <div className="pb-8">
                    <p className="text-4xl font-semibold inline border-b-4 border-lime-600"> Prayer Times</p>
                </div>
                {/* Gregorian & Hijra Calendar */}
                <div className='text-xl md:text-2xl'>
                    <p >{monthName} {prayerTimes.fajr.getDate()}, {prayerTimes.fajr.getFullYear()}</p>
                    <p>{hijraYear} {hijraMonth}</p>
                </div>

                {/* Salat Times  */}
                {salahTimes.map((item) => {return  <div className="text-xl md:text-2xl w-full grid grid-cols-2 text-center py-4">
                    <p>{item.name}</p>
                    <p>{item.time}</p>
                </div>})}

                {/* 30 day Calendar */}
                <button className='text-center bg-blue-500 text-white font-semibold hover:bg-blue-700 p-2 border rounded-md' onClick={() => setToggle(!toggle)}>
                30 Day Calendar</button>
            </div>
        }
    </div>
    </>
}

export default FirstClevelandPrayerTimes
