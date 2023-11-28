import React, { useEffect, useRef, useState } from "react";
import "../css/mainpage.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const usernameToType = user.username;

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
    color: isHovered ? 'black' : 'white',
    textDecoration: 'none',
    transition: 'color  ease',
  };

  return (
    <div className="body-p">
      <div className="nav">
        <div className="head">
          <h2>Project_O</h2>
        </div>
        <ul>
          <li> <button className="btn-main" onClick={handleLogout}>Logout</button></li> 
        </ul>
      </div>

      <div className="maindiv">
        <div className="typing-effect">
          <div className="top">
            <h1>Hello {username}!!! </h1>
          </div>
          <ul style={{ opacity: listItemsVisible ? 1 : 0 }}>
            <li>
              <Link to="/UploadPage" className='buttons' style={linkStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                Upload new project
              </Link>
            </li>
            <li>
              <Link to="/HistoryPage" className='buttons' style={linkStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                My projects
              </Link>
            </li>
            <li>
              <Link to="/ProjectsPage" className='buttons' style={linkStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                All Projects
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Student;
