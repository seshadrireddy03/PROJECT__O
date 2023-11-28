import React, { useRef } from 'react';
import '../css/login.css';
import p from "../assests/p.jpg"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentLogin = () => {
  const emailRef = useRef()
  const navigate = useNavigate()
  const passRef = useRef()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {data} = await axios.post('http://localhost:4000/api/v1/studentlogin',{
      email:emailRef.current.value,
      password:passRef.current.value
    })
    console.log(data);
    if(data.success){
      navigate('/StudentPage')
      localStorage.setItem('token',data.authtoken)
    }
    else{
      alert(data.message)
    }
  }
  return (
    <>
    <div className='mainbody'>
    <div className="nav">
        <div className="head">
          <h2>Project_O</h2>
        </div>
        <ul>
          <li>Home</li>
          <li>Service</li>
          <li>Contact Us</li>
          <li>About Us</li>
        </ul>
    </div>
    <div className='body' >
    <div className="container-p">
    <img className='img-p' src={p} alt="Profile" />
      <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Email" ref={emailRef}/>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" ref={passRef}/>
        </div>
        <div className="form-group">
          <button type='submit'>Login</button>
        </div>
        <p>Dont have an account <Link to='/StudentRegister' style={{ color: 'blue' }}>Register</Link></p>
      </form>
      </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default StudentLogin;