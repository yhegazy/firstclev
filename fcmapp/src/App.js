import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { listEvents, listFilesPreview, liveStreamOverride, getVideo, getBackgroundImage } from './appwrite/appwriteConfig';

//Components
import Navbar from './components/Navbar'
import Calendar from './components/Calendar'
import Edit from './components/Edit'
import MainPage from './components/Welcome'
import AboutUs from './components/About';
import Contact from './components/Contact'
import YouTubeArchives from './components/Archives'
import SalahTimes from './PrayerCalendar/PrayerTimes'
import Login from './components/Login'
import Galleries from './components/Gallery'


//CSS
import './css/general.css'

function App() {
  const [global, setGlobal] = useState({darkMode:false, loggedIn: false, image: ''})

  const handleLoggedIn = (value) => setGlobal({...global, loggedIn: value})
  useEffect(() => {
    const getMainImage = async() => setGlobal({...global, image: await getBackgroundImage("images", "mainpage")})

    getMainImage();

  },[])

    
  //This is necessary, otherwise some component layouts will overlap the menu.
  const [nav, setNav] = useState(false)
  const handleNavClick = () => setNav(!nav)

  return (
    <div style={{height: '100vh'}} data-theme={'cmyk'}>
      
      <BrowserRouter>
        <Navbar global={global} onLoggedIn={handleLoggedIn} onNavClick={handleNavClick} nav={nav} id="nav" />   
        <Routes> 
          <Route path="/" element={ <MainPage global={global} flag={nav}  onLoggedIn={handleLoggedIn} listEvents={listEvents} liveStreamOverride={liveStreamOverride} getVideo={getVideo} listFilesPreview={listFilesPreview} id="main"/>} />
          
          <Route path="/events" element={ <Calendar global={global} flag={nav}  listEvents={listEvents} onLoggedIn={handleLoggedIn} />} />
          <Route path="/about" element={ <AboutUs />}/>
          <Route path="/contact" element={ <Contact />} />
          <Route path="/archives" element={ <YouTubeArchives global={global}  onLoggedIn={handleLoggedIn}/>} />
          <Route path="/salah" element={ <SalahTimes global={global} />} />
          <Route path="/gallery" element={ <Galleries global={global} flag={nav} listFilesPreview={listFilesPreview}/>} />
          <Route path="/admin" element={ <Login global={global}  onLoggedIn={handleLoggedIn}/>} />
            <Route path="/edit" element={ <Edit global={global}  onLoggedIn={handleLoggedIn}/>} />
           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;