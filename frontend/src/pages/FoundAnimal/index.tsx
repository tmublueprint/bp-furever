import NavBar from '../../components/NavBar/NavBar'; 
import Footer from '../../components/Footer/Footer';
import './style.css';
import Tip1 from '../../assets/FoundAnimal/help-tip-1.svg'; 
import Tip2 from '../../assets/FoundAnimal/help-tip-2.svg'; 
import Tip3 from '../../assets/FoundAnimal/help-tip-3.svg'; 
import Tip4 from '../../assets/FoundAnimal/help-tip-4.svg'; 
import Tip5 from '../../assets/FoundAnimal/help-tip-5.svg'; 
import babyRacconsLitter from '../../assets/FoundAnimal/images/babyRaccoonsLitter.jpg';
import babyRedSquirrel from '../../assets/FoundAnimal/images/babyRedSquirrel.jpg';
import babySkunk from '../../assets/FoundAnimal/images/babySkunk.jpg';
import fawn from '../../assets/FoundAnimal/images/fawn.jpg';
import juvenileBunny from '../../assets/FoundAnimal/images/juvenileBunny.jpg';
import foundABabyFawn from '../../assets/FoundAnimal/guides/You Found a Baby Fawn.pdf';
import foundABabyRabbit from '../../assets/FoundAnimal/guides/You Found a Baby Rabbit.pdf';
import foundABabySkunk from '../../assets/FoundAnimal/guides/You Found a Baby Skunk.pdf';

import AnimalBox from '../../components/AnimalBox/AnimalBox';


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
      <>
      <NavBar/>
      <main className='found-animal-page'>
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
            <h2>Before You Help, Remember:</h2>
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

        <section className="select-animal">
          <h2 className="section-header">Select The Animal You Found</h2>
          <div className="cards">
            <div className="left">
                <AnimalBox label="Squirrel" image={babyRedSquirrel} />
                <AnimalBox label="Rabbit" image={juvenileBunny} hyperlink={foundABabyRabbit}/>
                <AnimalBox label="Fawn" image={fawn} hyperlink={foundABabyFawn}/>
            </div>
            <div className="right">
              <AnimalBox label="Raccoon" image={babyRacconsLitter}/>
              <AnimalBox label="Skunk" image={babySkunk} hyperlink={foundABabySkunk}/>
            </div>
          </div>
        </section>

        <section className="found-animal">
          <h2 className="section-header" style={{color: '#778932'}}>Not sure what you’ve found?</h2>
          <p>If the animal is injured, cold, or in immediate danger,
            <br/>contact your local Animal Control or call Fur-Ever Wild Rehabilitation,
            <br/>at 519-777-6440.</p>
        </section>
      </main>

        {/* Add code here */}
        <Footer/>
        </>
  );
}

export default FoundAnimal
