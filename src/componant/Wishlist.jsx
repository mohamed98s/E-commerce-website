import React, { useEffect } from "react";
import { deleteFromWish, getWish, useWish, useWishCrud } from "../useWish";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { addToCart, useCartCrud } from "../useCart";
import Loading from "./Loading";

export default function Wishlist() {
  let { data, error, isError, isLoading, isFetching } = useWish("getwish", getWish);
  let { mutate } = useCartCrud(addToCart);
  let { mutate: mutateRemove} = useWishCrud(deleteFromWish)
  // console.log(data?.data?.count);


  return (
    <div className="mt-5 m-40">
     <div className={`h-100 w-100 z-3 position-fixed ${!isFetching?'d-none':'d-block'}`}><Loading></Loading></div>
      <div className="container p-5 bg-main-light">
        <h2>My wishlist:</h2>
        <div className="row">
          {data?.data?.data?.map((ele) => (
            <div className="row align-items-center gy-3" key={ele._id}>
              <div className="col-md-2">
                <img src={ele.imageCover} className="w-100" />
              </div>
              <div className="col-md-8">
                <p className="fw-bolder">{ele.title}</p>
                <p className="text-main">{ele.price} EGP</p>
                <p className="text-danger cursor-pointer" onClick={()=>{mutateRemove(ele._id)}}>
                  <FontAwesomeIcon icon={faTrash} /> Remove
                </p>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-border"
                  onClick={() => {
                    mutate(ele._id);
                  }}
                >
                  Add to cart
                </button>
              </div>
              <hr />
            </div>
          ))}
        </div>

        {/* {data?.data?.count ? } */}
      </div>
    </div>
  );
}
