import {useState, useEffect} from 'react'
import adhan from 'adhan'
import Moment from 'react-moment'
import 'moment-timezone'

const PrayerTimes = () => {   

    let date = new Date();
    let coordinates = new adhan.Coordinates(41.4932, -81.4609);
    let params = adhan.CalculationMethod.NorthAmerica();
    params.madhab = adhan.Madhab.Shafi;
    
    let prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

    let hijraMonth = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {day: 'numeric', month: 'long'}).format(Date.now());
    let hijraYear = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {year : 'numeric'}).format(Date.now());
        
    return <>
       <div className="w-2/3 ml-auto mr-auto bg-white text-2xl p-5">
        
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

export default PrayerTimes
