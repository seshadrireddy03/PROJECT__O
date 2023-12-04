import React, { useRef,useState } from 'react';
import '../css/login.css'; // Make sure this points to the correct path of your CSS file
import vol from "../assests/d.jpg";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const AdminRegister = () => {
  const emailRef = useRef()
  const passRef = useRef()
  const nameRef = useRef()
  const dobRef = useRef()
  const phoneRef=useRef()
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {data} = await axios.post('http://localhost:4000/api/v1/createfaculty',{
      email:emailRef.current.value,
      password:passRef.current.value,
      username:nameRef.current.value,
      phone:phoneRef.current.value,
      dob : dobRef.current.value
    })
    if(data.success){
      navigate('/FacultyLogin')
    }
  }

  const [isHovered, setIsHovered] = useState(false);

  const linkStyle = {
    color: isHovered ? 'black' : 'white',
    textDecoration: 'none',
    transition: 'color  ease',
  };

  return (
    <>
          <div className='mainbody'>
        <div className="nav">
        <div className="head">
          <h2>Project_O</h2>
        </div>
        <ul>
        <li><Link
        to="/LoginPage"
        className='buttons'
        style={linkStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Home
      </Link></li>
          <li>Service</li>
          <li>Contact Us</li>
          <li>About Us</li>
        </ul>
        </div>
    <div className='body'>
    <div className="container-p">
    <img className='img-p' src={vol} alt="Profile" />
      <div className='div-left'>
      <center><h2>Register</h2></center>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="email" placeholder="Email" ref={emailRef}/>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" ref={passRef}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Name" ref={nameRef}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Phone No." ref={phoneRef}/>
        </div>
        <div className="form-group">
          <input type="date" placeholder="DOB" ref={dobRef}/>
        </div>
          <center>
            <div className="form-group">
              <button type="submit">Register</button>
            </div>
            
            <p>Have an account? <Link to="/FacultyLogin" style={{ color: 'blue' }}>Login</Link></p>
          </center>
        </form>
      </div>
    </div>
    </div>
    </div>
    </>
  );

};

export default AdminRegister;