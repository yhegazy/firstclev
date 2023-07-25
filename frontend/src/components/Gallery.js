import {useEffect, useState} from 'react'
import {storage} from '../appwrite/appwriteConfig'
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Galleries = (props) => {
    const [gallery, setGallery] = useState({images: []})
    const [isLoading, setIsLoading] = useState(false)
    const [index, setIndex] = useState(-1);


    //Pull gallery from appwrite
    useEffect(() => {
        const getGallery = async() => {
            setIsLoading(true)
            const getGallery = await storage.listFiles("images")
            setGallery({...gallery, images: getGallery.files})
            setIsLoading(false)
        }
        getGallery()

        return () => {console.info("This will be logged on unmount")}
    },[])

    //set gallery so lightbox and react grid gallery can read it.
    const images = []
    gallery.images.map((item) =>  images.push({src: storage.getFilePreview("images", item.$id)}))
   
    const handleClick = (index) => setIndex((index))
    
    return <>
        <div className='w-full flex flex-col items-center '>
            <div className="pb-8">
                <p className="text-4xl font-semibold inline border-b-4 border-lime-600"> Gallery</p>
            </div>
            <div className="w-full ml-auto mr-auto text-2xl p-5 space-y-2 sm:pt-0 ">
                {isLoading ? <p>Loading...</p>
                : !props.flag && [
                    <Gallery images={images} onClick={(e) => handleClick(e)} enableImageSelection={false}/>,
                    <Lightbox slides={images} open={index >= 0} index={index} close={() => setIndex(-1)}/>
                ]}
            </div> 
        </div>
    </>
}

export default Galleries