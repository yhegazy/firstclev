import {useState, useEffect} from 'react'
import {db, storage} from '../appwrite/appwriteConfig'

function Annoucements(props) {
    const {global} = props
    const [posts, setPosts] = useState({posts: [], images: []})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async() => {
        setIsLoading(true)
        const getPosts = await db.listDocuments("637278aa811fb8962b16", "637278b17505ad9eea21")
        setPosts({...posts, posts: getPosts.documents})
        setIsLoading(false)
    },[])

    return <>
        <div className={`w-3/4 ml-auto mr-auto text-2xl p-5 space-y-2 ${global.darkMode && 'bg-gray-700 text-white'}`}>
            <h1 className="flex justify-center w-1/2 ml-auto mr-auto text-3xl">Annoucements</h1>

            <div className='grid grid-flow-col grid-cols-4 space-x-5 space-y-3'>
                {posts.posts.slice(0,20).map((item, id) =>     
                    <div className="max-w-sm rounded shadow-lg">
                        <img className="w-full" src={storage.getFileView("6377974dd959ac782a05", item.image)} alt={item.subject} />
                        
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
