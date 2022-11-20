import {useState} from 'react'
import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';
import Moment from 'react-moment'
import moment from 'moment'
import 'moment-timezone'
// import PrayerTimes from 'prayer-times'
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
   
    const MonthlyCalendar = () => {
        PrayTimes().setMethod('ISNA')
        PrayTimes().getTimes(date, [41.4932, -81.4609], -5)
        let arr = []
        for(let i = 0; i < 30; i++) {
            arr.push(new Date(date.setDate(date.getDate() + i)))
        }

        let times = arr.map((date) => PrayTimes().getTimes(date, [41.4932, -81.4609], -5))
        
       console.log(times)

        return <div className="overflow-x-auto relative border-r-2 border-l-2 border-gray-50">
             <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {/* <th scope="col" className="py-3 px-6">Day</th> */}
                        <th scope="col" className="py-3 px-6">Fajr</th>
                        <th scope="col" className="py-3 px-6">Dhuhr</th>
                        <th scope="col" className="py-3 px-6">Asr</th>
                        <th scope="col" className="py-3 px-6">Maghrib</th>
                        <th scope="col" className="py-3 px-6">Isha</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {/* {Object.keys(times).map((key) => <tr>  
                        <td className="px-6 py-1 whitespace-nowrap">{key} </td>

                    </tr>)} */}
                    {times.map((prayer) => <tr>
                        
                        <td className="px-6 py-1 whitespace-nowrap">{prayer.fajr} </td>
                        <td className="px-6 py-1 whitespace-nowrap">{prayer.dhuhr}</td>
                        <td className="px-6 py-1 whitespace-nowrap"> {prayer.asr} </td>
                        <td className="px-6 py-1 whitespace-nowrap"> {prayer.maghrib}</td>
                        <td className="px-6 py-1 whitespace-nowrap">{prayer.isha}</td> 
                    </tr>)}
                    {/* {times.map((prayer) => <tr>
                        {Array.from({length: 14}, (x, i) => <td scope="col" className="py-4 px-6">{i+1}</td>)} 
                        
                        
                        <td className="px-6 py-1 whitespace-nowrap">{prayer.fajr} </td>
                        <td className="px-6 py-1 whitespace-nowrap">{prayer.dhuhr}</td>
                        <td className="px-6 py-1 whitespace-nowrap"> {prayer.asr} </td>
                        <td className="px-6 py-1 whitespace-nowrap"> {prayer.maghrib}</td>
                        <td className="px-6 py-1 whitespace-nowrap">{prayer.isha}</td> 
                    </tr>)} */}
                </tbody>
            </table> 
        </div>
    }
        
    return <>
       <div className={`w-2/3 ml-auto mr-auto text-2xl p-5 space-y-2 ${global.darkMode && 'bg-gray-700 text-white'}`}>
            <h1 className="flex justify-center w-1/2 ml-auto mr-auto text-3xl">Salah Times</h1>
            {/* Gregorian Calendar */}
            <div className="flex justify-start py-5">
                <Moment tz="America/New_York" format="MMMM D, YYYY">{prayerTimes.fajr}</Moment>
            </div>
        
            {/* Hijra Calendar */}
            <div className="flex justify-start pt-1 text-2xl"><p>{hijraMonth}<span className="flex">{hijraYear}</span></p></div>
            
            {/* Salat Times */}
            <p className="flex flex-wrap justify-between">Fajr: 
                <span>
                    <Moment tz="America/New_York" format="h:mm A">{prayerTimes.fajr}</Moment>
                </span>
            </p>
            <p className="flex flex-wrap justify-between">Dhuhr: 
                <span>
                    <Moment tz="America/New_York" format="h:mm A">{prayerTimes.dhuhr}</Moment>
                </span>
            </p>
            <p className="flex flex-wrap justify-between">Asr:
                <span>
                    <Moment tz="America/New_York" format="h:mm A">{prayerTimes.asr}</Moment>
                </span>
            </p>
            <p className="flex flex-wrap justify-between">Maghrib:
                <span>
                    <Moment tz="America/New_York" format="h:mm A">{prayerTimes.maghrib}</Moment>
                </span>
            </p>
            <p className="flex flex-wrap justify-between">Isha:
                <span>
                    <Moment tz="America/New_York" format="h:mm A">{prayerTimes.isha}</Moment>
                </span>
            </p>
        <div className={`fixed w-2/3 ml-auto mr-auto px-2 ${toggle ? 'bottom-2 bg-gray-100 pt-1' : 'bottom-0'}`}>
            <p className='text-center bg-blue-500 text-white font-semibold hover:bg-blue-700 py-2 px-4 border rounded' onClick={() => setToggle(!toggle)}>30 Day Calendar</p>
            {toggle && <MonthlyCalendar />}
           

        </div>
        </div>
        
    </>
}

export default FirstClevelandPrayerTimes
