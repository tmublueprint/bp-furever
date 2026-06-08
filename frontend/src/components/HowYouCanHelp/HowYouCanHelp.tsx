// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// ^ May be required later
import './HowYouCanHelp.css';
import imagePlaceholder from '../../assets/HowYouCanHelp/how-you-can-help-card.svg'; 



function HowYouCanHelp() {
  return ( 
    <>
        <h2 id="how-you-can-help-title" style={{textAlign: "center", margin: "auto", padding: "50px"}}>How You Can Help</h2>

        <div id="how-you-can-help">
            <div className="images">
                <img src={imagePlaceholder} alt="placeholder" aria-hidden = "true"></img>
                <button className='how-you-can-help-btn-text'><p>Volunteer With Us</p></button>
            </div>
            <div className="images">
                <img src={imagePlaceholder} alt="placeholder" aria-hidden = "true" ></img>
                <button className='how-you-can-help-btn-text'><p>Learn More</p></button>
            </div>
            <div className="images">
                <img src={imagePlaceholder} alt="placeholder" aria-hidden = "true"></img>
                <button className='how-you-can-help-btn-text'><p>Follow Our Facebook</p></button>

            </div>

        </div>

    </>
  )
}

export default HowYouCanHelp