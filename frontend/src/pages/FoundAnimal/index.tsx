import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import './style.css';
import Tip1 from '../../assets/help-tip-1.svg'; 
import Tip2 from '../../assets/help-tip-2.svg'; 
import Tip3 from '../../assets/help-tip-3.svg'; 
import Tip4 from '../../assets/help-tip-4.svg'; 
import Tip5 from '../../assets/help-tip-5.svg'; 

function FoundAnimal() {
  const tips = [
    {
      image: Tip1,
      alt: 'Keep yourself safe, your safety is #1',
      text: 'Keep yourself safe, your safety is #1',
    },
    {
      image: Tip2,
      alt: 'Do not go near the animal, stay 30m away',
      text: (
        <>
          Do not go near<br />the animal, stay<br />30m away
        </>
      ),
    },
    {
      image: Tip3,
      alt: 'Do not give any food or water',
      text: 'Do not give any food or water',
    },
    {
      image: Tip4,
      alt: 'If the animal is injured, call your local animal control',
      text: 'If the animal is injured, call your local animal control',
    },
    {
      image: Tip5,
      alt: 'No talking to the animal & no sudden noises',
      text: 'No talking to the animal & no sudden noises',
    },
  ];

  return (
    <main className='found-animal-page'>
      <NavBar/>
      <section className="found-animal-hero">
        <div className="found-animal-hero-container">
          <h1 className="page-title">Found A Baby Animal?</h1>
          <p className="page-desc">
            Take a moment to observe before taking action.<br/>
            Many baby animals are not orphaned — even if they appear alone.
          </p>
        </div>
      </section>

      <section className="help-tips">
        <div className="help-tips-container">
          <h1>Before You Help, Remember:</h1>
          <ul className="help-svgs">
            {tips.map((tip) => (
              <li className="help-tip-item" key={tip.alt}>
                <img src={tip.image} alt={tip.alt} />
                <p>{tip.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="found-animal">
        <div className="found-animal-container">
          <h1>Not sure what you’ve found?</h1>
          <p>If the animal is injured, cold, or in immediate danger,
            <br/>contact your local Animal Control or call Fur-Ever Wild Rehabilitation,
            <br/>at 519-777-6440.</p>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default FoundAnimal
