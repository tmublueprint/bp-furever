// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// ^ May be required later
import './HowYouCanHelp.css';
import imagePlaceholder from '../../assets/HowYouCanHelp/how-you-can-help-card.svg'; 
import volunteers from "../../assets/HowYouCanHelp/volunteers.jpg";



function HowYouCanHelp() {
  return ( 
    <>
    <h2 style={{textAlign: "center", margin: "45px 0px 45px 0px", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center"}} id="how-you-can-help-title">How You Can Help</h2>

        <div id="how-you-can-help">
            <div className="images">
                <div style={{backgroundImage: `url(${volunteers})`, backgroundSize: `cover`}} aria-hidden = "true"></div>
                <button className='how-you-can-help-btn-text'><p>Volunteer With Us</p></button>
            </div>
            <div className="images">
                <div style={{backgroundImage: `url(${imagePlaceholder})`, backgroundSize: `cover`}} aria-hidden = "true" ></div>
                <button className='how-you-can-help-btn-text'><p>Learn More</p></button>
            </div>
            <div className="images">
                <div style={{backgroundImage: `url(${imagePlaceholder})`, backgroundSize: `cover`}} aria-hidden = "true"></div>
                <button className='how-you-can-help-btn-text'><p>Follow Our Facebook</p></button>

            </div>

        </div>

    </>
  )
}

export default HowYouCanHelp