// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// ^ May be required later
import './HowYouCanHelp.css';
import imagePlaceholder from '../../assets/how-you-can-help-card.svg'; 



function HowYouCanHelp() {
  return ( 
    <>
        <h1 style={{textAlign: "center", margin: "45px 0px 45px 0px"}}>How You Can Help</h1>

      <div id="how-you-can-help">
            <div id="images">
                <img src={imagePlaceholder} alt="placeholder" ></img>
                <button className='how-you-can-help-btn-text'><p>Volunteer With Us</p></button>
            </div>
            <div id="images">
                <img src={imagePlaceholder} alt="placeholder" ></img>
                <button className='how-you-can-help-btn-text'><p>Make A Donation</p></button>
            </div>
            <div id="images">
                <img src={imagePlaceholder} alt="placeholder"></img>
                <button className='how-you-can-help-btn-text'><p>Follow Our Blog</p></button>

            </div>

        </div>

    </>
  )
}

export default HowYouCanHelp