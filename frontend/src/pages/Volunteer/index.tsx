import './style.css';

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
      </main>
    </>
  )
}

export default Volunteer
