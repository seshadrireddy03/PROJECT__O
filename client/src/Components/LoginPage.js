import React from 'react';
import '../css/main.css'; // Make sure this points to the correct path of your CSS file
import don from "../assests/p.jpg";
import vol from "../assests/d.jpg";

import { Link } from 'react-router-dom';
const LoginPage = () => {
  return (
    <div>
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
      <div className="container">
        <div className="button_text">
          <Link to="/StudentLogin">
            <img className="imge" src={don} alt="Student Login" />
          </Link>
          <div className="button_label">Student</div>
        </div>
        <div className="button_text">
          <Link to="/FacultyLogin">
            <img className="imge" src={vol} alt="Faculty Login" />
          </Link>
          <div className="button_label">Faculty</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;