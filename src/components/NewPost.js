import {useState} from 'react'
import {colRef, addDocument} from './hooks/Firebase'
import 'firebase/compat/firestore';

// NewPost should revert back to the home page to refresh and retrieve the data.
//telephone #s & emails need validation 

const NewPost = (props) => {
    const {global} = props
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")
    const [email, setEmail] = useState("")
    const [telephone, setTelephone] = useState("")
    const [hrefURL, setHrefURL]= useState("")
    const [image, setImage] = useState("")
    
    
    const handleCreatePostClick = (e) => {
        e.preventDefault()
        const value = {greeting: "As-Salamu Aalikum, ٱلسَّلَامُ عَلَيْكُمْ‎", subject: subject , body: body, email: email, telephone: telephone, hrefURL: hrefURL, image: image}

        addDocument(colRef, value)
  
        setSubject("");
        setBody("");
        setEmail("")
        setTelephone("")
        setHrefURL("")
        setImage("")       

        console.log("created!")
    }
    // const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email)

    return (
        <div className={`w-1/2 px-2 ml-auto mr-auto ${global.darkMode && 'bg-gray-700 text-white'}`}>
            <h1 className="flex justify-center py-5 text-3xl "> Create New Annoucement</h1>
            
            <div className="flex flex-wrap py-4 justify-evenly">
                <form className="w-full max-w-lg" onSubmit={(e) => handleCreatePostClick(e)}>
                    <div className="flex flex-wrap mb-6 -mx-3">
                        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" required>
                                Title:
                            </label>
                            <input id="subject" className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white" value={subject} onChange={e => setSubject(e.target.value)}  type="text"/>
                        </div>

                        <div className="w-full px-3 md:w-1/2">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-last-name">
                                Body:
                            </label>
                            <textarea id="body" className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" value={body} onChange={e => setBody(e.target.value)}  type="text"/>
                        </div>

                    </div>

                    <div className="flex flex-wrap mb-6 -mx-3">
                        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                                Email:
                            </label>
                            <input id="email" className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white" value={email} onChange={e => setEmail(e.target.value)}  type="text"/>
                        </div>


                        <div className="w-full px-3 md:w-1/2">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="telephone">
                                Telephone:
                            </label>
                            <input className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="telephone" value={telephone} onChange={e => setTelephone(e.target.value)}  type="text"/>
                        </div>
                    </div>

                    <div className="flex flex-wrap mb-6 -mx-3">
                        <div className="w-full px-3 md:w-1/2">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="image">
                                Image
                            </label>
                            <input className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="image" value={image} onChange={e => setImage(e.target.value)} type="text" />
                        </div>
            
                        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                                Website Address:
                            </label>
                            <input id="hrefURL" className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white" value={hrefURL} onChange={e => setHrefURL(e.target.value)}  type="text"/>
                        </div>
                    </div>
                    <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" type="submit">Update</button>
                </form>                
            </div>
        </div>
    )
}

export default NewPost