import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useEffect, useState} from 'react'

import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';

//Components
import Navbar from './components/Navbar'
import Annoucements from './components/Annoucements';
import UpcomingEvents from './components/UpcomingEvents'
import Edit from './components/Edit'
import MainPage from './components/MainPage'
import AboutUs from './components/AboutUs';
import YouTubeArchives from './components/YouTubeArchives'
import FirstClevelandPrayerTimes from './components/PrayerTimes'
import Login from './components/Login'
import Galleries from './components/Gallery'
import { storage } from './appwrite/appwriteConfig'

import './css/general.css'
import './index.css'

function App() {
  const [global, setGlobal] = useState({darkMode:false, loggedIn: false, image: ''})

  const handleLoggedIn = (value) => setGlobal({...global, loggedIn: value})
  
  const control = {
    onLoggedIn: handleLoggedIn,
  }
     
  useEffect(() => {
    let currentTime = new Date().getHours();
    let date = new Date();
    let coordinates = new Coordinates(41.4932, -81.4609);
    let params = CalculationMethod.NorthAmerica();
    params.madhab = Madhab.Shafi;
    
    let prayerTimes = new PrayerTimes(coordinates, date, params);
  
    if(currentTime <= prayerTimes.fajr.getHours() || currentTime > prayerTimes.maghrib.getHours()) setGlobal({...global, darkMode: true})
    else setGlobal({...global, darkMode:false})
  
  },[]) 

  useEffect(async() => {
    const mainpage = await storage.getFilePreview("6377a56fbc65a7a7a17f", "6378cf91209a0c1a7217")
    setGlobal({...global, image: mainpage})
  },[])

  return (
    <div className={global.darkMode && 'bg-gray-700 text-white'} style={{height: '100vh'}}>
      
      <BrowserRouter>
        <Navbar global={global} control={control} id="nav" />   
        <Routes> 
          <Route path="/" element={ <MainPage global={global} control={control}  id="main"/>} />
          <Route path="/posts" element={ <Annoucements global={global} control={control}/>} />
          <Route path="/events" element={ <UpcomingEvents global={global} control={control} />} />
          <Route path="/about" element={ <AboutUs />} global={global} control={control}/>
          <Route path="/archives" element={ <YouTubeArchives global={global} control={control}/>} />
          <Route path="/salah" element={ <FirstClevelandPrayerTimes global={global} control={control}/>} />
          <Route path="/gallery" element={ <Galleries global={global} control={control}/>} />
          <Route path="/admin" element={ <Login global={global} control={control}/>} />
            <Route path="/edit" element={ <Edit global={global} control={control}/>} />
           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;