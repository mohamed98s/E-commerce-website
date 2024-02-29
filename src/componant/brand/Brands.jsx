import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useQuery } from "react-query";
import Loading from "../Loading";

export default function Brands() {
  // let [idB, setIdB] = useState("");

  const idb = useRef("");
  function changeRef(x) {
    idb.current = x;
  }

  async function getBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isLoading, isError } = useQuery("brands", getBrands, {
    select: (data) => data?.data?.data,
  });
  async function getBrand(y) {
    // console.log(y);

    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${y}`
    );
  }

  // const [enabled, setEnabled] = useState(false);
  let {
    data: bran,
    refetch,
    isLoading: isloadingbran,
  } = useQuery("getbrand", () => getBrand(idb.current), {
    select: (bran) => bran?.data?.data,
    // enabled: true,
  });

  // console.log(bran);

  if (isError) return <Loading></Loading>;
  if (isLoading || isloadingbran) return <Loading></Loading>;

  return (
    <div className="container m-40">
      <h2 className="text-success fw-bolder text-center">All Brands</h2>

      <div className="row g-4">
        {data?.map((prod, i) => (
          <>
            {
              <div
                className="modal fade"
                id="modalId"
                tabIndex="-1"
                data-bs-keyboard="false"
                role="dialog"
                aria-labelledby="modalTitleId"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document" key={prod?._id}>
                  <div className="modal-content ">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body d-flex justify-content-between">
                      <div className=" d-flex flex-column justify-content-center">
                        <h1 className="text-success fw-bolder">{bran?.name}</h1>
                        <p>{bran?.name}</p>
                      </div>
                      <img src={bran?.image} alt="" />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
         
            }

            <div className="col-md-3" key={i}>
              <div
                className="card"
                onClick={() => {
                  changeRef(prod._id);
                  refetch();
                }}
                data-bs-toggle="modal"
                data-bs-target="#modalId"
              >
                <div className="item card-img">
                  <img src={prod?.image} className="w-100 img-fluid" alt="" />
                </div>
                <div className="card-body">
                  <p className="text-center">{prod?.name}</p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
