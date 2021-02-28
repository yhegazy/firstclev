import React from 'react'
import {Jumbotron, List} from 'reactstrap'

function Covid() {
    return (
        <article>
        <Jumbotron className="jumbotron bg-dark-mode why">
            <h1 className='text-center p-4 display-4 mbr-white mbr-bold align-center'>COVID-19 Guidelines</h1>
            <List type="unstyled" className="m-5 px-4 mbr-white mbr-semibold align-left" style={{fontSize:"20px"}}>
                <li>Follow social distancing norms and <u><strong>pray only on marked places</strong></u> maintaining 6 feet separation.</li>
                <li>Please bring your <u><strong>own prayer rug</strong></u> and <u><strong>wear a face mask</strong></u> at all times.</li>
                <li>Restrooms and Kitchen are closed. <u><strong>Come prepared with wudu.</strong></u></li>
                <li className="py-4"><u><strong>DO NOT ENTER</strong></u> if any of these are TRUE:
                <ol>
                    <li>Are you currently under Quarantine?</li>
                    <li>Do you have any travel history within or outside of USA in the last 2 weeks?</li>
                    <li>Did you have any contact with COVID-19 patient within the last 2 weeks or visited any highrisk areas?</li>
                    <li>Do you have elevated temperature, cough, sneezing, difficulty breathing, or any flu like symptoms?</li>
                    <li>Are you immunocompromised or have any preexisting conditions</li>
                </ol>
                </li>
                <li>You may be asked to leave if you exhibit any symptoms or act agitated while on the premises.</li>
                <li>Only the <u><strong>first 30 male and 10 female congregants</strong></u> will be allowed in the Mosque for prayers.</li>
            </List>
                
            </Jumbotron>
        </article>
    )
}

export default Covid
