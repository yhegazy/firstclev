import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {account} from '../appwrite/appwriteConfig'

const Login = (props) => {
    const navigate = useNavigate()
    const {global, onLoggedIn} = props
    const [user, setUser] = useState({email:"", password:""})

    const loginUser = async(e) => {
        e.preventDefault();
        try {
            await account.createEmailSession(user.email, user.password)
            
            onLoggedIn(true)
            navigate("/edit")
        } catch (error) {
            console.log(error)
            onLoggedIn(false)
        }
    }

    return <>
        <div className={`w-1/2 px-2 py-5 my-10 ml-auto mr-auto ${global.darkMode ? 'bg-gray-700 text-white': 'rounded shadow  bg-green-50'}`}>
            <h1 className="flex justify-center text-3xl "> Please login to your account to edit.</h1>
            <div className="flex justify-evenly py-4">
                <label className="px-2 font-semibold" htmlFor="email" >email addr: </label>
                <input className="border border-black" id="email" type="email" onChange={e => setUser({...user, email: e.target.value})} ></input>
            </div>
            <div className="flex justify-evenly py-4">
                <label className="px-2 font-semibold" htmlFor="password" >password: </label>
                <input className="border border-black" id="password" type="password" onChange={e => setUser({...user, password: e.target.value})} ></input>
            </div>
            <div className="flex justify-evenly py-4">
                <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" onClick={loginUser}>Login</button>
            </div> 
        </div>

       
    </>
}

export default Login