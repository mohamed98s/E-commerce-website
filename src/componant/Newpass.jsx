import axios from 'axios';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function Newpass() {

    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
let [loading, setLoading] = useState(false);
let [msg, setMsg] = useState("");
const navigate = useNavigate();

// let token = localStorage.getItem("userToken");

function rePass(e)
{
    e.preventDefault()
    setEmail(e.target.value)
    setNewPassword(e.target.value)
    // console.log(email, newPassword);
    mutate({email, newPassword})

}

    function useRePass(fn){
        return useMutation(fn, {
            onSuccess: (data) => {
                console.log(data);
                setMsg('')
    localStorage.setItem('userToken',data.token)

            //   toast.success(data?.data?.status);
                // navigate('/')
            },
            onError: (data) => {
                console.log(data);
                setMsg(data?.response.data.message)
              toast.error(data?.response.data.message);
            },
            
          });
    }
    function renewPass({email, newPassword}){
        return axios.put(
            'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
            { email ,
             newPassword },
            
          );
    }

    let {mutate, data} = useRePass(renewPass)
console.log(data);

  return (
    <div className="container m-40">
      <h2>please enter your email</h2>
      <form onSubmit={()=>{
        rePass()
        }}>
      {msg ? <p className="alert alert-danger">{msg}</p> : ""}
      <Form.Floating className="mb-3">
        <Form.Control
          id="email"
          type="text"
          placeholder="name@example.com"
        onChange={(e)=>setEmail(e.target.value)}

        />
        <label htmlFor="email">Email Address</label>
      </Form.Floating>

      <Form.Floating className="mb-3">
        <Form.Control
          id="newPassword"
          type="password"
          placeholder="name@example.com"
        onChange={(e)=>setNewPassword(e.target.value)}

        />
        <label htmlFor="newPassword">New Password</label>
      </Form.Floating>
        
      
        <button className="btn btn-lg btn-outline-success me-auto bun" type='submit' onClick={rePass}>
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
