import {  PrayerTimes } from 'adhan';

const MonthlyCalendar = ({prayerTimes, coordinates, params, onToggle, toggle=false}) => {

    const generateDatesForMonth = Array.from({ length: 31 }, (_, i) => {
        return new Date(
            prayerTimes.fajr.getFullYear(),
            prayerTimes.fajr.getMonth(),
            prayerTimes.fajr.getDate() + i
          );
      });
   
    let day = generateDatesForMonth.map((date) => [`${date.getMonth() + 1}/${date.getDate()}`, new PrayerTimes(coordinates, date, params)])  

    const getNextPrayerTime = (prayer) => {
        return new Date(prayer).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
    }
 

    return <>
        <div className="flex justify-center">
            <button className='text-center bg-blue-600 text-white font-semibold hover:bg-blue-800 p-2 w-full border rounded-md' onClick={() => onToggle(!toggle)}>
            Close</button>
        </div>
        <table className="w-full text-center">
            <thead>
                <tr>
                    <th scope="col">Day</th>
                    <th scope="col" >Fajr</th>
                    <th scope="col" >Dhuhr</th>
                    <th scope="col" >Asr</th>
                    <th scope="col" >Maghrib</th>
                    <th scope="col">Isha</th>
                </tr>
            </thead>
           
            <tbody>
                {day.map((prayer, i) => <tr key={prayer[0]+i}>
                    <td >{prayer[0]}</td>
                    <td>{getNextPrayerTime(prayer[1].fajr)}</td>
                    <td>{getNextPrayerTime(prayer[1].dhuhr)}</td>
                    <td>{getNextPrayerTime(prayer[1].asr)}</td>
                    <td>{getNextPrayerTime(prayer[1].maghreb)}</td>
                    <td>{getNextPrayerTime(prayer[1].isha)}</td>
                </tr>)}
            </tbody>
        </table> 

        
    </>

}

export default MonthlyCalendar