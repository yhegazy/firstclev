import {useEffect, useState} from 'react'
import {Jumbotron} from 'reactstrap';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import {annoucements} from './Annoucement'
import useFetch from './hooks/useFetch';

function AnnoucementPage(props) {
    const {global} = props
    const {post} = useFetch("https://firebasestorage.googleapis.com/v0/b/sandbox-ca2f2.appspot.com/o/video.json?alt=media&token=0ab664b9-0e7a-442f-9bb4-ee194b5ff8eb")
    // const [vID, setVID] = useState(null)

    const currentTime = new Date().getHours();
    const [darkMode, setDarkMode] = useState(true)
    const [annoucement] = useState(annoucements)

    


return <>
    <article >
                
    <Jumbotron className={`${darkMode ? "bg-dark-mode" : "bg-light-mode"}`}>
    
    <h1 className={`text-center p-5 display-4 mbr-bold align-center ${darkMode ? "mbr-white" : "mbr-black" }`}>Annoucements Page</h1>   
    
        <Accordion defaultActiveKey="0">
          {annoucement.map((item) => {
              return <>
                <Card  key={item.id}> 
                <Accordion.Toggle as={Card.Header} eventKey={item.id}>
                <h4 className={`mbr-semibold ${darkMode} ? "mbr-white" : "mbr-black"`}>{item.subject} </h4>
                </Accordion.Toggle>
                <Card.Body className="">
                    <h5>{item.greeting}</h5>
                    {item.image ? <img className="align-center" style={{width:'50%'}} src={item.image}></img>  : ""}
                    <p className="p-1">{item.body}</p>
                    {item.hrefURL ? <a href={item.hrefURL}>Visit Us</a>: ""}
                    <p><a href={`mailto:${item.email}`}>{item.email}</a>
                    </p>
                </Card.Body>
            </Card>
              </>
          })}
        
        </Accordion>
    </Jumbotron>
    </article>
    </>
}

export default AnnoucementPage
