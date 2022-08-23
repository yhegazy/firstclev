import React from 'react'

const CEC = (props) => {
    const {global} = props

    return <>
    <div className={`w-3/4 ml-auto mr-auto text-2xl p-5 space-y-2 ${global.darkMode && 'bg-gray-700 text-white'}`}>
            <div className='flex w-11/12 my-5 ml-auto mr-auto space-x-2'>
                {global.darkMode ? <img className="w-1/2 ml-auto mr-auto" src={process.env.PUBLIC_URL + `/images/cec-dark.png`} alt="CEC"/>: <img className="w-1/2 ml-auto mr-auto" src={process.env.PUBLIC_URL + `/images/cec-light.png`} alt="CEC"/>}
                
            </div>
            
            <div className="flex flex-wrap py-10">
                <p  className={`p-3 text-2xl italic font-semibold shadow-md rounded-2xl ${global.darkMode ? 'bg-gray-500' : 'bg-gray-200'}`}>Next meeting will be held at the First Cleveland Mosque (3613 E. 131st Cleveland OH 44120) on August 25th, 2022 at 6p. Join us!</p>
            </div>
        </div>
    </>
}

export default CEC