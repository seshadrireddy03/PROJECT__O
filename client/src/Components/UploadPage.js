import React, { useEffect, useRef, useState } from "react";
import "../css/upload.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Patient = () => {
  const navigate = useNavigate()
  const fileInput = document.getElementById('file')
  const file = fileInput?.files[0];
  
  const nameRef = useRef()
  const descRef = useRef()
  const locationRef = useRef()
  const phoneRef = useRef()
  const gitRef=useRef()
  const [user, setuser] = useState()

  const handleSubmit = async (e) => {
    console.log(file);
    e.preventDefault()
    console.log(nameRef.current.value);
    const formData = new FormData()

    formData.append('name', nameRef.current.value);
    formData.append('location', locationRef.current.value);
    formData.append('description', descRef.current.value);
    formData.append('phoneno', phoneRef.current.value);
    formData.append('git', gitRef.current.value);
    formData.append('file', file);

    try {
      const { data } = await axios.post(
        'http://3.110.108.103:4000/api/v1/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': localStorage.getItem('token')
          }
        }
      );

      console.log(data);
      locationRef.current.value = "";
      descRef.current.value = "";
      phoneRef.current.value = "";
      alert("Submitted!!!");
    } catch (error) {
      console.error("Error occurred while uploading:", error);
      // Handle error scenarios
    }
  };
  
  const getuser = async()=>{
    const config = {
      headers:{
        "auth-token":localStorage.getItem('token')
      }
    }
    const {data} = await axios.post('http://3.110.108.103:4000/api/v1/getstudent','',config)
    setuser(data)
    console.log("fgfg")
  }
  console.log(user);
  useEffect(() => {
    return () => {
      localStorage.getItem('token')&&getuser()
    }
  },[])
  
  
  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className="body-p">
      <div className="top">
      <h1>Hello {user?.username}!!! </h1>
        <button className="btn-main" onClick={handleLogout}>Logout</button>
      </div>
      <div className="form">
      <div className="formdiv">
        <form id="uploadForm" onSubmit={handleSubmit} className="center-form">
          <div className="form-group">
            <input type="text" id="name" placeholder="Name" name="name" defaultValue={user?.username} required ref={nameRef}/>
          </div>
          <div className="form-group">
            <input type="text" id="phoneno" placeholder="Phone no." name="phoneno" required ref={phoneRef} />
          </div>
          <div className="form-group">
            <textarea
              id="description"
              placeholder="Abstract"
              rows="5"
              name="description"
              required
              ref={descRef}
            ></textarea>
          </div>
          <div className="form-group">
            <input type="text" id="git" placeholder="Github link" name="git" required ref={gitRef} />
          </div>
          <div className="form-group">
            <label htmlFor="file" >Report:</label>
            <input type="file" id="file" accept=".pdf" required/>
          </div>
          <div className="form-group">
          <select id="location" name="location" required ref={locationRef}>
            <option value="" disabled>
              Select 
            </option>
            <option value="Hyderabad">Full Stack</option>
            <option value="Delhi">Cyber Security</option>
            <option value="Chennai">Machine Learning</option>
            <option value="Banglore">Artificial intelligance</option>
          </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Upload"/>
          </div>
        </form>
      </div>    
    </div>
    </div>
  );
};

export default Patient;

