import React from "react";
import { useParams } from "react-router-dom";
import { getProduct, useProduct } from "../useProduct";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { addToCart, useCartCrud } from "../useCart";
import Slider from "react-slick";

export default function ProductDetails() {
  let {mutate} = useCartCrud(addToCart)

    let { id } = useParams();
  // console.log(id);
  let { data, isError, isLoading, error } = useProduct("productdetails", () =>
    getProduct(id)
  );
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
  };

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>;
  // console.log(data);

  return (
    <div className="container m-40">
      <div className="row align-items-center">
        <div className="col-md-4">
          <Slider {...settings}>
          {data?.images?.map((img)=><img key={img} src={img}/>)}

          </Slider>
          {/* <img src={data?.imageCover} className="w-100" alt="" /> */}
        </div>
        <div className="col-md-8">
          <h3>{data?.title}</h3>
          <p>{data?.description}</p>
          <span className="text-main">{data?.category?.name}</span>
          <div className="box d-flex justify-content-between">
            <span>{data?.price} EGP</span>
            <span>
              {data?.ratingsAverage}
              <FontAwesomeIcon
                icon={faStar}
                className="rating-color"
              ></FontAwesomeIcon>
            </span>
          </div>
          <button className="btn btn-success form-control my-4" onClick={()=>{mutate(data?._id)}}>Add to cart</button>

        </div>
      </div>
    </div>
  );
}
