import {useEffect, useState} from 'react'
import {storage} from '../appwrite/appwriteConfig'

import Carousel from 'nuka-carousel';

const Galleries = (props) => {
    const {global} = props
    const [gallery, setGallery] = useState({images: []})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async() => {
        setIsLoading(true)
        const getGallery = await storage.listFiles("6377974dd959ac782a05")
        setGallery({...gallery, images: getGallery.files})
        setIsLoading(false)
    },[])

    return <>
        <div className={`w-3/4 ml-auto mr-auto text-2xl p-5 space-y-2  ${global.darkMode && 'bg-gray-700 text-white'}`}>
            <h1 className="flex justify-center w-1/2 ml-auto mr-auto text-3xl">Gallery</h1>
           
                {isLoading ? <p>Loading...</p>
                : <Carousel wrapAround={true} slidesToShow={2} cellSpacing={5}>
                      {gallery.images.map((item) =>  <img src={storage.getFilePreview("6377974dd959ac782a05", item.$id)}/> )}
                </Carousel>}
            
        </div>
    </>
}

export default Galleries