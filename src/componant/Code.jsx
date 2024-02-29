import axios from 'axios';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function Code() {

const [code, setCode] = useState('')
let [loading, setLoading] = useState(false);
let [msg, setMsg] = useState("");
const navigate = useNavigate();


function reCode(e)
{
    e.preventDefault()
    setCode(e.target.value)
    console.log(code);
    mutate(code)
}

    function usePass(fn){
        return useMutation(fn, {
            onSuccess: (data) => {
                console.log(data);
                setMsg('')
              toast.success(data?.data?.status);
                navigate('/reset-password')
            },
            onError: (data) => {
                console.log(data);
                setMsg(data?.response.data.message)
              toast.error(data?.response.data.message);
            },
            
          });
    }
    function changePass(resetCode){
        return axios.post(
            'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
            { resetCode },
  
          );
    }

    let {mutate} = usePass(changePass)
    // console.log(data);

  return (
    <div className="container m-40">
      <h2>please enter your email</h2>
      <form onSubmit={()=>{
        reCode()
        }}>
      {msg ? <p className="alert alert-danger">{msg}</p> : ""}
      <Form.Floating className="mb-3">
        <Form.Control
          id="email"
          type="text"
          placeholder="name@example.com"
        //   value={formik.values.email}
        onChange={(e)=>setCode(e.target.value)}
            // onChange={reCode}
            // onBlur={reCode}
        />
        <label htmlFor="email">Email address</label>
      </Form.Floating>
        
      
        <button className="btn btn-lg btn-outline-success me-auto bun" type='submit' onClick={reCode}>
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
  )
}
