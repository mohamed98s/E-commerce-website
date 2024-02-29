import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../UserContext";

export default function Login() {
  let {setUser, setLogin} = useContext(userContext)
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");


  async function getLogin(value) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        value
      );
      console.log(data);
      if (data.message === "success") {
        setUser(data.token)
        setLogin(data.user.name)
        localStorage.setItem('userToken',data.token)
        localStorage.setItem('userName',data.user.name)
        // console.log(data);
        navigate("/home");
        setMsg("");
        setLoading(false);
      }
    } catch (error) {
      setMsg(error.response.data.message);
      console.log(error.response.data.message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required().email("email not valid"),
    password: Yup.string()
      .required()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password not valid"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate,
    validationSchema,
    onSubmit: getLogin,
  });

  // console.log(formik)

  return (
    <div className="container py-4 m-40">
      <h4>Login:</h4>
      <form className="w-75 mx-auto my-4" onSubmit={formik.handleSubmit}>
        {msg ? <p className="alert alert-danger">{msg}</p> : ""}

        <label htmlFor="email">email:</label>
        <input
          type="email"
          className="form-control mb-3"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className="alert alert-danger">{formik.errors.email}</p>
        ) : (
          ""
        )}

        <label htmlFor="password">password:</label>
        <input
          type="password"
          className="form-control mb-3"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <p className="alert alert-danger">{formik.errors.password}</p>
        ) : (
          ""
        )}

        <div className="d-flex">
          <p className="cursor-pointer" onClick={()=>{navigate('/forget-password')}}>Forgot your password?</p>
          <button
            disabled={!(formik.isValid && formik.dirty)}
            className="btn green-color text-white ms-auto d-block"
            type="submit"
          >
            {loading ? (
              <Bars
                height="22"
                width="65"
                color="#fff"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
