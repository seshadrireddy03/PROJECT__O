import React, { useRef ,useState} from 'react';
import '../css/register.css'; 
import p from "../assests/p.jpg"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentRegister = () => {
  const emailRef = useRef()
  const passRef = useRef()
  const nameRef = useRef()
  const dobRef = useRef()
  const phoneRef = useRef()
  const branchRef = useRef() 
  const sectionRef = useRef() 
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
    const { data } = await axios.post('http://localhost:4000/api/v1/createstudent', {
      username: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      password: passRef.current.value,
      dob: dobRef.current.value,
      branch: branchRef.current.value, 
      section: sectionRef.current.value 
    })
    if (data.success) {
      navigate('/StudentLogin')
    }}
    catch (error) {
      if (error.response && error.response.data && !error.response.data.success) {
        // Check if the error response indicates duplicate username
        if (error.response.data.message === 'Username already exists') {
          alert('Username already exists. Please choose a different username.');
        } else {
          alert('An error occurred during registration.');
        }
      } else {
        alert('An error occurred. Please try again.');
      }
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
          
          <img className='img-p' src={p} alt="Profile" />
          <div className='div-left'>
          <center><h2>Register</h2></center>
          
          <form onSubmit={handleSubmit} class="formd">
            <div className='form-div'>
            <div className='form-mini'>
            <div className="form-group">
              <input type="text" placeholder="Name" ref={nameRef} />
            </div>

            <div className="form-group">
              <input type="email" placeholder="Email" ref={emailRef} />
            </div>

            <div className="form-group">
              <input type="text" placeholder="Phone No." ref={phoneRef} />
            </div>

            <div className="form-group">
              <input type="date" placeholder="DOB" ref={dobRef} />
            </div>
            </div>
            <div className='form-mini'>
            <div className="form-group">
              <input type="text" placeholder="Branch" ref={branchRef} />
            </div>

            <div className="form-group">
              <input type="text" placeholder="Section" ref={sectionRef} />
            </div>

            <div className="form-group">
              <input type="password" placeholder="Password" ref={passRef} />
            </div>
            </div>
            </div>
            <center>
            <div className="form-group">
              <button type="submit">Register</button>
            </div>
            
            <p>Have an account? <Link to="/StudentLogin" style={{ color: 'blue' }}>Login</Link></p>
            </center>
          </form>
          </div>
          
        </div>
        
      </div>
      
      </div>
    </>
  );
};

export default StudentRegister;
