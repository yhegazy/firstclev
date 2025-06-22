import React from 'react'

const Donate = () => {
    return <>
    
        <p><button onClick={() => window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4LH7ELGSGAKYU&source=url')}>Donate by PayPal</button> </p>
    </>
}

export default Donate