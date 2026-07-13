// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// ^ May be required later
import './HowYouCanHelp.css';
import volunteers from "../../assets/HowYouCanHelp/volunteers.jpg";
import facebookSquirrel from "../../assets/HowYouCanHelp/facebookSquirrel.jpg";
import guideExample from "../../assets/HowYouCanHelp/guideExample.jpg";

const handleVolunteerClick = () => {
    window.location.href = "/volunteer";
};

const handleLearnMoreClick = () => {
    window.location.href = "/education";
};

const handleFacebookClick = () => {
    window.open("https://www.facebook.com/FEVRWR/", "_blank");
};

function HowYouCanHelp() {
  return ( 
    <>
    <h2 style={{textAlign: "center", margin: "45px 0px 45px 0px", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center"}} id="how-you-can-help-title">How You Can Help</h2>

        <div id="how-you-can-help">
            <div className="images">
                <div style={{backgroundImage: `url(${volunteers})`, backgroundSize: `cover`}} aria-hidden = "true"></div>
                <button className='how-you-can-help-btn-text' onClick={handleVolunteerClick}><p>Volunteer With Us</p></button>
            </div>
            <div className="images">
                <div style={{backgroundImage: `url(${guideExample})`, backgroundSize: `cover`}} aria-hidden = "true" id="guideExample"></div>
                <button className='how-you-can-help-btn-text' onClick={handleLearnMoreClick}><p>Learn More</p></button>
            </div>
            <div className="images">
                <div style={{backgroundImage: `url(${facebookSquirrel})`, backgroundSize: `cover`}} aria-hidden = "true"></div>
                <button className='how-you-can-help-btn-text' onClick={handleFacebookClick}><p>Follow Our Facebook</p></button>

            </div>

        </div>

    </>
  )
}

export default HowYouCanHelp