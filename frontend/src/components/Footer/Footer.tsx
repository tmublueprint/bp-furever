// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// ^ May be required later
import './Footer.css';
import facebookIcon from '../../assets/facebook-icon.svg'; 


function Footer() {
  return (
    <>
      <div id="footer">
        <h1>We Are Not An Emergency Drop-off Location.</h1>
        <h3>Please Consult Our Guide Before Contacting Us.</h3>
        <div id="small-footer">
            <img src={facebookIcon} alt="facebook-icon" style={{}}></img>
            <p>Facebook</p>
            <p>│</p>
            <p>Fur-ever Wild Rehabilitation</p>
        </div>
      </div>

    </>
  )
}

export default Footer
