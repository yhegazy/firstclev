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
        <div className="p-3 sm:h-screen" style={{ backgroundImage: `url(${global.image})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover'}}>
            <div className="sm:w-1/2 sm:fixed w-full py-5">
                <p className="bg-white font-bold italic sm:w-1/2 w-2/3 rounded p-1"> The mission of the First Cleveland Masjid is to embrace and propagate the fundamental teachings of Islam through service to our community according to the Quran and the Sunnah of Prophet Muhammad (ﷺ)</p>


                <p className="p-1 w-2/5 my-5 rounded bg-white pointer-events-none text-center"> Next Prayer: <span className="font-bold">{new Date(nextPrayer).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</span>
                </p>

                <p className="w-1/2 p-2 my-5 text-white bg-blue-500 hover:bg-indigo-700 rounded"><a href={data.ytLinks}  rel="noreferrer" target="_blank">{data.buttonTitle} </a></p>
       
                <div className="sm:my-5 w-1/2 px-2 bg-gray-300">
                    <p className="text-lg underline ">Upcoming Events</p>
                    {isLoading ? <p>Loading...</p> : <ul className='bg-white px-2'>
                        {data && data.events.slice(0, 5).reverse().map((item) => [
                            <li className=''>{item.title} - {new Date(item.start).toLocaleDateString()}</li>,<hr/>
                            ])
                        }</ul>  
                    }
                    <button className={`bg-transparent text-blue-700 font-semibold py-2 px-4 rounded ${global.darkMode ? 'hover:text-white': 'hover:text-black'}`} onClick={handleClickMoreButton} > Click for more...</button>
                </div>
            
            <footer className=' space-x-2'>
            <button className="p-2 my-5 text-center w-1/2 text-white bg-green-600 hover:bg-green-700 rounded shadow"><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4LH7ELGSGAKYU&source=url" target="_blank" rel="noreferrer">Donate
            </a></button>

               
            </footer>
               
        
            
            {/* </footer> */}
            
            </div>
        </div>  

           
                
                
               
    
    </>
}