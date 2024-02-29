import React from 'react'
import Slider from "react-slick";
import slid1 from '../../assets/slider-image-1.jpeg'
import slid2 from '../../assets/slider-image-2.jpeg'
import slid3 from '../../assets/slider-image-3.jpeg'
import blog1 from '../../assets/blog-img-1.jpeg'
import blog2 from '../../assets/blog-img-2.jpeg'

export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnDotsHover: true
      };


  return (
    <header className='container p-0'>
        <div className='row gx-0'>
            <div className='col-md-9'>
                <Slider {...settings}>
                    <img src={slid1} height={400} className='w-100' alt="" />
                    <img src={slid2} height={400} className='w-100' alt="" />
                    <img src={slid3} height={400} className='w-100' alt="" />
                </Slider>
            </div>
            <div className='col-md-3'>
                <img src={blog1} height={200} className='w-100' alt="" />
                <img src={blog2} height={200} className='w-100' alt="" />
            </div>
        </div>
    </header>
  )
}
