const Contact = () => {
    // const endpoint = "https://getform.io/f/69665be7-b019-4a66-af6b-ef22391f5d35"

    return <div className="w-full flex flex-col items-center">
            <div className="max-w-[1000px] mx-auto p-8 flex flex-col items-center justify-center w-full h-full sm:text-center">
	            <form  method="POST" className="flex flex-col max-w-[600px] w-full">
                    <div className="w-full flex flex-col items-center pb-8">
                        <p className="text-4xl font-semibold inline border-b-4 border-lime-600"> Contact</p>
                    </div>
                    <input className="p-2 bg-gray-300 placeholder:text-black" type="text" placeholder="Name" name="name " />
                    <input className="my-4 p-2 bg-gray-300 placeholder:text-black" type="email" placeholder="Email" name="email" />
                    <textarea className="p-2 bg-gray-300 placeholder:text-black" rows={5}  placeholder="Message" name="message" />
                    <input type="hidden" name="_gotcha" style={{display:'none'}}></input>
                    <button className="border-2 hover:bg-lime-500 hover:border-lime-500 px-4 py-3 my-8 font-semibold mx-auto flex item-center">Contact Us</button>
                </form>

          
        </div>
    </div>
}

export default Contact