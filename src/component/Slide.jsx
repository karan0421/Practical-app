import React from 'react'
import ImageCarousel from './ImageCarousel'


const Slide = () => {
  const images = [
    "Coffee 1.jpg",
    "Coffee.jpg",
    "Coffee 3.jpg",
    "Coffee 4.jpg",
    "Coffee 3.webp",
    "Coffee 4.webp",
    "Coffee 5.webp",
    "Coffee 6.webp",
    "Coffee 7.webp",
    "Coffee 8.webp",
    

  ]
  return (
<>
<div className="p-5">
<ImageCarousel className=""images={images}/>
</div>


</>  )
}

export default Slide;