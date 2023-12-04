import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../css/card.css";

const All = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const [selectedSemester, setSelectedSemester] = useState(''); // State for selected semester filter
  const [selectedDomain, setSelectedDomain] = useState(''); // State for selected domain filter
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    // Fetch saved records from the backend
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/getRecords`);
        if (response.data.success) {
          setRecords(response.data.data);
          setFilteredRecords(response.data.data); // Initialize filtered records
        } else {
          setRecords([]);
          setFilteredRecords([]);
          //alert(response.data.message);
        }
      } catch (error) {
        console.error(error);
        ////alert("Failed to fetch donor details. Please try again later.");
      }
    };
      
    fetchRecords();
  }, []);

  useEffect(() => {
    return () => {
      localStorage.getItem('token')
    }
  },[])
  
  const [isHovered, setIsHovered] = useState(false);

  const linkStyle = {
    color: isHovered ? 'black' : 'white',
    textDecoration: 'none',
    transition: 'color  ease',
  };

  const handleSearch = (event) => {
    const userInput = event.target.value.toLowerCase();
    setSearchInput(userInput);
    filterRecords(userInput, selectedSemester, selectedDomain);
  };

  const handleSemesterFilter = (event) => {
    const selectedValue = event.target.value;
    setSelectedSemester(selectedValue);
    filterRecords(searchInput, selectedValue, selectedDomain);
  };

  const handleDomainFilter = (event) => {
    const selectedValue = event.target.value;
    setSelectedDomain(selectedValue);
    filterRecords(searchInput, selectedSemester, selectedValue);
  };

  const filterRecords = (search, semester, domain) => {
    let filtered = records;
    if (search !== '') {
      filtered = filtered.filter(record => record.name.toLowerCase().includes(search));
    }
    if (semester !== '') {
      filtered = filtered.filter(record => record.sem === semester);
    }
    if (domain !== '') {
      filtered = filtered.filter(record => record.domain === domain);
    }
    setFilteredRecords(filtered);
  };

  
  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/')
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

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by Project Name"
          value={searchInput}
          onChange={handleSearch}
        />
        <select value={selectedSemester} onChange={handleSemesterFilter}>
          <option value="">Filter by Semester</option>
          <option value="1st Sem">1st Sem</option>
          <option value="2nd Sem">2nd Sem</option>
          <option value="3rd Sem">3rd Sem</option>
          <option value="4th Sem">4th Sem</option>
          <option value="5th Sem">5th Sem</option>
          <option value="6th Sem">6th Sem</option>
          <option value="7th Sem">7th Sem</option>
          <option value="8th Sem">8th Sem</option>
        </select>
        <select value={selectedDomain} onChange={handleDomainFilter}>
          <option value="">Filter by Domain</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Artificial intelligance">Artificial intelligance</option>
        </select>
      </div>
      
      <div className="records">
      <div className="record-div">
        {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => {
            return (
              <div
                className="card"
                key={record._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  margin: "10px 0",
                }}
              >
                <p>Name: {record.name}</p>
                <p>Name of the project: {record.pname}</p>
                <p>Phone No.: {record.phoneno}</p>
                <p>Semester in which project is submitted: {record.sem}</p>
                <p>description: {record.description}</p>
                <p>Git: <a href={record.git} target="_blank" rel="noopener noreferrer">{record.git}</a></p>
                <p>Domain: {record.domain}</p>
                </div>
                );
            })
          ) : (
            <h6>No Projects</h6>
          )}
      </div>
    </div>
    </div>
  );
};

export default All;
