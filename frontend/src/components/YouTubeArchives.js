import {useEffect, useState} from 'react'
import {db} from '../appwrite/appwriteConfig'


const hrefURL = 'https://www.youtube.com/watch?v='

const YouTubeArchives = () => {
    const [ytInfo, setYTInfo] = useState({orderBy: 'date', results: 11})
    const [title, setTitle] = useState([])
    const [id, setID] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getData = async() => {
        setIsLoading(true)
        const video = await db.getDocument("firstClevelandMasjidDB", "youtube-api-link", "63a0c5d9a54a5c33c046")

        setYTInfo({...ytInfo, orderBy: video.orderBy, results: video.results})
        setTitle(video.title)
        setID(video.id)

        setIsLoading(false)    
    }

    useEffect(() => {  
        getData();
        return () => {console.info("this will be logged on unmount")}
    },[])

    
    return (
        
        <div className="sm:w-5/6 sm:ml-auto sm:mr-auto sm:p-5 p-2 space-y-2 pt-28 sm:pt-auto">
            <h1 className="flex justify-center sm:w-1/2 ml-auto mr-auto sm:text-3xl text-2xl">Video Archives</h1>
            <h4 className="pb-5 sm:align-center sm:text-2xl text-justify">
                Since our first video in 2013, the First Cleveland Mosque has served thousands of viewers worldwide with the message of Islam. 
                Please help us grow by visiting, liking, and subscribing to our YouTube channel.
            </h4>
            
            <hr />
            {!isLoading ? <div className='flex sm:flex-wrap'>
                <div className=' w-4/5 text-center sm:text-base text-sm'>
                {title.map((item) => <p className='sm:text-2xl'>{item.replace(/&#39;/g, "'").replace(/&amp;/g, "&").substring(0, 35)}...</p>)}
                </div>
                <div className='text-left w-1/5 sm:text-base text-sm'>
                    {id.map((id) => <a className='sm:text-2xl' href={hrefURL + id} target="_blank" rel='noreferrer'><p>Link</p></a>)}
                </div>
            </div>: <p>Loading...</p>}    
        </div>
        
    )
}

export default YouTubeArchives
