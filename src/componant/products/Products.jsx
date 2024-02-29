import React, { useEffect, useState } from "react";
import Product from "./Product";
import Loading from "../Loading";

import { getData, useProduct } from "../../useProduct";
import { addToWish, getWish, useWish, useWishCrud } from "../../useWish";

export default function Products() {
  let { isFetching: wishadding } = useWishCrud(addToWish);
  let { data: wishes, isFetching } = useWish("getwish", getWish);

  let { data, isLoading, error, isError } = useProduct("product", getData);

  let [searchedArr, setSearchedArr] = useState([]);
  const [x, setX] =useState('')
  function search(e) {
    let searchWord = e.target.value;
    setX(searchWord)
    let newArr = data?.filter((ele) =>
      ele?.title.toLowerCase().trim().includes(searchWord.toLowerCase().trim())
    );
    setSearchedArr(newArr);
    console.log(newArr)
  }
  // useEffect(()=>{
  //   console.log(wishadding);
  // },[wishes])
  // console.log(data?.data?.data);

  // if (isLoading||wishLoading) return <Loading></Loading>;
  if (isError) return <h>{error.message}</h>;

  return (
    <>
      {/* <div
        className={`h-100 w-100 z-3 position-fixed ${
          !isFetching ? "d-none" : "d-block"
        }`}
      >
        <Loading></Loading>
      </div> */}
      <div className="container my-5">
        <input
          type="text"
          placeholder="search...."
          className="form-control my-4"
          onChange={search}/>
        <div className="row gy-4">
          {(searchedArr.length)
            ? 
            
            searchedArr?.map((prod) => (
                <Product key={prod._id} prod={prod}></Product>
              ))
            : 
            x?
            <h1>{`There is no search result for "${x}"`} </h1>
            :
            data?.map((prod) => (
                <Product key={prod._id} prod={prod}></Product>
              ))}
        </div>
      </div>
    </>
  );
}
