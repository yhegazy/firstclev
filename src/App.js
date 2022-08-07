import {BrowserRouter, Routes, Route} from 'react-router-dom'

//Components
import NavMenu from './components/Navbar'
import AnnoucementPage from './components/AnnoucementPage'
import MainPage from './components/MainPage'
import AboutUs from './components/AboutUs';
import YouTubeArchives from './components/YouTubeArchives'
import FirstClevelandPrayerTimes from './components/PrayerTimes'
import Admin from './components/Admin'

import './css/general.css'

function App() {

  return (
    <section>
      <BrowserRouter>
        <NavMenu />   
        <Routes> 
          <Route path="/" element={ <MainPage />} />
          <Route path="/annoucements" element={ <AnnoucementPage />} />
          <Route path="/about" element={ <AboutUs />} />
          <Route path="/archives" element={ <YouTubeArchives />} />
          <Route path="/salah" element={ <FirstClevelandPrayerTimes />} />
          <Route path="/admin" element={ <Admin />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;