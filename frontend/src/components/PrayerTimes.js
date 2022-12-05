import {useCallback, useEffect, useState} from 'react'
import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';
import moment from 'moment'
import PrayTimes from '../hooks/PrayTimes' 


const FirstClevelandPrayerTimes = (props) => {   
    const {global} = props
    const [toggle, setToggle] = useState(false)

    let date = new Date();
    let coordinates = new Coordinates(41.4932, -81.4609);
    let params = CalculationMethod.NorthAmerica();
    params.madhab = Madhab.Shafi;
    
    let prayerTimes = new PrayerTimes(coordinates, date, params);

    let hijraMonth = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {day: 'numeric', month: 'long'}).format(Date.now());
    let hijraYear = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {year : 'numeric'}).format(Date.now());

    const [monthName, setMonthName] = useState(null)
    const handleGregorianMonthName = useCallback((number) => {
        if(number === 1) setMonthName('January') 
        else if(number === 2) setMonthName('February')
        else if(number === 3) setMonthName('March')
        else if(number === 4) setMonthName('April')
        else if(number === 5) setMonthName('May')
        else if(number === 6) setMonthName('June')
        else if(number === 7) setMonthName('July')
        else if(number === 8) setMonthName('August')
        else if(number === 9) setMonthName('September')
        else if(number === 10) setMonthName('October')
        else if(number === 11) setMonthName('November')
        else if(number === 12) setMonthName('December')
    },[])
    useEffect(() => {
        handleGregorianMonthName(date.getMonth() + 1)
    }, [])
   
    const MonthlyCalendar = () => {
        PrayTimes().setMethod('ISNA')
        PrayTimes().getTimes(date, [41.4932, -81.4609], -5)
        let arr = []
        for(let i = 0; i < 30; i++) {
            let temp = new Date(date.getFullYear(), date.getMonth() , date.getDate() + i)
            arr.push(temp)
        }

        let day = arr.map((date) => [(date.getMonth() + 1)+ "/" + date.getDate(), PrayTimes().getTimes(date, [41.4932, -81.4609], -5)])  

        return <div className="overflow-x-auto relative border-r-2 border-l-2 border-gray-50">
            <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">Day</th>
                        <th scope="col" className="py-3 px-6">Fajr</th>
                        <th scope="col" className="py-3 px-6">Dhuhr</th>
                        <th scope="col" className="py-3 px-6">Asr</th>
                        <th scope="col" className="py-3 px-6">Maghrib</th>
                        <th scope="col" className="py-3 px-6">Isha</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {day.map((prayer) => <tr>
                        <td className="px-6 py-1 whitespace-nowrap">{prayer[0]}</td>
                        <td className="px-6 py-1 whitespace-nowrap">{prayer[1].fajr} </td>
                        <td className="px-6 py-1 whitespace-nowrap">{prayer[1].dhuhr}</td>
                        <td className="px-6 py-1 whitespace-nowrap"> {prayer[1].asr} </td>
                        <td className="px-6 py-1 whitespace-nowrap"> {prayer[1].maghrib}</td>
                        <td className="px-6 py-1 whitespace-nowrap">{prayer[1].isha}</td> 
                    </tr>)}
                </tbody>
            </table> 
        </div>
    }

    return <>
       <div className={`w-1/2 ml-auto mr-auto text-2xl p-5 space-y-2 ${global.darkMode && 'bg-gray-700 text-white'}`}>
            <h1 className="flex justify-center w-1/2 ml-auto mr-auto text-3xl py-5">Salah Times</h1>
            {/* Gregorian & Hijra Calendar */}
            <div className="flex justify-between py-5">
                <p className=''>{monthName} {prayerTimes.fajr.getDate()}, {prayerTimes.fajr.getFullYear()}</p>
                <p>{hijraYear} {hijraMonth}</p>
            </div>

            {/* Salat Times */}
            <div className="flex flex-wrap justify-between">
                <p>Fajr</p>
                <p>{moment(prayerTimes.fajr).format('h:mm A')}</p>
            </div>
            <div className="flex flex-wrap justify-between">
                <p>Dhuhr</p>
                <p>{moment(prayerTimes.dhuhr).format('h:mm A')}</p>
            </div>
            <div className="flex flex-wrap justify-between">
                <p>Asr</p>
                <p>{moment(prayerTimes.asr).format('h:mm A')}</p>
            </div>
            <div className="flex flex-wrap justify-between">
                <p>Maghrib</p>
                <p>{moment(prayerTimes.maghrib).format('h:mm A')}</p>
            </div>
            <div className="flex flex-wrap justify-between">
                <p>Isha</p>
                <p>{moment(prayerTimes.isha).format('h:mm A')}</p>
            </div>
            
            <div className={`fixed w-1/2 ml-auto mr-auto px-2 ${toggle ? 'bottom-2 bg-gray-100 pt-1' : 'bottom-0'}`}>
                <p className='text-center bg-blue-500 text-white font-semibold hover:bg-blue-700 py-2 px-4 border rounded' onClick={() => setToggle(!toggle)}>30 Day Calendar</p>
                {toggle && <MonthlyCalendar />}
            </div>
        </div>
        
    </>
}

export default FirstClevelandPrayerTimes
