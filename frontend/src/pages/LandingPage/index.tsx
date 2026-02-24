import './style.css';
import NavBar from '../../components/NavBar/NavBar'; 
import HowFurEverHelps from '../../components/LandingPage/HowFurEverHelps/HowFurEverHelps';

import adultBtn from '../../assets/Group 19.svg'; 
import babyBtn from '../../assets/Group 20.svg'; 
import safetyIcon from '../../assets/Group 21.svg'; 
import feedIcon from '../../assets/Group 22.svg'; 
import talkingIcon from '../../assets/Group 24.svg'; 
import raccoonLogo from '../../assets/logo.svg'; 
import ctaBtn from '../../assets/CTA-CARD-PRIMARY-BUTTON.svg'; 
import licensedCheckIcon from '../../assets/licensed-check-icon.svg'; 
import licensedCertIcon from '../../assets/licensed-cert-icon.svg'; 
import humaneCareIcon from '../../assets/humane-care-icon.svg';  


const noticeBoxStyle = {
    backgroundColor: "#F8F9E9", 
    width: "593px", 
    height: "654px", 
    backgroundImage: `url(${raccoonLogo})`,
    backgroundRepeat: "no-repeat", 
    backgroundPosition: "bottom right"
}



function LandingPage() {
  return (
    <>
      <div id="background" style={{width: "100%", minHeight: "100vh", backgroundColor: "#E5EAD2"}}>
      {/** Nav Bar */}
        <NavBar/>
        {/** Hero Component */} 
        <div className="horizontalCentering">
          <div id="hero-component">
            <div id="services">
              <h1 style={{width: "600px"}} className="titleText">Wildlife Rescue & Rehabilitation</h1>
              <p className="headingThree" style={{width: "600px"}}>We rescue and rehabilitate orphaned, injured, sick, and displaced wildlife, 
              aiming to return them to their natural habitat.</p>
              <p className="headingThree" style={{fontWeight: "bold"}}>We are not a removal service.</p>
              <button id="ctaButton"> 
                <img src={ctaBtn} alt="CTA Card Btn"/>
              </button>
              <div id="credentials">
                <img src={licensedCertIcon} alt="licensed cert icon"/>
                <img src={humaneCareIcon} alt="humane care icon"/>
                <img src={licensedCheckIcon} alt="licensed check icon"/>
              </div>
            </div>
            {/** Found Animal Notice Box */}
            <div id="notice-box" style={noticeBoxStyle}>
              <div id="group-top">
                <h2 style={{color: "#d10303"}}>FOUND AN ANIMAL IN DISTRESS?</h2>
                <h3 style={{width: "400px"}}>Choose one to get immediate guidance: </h3>
                <div id="container-btn">
                  <button id="adultBtn">
                    <img src={adultBtn} alt="adult button"/>
                  </button>
                  <button id="babyBtn">
                    <img src={babyBtn} alt="baby button"/> 
                  </button> 
                </div>
                <h3>Things to Keep in Mind-</h3>
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
                <img alt="Map of City of St. Thomas" src="src/assets/city-of-st-thomas.png"></img>
                <h4>City of St. Thomas</h4>
              </div>
            </a>
            <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer">
              <div className="map-container">
                <img alt="Map of Central Elgin" src="src/assets/central-elgin.png"></img>
                <h4>Central Elgin</h4>
              </div>
            </a>
            <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer">
              <div className="map-container">
                <img alt="Map of Southwold" src="src/assets/southwold-township.png"></img>
                <h4>Southwold Township</h4>
              </div>
            </a>
            <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer">
            <div className="map-container">
              <img alt="Map of Aylmer" src="src/assets/town-of-aylmer.png"></img>
              <h4>Town of Aylmer</h4>
            </div>
            </a>
          </div>
        </div>
      </div>

      {/* How Fur-Ever Helps */}
      <HowFurEverHelps />
    </>
  )
}

export default LandingPage
