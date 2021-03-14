import React from 'react'
import {Jumbotron, List} from 'reactstrap'

function Covid() {
    return (
        <article>
        <Jumbotron className="bg-dark-mode mbr-white">
        <h1 className='text-center p-5 display-4  mbr-bold align-center'>COVID-19 Guidelines</h1>
        <h4>Follow social distancing norms and <u><strong>pray only on NON-MARKED places</strong></u> maintaining 6 feet separation.</h4>
        <h4>Please bring your <u><strong>own prayer rug</strong></u> and <u><strong>wear a face mask</strong></u> at all times.</h4>
        <h4>Restrooms and Kitchen are closed. <u><strong>Come prepared with wudu.</strong></u></h4>
            <List type="unstyled" className="h5 mbr-semibold">
                <li className="py-4"><u><strong>DO NOT ENTER</strong></u> if any of these are TRUE:
                <ol>
                    <li>Are you currently under Quarantine?</li>
                    <li>Do you have any travel history within or outside of USA in the last 2 weeks?</li>
                    <li>Did you have any contact with COVID-19 patient within the last 2 weeks or visited any highrisk areas?</li>
                    <li>Do you have elevated temperature, cough, sneezing, difficulty breathing, or any flu like symptoms?</li>
                    <li>Are you immunocompromised or have any preexisting conditions</li>
                </ol>
                </li>
            </List>
            <h4>Be prepared to have your temperature checked and interviewed. You may be asked to leave if you exhibit any symptoms or act agitated while on the premises.</h4>
            <h4>Only the <u><strong>first 30 male and 10 female congregants</strong></u> will be allowed in the Mosque for prayers.</h4>
            </Jumbotron>
        </article>
    )
}

export default Covid
