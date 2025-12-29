import './style.css';
import FoundAnimal from '../FoundAnimal';
import ctaBtn from '../../assets/CTA-CARD-PRIMARY-BUTTON.svg'; 
import licensedCheckIcon from '../../assets/licensed-check-icon.svg'; 
import licensedCertIcon from '../../assets/licensed-cert-icon.svg'; 
import humaneCareIcon from '../../assets/humane-care-icon.svg';  


function LandingPage() {
  return (
    <>
      {/* Add code here */}
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
          <FoundAnimal/>
        </div>
      </div>

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
    </>
  )
}

export default LandingPage
