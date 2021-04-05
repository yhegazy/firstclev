import React from 'react'
import {Jumbotron, Table} from 'reactstrap'
import dpt from '../data/dailyPrayerTimes.json'

const PrayerTimes = () => {   

    const currentTime = new Date().getHours();
    const [darkMode, setDarkMode] = React.useState(true)
    
    React.useEffect(() => {
        if(currentTime >= 7 && currentTime < 20 ) {
            setDarkMode(!darkMode)
        }
    },darkMode)

    return (
        <article>
        <Jumbotron className={`${darkMode ? "bg-dark-mode " : "bg-light-mode"} why`}>

            <h1 className={`text-center p-4 display-4 mbr-bold ${darkMode ? "mbr-white" : "mbr-black" } align-center`}>Prayer Times Updated Daily</h1>   
            
            <h4 className={`m-5 p-4 ${darkMode ? "mbr-white" : "mbr-black" } mbr-semibold text-center text-uppercase`}>
                {dpt.rows[0].split("/\r?\n/").map((item) => item.split("\n")[1].split(" ")[1])}, {dpt.header[0].split("/\r?\n/").map((item) => item.split("\n")[0])} {dpt.rows[0].split("/\r?\n/").map((item) => item.split("\n")[1].split(" ")[0])}
                <br/>
                {dpt.hijra[0]} {dpt.rows[0].split("/\r?\n/").map((item) => item.split("\n")[2].split(" ")[0])}
            </h4>
            <h5 className={`${darkMode ? "mbr-white" : "mbr-black" } mbr-semibold text-center text-uppercase`}>
                
            </h5>
            
            <Table borderless hover size="sm" className={`container ${darkMode ? "mbr-white bg-dark-mode" : "mbr-black"}`} >
                <thead>
                    <tr>
                        <th className="text-center display-4">Qiyam</th>
                        {dpt.rows[0].split("/\r?\n/").map((item) =>  <td className="text-center display-4">{item.split("\n")[10]}</td>)}                 
                    </tr>
                    <tr>
                        <th className="text-center display-4">Fajr</th>
                        {dpt.rows[0].split("/\r?\n/").map((item) => <td className="text-center display-4">{item.split("\n")[4]}</td>)}
                    </tr><tr>
                    <th className="text-center display-4">Dhuhr</th>
                        {dpt.rows[0].split("/\r?\n/").map((item) =>  <td className="text-center display-4">{item.split("\n")[6]}</td>)}
                    </tr><tr>
                        <th className="text-center display-4">Asr</th>
                        {dpt.rows[0].split("/\r?\n/").map((item) =>  <td className="text-center display-4">{item.split("\n")[7]}</td>)}
                    </tr><tr>
                    <th className="text-center display-4">Maghrib</th>
                        {dpt.rows[0].split("/\r?\n/").map((item) =>  <td className="text-center display-4">{item.split("\n")[8]}</td>)}
                    </tr><tr>
                        <th className="text-center display-4">Isha</th>
                        {dpt.rows[0].split("/\r?\n/").map((item) =>  <td className="text-center display-4">{item.split("\n")[9]}</td>)}                 
                    </tr>
                </thead>
                
            </Table>     
        </Jumbotron>
        </article>
    )
}

export default PrayerTimes
