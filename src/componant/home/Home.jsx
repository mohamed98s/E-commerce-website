import React from 'react'
import { getData, useProduct } from '../../useProduct';
import Loading from '../Loading';
import Product from '../products/Product';
import MainSlider from '../Slider/MainSlider';
import CatSlider from '../Slider/CatSlider';
import Products from '../products/Products';


export default function Home() {

  let { data, isFetching, isLoading, error, isError } = useProduct(
    "product",
    getData
  );

  // console.log(data?.data?.data);

  if (isLoading) return <Loading></Loading>;
  if (isError) return <h>{error.message}</h>;

  return (
    <div className="container my-5 py-5">
      <MainSlider></MainSlider>
      <CatSlider></CatSlider>
      {/* <div className="row gy-4">
        {data?.map((prod) => (
          <Product key={prod._id} prod={prod}></Product>
        ))}
      </div> */}
      <Products></Products>
    </div>
  );
}
