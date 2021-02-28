import React, {useState} from 'react'
import {Jumbotron, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'

export default function MainPage() { 
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const embedLink = "https://www.youtube.com/embed/" 
    const videoID = 'TG2poH0QL-g'

    // This is so nasty, I like it. Now we can use the videoID to edit on the fly.
    // How to edit videoID without being a security risk. (authentication?)
    const  videoURL = embedLink + videoID

    
    return <>
    <article>
        
        <Jumbotron className="jumbotron jumbotron-mainPage why" >
            <h1 className='text-center p-4 display-4 mbr-white mbr-bold align-center'>Welcome to The First Cleveland Mosque</h1>
            <h4  className="m-5 p-4 mbr-white mbr-semibold align-center">The mission of the First Cleveland Mosque is to embrace and propagate the fundamental teachings of Islam through service to our community according to the Quran and the Sunnah of Prophet Muhammad (s.a.w.) -Salla Allahu Alaihi Wa Sallam</h4>
            <p className="lead align-center">
                <Button color="success" className="mx-5" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4LH7ELGSGAKYU&source=url" target="_blank">Donate to First Cleveland</Button>
                <Button color="primary" className="mx-1" onClick={toggle} target="_blank">Watch Latest Live Stream (Fridays 1:30p ET)</Button> 
            </p>
            
        </Jumbotron>
        <Modal isOpen={modal} toggle={toggle} size="xl" >
            <ModalHeader toggle={toggle}>Jummah Services Live Stream 1:30p ET</ModalHeader>
             <ModalBody >
                <div style={{ width: 720, height: 480 }}>
                    <ResponsiveEmbed aspectRatio="16by9" >
                        <embed  src={videoURL} allowfullscreen />
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