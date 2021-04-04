import React from 'react'
import {Jumbotron} from 'reactstrap';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import {annoucements} from './Annoucement'

function AnnoucementPage() {

    const currentTime = new Date().getHours();
    const [darkMode, setDarkMode] = React.useState(true)
    const [annoucement] = React.useState(annoucements)

    React.useEffect(() => {
        if(currentTime >= 7 && currentTime < 20) {
            setDarkMode(!darkMode)
        }
    },darkMode)


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
                    <p><a href={item.email}>{item.email}</a>
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
