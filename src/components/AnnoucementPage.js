import React from 'react'
import {Button, Jumbotron} from 'reactstrap';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

//Create json file for annoucements. Populate automatically.

function AnnoucementPage() {
    return <>
    <article >
        
        
    <Jumbotron className="jumbotron bg-dark-mode why" >
        <h1 className='text-center p-4 display-4 mbr-white mbr-bold align-center'>Annoucements Page</h1> 
        <Accordion defaultActiveKey="0">
          {/* Is it possible to edit/create new entries in react? */}
          {/* TODO: Build csv file for cards */}
            <Card> 
                <Accordion.Toggle as={Card.Header} eventKey="0">
                <h3>Seeking Talented Individuals (NEW!!!)</h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body><h5>Assalamualaikum,<br/>
                    The First Cleveland Mosque's web admin is looking for individuals to help propagate the message of Islam through technology. You must be dedicated, have an open mind, and the willingness to learn. Drop us a line at 1stclevelandmosque@gmail.com with a subject line of (to know you're serious): A/V/W IT Department </h5></Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card className=".alice-blue">
                <Accordion.Toggle as={Card.Header} eventKey="1">
                <h3>Cleveland Muslim Volunteer (NEW!!!)</h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body><h5> Cleveland Muslim Volunteers has been formed to serve the elderly, sick, and underprivileged individuals and families during the COVID-19 pandemic in the Greater Cleveland Area.</h5>
                <Button color="primary"  href="https://clevelandmuslimvolunteers.com/" target="_blank">Learn More</Button> 
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        
        </Accordion>
    </Jumbotron>

    {/* <Accordion defaultActiveKey="0">
    <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
      <h3>Seeking Talented Individuals (NEW!!!)</h3>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body><h5>Assalamualaikum,<br/>
        First Cleveland Mosque is looking for dedicated individuals to help propagate the message of Islam through technology. This is a newly formed group headed by the current web administrator. You must be open to learning new technologies, such as, but not limited to, web development, video editing, and live streaming. Drop us a line at 1stclevelandmosque@gmail.com with a subject line of (to know you're serious): A/V/W IT Department </h5></Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card className="annoucement-blue">
    <Accordion.Toggle as={Card.Header} eventKey="1">
    <h3>Cleveland Muslim Volunteer (NEW!!!)</h3>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      <Card.Body><h5> Cleveland Muslim Volunteers has been formed to serve the elderly, sick, and underprivileged individuals and families during the COVID-19 pandemic in the Greater Cleveland Area.</h5>
      <Button color="primary"  href="https://clevelandmuslimvolunteers.com/" target="_blank">Learn More</Button> 
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  
</Accordion> */}
    </article>
    </>
}

export default AnnoucementPage
