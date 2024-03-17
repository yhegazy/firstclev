import {useEffect, useState} from 'react'
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Galleries = (props) => {
    const {flag, listFilesPreview} = props
    const [gallery, setGallery] = useState({images: []})
    const [isLoading, setIsLoading] = useState(false)
    const [index, setIndex] = useState(-1);

    const images = []
    useEffect(() => {
        const getGallery = async() => {
            setIsLoading(true)
            setGallery({...gallery, images: await listFilesPreview("images").then(item => item)})
            setIsLoading(false)
        }
        getGallery()
    },[])

    //set gallery so lightbox and react grid gallery can read it.
    gallery.images.map((item) => images.push({src: item}))
   
    const handleClick = (index) => setIndex((index))
    
    return <>
        <div className='w-full flex flex-col items-center '>
            <div className="pb-8">
                <p className="text-4xl font-semibold inline border-b-4 border-lime-600"> Gallery</p>
            </div>
            <div className="w-full ml-auto mr-auto text-2xl p-5 space-y-2 sm:pt-0 ">
                {isLoading ? <p>Loading...</p>
                : !flag && [
                    <Gallery images={images} onClick={(e) => handleClick(e)} enableImageSelection={false}/>,
                    <Lightbox slides={images} open={index >= 0} index={index} close={() => setIndex(-1)}/>
                ]}
            </div> 
        </div>
    </>
}

export default Galleries
