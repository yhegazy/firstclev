import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { db, storage } from '../appwrite/appwriteConfig';
import {Query} from 'appwrite'
import Carousel from 'nuka-carousel'
import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';

//Add edit section for main page to easily add/remove "In the Community" images

export default function MainPage(props) { 
    const {global, flag} = props
    const navigate = useNavigate();
    const [data, setData] = useState({ytLinks: "", events: [], buttonTitle: ""})
    const [gallery, setGallery] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleClickMoreButton = () => navigate("/events")

    
    useEffect(() => {
        const handleGetData = async() => {
            setIsLoading(true)                                                                 
            const video = await db.getDocument("firstClevelandMasjidDB", "youtube-api-link", "63a0c5d9a54a5c33c046")
            const events = await db.listDocuments("firstClevelandMasjidDB", "upcomingEvents", [Query.limit(100)])
            const liveStreamOverride = await db.listDocuments("firstClevelandMasjidDB", "settings")
            const getGallery = await storage.listFiles("events")
    
            setGallery(getGallery.files.map((img) => img.$id))
            
            setData({...data, 
                ytLinks: video.vID, 
                buttonTitle: liveStreamOverride.documents.map((item) => item.buttonName), 
                events: events.documents.map((item) => item).reverse(),
            })
            setIsLoading(false)
        }

        handleGetData() 

      return () => {console.info("this will be logged on unmount")}
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

    const handleDonateButton = () => {
        //navigate('/donate')
        return window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4LH7ELGSGAKYU&source=url')
    }

    return <>
        <div className="w-full h-full flex flex-col static" style={{ backgroundImage: `url(${global.image})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover', height: '100%'}}>
        <div className="grid sm:grid-cols-2 gap-2 py-4 mx-4 " >
            <div>
                {/* Mission State */}
                <p className="bg-gray-200 font-bold italic w-full rounded p-2 text-base shadow-xl border-black border-dotted"> The mission of the First Cleveland Masjid is to embrace and propagate the fundamental teachings of Islam through service to our community according to the Quran and the Sunnah of Prophet Muhammad (ﷺ)</p>

                {/* Prayer Time */}
                <p className="p-1 w-full my-5 rounded bg-white pointer-events-none text-center text-base shadow-xl"> Next Prayer: <span className="font-bold">{new Date(nextPrayer).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</span>
                </p>

                {/* Donamtion & Live Stream */}
                <div className='flex justify-evenly w-full text-center sm:text-base text-sm space-x-4'>
                    <button className="w-1/2 p-2 my-5 text-white bg-blue-500 hover:bg-indigo-700 rounded "><a href={data.ytLinks}  rel="noreferrer" target="_blank">{data.buttonTitle} </a></button>

                    <button className="p-2 my-5 w-1/2 text-white bg-green-500 hover:bg-green-700 rounded" onClick={() => handleDonateButton()} >Donate to First Cleveland Masjid</button>
                </div>
                
                {/* Events */}
                <div className="my-5 w-full text-base text-center px-2 bg-gray-300 shadow-lg">
                    <p className="text-lg underline ">Calendar</p>
                    {isLoading ? 
                        <p>Loading...</p> 
                        :
                        
                        !flag && data.events.slice(0, 7).reverse().map((item) => [
                            <ul className=''>
                            <li className='bg-white w-full text-center '>{item.title} - {new Date(item.start).toLocaleDateString()}</li>
                            <hr/>
                            </ul>  
                            ])
                    
                    }
                    <button className={`bg-transparent text-blue-700 font-semibold py-2 px-4 rounded ${global.darkMode ? 'hover:text-white': 'hover:text-black'}`} onClick={handleClickMoreButton} > Click for more...</button>
                </div>
            
            </div>
            <div className="max-w-3xl ">
                <div className="lg:contents hidden">
                <h1 className=' underline text-center text-2xl py-4 font-bold text-white'>In the Community</h1>
                <Carousel adaptiveHeight={false} enableKeyboardControls={true} wrapAround={true} slidesToShow={1}  cellSpacing={250}>
                    {gallery.map((item) =>  <img src={storage.getFilePreview("events", item)} className="" alt="none"/> )}
                </Carousel>
            </div>
            </div>
        </div>     
        </div> 
    </>
}
