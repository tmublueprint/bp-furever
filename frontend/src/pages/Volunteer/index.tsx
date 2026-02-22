import './style.css';
import Role1 from '../../assets/on-site-support.svg'; 
import Role2 from '../../assets/foster-care.svg'; 
import Role3 from '../../assets/driver-support.svg'; 

function Volunteer() {
  return (
    <>
      <main className = "volunteer-page">

        {/*title card section*/}
        <section className= "volunteer-hero">

          <div className='volunteer-hero-container'>

            {/* Text side (left) */}
            <div className = "volunteer-hero-text">

              <h1 className = "volunteer-hero-title">
                Volunteer With Fur-Ever <br />
                Wild Rehabilitation
              </h1>

              <p className = "volunteer-hero-body">
                Volunteers play a vital role in helping injured 
                and orphaned wildlife receive proper care.
              </p>

              <p className = "volunteer-hero-body volunteer-hero-body-bold">
                This work requires commitment, <br />
                responsibility, and reliability.
              </p>
              
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
      </main>
    </>
  )
}

export default Volunteer
