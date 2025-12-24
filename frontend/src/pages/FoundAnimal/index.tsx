import './style.css';
import adultBtn from '../../assets/Group 19.svg'; 
import babyBtn from '../../assets/Group 20.svg'; 
import safetyIcon from '../../assets/Group 21.svg'; 
import feedIcon from '../../assets/Group 22.svg'; 
import talkingIcon from '../../assets/Group 24.svg'; 
import raccoonLogo from '../../assets/logo.svg'; 


const noticeBoxStyle = {
    backgroundColor: "#F8F9E9", 
    width: "593px", 
    height: "654px", 
    backgroundImage: `url(${raccoonLogo})`,
    backgroundRepeat: "no-repeat", 
    backgroundPosition: "bottom right"
}


function FoundAnimal() {
  return (
    <>
      <div id="notice-box" style={noticeBoxStyle}>
        <div id="group-top">
          <h2 style={{color: "#d10303"}}>FOUND AN ANIMAL IN DISTRESS?</h2>
          <h3 style={{width: "400px"}}>Choose one to get immediate guidance: </h3>
          <div id="container-btn">
            <button id="adultBtn">
              <img src={adultBtn} alt="adult button"/>
            </button>
            <button id="babyBtn">
              <img src={babyBtn} alt="baby button"/> 
            </button> 
          </div>
          <h3>Things to Keep in Mind-</h3>
        </div>
        <div id="group-bottom">
          <img src={safetyIcon} alt="safety icon"/>
          <img src={feedIcon} alt="feed icon"/>
          <img src={talkingIcon} alt="talk icon"/>
        </div>
      </div>
    </>
  )
}

export default FoundAnimal
