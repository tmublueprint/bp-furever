// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// ^ May be required later
import './LandingPage.css';
import imagePlaceholder from '../../assets/how-you-can-help-card.svg'; 



function HowYouCanHelp() {
  return (
    <>
        <h1 style={{textAlign: "center", margin: "45px 0px 45px 0px"}}>How You Can Help</h1>

      <div id="how-you-can-help">
            <div id="images">
                <img src={imagePlaceholder} alt="placeholder" ></img>
                <button className='text-on-image'>Volunteer With Us</button>
            </div>
            <div id="images">
                <img src={imagePlaceholder} alt="placeholder" ></img>
                <button className='text-on-image'>Make A Donation</button>
            </div>
            <div id="images">
                <img src={imagePlaceholder} alt="placeholder"></img>
                <button className='text-on-image'>Follow Our Blog</button>

            </div>

        </div>

    </>
  )
}

export default HowYouCanHelp