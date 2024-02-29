import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { userContext } from "../../UserContext";
import {
  checkOut,
  clearCart,
  deleteFromCart,
  getCart,
  updateCart,
  useCart,
  useCartCrud,
  useCartDel,
} from "../../useCart";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let { isopen, setIsOpen } = useContext(userContext);
  let { data, isLoading, isError, error } = useCart("getcart", getCart);
  let { mutate, data: removedData } = useCartCrud(deleteFromCart);
  let { mutate: mutateupdate, data: updateData } = useCartCrud(updateCart);
  let { mutate: mutatecheckout, data: checkoutData } = useCartCrud(checkOut);
  let { mutate: mutateclear, data: cleardata } = useCartDel(clearCart);
  let navigate = useNavigate();
  let [details, setDetails] = useState("");
  let [phone, setPhone] = useState("");
  let [city, setCity] = useState("");
  let [x, setX] = useState(true);

  function submitAddress(e) {
    e.preventDefault();
    let shippingAddress = {
      details,
      phone,
      city,
    };

    mutatecheckout({ id: data?.data?.data?._id, shippingAddress });
    if (checkoutData?.data?.status == "success")
      window.location.href = checkoutData?.data?.session?.url;

    console.log("Found Url: ", checkoutData?.data?.session?.url);
  }
  function del() {
    mutateclear();
    navigate("/");
    setX(false);
    
  }
  // console.log(data?.data);
  // console.log(updateData);
  if (isLoading) return <Loading></Loading>;

  // if (isError) return <h2>{error.message}</h2>;

  // if(!isopen) navigate('/')

  // console.log(checkoutData?.data?.session.success_url);
  ////////////
  // console.log(data);
  return (
    <div
      className="p-1 m-40 mx-lg-5"
      // style={
      //   isopen
      //     ? { right: 0, transition: "right 1s" }
      //     : { right: "-100%", transition: "right 1s" }
      // }
    >
      <FontAwesomeIcon
        icon={faClose}
        className="p-3 fa-2x cursor-pointer"
        onClick={() => {
          setIsOpen(false);
          navigate("/");
        }}
      ></FontAwesomeIcon>

      <div className="px-5">

        {x? 
        data ? (
          <>
            <h3 className="text-main">
              Num of Items {data?.data?.numOfCartItems}
            </h3>
            <p>
              Total Cart Price{" "}
              <span className="fw-bolder mx-2">
                {data?.data?.data?.totalCartPrice}
              </span>
            </p>
            {data?.data?.data?.products.map((prod) => (
              <div
                className="row px-3 gy-2 m-auto align-items-center"
                key={prod?.product?._id}
              >
                <div className="col-md-1">
                  <img
                    src={prod?.product?.imageCover}
                    className="w-100"
                    alt=""
                  />
                </div>
                <div className="col-md-10">
                  <p>{prod?.product?.title}</p>
                  <p className="text-main">{prod?.price} EGP</p>
                  <p
                    className="cursor-pointer"
                    onClick={() => mutate(prod?.product?._id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-main"
                    ></FontAwesomeIcon>{" "}
                    Remove
                  </p>
                </div>
                <div className="col-md-1 d-flex align-items-center flex-nowrap">
                  <button
                    className="btn btn-border"
                    onClick={() =>
                      mutateupdate({
                        id: prod?.product?._id,
                        count: prod?.count + 1,
                      })
                    }
                  >
                    +
                  </button>
                  <span className="mx-3">{prod?.count}</span>
                  <button
                    className="btn btn-border"
                    onClick={() =>
                      prod?.count == 1
                        ? mutate(prod?.product?._id)
                        : mutateupdate({
                            id: prod?.product?._id,
                            count:
                              prod?.count > 0 ? prod?.count - 1 : prod?.count,
                          })
                    }
                  >
                    -
                  </button>
                </div>
              </div>
            ))}{" "}
            <div className="d-flex justify-content-center">
              <button
                className="btn checkout m-3 py-2 px-4 fs-5"
                data-bs-toggle="modal"
                data-bs-target="#modalId"
              >
                Check Out
              </button>
              <button
                className="btn clr m-3 py-2 px-4 fs-5"
                onClick={() => del()}
              >
                Clear
              </button>
            </div>
            <div
              className="modal fade"
              id="modalId"
              tabIndex="-1"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              role="dialog"
              aria-labelledby="modalTitleId"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalTitleId">
                      Add Address
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form action="">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="address"
                        onChange={(e) => {
                          setDetails(e.target.value);
                        }}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="phone"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="city"
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                      <button
                        className="btn btn-danger"
                        type="submit"
                        onClick={submitAddress}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-main">Cart is empty</h2>
        )
      :
      <h2 className="text-main">Cart is empty</h2>}
      </div>
    </div>
  );
}
