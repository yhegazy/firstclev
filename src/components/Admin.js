import {useState} from 'react'
import {colRef, updateVideoID,} from './hooks/Firebase'

const Admin = (props) => {
    const {global} = props
    const [vID, setVID] = useState("")
    
    const handleYouTubeButton = () => {
        const value = { ID: vID}
    updateVideoID(colRef, value)

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
