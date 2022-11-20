import React from 'react'
// import {Jumbotron, Table} from 'reactstrap'
import Papa from 'papaparse'

const YouTubeArchives = () => {
    const currentTime = new Date().getHours();
    const [darkMode, setDarkMode] = React.useState(true)
   
    React.useEffect(() => {
        if(currentTime >= 7 && currentTime < 20) {
            setDarkMode(!darkMode)
        }
    },darkMode)


    const [rows, setRows] = React.useState(null);
    React.useEffect(() => {
      Papa.parse("/archives.csv", {
        download: true,
        header: true,
        complete: data => {
          setRows(data);
        }
      });
    }, []);

    return (
        <article>
            <div className={`${darkMode ? "bg-dark-mode mbr-white" : "bg-light-mode"}`}>
   

            <h1 className='text-center p-5 display-4 mbr-bold align-center'>FCM's YouTube Archive</h1>
            <h4 className="pb-5 mbr-semibold align-center">Since our first video in 2013, the First Cleveland Mosque has served thousands of viewers worldwide with the message of Islam. Please help us grow by visiting, liking, and subscribing to our YouTube channel. Updated every Saturday morning. </h4>

            <table borderless hover size="sm" className={`container ${darkMode ? "mbr-white bg-dark-mode" : "bg-light-mode mbr-black"}`} >
          
                <thead className="table-bordered h4">
                    <tr>
                    <th>Title</th>
                    <th>Views</th>
                    <th>Streamed</th>
                    </tr>
                </thead>
                <tbody className="table-bordered h4">
                    {rows?.data.map(row => {
                        return <>
                            <tr>
                                <td><a className={`${darkMode ? 'mbr-white': 'mbr-black'}`} href={row.url} target="_blank">{row.title}</a></td>
                                <td>{row.views}</td>
                                <td>{row.videoAge}</td>
                            </tr>
                        </>
                    })}
                </tbody>
            </table>     
        </div>
        

        </article>
    )
}

export default YouTubeArchives
