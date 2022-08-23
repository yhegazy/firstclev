import { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom'
import { vID, entry } from './hooks/Firebase';

import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';
import Moment from 'react-moment'
import 'moment-timezone'


export default function MainPage(props) { 
    const {global} = props
    const [nextPrayer, setNextPrayer] = useState()
    // Ability to choose freely mainpage images to be part of the carousel.
    // Uses checkbox (with a hard maximum of 5) to activate/deactivate 
    //Checkbox sits next to or on top of (like vg4) the image. 

    useEffect(() => {
    let date = new Date();
    let coordinates = new Coordinates(41.4932, -81.4609);
    let params = CalculationMethod.NorthAmerica();
    params.madhab = Madhab.Shafi;
   
    let prayerTimes = new PrayerTimes(coordinates, date, params);
    let next = prayerTimes.nextPrayer()
    setNextPrayer(prayerTimes.timeForPrayer(next))
  },[]) 
  
    
    return <>
    <div className="h-auto">
        <div className="flex flex-wrap w-full">
            <div className="w-3/4 px-2 text-center">
                <img className="w-1/2 ml-auto mr-auto" src={process.env.PUBLIC_URL + `/fcmLogo.png`} alt="Welcome"/>
                <p  className="p-3 text-2xl bg-gray-200 italic font-semibold shadow-md rounded-2xl">
                    The mission of the First Cleveland Mosque is to embrace and propagate the fundamental teachings of Islam through service to our community according to the Quran and the Sunnah of Prophet Muhammad (ﷺ)</p>
                <div className="p-1 space-x-3">
                    <NavLink to={{pathname:"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4LH7ELGSGAKYU&source=url"}} target="_blank"><button className="p-2 text-white bg-green-500 rounded shadow">Donate to First Cleveland</button></NavLink>

                    {vID.map((video) => <a href={`https://youtube.com/watch?v=${video.id}`}  rel="noreferrer" target="_blank"><button color="primary" className="p-2 text-white bg-indigo-500 rounded shadow" target="_blank">Watch Latest Live Stream (Fridays 1:30p ET)</button> </a> )}

                    <button className="p-2 my-5 text-white bg-yellow-500 rounded shadow">
                        <span>Next Prayer: </span>
                        <Moment tz="America/New_York" format="h:mm A">{nextPrayer}</Moment> 
                    </button>
                </div>
            </div>   
            <div className="w-1/4 ml-auto mr-auto text-center my-5">
                <div className="bg-gray-200 w-1/2 ml-auto mr-auto">
                    <p className="pb-2 text-lg underline">Weekly Events</p>
                    <ul>
                        {entry.map((item) => {
                            return <>
                                <li className='flex justify-start px-2 bg-white shadow'>{item.subject}...</li>
                            </>
                        })}
                    </ul>

                    <button className={`bg-transparent text-blue-700 font-semibold py-2 px-4 rounded ${global.darkMode ? 'hover:text-white': 'hover:text-black'}`}> Click for more...</button>

                </div>
            </div>  

        </div>
          
    </div> 

    </>
}