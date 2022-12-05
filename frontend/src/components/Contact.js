const Contact = () => {

  return <div className={`w-1/2 ml-auto mr-auto p-5 space-y-2 text-xl`}>
        <h1 className="flex justify-center w-1/2 ml-auto mr-auto text-3xl">Contact</h1>

        <hr />

        <div className='bg-gray-100 flex flex-wrap justify-between'>
            <p>Address</p>
            <p><a href="https://goo.gl/maps/anxPPT6498WTaFE38" target="_blank">Visit Us</a></p>
        </div>

        <div className='bg-gray-100 flex flex-wrap justify-between'>
            <p>Phone</p>
            <p><a  href="tel:216-404-8635">Call Us</a></p>
        </div>

        <div className='bg-gray-100 flex flex-wrap justify-between'>
            <p>Email</p>
            <p><a  href="mailto:1stclevelandmosque@gmail.com">Email Us</a></p>
        </div>  
    </div>
}

export default Contact