import React, {useState} from 'react'
import {Jumbotron, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'

export default function MainPage() { 
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const embedLink = "https://www.youtube.com/embed/" 
    const ytLink = "https://youtube.com/watch?v="
    const videoID = 'FSYDDK0Jv7M'

    // TODO: Flask or Django backend for authentication -> Permanent Edit Video page.
    const embedURL = embedLink + videoID
    const videoURL = ytLink + videoID

    
    return <>
    <article>
        
        <Jumbotron className="mobile-tablet-image-position why" >
            <h1 className='text-center p-5 display-4  mbr-white mbr-bold align-center'>Welcome to The First Cleveland Mosque</h1>
            <h4  className="p-5  mbr-semibold  mbr-white align-center">The mission of the First Cleveland Mosque is to embrace and propagate the fundamental teachings of Islam through service to our community according to the Quran and the Sunnah of Prophet Muhammad (s.a.w.) -Salla Allahu Alaihi Wa Sallam</h4>
            <p className="lead align-center">
                <Button color="success" className="mx-3" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4LH7ELGSGAKYU&source=url" target="_blank">Donate to First Cleveland</Button>
                </p><p className="lead align-center">
                <Button color="primary" className="mx-3" onClick={toggle} target="_blank">Watch Latest Live Stream (Fridays 1:30p ET)</Button> 
            </p>
            
        </Jumbotron>
        <Modal isOpen={modal} toggle={toggle} size="xl" >
            <ModalHeader toggle={toggle}>Jummah Services Live Stream 1:30p ET</ModalHeader>
             <ModalBody >
                <div>
                    <ResponsiveEmbed aspectRatio="16by9" >
                        <embed allowfullscreen src={embedURL}/>
                    </ResponsiveEmbed>
                </div>
            </ModalBody>
            <ModalFooter>
            <Button color="link" className="mx-1" href={videoURL}>Watch on YouTube</Button>
            </ModalFooter>
        </Modal>
        
    </article>
    </>
}