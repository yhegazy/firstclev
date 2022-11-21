import React from 'react'
import {CardImg, Jumbotron} from 'reactstrap'

const AboutUs = () => {
    const currentTime = new Date().getHours();
    const [darkMode, setDarkMode] = React.useState(true)
   
    React.useEffect(() => {
        if(currentTime >= 7 && currentTime < 20) {
            setDarkMode(!darkMode)
        }
    },darkMode)

    
    return <>
    <article >
        <Jumbotron className={`${darkMode ? "bg-dark-mode mbr-white" : "bg-light-mode"}`}>
        <h1 className='p-5 text-center display-4 mbr-bold align-center'>About Us</h1>    
        {/* <CardImg className="center" src={require('../images/FCMLogo_orig.png').default} alt="fcm logo" /> */}
        
        <h5 className="pb-3">The First Cleveland Mosque is one of the oldest Muslim institutions in the U.S. Founded in 1937 by Al Hajj Imam Wali Akram, an African American. The First Cleveland Mosque remains a testimony of the powerful attraction that Americans have towards the beliefs and culture of Islam.</h5>
                    
        <h5 className="pb-3"> Al Hajj Imam Wali Akram, born Walter Reese Gregg in Caldwell Texas on August 04, 1904 was introduced to Islam in the early 1920s and went on to establish the First Cleveland Mosque in 1937 with the creation of the Muslim 10 Year Plan. The mission of the First Cleveland Mosque was to entertain and educate the Muslim community. Imam Wali Akram continued to spread the Islamic message of peace, love and unity, which made the First Cleveland Mosque the milestone of peace making among the diverse religious groups across greater Cleveland.</h5>
                
        <h5 className="pb-3">Over the years, the First Cleveland Mosque persevered, demonstrating consistency and growth. In fact, the mosque was instrumental in the development of several other Islamic Institutions throughout the Greater Cleveland area. Since the genesis of the First Cleveland Mosque, this historic institution resided at the following locations in Cleveland, Ohio before relocating in 1975 to its current edifice at 3613 East 131st Street:</h5>
        <h5 className="center">
            <ul style={{listStyleType: 'none'}}>
                <li className="pb-2">5611 E.55th Street (1937-1939)</li>
                <li className="pb-2">7605 Woodland Avenue (1939-1966)</li>
                <li className="pb-2">12715 Miles Avenue (1966-1969)</li> 
                <li className="pb-2">13405 Union Avenue (1969-1975)</li>
            </ul>
        </h5>
        <h5 className="pb-3">In 1984, the leadership was passed on to Al Hajj Imam Mahmoud A. Akram who served as the Imam of the First Cleveland Mosque until 1989. During his tenure, Imam Mahmoud continued to teach the community the value of unity, harmony and love which has been promulgated by the leadership of The First Cleveland Mosque since its inception.</h5>
            
        <h5 className="pb-5">Imam Abbas Ahmad, the grandson of Imam Wali Akram assumed the leadership of the First Cleveland Mosque in 1989 and is currently leading the congregation of over 200 members. Today, The First Cleveland Mosque actively promotes interfaith dialogue to enhance the understanding of Islam. This celebrated cornerstone continues to encourage a positive image of American Muslims.</h5>
        <h1 className='p-5 text-center display-4 mbr-bold align-center'>Contact Us</h1>
        <div className="col-12 col-md-6">
                    <h5 className="m-0 align-left mbr-fonts-style display-5">
                        Address:
                    </h5>
                    <p className="mbr-text align-left mbr-fonts-style display-7">
                        <a className={`${darkMode ? "mbr-white" : "mbr-black"}`} href="https://goo.gl/maps/anxPPT6498WTaFE38" target="_blank">
                            3613 East 131st St<br />Cleveland, OH 44120
                        </a>
                    </p>
                    <h5 className="m-0 align-left mbr-fonts-style display-5">
                        Phone:
                    </h5>
                    <p className="mbr-text align-left mbr-fonts-style display-7">
                        <a className={`${darkMode ? "mbr-white" : "mbr-black"}`} href="tel:216-404-8635">(216) 404 8635
                        </a>
                    </p>
                    <h5 className="m-0 align-left mbr-fonts-style display-5">
                        E-mail:
                    </h5>
                    <p className="mbr-text align-left mbr-fonts-style display-7">
                        <a className={`${darkMode ? "mbr-white" : "mbr-black"}`} href="mailto:1stclevelandmosque@gmail.com">1stclevelandmosque@gmail.com
                        </a>
                    </p>
              
           
        </div>        
            
    </Jumbotron>

    
    </article>
    </>     
}

export default AboutUs
