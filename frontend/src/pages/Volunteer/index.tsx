import './style.css';
import ArrowBtn from '../../assets/Volunteer/arrow-btn.svg'; 
import VolunteerIcon from '../../assets/Volunteer/volunteer-img.svg'; 
import VolunteerSection from '../../components/volunteerRoles/volunteerRoles';
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

              <div className = "volunteer-icon-phone">
                <img src={VolunteerIcon} alt ="volunteer icon"/>
              </div>

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
        <VolunteerSection/>
        <section className="how-to-apply">
          <div className="container-how-to-apply">
            <h2 className="how-to-apply-header-two">How To Apply</h2>
            <div className="how-to-apply-body">
              <ul id="how-to-apply-checklist">
                <li>1. Ensure you meet all volunteer requirements</li>
                <li>2. Prepare your resume</li>
                <li>3. Email Colleen (<a href="mailto:cburns6440@gmail.com" aria-hidden = "true">cburns6440@gmail.com</a>) to apply</li>
                <li style={{fontWeight: "normal", fontStyle: "italic"}}>—  Please note, only applications meeting the requirements will be considered.</li>
                <a href="mailto:cburns6440@gmail.com" id="apply-email-btn" aria-label="Apply by email">
                  <span id="apply-email-btn-text">Apply by Email</span>
                  <span id="apply-email-btn-arrow-circle" aria-hidden="true">
                    <img src={ArrowBtn} id="apply-email-btn-arrow" alt="apply-email-btn-arrow"/>
                  </span>
                </a> 
              </ul>
            </div>
            <div className="how-to-apply-end">
              <p className="how-to-apply-ending-text">Volunteer duties may vary depending on need and experience.<br/>Training and placement are determined by Fur-Ever Wild Rehabilitation.<br/><br/>Volunteering with wildlife is a responsibility — thank you for considering it carefully.</p>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </>
  )
}

export default Volunteer
