import {useEffect, useState} from 'react'
import {db} from '../appwrite/appwriteConfig'


const hrefURL = 'https://www.youtube.com/watch?v='

const YouTubeArchives = () => {
    const [title, setTitle] = useState([])
    const [id, setID] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getData = async() => {
        setIsLoading(true)
        const video = await db.getDocument("firstClevelandMasjidDB", "youtube-api-link", "63a0c5d9a54a5c33c046")
        setTitle(video.title)
        setID(video.id)  
        setIsLoading(false)    
    }

    useEffect(() => {  
        getData();
        return () => {console.info("this will be logged on unmount")}
    },[])
    
    return <>
        <div className='w-full h-full flex flex-col items-center '>
            <div className="pb-8">
                <p className="text-4xl font-semibold inline border-b-4 border-lime-600"> Archives</p>
            </div>
            <p className="max-w-[800px] text-2xl px-4 text-justify">
                Since our first video in 2013, the First Cleveland Mosque has served thousands of viewers worldwide with the message of Islam. 
                Please help us grow by visiting, liking, and subscribing to our YouTube channel.
            </p>

            <hr />

            {!isLoading ? <div className='grid grid-cols-2  sm:text-2xl text-xl py-4'>   
                <div className=''>
                {title.map((item) => <p className=''>{item.replace(/&#39;/g, "'").replace(/&amp;/g, "&").substring(0, 20)}...</p>)}
                </div>
                <div className='s'>
                    {id.map((id) => <a className='text-center' href={hrefURL + id} target="_blank" rel='noreferrer'><p>Link</p></a>)}
                </div>
            </div>: <p>Loading...</p>}    
        </div>
    </>
}

export default YouTubeArchives
