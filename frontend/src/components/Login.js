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
        <div className="sm:w-1/2 sm:px-2 sm:pt-auto sm:ml-auto sm:mr-auto pt-24">
            <h1 className="flex justify-center sm:text-3xl "> Access required</h1>
            <div className="flex justify-evenly py-4">
                <label className="px-2 font-semibold" htmlFor="email" >email: </label>
                <input className="border border-black" id="email" type="email" onChange={e => setUser({...user, email: e.target.value})} />
            </div>
            <div className="flex justify-evenly py-4">
                <label className="px-2 font-semibold" htmlFor="password" >pswd: </label>
                <input className="border border-black" id="password" type="password" onChange={e => setUser({...user, password: e.target.value})} />
            </div>
            <div className="flex justify-evenly py-4">
                <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" onClick={loginUser}>Login</button>
            </div> 
        </div>

       
    </>
}

export default Login