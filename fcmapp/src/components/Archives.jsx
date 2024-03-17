import {useEffect, useState} from 'react'
import {getVideo} from '../appwrite/appwriteConfig'


//TODO: Fetch DB from backend instead of front end.


const hrefURL = 'https://www.youtube.com/watch?v='

const YouTubeArchives = () => {
    const [title, setTitle] = useState([])
    const [id, setID] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {  
        const getData = async() => {
            setTitle(getVideo.title)
            setID(getVideo.ytid)  
            setIsLoading(false)    
        }
        getData();
    },[])


    
    return <>
        <div className='w-full h-full flex flex-col items-center '>
            <div className="pb-8">
                <p className="text-4xl font-semibold inline border-b-4 border-lime-600"> Archives</p>
            </div>
            <p className="max-w-[1000px] text-2xl px-4 text-justify">
                Since our first video in 2013, the First Cleveland Mosque has served thousands of viewers worldwide with the message of Islam. Please help us grow by visiting, liking, and subscribing to our YouTube channel.
            </p>
 
            <hr />

            {isLoading ? <p>Loading...</p> : <div className='grid grid-cols-2 text-center sm:text-2xl text-xl py-4'>   
                <div className=''>
                {title.map((item) => <p className=''>{item.replace(/&#39;/g, "'").replace(/&amp;/g, "&").substring(0, 50)}...</p>)}
                </div>
                <div className=''>
                    {id.map((id) => <a className='text-center' href={hrefURL + id} target="_blank" rel='noreferrer'><p>Link</p></a>)}
                </div>
            </div>}    
        </div>
    </>
}

export default YouTubeArchives
