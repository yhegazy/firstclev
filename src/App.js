import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useEffect, useState} from 'react'
//Components
import Navbar from './components/Navbar'
import AnnoucementPage from './components/AnnoucementPage'
import MainPage from './components/MainPage'
import AboutUs from './components/AboutUs';
import YouTubeArchives from './components/YouTubeArchives'
import FirstClevelandPrayerTimes from './components/PrayerTimes'
import Admin from './components/Admin'
import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';


import './css/general.css'
import './index.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  
  useEffect(() => {
    let currentTime = new Date().getHours();
    let date = new Date();
    let coordinates = new Coordinates(41.4932, -81.4609);
    let params = CalculationMethod.NorthAmerica();
    params.madhab = Madhab.Shafi;
    
    let prayerTimes = new PrayerTimes(coordinates, date, params);
  
    if(currentTime <= prayerTimes.fajr.getHours() || currentTime > prayerTimes.maghrib.getHours()) setDarkMode(!darkMode)
  
  },[/**renders once! */]) 

  const global = {
    darkMode: darkMode,
  }

  console.log(darkMode)

  return (
    <div className={darkMode && 'bg-gray-700 text-white'} style={{height: '100vh'}}>
      <BrowserRouter>
        <Navbar global={global} />   
        <Routes> 
          <Route path="/" element={ <MainPage global={global}/>} />
          <Route path="/annoucements" element={ <AnnoucementPage global={global}/>} />
          <Route path="/about" element={ <AboutUs />} global={global}/>
          <Route path="/archives" element={ <YouTubeArchives global={global}/>} />
          <Route path="/salah" element={ <FirstClevelandPrayerTimes global={global}/>} />
          <Route path="/admin" element={ <Admin global={global}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;