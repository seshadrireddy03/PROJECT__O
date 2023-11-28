// AdminPage.js
import React, { useEffect, useState } from "react";
import "../css/d.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filteredResults1, setFilteredResults1] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    fetchDonors();
  };
  
  const fetchDonors = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/getdonor/${selectedCity}`);
      
      if (response.data.success) {
        setFilteredResults(response.data.data);
      } else {
        setFilteredResults()
        //alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDonors1 = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/getdonor11/${user.username}`);
      
      if (response.data.success) {
        setFilteredResults1(response.data.data);
      } else {
        setFilteredResults1()
        //alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      ////alert("Failed to fetch donor details. Please try again later.");
    }
  };
  fetchDonors1();
  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
  };

  const getAdmin = async () => {
    const config = {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/getadmin",
      "",
      config
    );
    setUser(data);
  };

  useEffect(() => {
    return () => {
      
      localStorage.getItem('token')&&getAdmin();
    };
  }, []);

  const handleSubmit = async (donorId, dname, dlocation,description, isChecked) => {
    // Prepare data for the comment model
    fetchDonors();
    const commentData = {
      donorid: donorId,
      admin: user.username,
      vphone: user.phone,
      accepted: isChecked // Include checkbox status in the comment data
    };

    
    try {
      console.log(commentData);
      // Send a POST request to store comment in the comment model
      const response = await axios.post("http://localhost:4000/api/v1/uploadcomment", commentData);
  
      if (response.data.success) {
        // Handle successful comment submission, e.g., remove the donor from the list
        // setFilteredResults((prevResults) => prevResults.filter((donor) => donor._id !== donorId));
        
        
        // Clear the comment input field after submission

        //alert(response.data.message);
      } else {
         //alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      //alert("Failed to submit comment. Please try again later.");
    }
  };

  return (
    <>
      
      {/* Header */}
      <div className="header" 
         style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <h1>Hi {user?.username}</h1>
        <button className="log-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      
      {/* City Dropdown */}
      <div className="city-dropdown">
        <label htmlFor="city">Select City:</label>
        <select id="city" onChange={handleCityChange} value={selectedCity}>
          <option value="">Select City</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Delhi">Delhi</option>
          <option value="Chennai">Chennai</option>
          <option value="Bangalore">Bangalore</option>
        </select>
        <button className="fetch-btn" onClick={fetchDonors}>Fetch Donors</button>
      </div>

      {/* Donors List */}
      {filteredResults?.length > 0 ? (
        filteredResults.map((donor) => {
          return (
            <div className="donor-details" key={donor._id} style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div>
                <p>Donor Name: {donor.name}</p>
                <p>Location of Donor: {donor.location}</p>
                <p>Description: {donor.description}</p>
                <p>Phone No. of Donor: {donor.dphoneno}</p>
              </div>
              <div>
                <p>Recepient Name: {donor.name}</p>
                <p>Location of Recepient: {donor.location}</p>
                <p>Phone No. of Recepient: {donor.rphoneno}</p>
              </div>
              <div>
                  <input type="checkbox" id={`accept-${donor._id}`} />
                  <label htmlFor={`accept-${donor._id}`}>Accept this donor</label>
                  <button onClick={() => {
                          handleSubmit(donor._id, donor.name, donor.location, donor.description, document.getElementById(`accept-${donor._id}`).checked);
                          fetchDonors(); // Call fetchDonors after handleSubmit
                  }}>Submit</button>

              </div>   
            </div>
            
            
          );
        })
      ) : (
        <h1>No donors available for the selected city.</h1>
      )}
      <h1>History</h1>
        {filteredResults1?.length > 0 ? (
        filteredResults1.map((donor) => {
          return (
            <div className="donor-details" key={donor._id} style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
                
              <div>
                <p>Donor Name: {donor.name}</p>
                <p>Location of Donor: {donor.location}</p>
                <p>Phone No. of Donor: {donor.dphoneno}</p>
              </div>
              <div>
                <p>Recepient Name: {donor.rname}</p>
                <p>Location of Recepient: {donor.location}</p>
                <p>Phone No. of Recepient: {donor.rphoneno}</p>
              </div>
              <div>
                <p>Description: {donor.description}</p>
              </div>
            </div>
            
            
          );
        })
      ) : (
        <h6>No History in the city</h6>
      )}
    </>
  );
};

export default AdminPage;
