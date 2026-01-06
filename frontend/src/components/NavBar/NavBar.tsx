// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// ^ May be required later
import fureverLogo from '../../assets/fureverLogo.svg'; 
import './NavBar.css';

function NavBar() {
  return (
    <>
      <div id="navbar">
        <img src={fureverLogo} alt="furever-logo" style={{width: "85px", height: "90px", paddingLeft: "80px"}}/>
        <a href="" target="_self">Home</a>
        <a href="" target="_self">Services</a>
        <a href="" target="_self">Education</a>
        <a href="" target="_self">Volunteer</a>
        <a href="" target="_self">About Us</a>
        <a href="" target="_self">Donation</a>
        <a href="" target="_self">Contact Us</a>
      </div>

    </>
  )
}

export default NavBar
