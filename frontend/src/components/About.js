const AboutUs = () => {
    return  <div className="w-full h-screen flex flex-col items-center">
        <div name="contact" className="w-full h-screen flex justify-center items-center px-4 pt-8 pb-4">
		<div className="max-w-[1000px] mx-auto p-8 flex flex-col items-center justify-center w-full h-full sm:text-center">
        <div className="flex flex-col max-w-[600px] w-full">
				<div className="pb-8">
					<p className="text-4xl font-semibold inline border-b-4 border-lime-600"> Contact</p>
					<p className="py-4 text-xl font-semibold"> Assalamualaikum! Thank you for reaching out. We'll try to get back to you within 2 to 3 days.</p>
				</div>
				<input className="p-2 bg-gray-300 placeholder:text-black" type="text" placeholder="Name" name="name " />
				<input className="my-4 p-2 bg-gray-300 placeholder:text-black" type="email" placeholder="Email" name="email" />
				<textarea className="p-2 bg-gray-300 placeholder:text-black" rows={5}  placeholder="Message" name="message" />
				<input type="hidden" name="_gotcha" style={{display:'none'}}></input>
				<button className="border-2 hover:bg-lime-500 hover:border-lime-500 px-4 py-3 my-8 font-semibold mx-auto flex item-center">Contact Us</button>
			</div>
    
			
			
        {/* <h1 className="text-center text-3xl pb-5">About the First Cleveland Masjid</h1>
        <hr />

        <p>The First Cleveland Masjid is one of the oldest Muslim institutions in the U.S. Founded in 1937 by Al Hajj Imam Wali Akram, an African American. The First Cleveland Masjid remains a testimony of the powerful attraction that Americans have towards the beliefs and culture of Islam.</p>

        <p> Al Hajj Imam Wali Akram, born Walter Reese Gregg in Caldwell Texas on August 04, 1904 was introduced to Islam in the early 1920s and went on to establish the First Cleveland Masjid in 1937 with the creation of the Muslim 10 Year Plan. The mission of the First Cleveland Masjid was to entertain and educate the Muslim community. Imam Wali Akram continued to spread the Islamic message of peace, love and unity, which made the First Cleveland Masjid the milestone of peace making among the diverse religious groups across greater Cleveland.</p>

        <p>Over the years, the First Cleveland Masjid persevered, demonstrating consistency and growth. In fact, the Masjid was instrumental in the development of several other Islamic Institutions throughout the Greater Cleveland area. Since the genesis of the First Cleveland Masjid, this historic institution resided at the following locations in Cleveland, Ohio before relocating in 1975 to its current edifice at 3613 East 131st Street:
        </p>
        <div className=' text-center'>
            <p>5611 E.55th Street (1937-1939)</p>
            <p>7605 Woodland Avenue (1939-1966)</p>
            <p>12715 Miles Avenue (1966-1969)</p> 
            <p>13405 Union Avenue (1969-1975)</p>
        </div>
        <p> In 1984, the leadership was passed on to Al Hajj Imam Mahmoud A. Akram who served as the Imam of the First Cleveland Masjid until 1989. During his tenure, Imam Mahmoud continued to teach the community the value of unity, harmony and love which has been promulgated by the leadership of The First Cleveland Masjid since its inception.
        </p>

        <p>Imam Abbas Ahmad, the grandson of Imam Wali Akram assumed the leadership of the First Cleveland Masjid in 1989 and is currently leading the congregation of over 200 members. Today, The First Cleveland Masjid actively promotes interfaith dialogue to enhance the understanding of Islam. This celebrated cornerstone continues to encourage a positive image of American Muslims.</p>
        
             */}
    </div>    
    </div>
    </div>
    
}

export default AboutUs
