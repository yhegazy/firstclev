import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import Carousel from 'nuka-carousel'
import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';

//Add edit section for main page to easily add/remove "In the Community" images

export default function MainPage(props) { 
    const {global, flag, listEvents, liveStreamOverride, getVideo, listFilesPreview} = props
    const navigate = useNavigate();
    const [data, setData] = useState({videoLink: "", events: [], buttonTitle: "", preview: []})
    const [isLoading, setIsLoading] = useState(true)

    const handleClickMoreButton = () => navigate("/events")
    const handleRamadanPlannerButton = () => navigate('/products')

    useEffect(() => {
        const handleGetData = async() => {                                        
            setData({ 
                videoLink: getVideo.link, 
                buttonTitle: liveStreamOverride.documents.map((item) => item.buttonName), 
                events: (await listEvents(50)).documents.map((item) => item).reverse(),
                preview: (await listFilesPreview("events").then(item => item))
            })
            setIsLoading(false)
        }

        handleGetData() 
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

    const handleDonateButton = () => window.open('https://www.paypal.com/donate/?hosted_button_id=4LH7ELGSGAKYU')

    const handleLiveStreamButton = () => window.open(data.videoLink)

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
                    <button className="w-1/2 p-2 my-5 text-white bg-blue-500 hover:bg-indigo-700 rounded " onClick={()  => handleLiveStreamButton()}>{data.buttonTitle}</button>

                    <button className="p-2 my-5 w-1/2 text-white bg-green-500 hover:bg-green-700 rounded" onClick={() => handleDonateButton()} >Donate to First Cleveland Masjid</button>
                </div>

                {/* Ramadan Planner */}
                <button className="p-2 my-5 w-full text-white hover:text-black hover:bg-stone-300 bg-yellow-500 rounded text-2xl font-semibold" onClick={handleRamadanPlannerButton} >
                    Purchase Ramadan Planner 2024
                </button>
                
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
                    {data.preview.map((item) => <img src={item} alt="none"/> )} 
                </Carousel>
            </div>
            </div>
        </div>     
        </div> 
    </>
}