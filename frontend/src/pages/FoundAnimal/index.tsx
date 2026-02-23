import './style.css';
import Tip1 from '../../assets/help-tip-1.svg'; 
import Tip2 from '../../assets/help-tip-2.svg'; 
import Tip3 from '../../assets/help-tip-3.svg'; 
import Tip4 from '../../assets/help-tip-4.svg'; 
import Tip5 from '../../assets/help-tip-5.svg'; 





function FoundAnimal() {
  return (
    <>
      <h1 className="page-title">Found A Baby Animal?</h1>
      <p className="page-desc">
        Take a moment to observe before taking action.<br/>
        Many baby animals are not orphaned — even if they appear alone.
      </p>
      <div className="help-tips">
        <h1>Before You Help, Remember:</h1>
        <div className="help-svgs">
          <img src={Tip1} alt="Keep yourself safe, your safety is #1"/>
          <img src={Tip2} alt="Do not go near the animal, stay 30m away"/>
          <img src={Tip3} alt="Do not give any food or water"/>
          <img src={Tip4} alt="If the animal is injured, call your local animal control"/>
          <img src={Tip5} alt="No talking to the animal & no sudden noises"/>
        </div>
      </div>
      {/* Add code here */}
    </>
  )
}

export default FoundAnimal
