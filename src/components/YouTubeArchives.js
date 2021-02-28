import React from 'react'
import {Jumbotron, Table} from 'reactstrap'
import Papa from 'papaparse'

const YouTubeArchives = () => {
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
        <Jumbotron className="jumbotron bg-dark-mode">
            <h1 className='text-center p-4 display-4 mbr-white mbr-bold align-center'>FCM's YouTube Archive</h1>
            <h4  className="m-5 p-4 mbr-white mbr-semibold align-left">Since our first video in 2013, the First Cleveland Mosque has served thousands of viewers worldwide with the message of Islam. Please help us grow by visiting, liking, and subscribing to our YouTube channel. Updated every Saturday morning. </h4>
      
            <Table borderless hover dark size="lg">
                <thead className="table-bordered">
                    <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Number of Views</th>
                    <th>Streamed</th>
                    </tr>
                </thead>
                <tbody className="table-bordered">
                    {rows?.data.map(row => {
                        return <>
                            <tr style={{fontSize:"20px"}}>
                                <td>{row.id}</td>
                                <td><a style={{color: 'white'}} href={row.url} target="_blank">{row.title}</a></td>
                                <td>{row.views}</td>
                                <td>{row.videoAge}</td>
                            </tr>
                        </>
                    })}
                </tbody>
            </Table>     
        </Jumbotron>
        

        </article>
    )
}

export default YouTubeArchives
