import React, { useEffect, useState } from "react";
import "../css/upload.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Patient = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('Full Stack');
  const [phone, setPhone] = useState('');
  const [git, setGit] = useState('');
  const [sem, setSem] = useState('');

  const [username, setUsername] = useState('');
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(name + " " + username);
      const response = await axios.post('http://localhost:4000/api/v1/upload', {
        pname: name,
        name: username,
        domain: domain,
        description:description,
        phoneno: phone,
        git: git,
        sem: sem,
      });

      console.log(response.data);

      // Clear input fields after successful submission
      setDomain('Full Stack');
      setName('');
      setDescription('');
      setPhone('');
      setGit('');
      setSem('1st Sem');
      
      alert("Submitted!!!");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  const linkStyle = {
    color: isHovered ? 'black' : 'white',
    textDecoration: 'none',
    transition: 'color ease',
  };

  return (
    <div className="body-p">
      <div className="nav">
        <div className="head">
          <h2>Project_O</h2>
        </div>
        <div className="leftnav">
        <ul>
        <Link to="/HistoryPage"className='buttons1'style={linkStyle}onMouseEnter={() => setIsHovered(true)}onMouseLeave={() => setIsHovered(false)}><li>My Projects</li></Link>
          <Link to="/AllRecords"className='buttons1'style={linkStyle}onMouseEnter={() => setIsHovered(true)}onMouseLeave={() => setIsHovered(false)}><li>All Projects</li></Link>
          <Link to="/StudentPage"className='buttons1'style={linkStyle}onMouseEnter={() => setIsHovered(true)}onMouseLeave={() => setIsHovered(false)}><li>Dashboard</li></Link>
          <li className="btn-main" onClick={handleLogout}>Logout</li>
        </ul>
        </div> 
      </div>

      <div className="form">
        <div className="formdiv">
          <form id="uploadForm" onSubmit={handleSubmit} className="center-form" encType="multipart/form-data">
            <div className="form-group">
              <input type="text" id="name" placeholder="Project Name" name="name" required onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <input type="text" id="phoneno" placeholder="Phone no." name="phoneno" required onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <select id="sem" name="sem" required onChange={(e) => setSem(e.target.value)}>
              <option value="" disabled>
              Select 
            </option>
            <option value="1st Sem">1st Sem</option>
            <option value="2nd Sem">2nd Sem</option>
            <option value="3rd Sem">3rd Sem</option>
            <option value="4th Sem">4th Sem</option>
            <option value="5th Sem">5th Sem</option>
            <option value="6th Sem">6th Sem</option>
            <option value="7th Sem">7th Sem</option>
            <option value="8th Sem">8th Sem</option>
              </select>
            </div>
            <div className="form-group">
              <textarea
                id="description"
                placeholder="Abstract"
                rows="5"
                name="description"
                required
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <input type="text" id="git" placeholder="Github link" name="git" required onChange={(e) => setGit(e.target.value)} />
            </div>
            <div className="form-group">
              <select id="domain" name="domain" required onChange={(e) => setDomain(e.target.value)}>
              <option value="" disabled>
              Select 
            </option>
            <option value="Full Stack">Full Stack</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Artificial intelligance">Artificial intelligance</option>
              </select>
            </div>
            <div className="form-group">
              <input type="submit" value="Upload" />
            </div>
          </form>
        </div>    
      </div>
    </div>
  );
  };

export default Patient;

