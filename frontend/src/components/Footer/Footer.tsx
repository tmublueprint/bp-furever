// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// ^ May be required later
import './Footer.css';
import facebookIcon from '../../assets/Footer/facebook-icon.svg'; 


function Footer() {
  return (
    <>
      <div id="footer">
        <p>We Are Not An Emergency Drop-off Location.</p>
        <p>Please Consult Our Guide Before Contacting Us.</p>
        <div id="small-footer">
            <img src={facebookIcon} alt="facebook-icon" aria-hidden = "true"></img>
            <p>Facebook</p>
            <p>│</p>
            <p>Fur-ever Wild Rehabilitation</p>
        </div>
      </div>

    </>
  )
}

export default Footer
