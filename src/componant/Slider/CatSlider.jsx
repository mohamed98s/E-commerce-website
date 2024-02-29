import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function CatSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1
      };

      function getCatImg()
      {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      }

      let {data} =useQuery('cat', getCatImg, {
        select:(data)=>data?.data?.data
      })
    //   console.log(data);


  return (
    <div className='row my-4'>
        <Slider {...settings}>
            {data?.map((ele)=><img key={ele._id} src={ele.image} className='w-100' height={200} alt=''/>)}
        </Slider>
    </div>
  )
}
