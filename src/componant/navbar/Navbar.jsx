import React, { useContext, useState } from "react";
import Logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { userContext } from "../../UserContext";
import Cart from "../cart/Cart";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { getCart, useCart } from "../../useCart";

export default function Navbar() {
  let { data } = useCart("getcart", getCart);

  let [padd, setPadd] = useState(true);

  const addPadding = () => {
    if (window.scrollY >= 60) {
      setPadd(false);
    } else {
      setPadd(true);
    }
  };

  window.addEventListener('scroll', addPadding)


  let { user, setUser, setIsOpen, login, setLogin } = useContext(userContext);
  let navigate = useNavigate();

  function Logout() {
    setUser(null);
    localStorage.removeItem("userToken");
    navigate("/");
  }
  // console.log(user)
  return (
    <>
      <nav
        className={
          padd
            ? `navbar navbar-expand-sm navbar-light bg-light fixed-top py-4 navpad `
            : `navbar navbar-expand-sm navbar-light bg-light fixed-top navpad`
        }
      >
        <div className="container">
          <Link className="navbar-brand" to="home">
            <img src={Logo} alt="cart-logo" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {user ? (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="categories">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="brands">
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="products">
                    Products
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 d-flex justify-content-between">
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <FontAwesomeIcon icon={faFacebook} />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>
              </li>
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="signup">
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <span className="nav-link cursor-pointer" onClick={Logout}>
                    Logout
                  </span>
                </li>
              )}
              <li
                data-bs-toggle={!user ? "modal" : ""}
                data-bs-target="#exampleModal"
                className="nav-item position-relative"
                onClick={() => {
                  navigate("/cart");
                  // setIsOpen(true);
                }}
              >
                <Link className="nav-link ms-2" to="cart">
                  <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                </Link>
                <span className="d-flex justify-content-center align-items-center cart position-absolute rounded-circle">
                  {!data?.data?.numOfCartItems ? 0 : data?.data?.numOfCartItems}
                </span>
              </li>
              <li>
                <Link className="nav-link ms-2" to="wishlist">
                  <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                </Link>
              </li>
              {user ? (
                <li className="nav-item profile">
                  <span className="nav-link ms-1 d-flex">
                    <span className="fw-bolder">
                      Hi
                      <br />
                    </span>
                    <span className="mx-1">{login}</span>
                  </span>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog position-fixed top-35 start-50 translate-middle">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body fs-5 fw-bolder pt-0">
              Must be logged in to use the cart
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
