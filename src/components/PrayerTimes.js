import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';
import Moment from 'react-moment'
import 'moment-timezone'


const FirstClevelandPrayerTimes = (props) => {   
    const {global} = props

    let date = new Date();
    let coordinates = new Coordinates(41.4932, -81.4609);
    let params = CalculationMethod.NorthAmerica();
    params.madhab = Madhab.Shafi;
    
    let prayerTimes = new PrayerTimes(coordinates, date, params);

    let hijraMonth = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {day: 'numeric', month: 'long'}).format(Date.now());
    let hijraYear = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {year : 'numeric'}).format(Date.now());
        
    return <>
       <div className={`w-2/3 ml-auto mr-auto text-2xl p-5 space-y-2 ${global.darkMode && 'bg-gray-700 text-white'}`}>
            <h1 className="flex justify-center w-1/2 ml-auto mr-auto text-3xl">Salah Times</h1>
            {/* Gregorian Calendar */}
            <div className="flex justify-start py-5">
                <Moment tz="America/New_York" format="MMMM D, YYYY">{prayerTimes.fajr}</Moment>
            </div>
        
            {/* Hijra Calendar */}
            <div className="flex justify-start pt-1 text-2xl"><p>{hijraMonth}<span className="flex">{hijraYear}</span></p></div>
            
            <div className="flex justify-end pb-5"></div>
            
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
        </div>
    </>
}

export default FirstClevelandPrayerTimes
