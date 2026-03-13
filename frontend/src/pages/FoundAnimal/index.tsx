import NavBar from '../../components/NavBar/NavBar'; 
import Footer from '../../components/Footer/Footer';
import './style.css';
import Tip1 from '../../assets/help-tip-1.svg'; 
import Tip2 from '../../assets/help-tip-2.svg'; 
import Tip3 from '../../assets/help-tip-3.svg'; 
import Tip4 from '../../assets/help-tip-4.svg'; 
import Tip5 from '../../assets/help-tip-5.svg'; 
import AnimalBox from '../../components/AnimalBox/AnimalBox';
import Example from '../../assets/deer-example.svg';





function FoundAnimal() {
  return (
    <>
      <NavBar/>
      <h1 className="page-title">Found A Baby Animal?</h1>
      <p className="page-desc">
        Take a moment to observe before taking action.<br/>
        Many baby animals are not orphaned — even if they appear alone.
      </p>
      <div className="help-tips">
        <h1 className="section-header">Before You Help, Remember:</h1>
        <div className="help-svgs">
          <img src={Tip1} alt="Keep yourself safe, your safety is #1"/>
          <img src={Tip2} alt="Do not go near the animal, stay 30m away"/>
          <img src={Tip3} alt="Do not give any food or water"/>
          <img src={Tip4} alt="If the animal is injured, call your local animal control"/>
          <img src={Tip5} alt="No talking to the animal & no sudden noises"/>
        </div>
      </div>
      <div className="select-animal">
        <h1 className="section-header">Select The Animal You Found</h1>
        <div className="cards">
          <div className="left">
            <AnimalBox label="Squirrel"/>
            <AnimalBox label="Rabbit"/>
            <AnimalBox label="Fawn" image={Example}/>
          </div>
          <div className="right">
            <AnimalBox label="Raccoon"/>
            <AnimalBox label="Skunk"/>
          </div>
        </div>
      </div>
      <div className="found-animal">
        <h1 className="section-header">Not sure what you’ve found?</h1>
        <p>If the animal is injured, cold, or in immediate danger,
          <br/>contact your local Animal Control or call Fur-Ever Wild Rehabilitation,
          <br/>at 519-777-6440.</p>
      </div>
      {/* Add code here */}
      <Footer/>
    </>
  )
}

export default FoundAnimal
