import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// require('dotenv').config()

export default function Signup(props) {


  let navigate= useNavigate();


  const [credentials, setCredentials]=useState({
      name:"",
      email:"",
      password:"",
      cpassword:""
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
      const {name,email,password,cpassword}=credentials;
      console.log(name,email)
      if(cpassword===password){
        const host = "https://i-notebook-server-jbg8.vercel.app";
        // const host = process.env.host;
      const response = await fetch(`${host}/api/auth/createuser`,{
       
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: credentials.name,email: credentials.email,password: credentials.password}) 
      });
      const json=await response.json();
      console.log(json);
      if(json.success){
          localStorage.setItem('token',json.authtoken);
          navigate("/");
          props.showAlert("Successfully created your account","success")
      }else{
        props.showAlert("Invalid credentails","danger")
      }
    }else{
      props.showAlert("Password did not match","danger")
    }

  }




  return (
    <div className='container mt-3'>
      <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} name="name" />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name="email" />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={onChange} name="password" required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" required minLength={5}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
