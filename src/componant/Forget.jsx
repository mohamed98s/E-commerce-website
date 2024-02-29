import React, { useContext, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { userContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { Bars } from "react-loader-spinner";
import { useMutation } from "react-query";

export default function Forget() {
  let { setUser, setLogin } = useContext(userContext);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");

  async function getCode(value) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        value
      );
      console.log(data);
      if (data.statusMsg === "success") {
        console.log('hi');

        // setUser(data.token);
        // setLogin(data.user.name);

        navigate("/code");
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
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    // validate,
    validationSchema,
    onSubmit: getCode,
  });
  // console.log(data);

  return (
    <div className="container m-40">
      <h2>please enter your email</h2>
      <form onSubmit={formik.handleSubmit}>
      {msg ? <p className="alert alert-danger">{msg}</p> : ""}
      <Form.Floating className="mb-3">
        <Form.Control
          id="email"
          type="email"
          placeholder="name@example.com"
          value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        />
        <label htmlFor="email">Email address</label>
      </Form.Floating>
        
        {formik.errors.email && formik.touched.email ? (
          <p className="alert alert-danger">{formik.errors.email}</p>
        ) : (
          ""
        )}
        <button className="btn btn-lg btn-outline-success me-auto bun">
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
            "Varify"
          )}
        </button>
      </form>
    </div>
  );
}
