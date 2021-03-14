import React from 'react'
import {Button, Jumbotron} from 'reactstrap';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

//Create json file for annoucements. Populate automatically.

function AnnoucementPage() {
    return <>
    <article >
        
        
    <Jumbotron className="bg-dark-mode" >
    <h1 className='text-center p-5 display-4 mbr-white mbr-bold align-center'>Annoucements Page</h1> 
        <Accordion defaultActiveKey="0">
          {/* Is it possible to edit/create new entries in react? */}
            <Card> 
                <Accordion.Toggle as={Card.Header} eventKey="0">
                <h4 className="mbr-black mbr-semibold">Seeking Talented Individuals (NEW!!!)</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body><h5>As-Salamu Aalikum, ٱلسَّلَامُ عَلَيْكُمْ‎<br/>
                    The First Cleveland Mosque's devops admin is looking for individuals to help propagate the message of Islam through technology. You must be dedicated, have an open mind, and the willingness to learn. Drop us a line at 1stclevelandmosque@gmail.com with a subject line of (to know you're serious): DevOps Department </h5></Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card className=".alice-blue">
                <Accordion.Toggle as={Card.Header} eventKey="1">
                <h4 className="mbr-black mbr-semibold">Cleveland Muslim Volunteer (NEW!!!)</h4>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body><h5> Cleveland Muslim Volunteers has been formed to serve the elderly, sick, and underprivileged individuals and families during the COVID-19 pandemic in the Greater Cleveland Area.</h5>
                <Button color="primary"  href="https://clevelandmuslimvolunteers.com/" target="_blank">Learn More</Button> 
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        
        </Accordion>
    </Jumbotron>
    </article>
    </>
}

export default AnnoucementPage
