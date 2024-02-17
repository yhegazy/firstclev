import {useEffect, useMemo, useState} from 'react'
import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';
// import MonthlyCalendar from './pages/MonthlyCalendar';

const FirstClevelandPrayerTimes = () => {   
    // const [toggle, setToggle] = useState(false)

    const date = useMemo(() => new Date(),[]);
    let coordinates = new Coordinates(41.4932, -81.4609);
    let params = CalculationMethod.NorthAmerica();
    params.madhab = Madhab.Shafi;
    
    let prayerTimes = new PrayerTimes(coordinates, date, params);

    let hijraMonth = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {day: 'numeric', month: 'long'}).format(Date.now());
    let hijraYear = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {year : 'numeric'}).format(Date.now());

    const [monthName, setMonthName] = useState(null)
    const handleGregorianMonthName = (number) => {
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
    }
    useEffect(() => {
        handleGregorianMonthName(date.getMonth() + 1)
    }, [date])
    
   
    // const MonthlyCalendar = () => {
    //     let arr = []
    //     for(let i = 0; i < 30; i++) {
    //         let temp = new Date(prayerTimes.fajr.getFullYear(), prayerTimes.fajr.getMonth(), prayerTimes.fajr.getDate() + 22) 
    //         arr.push(temp) 
    //     }
       
    //     let day = arr.map((date) => [(date.getMonth() + 1)+ "/" + date.getDate(), new PrayerTimes(coordinates, date, params)])  

    //     return <>
    //         <div className="flex justify-center">
    //             <button className='text-center bg-blue-600 text-white font-semibold hover:bg-blue-800 p-2 w-full border rounded-md' onClick={() => setToggle(!toggle)}>
    //             Close</button>
    //         </div>
    //         <table className="w-full text-center">
    //             <thead>
    //                 <tr>
    //                     <th scope="col">Day</th>
    //                     <th scope="col" >Fajr</th>
    //                     <th scope="col" >Dhuhr</th>
    //                     <th scope="col" >Asr</th>
    //                     <th scope="col" >Maghrib</th>
    //                     <th scope="col">Isha</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
                    
    //                 {day.map((prayer) => <tr>
    //                     <td >{prayer[0]}</td>
                        
    //                     <td >{new Date(prayer[1].fajr).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})} </td>
                        
    //                     <td >{new Date(prayer[1].dhuhr).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</td>
                       
    //                     <td > {new Date(prayer[1].asr).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
    //                     </td>
                        
    //                     <td > {new Date(prayer[1].maghrib).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</td>
                        
    //                     <td >{new Date(prayer[1].isha).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</td> 
    //                 </tr>)}
    //             </tbody>
    //         </table> 

            
    //     </>
    
    // }

    const data = [
        {
            name:'Fajr',
            time: new Date(prayerTimes.fajr).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
        },
        {
            name:'Dhuhr',
            time: new Date(prayerTimes.dhuhr).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
        },
        {
            name:'Asr',
            time: new Date(prayerTimes.asr).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
        },
        {
            name:'Maghreb',
            time: new Date(prayerTimes.maghrib).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
        },
        {
            name:'Isha',
            time: new Date(prayerTimes.isha).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
        }
    ]

    return <>
    <div>
        {//toggle ? 
            // <MonthlyCalendar 
            //     onToggle={setToggle} 
            //     toggle={toggle}
            //     prayerTimes={prayerTimes} 
            //     coordinates={coordinates}
            //      params={params} 
            // /> 
        // :    
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
            {data.map((item) => {return  <div className="text-xl md:text-2xl w-full grid grid-cols-2 text-center py-4">
                <p>{item.name}</p>
                <p>{item.time}</p>
            </div>})}

            {/* 30 day Calendar */}
            {/* <button className='text-center bg-blue-500 text-white font-semibold hover:bg-blue-700 p-2 border rounded-md' onClick={() => setToggle(!toggle)}>30 Day Calendar</button> */}
            
        </div>}
    </div>
    </>
}

export default FirstClevelandPrayerTimes
