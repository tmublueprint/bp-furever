import './style.css';
import NavBar from '../../components/NavBar/NavBar'; 
import HowFurEverHelps from '../../components/HowFurEverHelps/HowFurEverHelps';
import HowYouCanHelp from '../../components/HowYouCanHelp/HowYouCanHelp';
import Footer from '../../components/Footer/Footer'; 
import safetyIcon from '../../assets/shield-ui-icon.svg'; 
import feedIcon from '../../assets/no-food-icon.svg'; 
import talkingIcon from '../../assets/no-talking-icon.svg'; 
import raccoonLogo from '../../assets/logo.svg'; 
import licenseCheck from '../../assets/license-check.svg'; 
import AdultWildlifePopup from '../../components/adultWildlifePopup/adultWildlifePopup';
import { useState } from 'react';

import cityOfThomas from '../../assets/city-of-st-thomas.png';
import centralElgin from '../../assets/central-elgin.png';
import southwold from '../../assets/southwold-township.png';
import aylmer from '../../assets/town-of-aylmer.png';

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

  const handleAdultBtnClick = () => {
    setShowAdultPopup(true);
  };

  const handleCloseAdultPopup = () => {
    setShowAdultPopup(false);
  };

  return (
    <>
      <div id="background" style={{width: "100%", minHeight: "100vh", backgroundColor: "#fbfcf5"}}>
      {/** Nav Bar */}
        <NavBar/>
        {/** Hero Component */} 
        <div className="horizontalCentering">
          <div id="hero-component">
            <div id="services">
              <h1 style={{width: "600px"}} className="titleText">Welcome to Fur-Ever Wild Rehabilitation</h1>
              <p className="headingThree" style={{width: "600px"}}>We rescue and rehabilitate orphaned, injured, sick, and displaced wildlife, 
              aiming to return them to their natural habitat.</p>
              <p className="headingThree" style={{fontWeight: "bold"}}>We are not a removal service.</p>
              <div id="certification-label"> 
                <img src={licenseCheck} alt="licensed check icon"/>
                <p>Trained in wildlife behavior, management and conflict.
                   Authorized and Regulated by Ontario's Ministry of Natural
                   Resources & Forestry.
                </p>
              </div>
            </div>
            {/** Found Animal Notice Box */}
            <div id="notice-box" style={noticeBoxStyle}>
              <div id="group-top">
                <h2 style={{color: "#778932"}}>FOUND AN ANIMAL IN DISTRESS?</h2>
                <h3 style={{width: "500px"}}>Choose one to get immediate guidance: </h3>
                <div id="container-btn">
                  <button style = {{border: "solid 2px #4C5C41"}} id="adultBtn" onClick={handleAdultBtnClick}>
                    <p>Adult</p>
                  </button>
                  <button style = {{border: "solid 2px #A89F5A"}} id="babyBtn">
                    <p>Baby</p> 
                  </button> 
                </div>
                <h3>Things to Keep in Mind -</h3>
              </div>
              <div id="group-bottom">
                <img src={safetyIcon} alt="safety icon"/>
                <img src={feedIcon} alt="feed icon"/>
                <img src={talkingIcon} alt="talk icon"/>
              </div>
            </div>
          </div>
        </div>

        {/** Service Locations */}
        <div className="locations-section">
          <h1>Service Locations</h1>
          <div id="service-locations">
            <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer">
              <div className="map-container">
                <img alt="Map of City of St. Thomas" src={cityOfThomas}></img>
                <h4>City of St. Thomas</h4>
              </div>
            </a>
            <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer">
              <div className="map-container">
                <img alt="Map of Central Elgin" src={centralElgin}></img>
                <h4>Central Elgin</h4>
              </div>
            </a>
            <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer">
              <div className="map-container">
                <img alt="Map of Southwold" src={southwold}></img>
                <h4>Southwold Township</h4>
              </div>
            </a>
            <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer">
            <div className="map-container">
              <img alt="Map of Aylmer" src={aylmer}></img>
              <h4>Town of Aylmer</h4>
            </div>
            </a>
          </div>
        </div>
        {showAdultPopup && <AdultWildlifePopup visible={showAdultPopup} onClose={handleCloseAdultPopup} />}

        {/* How Fur-Ever Helps */}
        <HowFurEverHelps />

        {/** How You Can Help */}
        <div>
          <HowYouCanHelp></HowYouCanHelp>
        </div>
        <Footer></Footer>
      </div>

    </>
  )
}

export default LandingPage
