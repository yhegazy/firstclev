import {useEffect, useState} from 'react'
import {db} from '../appwrite/appwriteConfig'


const hrefURL = 'https://www.youtube.com/watch?v='
const TABS = "bg-white hover:bg-gray-100 inline-block border-l border-t border-r rounded-t py-2 px-4 text-red-700 font-semibold shadow"


const YouTubeArchives = () => {
    const [ytInfo, setYTInfo] = useState({orderBy: 'date', results: 11})
    const [title, setTitle] = useState([])
    const [id, setID] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async() => {
        setIsLoading(true)
        const video = await db.getDocument("637278aa811fb8962b16", "637281a5a4ef8b18ff46", "637281cdc2f22d321e13")

        setYTInfo({...ytInfo, orderBy: video.orderBy, results: video.results})
        setTitle(video.title)
        setID(video.id)

        setIsLoading(false)      

    },[])

    
    return (
        
        <div className={`w-5/6 ml-auto mr-auto p-5 space-y-2 ${global.darkMode && 'bg-gray-700 text-white'}`}>
            <h1 className="flex justify-center w-1/2 ml-auto mr-auto text-3xl">Video Archives</h1>
            <h4 className="pb-5 mbr-semibold align-center text-2xl">Since our first video in 2013, the First Cleveland Mosque has served thousands of viewers worldwide with the message of Islam. Please help us grow by visiting, liking, and subscribing to our YouTube channel. </h4>
            
            <hr />
            {!isLoading ? <div className=' flex flex-wrap'>
                <div className=' w-4/5 p-1'>
                    {title.map((item) => <p>{item.replace(/&#39;/g, "'")}</p>)}
                </div>
                <div className='text-left w-1/5 p-1'>
                    {id.map((id) => <a href={hrefURL + id} target="_blank"><p>Link</p></a>)}
                </div>
            </div>: <p>Loading...</p>}    
        </div>
        
    )
}

export default YouTubeArchives
