import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// require('dotenv').config()

export default function Login(props) {

    let navigate= useNavigate();


    const [credentials, setCredentials]=useState({
        email:"",
        password:""
    });
    


    // three dot ka matlab sepearator ka use kr rhe h 
      // jo bhi name ki value h woh target ke brabar ho jaye 
      const onChange=(e)=>{
        setCredentials({
          ...credentials,[e.target.name]: e.target.value
        })
      }


    const handleSubmit=async (e)=>{
        e.preventDefault();
        const host = "https://i-notebook-server-jbg8.vercel.app";
        // const host = process.env.host;
        const response = await fetch(`${host}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: credentials.email,password: credentials.password}) 
        });
        const json=await response.json();
        console.log(json);
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("Succesfully logged In","success")

        }else{
          props.showAlert("Invalid Details","danger")
        }

    }
  return (
    <div className='mt-3'>
      <h2>Login to continue to iNotebook</h2>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}
