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
          <img src={Tip1} alt="tip 1"/>
          <img src={Tip2} alt="tip 2"/>
          <img src={Tip3} alt="tip 3"/>
          <img src={Tip4} alt="tip 4"/>
          <img src={Tip5} alt="tip 5"/>
        </div>
      </div>
      {/* Add code here */}
    </>
  )
}

export default FoundAnimal
