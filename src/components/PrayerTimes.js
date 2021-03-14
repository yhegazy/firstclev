import React from 'react'
import {Jumbotron, Table} from 'reactstrap'
import dpt from '../data_set/dailyPrayerTimes.json'

const PrayerTimes = () => {   

    return (
        <article >
        <Jumbotron className="bg-dark-mode why">
            <h1 className='text-center p-4 display-4 mbr-white mbr-bold align-center'>Prayer Times Updated Daily</h1>
            <h4 className="m-5 p-4 mbr-white mbr-semibold text-center text-capitalize">
                {dpt.rows[0].split("/\r?\n/").map((item) => item.split("\n")[1].split(" ")[1])}day, {dpt.header[0].split("/\r?\n/").map((item) => item.split("\n")[0])} {dpt.rows[0].split("/\r?\n/").map((item) => item.split("\n")[1].split(" ")[0])}
            </h4>
            <Table borderless hover dark size="sm" className="container">
                <thead>
                    <tr>
                        {dpt.header[0].split("/\r?\n/").map((item) => <th className="text-center display-4">{item.split("\n")[3]}</th>)}
                        {dpt.rows[0].split("/\r?\n/").map((item) => <td className="text-center display-4">{item.split("\n")[4]}</td>)}
                    </tr><tr>
                        {dpt.header[0].split("/\r?\n/").map((item) => <th className="text-center display-4">{item.split("\n")[5]}</th>)}
                        {dpt.rows[0].split("/\r?\n/").map((item) =>  <td className="text-center display-4">{item.split("\n")[6]}</td>)}
                    </tr><tr>
                        {dpt.header[0].split("/\r?\n/").map((item) => <th className="text-center display-4">{item.split("\n")[6]}</th>)}
                        {dpt.rows[0].split("/\r?\n/").map((item) =>  <td className="text-center display-4">{item.split("\n")[7]}</td>)}
                    </tr><tr>
                        {dpt.header[0].split("/\r?\n/").map((item) => <th className="text-center display-4">{item.split("\n")[7]}</th>)}
                        {dpt.rows[0].split("/\r?\n/").map((item) =>  <td className="text-center display-4">{item.split("\n")[8]}</td>)}
                    </tr><tr>
                        {dpt.header[0].split("/\r?\n/").map((item) => <th className="text-center display-4">{item.split("\n")[8]}</th>)}   
                        {dpt.rows[0].split("/\r?\n/").map((item) =>  <td className="text-center display-4">{item.split("\n")[9]}</td>)}                 
                    </tr>
                </thead>
                
            </Table>     
        </Jumbotron>
        </article>
    )
}

export default PrayerTimes
