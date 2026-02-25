
import './adultWildlifePopup.css';
import closeIcon from '../../assets/close-icon.svg';
import type { MouseEvent } from 'react';

function AdultWildlifePopup({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  if (!visible) return null;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-container">
        <div className="popup-content">
          <button className="popup-close-btn" onClick={onClose} aria-label="Close popup">
            <img src={closeIcon} alt="close-icon" className="popup-close-icon"/>
          </button>
          <h2 className="adult-wildlife-popup-title">Adult wildlife can be dangerous —<br />for you and for them.</h2>
          <p className="adult-wildlife-popup-description">Before approaching, please contact your<br />local Animal Control, or<br />Fur-Ever Wild Rehabilitation</p>
        </div>
      </div>
    </div>
  );
}

export default AdultWildlifePopup;