import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { listEvents, liveStreamOverride, getGallery, getGalleryPreview, getVideo } from './appwrite/appwriteConfig';

//Components
//TODO: clean this up. There was soneone who had a better way of doing things
//https://stackoverflow.com/questions/70807477/react-import-multiple-components-from-a-folder
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

//DB
import { storage } from './appwrite/appwriteConfig'

//CSS
import './css/general.css'

function App() {
  const [global, setGlobal] = useState({darkMode:false, loggedIn: false, image: ''})

  const handleLoggedIn = (value) => setGlobal({...global, loggedIn: value})

  //TODO: Retrieve DB from backend through fetch.
  useEffect(() => {
    const getMainImage = async () => {
      const mainpage = await storage.getFilePreview("images", "mainpage")
      setGlobal({...global, image: mainpage})
    }

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
          <Route path="/" element={ <MainPage global={global} flag={nav}  onLoggedIn={handleLoggedIn} listEvents={listEvents} liveStreamOverride={liveStreamOverride} getGalleryPreview={getGalleryPreview} getVideo={getVideo}  id="main"/>} />
          <Route path="/events" element={ <Calendar global={global} flag={nav}  listEvents={listEvents} onLoggedIn={handleLoggedIn} />} />
          <Route path="/about" element={ <AboutUs />}/>
          <Route path="/contact" element={ <Contact />} />
          <Route path="/archives" element={ <YouTubeArchives global={global}  onLoggedIn={handleLoggedIn}/>} />
          <Route path="/salah" element={ <SalahTimes global={global} />} />
          <Route path="/gallery" element={ <Galleries global={global} flag={nav} getGallery={getGallery} />} />
          <Route path="/admin" element={ <Login global={global}  onLoggedIn={handleLoggedIn}/>} />
            <Route path="/edit" element={ <Edit global={global}  onLoggedIn={handleLoggedIn}/>} />
           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;