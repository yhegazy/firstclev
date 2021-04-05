import dpt from '../data/dailyPrayerTimes.json'
import React from 'react'

export default function Utilities () {
    const currentTime = new Date().getHours();
    const [darkMode, setDarkMode] = React.useState(true)
    
    React.useEffect(() => {
        let fajr = dpt.rows[0].split("/\r?\n/").map((item) => item.split("\n")[4].split(":", 1))
        let maghreb = dpt.rows[0].split("/\r?\n/").map((item) => item.split("\n")[8].split(":", 1))
                                                //Maghreb not in 24 HRS
        if(currentTime >= fajr && currentTime < maghreb + 12 ) {
            setDarkMode(!darkMode)
        }
    },darkMode)
}