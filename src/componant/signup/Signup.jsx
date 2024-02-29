import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Bars, InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Signup() {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");

  async function getSignup(value) {
    // let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,value).catch((err)=>console.log(err))
    // console.log(data)

    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        value
      );
      console.log(data);
      if (data.message === "success") {
        console.log(data);
        navigate("/");
        setMsg("");
        setLoading(false);
      }
    } catch (error) {
      setMsg(error.response.data.message);
      console.log(error.response.data.message);
      setLoading(false);
    }
  }

  // function validate(values){
  //   let errors ={}
  //   if(!values.name)
  //     errors.name = 'name is required'
  //   else if(values.name.length <= 2)
  //     errors.name = 'name is too short'

  //   else if(values.name.length > 5)
  //     errors.name = 'name is too long'
  //   if(!values.email)
  //     errors.email= 'email is required'

  //     return errors
  // }

  const validationSchema = Yup.object({
    name: Yup.string().required().min(3, "too short").max(10, "too long"),
    email: Yup.string().required().email("email not valid"),
    password: Yup.string()
      .required()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password not valid"),
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "must match password"),
    phone: Yup.string()
      .required()
      .matches(/^01[0125][0-9]{8}$/, "phone is incorrect"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // validate,
    validationSchema,
    onSubmit: getSignup,
  });

  // console.log(formik)

  return (
    <div className="container py-4 m-40">
      <h4>Register Now:</h4>
      <form className="w-75 mx-auto my-4" onSubmit={formik.handleSubmit}>
        {msg ? <p className="alert alert-danger">{msg}</p> : ""}

        <label htmlFor="name">name:</label>
        <input
          type="text"
          className="form-control mb-3"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name ? (
          <p className="alert alert-danger">{formik.errors.name}</p>
        ) : (
          ""
        )}

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

        <label htmlFor="rePassword">rePassword:</label>
        <input
          type="password"
          className="form-control mb-3"
          id="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <p className="alert alert-danger">{formik.errors.rePassword}</p>
        ) : (
          ""
        )}

        <label htmlFor="phone">phone:</label>
        <input
          type="tel"
          className="form-control mb-3"
          id="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone ? (
          <p className="alert alert-danger">{formik.errors.phone}</p>
        ) : (
          ""
        )}

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
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}
