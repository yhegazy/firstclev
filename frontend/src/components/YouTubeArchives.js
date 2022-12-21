import {useEffect, useState} from 'react'
import {db} from '../appwrite/appwriteConfig'


const hrefURL = 'https://www.youtube.com/watch?v='

const YouTubeArchives = () => {
    const [ytInfo, setYTInfo] = useState({orderBy: 'date', results: 11})
    const [title, setTitle] = useState([])
    const [id, setID] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async() => {
        setIsLoading(true)
        const video = await db.getDocument("firstClevelandMasjidDB", "youtube-api-link", "63a0c5d9a54a5c33c046")

        setYTInfo({...ytInfo, orderBy: video.orderBy, results: video.results})
        setTitle(video.title)
        setID(video.id)

        setIsLoading(false)      

    },[])

    
    return (
        
        <div className={`xl:w-5/6 xl:ml-auto xl:mr-auto xl:p-5 p-2 space-y-2`}>
            <h1 className="flex justify-center xl:w-1/2 ml-auto mr-auto xl:text-3xl text-2xl">Video Archives</h1>
            <h4 className="pb-5  xl:align-center xl:text-2xl">
                Since our first video in 2013, the First Cleveland Mosque has served thousands of viewers worldwide with the message of Islam. 
                Please help us grow by visiting, liking, and subscribing to our YouTube channel.
            </h4>
            
            <hr />
            {!isLoading ? <div className='flex xl:flex-wrap'>
                <div className=' w-4/5 p-1 xl:text-base text-sm'>
                {title.map((item) => <p>{item.replace(/&#39;/g, "'").replace(/&amp;/g, "&").substring(0, 50)}...</p>)}
                </div>
                <div className='text-left w-1/5 p-1 xl:text-base text-sm'>
                    {id.map((id) => <a href={hrefURL + id} target="_blank" rel='noreferrer'><p>Link</p></a>)}
                </div>
            </div>: <p>Loading...</p>}    
        </div>
        
    )
}

export default YouTubeArchives
