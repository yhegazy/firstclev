import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {useState} from 'react'

//Components
import NavMenu from './components/Navbar'
import AnnoucementPage from './components/AnnoucementPage'
import MainPage from './components/MainPage'
import AboutUs from './components/AboutUs';
import YouTubeArchives from './components/YouTubeArchives'
import PrayerTimes from './components/PrayerTimes'
import Covid from './components/Covid'
import Admin from './components/Admin'

function App() {

  return (
    <section className="why">
      <BrowserRouter>
        <NavMenu />   

        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/annoucements">
            <AnnoucementPage />
          </Route>
          <Route path="/about">
            <AboutUs />
          </Route> 
          <Route path="/archives">
            <YouTubeArchives />
          </Route>
          <Route path="/salah">
            <PrayerTimes />
          </Route> 
          <Route path="/covid">
            <Covid />
          </Route> 
          <Route path="/admin">
            <Admin />
          </Route> 
        </Switch>
      </BrowserRouter>
    </section>
  );
}

export default App;