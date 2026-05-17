import './CallAnimalServicesBox.css';

import WarningIcon from '../../assets/CallAnimalServicesBox/warning.svg';
import PhoneIcon from '../../assets/CallAnimalServicesBox/phone.svg';

function CallAnimalServicesBox() {
  return (
    <div className="call-animal-services-box">
      <div className="call-animal-services-title-row">
        <img src={WarningIcon} alt="" aria-hidden="true" />
        <p>Call St. Thomas Animal Services First</p>
      </div>

      <div className="call-animal-services-phone-row">
        <img src={PhoneIcon} alt="" aria-hidden="true" />
        <p>519-631-7430</p>
      </div>

      <p className="call-animal-services-description">
        Fur-Ever Wild may assist only in certain situations.
      </p>
    </div>
  );
}

export default CallAnimalServicesBox;