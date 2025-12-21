import './style.css';

function LandingPage() {
  return (
    <>
      <p>Welcome to the landing page!</p>
      {/* Add code here */}
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
