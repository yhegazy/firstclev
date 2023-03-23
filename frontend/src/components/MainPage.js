import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { db } from '../appwrite/appwriteConfig';

import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';

export default function MainPage(props) { 
    const {global} = props
    const navigate = useNavigate();
    const [data, setData] = useState({ytLinks: "", events: [], gallery: [], buttonTitle: ""})
    const [isLoading, setIsLoading] = useState(false)

    const handleClickMoreButton = () => navigate("/events")

    useEffect(async() => {
        setIsLoading(true)                                                                 
        const video = await db.getDocument("firstClevelandMasjidDB", "youtube-api-link", "63a0c5d9a54a5c33c046")
        const events = await db.listDocuments("firstClevelandMasjidDB", "upcomingEvents")
        const liveStreamOverride = await db.listDocuments("firstClevelandMasjidDB", "settings")

      
        setData({...data, 
            ytLinks: video.vID, 
            buttonTitle: liveStreamOverride.documents.map((item) => item.buttonName), 
            events: events.documents.map((item) => item).reverse()
        })
        setIsLoading(false)
      
    },[])

    const [nextPrayer, setNextPrayer] = useState()
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
        <div className=" h-screen flex flex-wrap" style={{ backgroundImage: `url(${global.image})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover'}}>
            <div className=" ml-auto mr-auto sm:my-5 my-32 sm:w-2/3 px-2 text-center">
                <p  className="p-3 sm:text-2xl text-base bg-gray-200 italic font-semibold shadow-md rounded-2xl">
                    The mission of the First Cleveland Mosque is to embrace and propagate the fundamental teachings of Islam through service to our community according to the Quran and the Sunnah of Prophet Muhammad (ﷺ)
                </p>
                <br />
                <div className="bg-gray-200 w-1/3 ml-auto mr-auto rounded text-center sm:block hidden ">
                    <p className="p-2 text-lg underline">Upcoming Events</p>
                    {isLoading ? <p>Loading...</p> : <ul>
                        {data && data.events.slice(0, 5).reverse().map((item) => [
                            <li className='flex justify-around px-2 bg-white'>{item.title} - {new Date(item.start).toLocaleDateString()}</li>,<hr/>
                            ])
                        }</ul>  
                    }
                    <button className={`bg-transparent text-blue-700 font-semibold py-2 px-4 rounded ${global.darkMode ? 'hover:text-white': 'hover:text-black'}`} onClick={handleClickMoreButton} > Click for more...</button>
                </div>
                <div className="sm:flex justify-evenly  ">
                    <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4LH7ELGSGAKYU&source=url" target="_blank" rel="noreferrer"><button className="p-2 my-5 text-white bg-green-500 rounded shadow">Donate to First Cleveland</button></a>

                    <a href={data.ytLinks}  rel="noreferrer" target="_blank"><button color="primary" className="p-2 my-5 text-white bg-indigo-500 rounded shadow">{data.buttonTitle}</button> </a>
                    
                    <button className="p-2 my-5 text-white bg-yellow-500 rounded shadow pointer-events-none">
                        {/* <span></span> */}
                        Next Prayer: {new Date(nextPrayer).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                    </button>
                </div>
            </div>  
        </div>
    </>
}