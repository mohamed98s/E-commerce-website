import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Sub from "./Sub";

export default function Categories() {
  let baseURL = "https://ecommerce.routemisr.com/api/v1";

  function getCat() {
    return axios.get(`${baseURL}/categories`);
  }
  function useCat(key, fn) {
    return useQuery(key, fn, {
      select: (data) => data.data.data,
    });
  }
  let { data, isLoading, error, isError } = useCat("getcat", getCat);
  // console.log(data);

  const idSub = useRef("");
  function changeRef(x) {
    idSub.current = x;
  }
  function getSub() {
    // console.log(
    //   `https://ecommerce.routemisr.com/api/v1/categories/${idSub.current}/subcategories`
    // );

    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${idSub.current}/subcategories`
    );
  }
  function useSub(key, fn) {
    return useQuery(key, fn, {
      select: (data) => data?.data?.data,
      enabled: false,
    });
  }

  let { data: sub, refetch } = useSub("getsub", getSub);
  console.log(sub);

  const [mystyle, setMystyle] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="container  m-40 py-5">
      <div className="row g-4">
        {data?.map((ele) => (
          <div className="col-md-4 text-center" key={ele._id}>
            <div
              className="card"
              onClick={() => {
                changeRef(ele._id);
                setMystyle(ele._id);
                setShow(!show);
                refetch();
              }}
            >
              <div className="card-img">
                <img
                  src={ele.image}
                  className="w-100 img-fluid ratio-4x3"
                  style={{ height: 300 }}
                  alt=""
                />
              </div>
              <div className="card-body">
                <h3 className="text-success fw-bolder ">{ele.name}</h3>
              </div>
            </div>
            <div
              className={`row w-100 position-absolute  start-0 z-1 bg-white ${
                !(mystyle === ele._id && show) ? "h-0" : "h-auto py-3"
              } text-center overflow-hidden`}
            >
              <h2 className="text-success fw-bolder my-3">{ele.name} subcategories</h2>
              {sub?.map((subc) => (
                <div className="col-md-4">
                  <div className="ms-3 card">
                    <h3 className="text-center p-3">{subc.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

{
  /* <Sub idSub={idSub.current}></Sub> */
}
