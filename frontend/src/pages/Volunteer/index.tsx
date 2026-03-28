import './style.css';
import Role1 from '../../assets/Volunteer/on-site-support.svg'; 
import Role2 from '../../assets/Volunteer/foster-care.svg'; 
import Role3 from '../../assets/Volunteer/driver-support.svg'; 
import ArrowBtn from '../../assets/Volunteer/arrow-btn.svg'; 
import VolunteerIcon from '../../assets/Volunteer/volunteer-img.svg'; 
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';


function Volunteer() {
  return (
    <>
      <NavBar/>
      <main className = "volunteer-page">

        {/*title card section*/}
        <section className= "volunteer-hero">

          <div className='volunteer-hero-container'>

            {/* Text side (left) */}
            <div className = "volunteer-hero-text">

              <h1 className = "volunteer-hero-title">
                Volunteer With Fur-Ever Wild Rehabilitation
              </h1>

              <p className = "volunteer-hero-body">
                Volunteers play a vital role in helping injured and orphaned wildlife receive proper care.
              </p>

              <p className = "volunteer-hero-body volunteer-hero-body-bold">
                This work requires commitment, responsibility, and reliability.
              </p>
              
            </div>
            <div className = "volunteer-icon">
              <img src={VolunteerIcon} alt ="volunteer icon"/>
            </div>
          </div>
        </section>

        <section className="volunteer-roles-container">
          <h1 className="volunteer-roles-title">Volunteer Roles & Opportunities</h1>
          <div className="volunteer-roles">
            <div className="volunteer-role">
              <img src={Role1} alt ="house icon"/>
              <h1>On-Site Support</h1>
              <p>
                Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, 
                sed diam nonummy nibh eu 
              </p>
            </div>
            <div className="volunteer-role">
              <img src={Role2} alt ="baby bottle icon"/>
              <h1>Foster Care</h1>
              <p>
                Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, 
                sed diam nonummy nibh eu 
              </p>
            </div>
            <div className="volunteer-role">
              <img src={Role3} alt ="car icon"/>
              <h1>Driver Support</h1>
              <p>
                Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, 
                sed diam nonummy nibh eu 
              </p>
            </div>
          </div>
          <div className="green-vector"></div>
        </section>

        <section className="volunteer-requirements-container">
          <h1 className="volunteer-requirements-title">General Volunteer Requirements</h1>
          <div className="volunteer-requirements">
            <ul className="volunteer-requirements-list">
              <li className="volunteer-requirements-item">✔ Available during baby season (minimum <span style={{ fontWeight: 600 }}>2× per week, 4-hour shifts</span>)</li>
              <li className="volunteer-requirements-item">✔ Valid driver's license</li>
              <li className="volunteer-requirements-item">✔ RVS exam completed (MNRF - Aylmer District) *Volunteers and Fosters*</li>
              <li className="volunteer-requirements-item">✔ Must be 18 years or older</li>
              <li className="volunteer-requirements-item">✔ Resume required (no cover letter) plus 2 references</li>
              <li className="volunteer-requirements-item">✔ Tetanus and Season Flu Vaccines</li>
              <li className="volunteer-requirements-item" style={{ fontStyle: "italic" }}>— Experience with wildlife or animal rescue is considered an asset.</li>
            </ul>
          </div>
          <div className="volunteer-requirements-vector">
            <h1 className="volunteer-requirements-vector-text">Wildlife rehabilitation is a long-term commitment, especially during baby season.<br />Volunteers must be dependable and available as scheduled.</h1>
          </div>
        </section>

        <section className="how-to-apply">
          <div className="container-how-to-apply">
            <h1 className="how-to-apply-header-one">How To Apply</h1>
            <div className="how-to-apply-body">
              <ul id="how-to-apply-checklist">
                <li>1. Ensure you meet all volunteer requirements</li>
                <li>2. Prepare your resume</li>
                <li>3. Email Colleen (<a href="mailto:cburns6440@gmail.com" aria-hidden = "true">cburns6440@gmail.com</a>) to apply</li>
                <li style={{fontWeight: "normal", fontStyle: "italic"}}>—  Please note, only applications meeting the requirements will be considered.</li>
                <a href="mailto:cburns6440@gmail.com" id="apply-email-btn" aria-label="Apply by email">
                  <span id="apply-email-btn-text">Apply by Email</span>
                  <span id="apply-email-btn-arrow-circle" aria-hidden="true">
                    <img src={ArrowBtn} id="apply-email-btn-arrow" alt=""/>
                  </span>
                </a> 
              </ul>
            </div>
            <div className="how-to-apply-end">
              <h1 className="how-to-apply-ending-text">Volunteer duties may vary depending on need and experience.<br/>Training and placement are determined by Fur-Ever Wild Rehabilitation.<br/><br/>Volunteering with wildlife is a responsibility — thank you for considering it carefully.</h1>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </>
  )
}

export default Volunteer
