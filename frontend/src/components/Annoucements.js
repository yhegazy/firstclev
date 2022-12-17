import {useState, useEffect} from 'react'
import {db, storage} from '../appwrite/appwriteConfig'

function Annoucements(props) {
    const {global} = props
    const [posts, setPosts] = useState({posts: [], images: []})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async() => {
        setIsLoading(true)
        const getPosts = await db.listDocuments("firstClevelandMasjidDB", "posts")
        setPosts({...posts, posts: getPosts.documents})
        setIsLoading(false)
    },[])

    return <>
        <div className={`xl:w-3/4 xl:ml-auto xl:mr-auto text-2xl xl:p-5 p-2 xl:space-y-2 }`}>
            <h1 className="flex justify-center w-1/2 ml-auto mr-auto xl:text-3xl text-2xl">Annoucements</h1>
            <hr className='xl:hidden xl:py-0 py-3' />
            <div className='xl:grid xl:grid-flow-col xl:grid-cols-4 xl:space-x-5 xl:space-y-3'>
                {posts.posts.slice(0,20).map((item, id) =>     
                    <div className="max-w-sm rounded shadow-lg">
                        <img className="w-full" src={storage.getFileView("images", item.image)} alt={item.subject} />
                        
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{item.subject}</div>
                            <p className="text-gray-700 text-base">{item.body}</p>
                        </div>
                        
                    </div>
                )} 
            </div>
        </div>
    </>
}

export default Annoucements
