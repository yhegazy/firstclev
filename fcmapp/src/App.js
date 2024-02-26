import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useEffect, useState} from 'react'

//Components
import Navbar from './components/Navbar'
import Calendar from './components/Calendar'
import Edit from './components/Edit'
import MainPage from './components/Welcome'
import AboutUs from './components/About';
import Contact from './components/Contact'
import YouTubeArchives from './components/Archives'
import FirstClevelandPrayerTimes from './components/PrayerTimes'
import Login from './components/Login'
import Galleries from './components/Gallery'
import Ramadan from './components/pages/Ramadan/Ramadan'

//DB
import { storage } from './appwrite/appwriteConfig'

//CSS
import './css/general.css'

function App() {
  const [global, setGlobal] = useState({darkMode:false, loggedIn: false, image: ''})

  const handleLoggedIn = (value) => setGlobal({...global, loggedIn: value})

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
          <Route path="/" element={ <MainPage global={global} flag={nav}   onLoggedIn={handleLoggedIn}  id="main"/>} />
          <Route path="/events" element={ <Calendar global={global} flag={nav}  onLoggedIn={handleLoggedIn} />} />
          <Route path="/about" element={ <AboutUs />}/>
          <Route path="/contact" element={ <Contact />} />
          <Route path="/archives" element={ <YouTubeArchives global={global}  onLoggedIn={handleLoggedIn}/>} />
          <Route path="/salah" element={ <FirstClevelandPrayerTimes global={global} />} />
          <Route path="/gallery" element={ <Galleries global={global} flag={nav} />} />
          <Route path="/admin" element={ <Login global={global}  onLoggedIn={handleLoggedIn}/>} />
            <Route path="/edit" element={ <Edit global={global}  onLoggedIn={handleLoggedIn}/>} />
          
          <Route path="/ramadan" element={ <Ramadan global={global} />} />
           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;