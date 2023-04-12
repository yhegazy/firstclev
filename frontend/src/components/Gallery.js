import {useEffect, useState} from 'react'
import {storage} from '../appwrite/appwriteConfig'
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Galleries = () => {
    const [gallery, setGallery] = useState({images: []})
    const [isLoading, setIsLoading] = useState(false)
    const [index, setIndex] = useState(-1);

    //Pull gallery from appwrite
    useEffect(async() => {
        setIsLoading(true)
        const getGallery = await storage.listFiles("images")
        setGallery({...gallery, images: getGallery.files})
        setIsLoading(false)
    },[])

    //set gallery so lightbox and react grid gallery can read it.
    const images = []
    gallery.images.map((item) =>  images.push({src: storage.getFilePreview("images", item.$id)}))
   
    const handleClick = (index) => setIndex((index))

    return <>
        <div className="sm:w-3/4 w-full ml-auto mr-auto text-2xl p-5 space-y-2 sm:pt-0 pt-24">
            <h1 className="flex justify-center w-1/2 ml-auto mr-auto text-3xl">Gallery</h1>
           
                {isLoading ? <p>Loading...</p>
                : [
                    <Gallery images={images} onClick={(e) => handleClick(e)} enableImageSelection={false}/>,
                    <Lightbox slides={images} open={index >= 0} index={index} close={() => setIndex(-1)}/>
                ]}
        </div>
    </>
}

export default Galleries