import './style.css';

import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar'; 
import AdultWildlifePopup from '../../components/adultWildlifePopup/adultWildlifePopup';
import HowFurEverHelps from '../../components/HowFurEverHelps/HowFurEverHelps';
import HowYouCanHelp from '../../components/HowYouCanHelp/HowYouCanHelp';
import Footer from '../../components/Footer/Footer'; 

import safetyIcon from '../../assets/LandingPage/shield-ui-icon.svg'; 
import feedIcon from '../../assets/LandingPage/no-food-icon.svg'; 
import talkingIcon from '../../assets/LandingPage/no-talking-icon.svg'; 
import raccoonLogo from '../../assets/LandingPage/logo.svg'; 
import licenseCheck from '../../assets/LandingPage/license-check.svg'; 

import cityOfThomas from '../../assets/LandingPage/city-of-st-thomas.png';
import centralElgin from '../../assets/LandingPage/central-elgin.png';
import southwold from '../../assets/LandingPage/southwold-township.png';
import aylmer from '../../assets/LandingPage/town-of-aylmer.png';

const noticeBoxStyle = {
    backgroundColor: "#5b6c2d26", 
    width: "593px", 
    height: "654px", 
    backgroundImage: `url(${raccoonLogo})`,
    backgroundRepeat: "no-repeat", 
    backgroundPosition: "bottom right"
}



function LandingPage() {
  const [showAdultPopup, setShowAdultPopup] = useState(false);
  const openAdultBtn = useRef<HTMLButtonElement>(null);
  const firstRender = useRef(true); 
  
    useEffect(() => {
        const horizontalCentering = document.getElementById("horizontalCentering-sec"); 
        const locationsSection = document.getElementById("locations-sec");  
        const footer = document.getElementById("footer-sec");
        const howYouCanHelp = document.getElementById("how-you-can-help-sec");
        const navbar = document.getElementById("navbar-sec"); 
        if (showAdultPopup) {
          horizontalCentering?.setAttribute("inert", ""); 
          locationsSection?.setAttribute("inert", ""); 
          footer?.setAttribute("inert", ""); 
          howYouCanHelp?.setAttribute("inert", ""); 
          navbar?.setAttribute("inert", ""); 
          firstRender.current = false; 
        } else {
          horizontalCentering?.removeAttribute("inert"); 
          locationsSection?.removeAttribute("inert"); 
          footer?.removeAttribute("inert"); 
          howYouCanHelp?.removeAttribute("inert"); 
          navbar?.removeAttribute("inert"); 
          if (!firstRender.current)
            openAdultBtn.current?.focus();
        }
    }, [showAdultPopup])


  const handleAdultBtnClick = () => {
    setShowAdultPopup(true);
  };

  const handleCloseAdultPopup = () => {
    setShowAdultPopup(false);
  };

  const navigate = useNavigate();
  const babyBtnClick = () => {
    navigate('/foundAnAnimal');
  };

  return (
    <>
      <div id="background" style={{width: "100%", minHeight: "100vh", backgroundColor: "#ffffff"}}>
      {/** Nav Bar */}
        <div id="navbar-sec">
          <NavBar/>
        </div>
        {/** Hero Component */} 
        <div className="horizontalCentering" id="horizontalCentering-sec">
          <div id="hero-component">
            <div id="services">
              <h1 style={{width: "600px"}} className="titleText">Welcome to<br />Fur-Ever Wild Rehabilitation</h1>
              <p className="headingThree" style={{width: "600px", fontWeight: "300"}}>We rescue and rehabilitate orphaned, injured, sick, and displaced wildlife, 
              aiming to return them to their natural habitat.</p>
              <p className="headingThree" style={{fontWeight: "bold"}}>We are not a removal service.</p>
              <div id="certification-label"> 
                <img src={licenseCheck} alt="licensed check icon"/>
                <p>Trained in wildlife behaviour & management</p>
              </div>
            </div>
            {/** Found Animal Notice Box */}
            <div id="notice-box" style={noticeBoxStyle}>
              <div id="group-top">
                <h2 style={{color: "#778932", fontWeight: "700"}}>FOUND AN ANIMAL IN DISTRESS?</h2>
                <p style={{width: "500px"}}>Choose one to get immediate guidance: </p>
                <div id="container-btn">
                  <button style = {{border: "solid 2px #4C5C41"}} id="adultBtn" onClick={handleAdultBtnClick} ref={openAdultBtn}>
                    <p>Adult</p>
                  </button>
                    <button style = {{border: "solid 2px #A89F5A"}} id="babyBtn" onClick={babyBtnClick}>
                      <p>Baby</p> 
                    </button> 
                </div>
                <p>Things to Keep in Mind -</p>
              </div>
              <div id="group-bottom">
                <div>
                  <img src={safetyIcon} alt="Shield with checkmark"/>
                  <p>Your Safety Is #1</p>
                </div>
                <div>
                  <img src={feedIcon} alt="Crossed out hand feeding an animal"/>
                  <p>Never Feed Any Wild Animal</p>
                </div>
                <div>
                  <img src={talkingIcon} alt="Speech bubble with an X"/>
                  <p>No Talking To The Animal</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/** Service Locations */}
        <div className="locations-section" id="locations-sec">
          <h2>Service Locations</h2>
          <div id="service-locations">
            <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer" aria-hidden = "true">
              <div className="map-container">
                <img alt="Map of City of St. Thomas" src={cityOfThomas}></img>
                <h3>City of St. Thomas</h3>
              </div>
            </a>
            <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer" aria-hidden = "true">
              <div className="map-container">
                <img alt="Map of Central Elgin" src={centralElgin}></img>
                <h3>Central Elgin</h3>
              </div>
            </a>
            <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer" aria-hidden = "true">
              <div className="map-container">
                <img alt="Map of Southwold" src={southwold}></img>
                <h3>Southwold Township</h3>
              </div>
            </a>
            <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer" aria-hidden = "true">
            <div className="map-container">
              <img alt="Map of Aylmer" src={aylmer}></img>
              <h3>Town of Aylmer</h3>
            </div>
            </a>
          </div>
        </div>
        {showAdultPopup && <AdultWildlifePopup visible={showAdultPopup} onClose={handleCloseAdultPopup} />}

        {/* How Fur-Ever Helps */}
        <HowFurEverHelps />

        <div id="how-you-can-help-sec">
          <HowYouCanHelp></HowYouCanHelp>
        </div>
        <div id="footer-sec">
          <Footer></Footer>
        </div>
      </div>

    </>
  )
}

export default LandingPage
