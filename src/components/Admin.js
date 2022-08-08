import {useState} from 'react'
import useFetch from './hooks/useFetch';


const Admin = (props) => {
    const {global} = props
    const {post} = useFetch("https://firebasestorage.googleapis.com/v0/b/sandbox-ca2f2.appspot.com/o/video.json?alt=media&token=0ab664b9-0e7a-442f-9bb4-ee194b5ff8eb")
    const [vID, setVID] = useState(null)
    
    const handleYouTubeButton = () => {
        try {
            post("video.json", [{id: vID}])
        }
        catch(error){
            return console.log(error)
        }

        alert("Saved!")
        setVID("")
    }
    
    
    return (
        <div className={`w-1/2 px-2 py-5 my-10 ml-auto mr-auto ${global.darkMode ? 'bg-gray-700 text-white': 'rounded shadow  bg-green-50'}`}>
            <h1 className="flex justify-center text-3xl "> Administrator Mode</h1>
            <div className="flex justify-between py-4">
                <label className="px-2 font-semibold" htmlFor="youtube" >YouTube Video ID: </label>
                <input className="border" id="youtube" value={vID} onChange={e => setVID(e.target.value)} ></input>
                <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" onClick={() => handleYouTubeButton()}>Update</button>
            </div>
        </div>
        
    )
}

export default Admin
