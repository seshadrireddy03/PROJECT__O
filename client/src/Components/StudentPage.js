import React, { createContext, useEffect, useRef, useState } from "react";
import "../css/mainpage.css";
import lap from "../assests/laptop.jpg";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UserContext = createContext();
const Student = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState();
  const [username, setUsername] = useState('');
  const [listItemsVisible, setListItemsVisible] = useState(false);
  const [shouldAnimateUsername, setShouldAnimateUsername] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const config = {
        headers:{
          "auth-token": localStorage.getItem('token')
        }
      };
      const { data } = await axios.post('http://localhost:4000/api/v1/getstudent', '', config);
      setuser(data);
    };

    localStorage.getItem('token') && getUser();
  }, []);

  useEffect(() => {
    if (user && user.username) {
      setShouldAnimateUsername(true);
    }
  }, [user]);

  useEffect(() => {
    if (shouldAnimateUsername) {
      const usernameToType = 'Hello  '+user.username+'  !!!';
      sessionStorage.setItem('username', user.username);
      const typeUsername = async () => {
        for (let i = 0; i <= usernameToType.length; i++) {
          setUsername(usernameToType.slice(0, i));
          await new Promise((resolve) => setTimeout(resolve, 150));
        }
        setTimeout(() => {
          setListItemsVisible(true);
        }, 500);
      };

      typeUsername();
    }
  }, [shouldAnimateUsername, user]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const [isHovered, setIsHovered] = useState(false);

  const linkStyle = {
    color: isHovered ? '#1c2331' : 'white',
  
    textDecoration: 'none',
    transition: 'color  ease',
  };

  return (
    <div className="body-p">
      <div className="nav">
        <div className="head">
          <h2>Project_O</h2>
        </div>
        <div className="leftnav">
        <ul>
          <li className="btn-main" onClick={handleLogout}>Logout</li>
        </ul>
        </div>
      </div>
      <div>
      <div className="lower-body">
        <div className="top">
          
          <img
       /* src="https://cdn.vectorstock.com/i/1000x1000/06/16/cute-boy-kid-saying-hi-with-black-board-vector-38020616.webp"*/ // Replace with the path to your image
       src={lap} 
       alt="Student saying Hi"
        style={{
          width: '400px', // Adjust width and height as needed
          height: '200px', // Makes the image circular
          opacity: '0.8',         
        }}
      />
        <h1 className="hello-text" >{username}</h1>
      </div>
        </div>
        <div className="maindiv">
          <div className="typing-effect">
            <ul style={{ opacity: listItemsVisible ? 1 : 0 }}>
          
            <Link to="/UploadPage" className='buttons' style={linkStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <li><h2>Upload Project</h2></li>
            </Link>
          
            <Link to="/HistoryPage" className='buttons' style={linkStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <li><h2>My Projects</h2></li>
            </Link>
          
            <Link to="/AllRecords" className='buttons' style={linkStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <li><h2>All Projects</h2></li>
            </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
