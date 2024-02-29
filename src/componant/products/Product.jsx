import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Loading from '../Loading'
import { Link } from "react-router-dom";
import { addToCart, useCartCrud } from "../../useCart";
import { addToWish, deleteFromWish, getWish, useWish, useWishCrud } from "../../useWish";

export default function Product({ prod }) {
  let [heart, setHeart] = useState(false);
  let { mutate } = useCartCrud(addToCart);
  let {mutate:mutateWish, isLoading:wishLoading} = useWishCrud(addToWish)
  let {data, isLoading} = useWish('getwish',getWish)
  // let {} = useWishCrud(addToWish)

  let { mutate: mutateRemove, isLoading:removeLoading} = useWishCrud(deleteFromWish)

  if(isLoading)
  return <Loading></Loading>

  // console.log(data?.data?.data.some((ele)=>ele._id === prod._id));
  return (
    <>
      <div className="col-md-3">
        <div className="product cursor-pointer">
          <FontAwesomeIcon
            icon={faHeart}
            className="m-3 fs-4 z-3"
            style={(data?.data?.data.some((ele)=>ele._id === prod._id)  )? { color: "green" } : { color: "unset" }}
            onClick={() => {
              (!(data?.data?.data.find((ele)=>ele._id === prod._id))?mutateWish(prod._id):mutateRemove(prod._id))
              // setHeart(!heart);

            }}
          ></FontAwesomeIcon>
          <Link to={`/productDetails/${prod._id}`}>
            <img
              src={prod.imageCover}
              className="w-100"
              alt={prod.title}
            />
          </Link>
          <h2 className="h5 text-main">{prod.category.name}</h2>
          <p>{prod.title}</p>
          <div className="box d-flex justify-content-between">
            <span>{prod.price} EGP</span>
            <span>
              {prod.ratingsAverage}
              <FontAwesomeIcon
                icon={faStar}
                className="rating-color"
              ></FontAwesomeIcon>
            </span>
          </div>
          <button
            className="btn btn-border d-block mx-auto"
            onClick={() => {
              mutate(prod._id);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}
