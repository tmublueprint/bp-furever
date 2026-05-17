import "./Footer.css";
import facebookIcon from "../../assets/Footer/facebook-icon.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-header">We Are Not An Emergency Drop-Off Location.</p>
        <p className="footer-subheader">Please Consult Our Guide Before Contacting Us.</p>

        <div className="footer-columns">
          <div className="footer-column">
            <p className="col-header1" style={{marginBottom: "8px"}}>Contact Us</p>
            <p className="col-header2">Phone</p>
            <p className="col-text">519-777-6440</p>
            <p className="col-header2">Email</p>
            <p className="col-text">cburns6440@gmail.com</p>
          </div>
          <div className="footer-column">
            <p className="col-header1" style={{marginBottom: "8px"}}>Service Locations</p>
            <p className="col-text">City of St. Thomas<span className="col-subtext">(Call 519-631-7430 first)</span></p>
            <p className="col-text">Central Elgin</p>
            <p className="col-text">Southwold Township</p>
            <p className="col-text">Town of Aylmer</p>
          </div>
          <div className="footer-column" id="facebook-column">
            <div>
              <a href="https://www.facebook.com/FEVRWR/">
                <img
                  src={facebookIcon}
                  alt=""
                  width={40}
                  height={40}
                />{" "}
                <span style={{marginLeft: "0.4em"}}>Follow us on Facebook</span>
              </a>
            </div>
            <div>Fur-ever Wild Rehabilitation</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;