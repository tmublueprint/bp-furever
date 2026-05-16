import type { MouseEvent } from 'react';
import './DeletePopup.css';

interface DeletePopupProps {
  visible: boolean;
  onClose: () => void;
  pdfTitle: string;
}

function DeletePopup({ visible, onClose, pdfTitle }: DeletePopupProps) {
  if (!visible) return null;

  const displayTitle = pdfTitle.trim();

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleConfirmClick = () => {
    //delete the PDF here
    onClose();
  };

  return (
    <div className="delete-popup-overlay" onClick={handleOverlayClick}>
      <div
        className="delete-popup-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-popup-title"
      >
        <div className="delete-popup-content">
          <h2 id="delete-popup-title" className="delete-popup-message">
            Are you sure you want to delete the PDF with the title "{displayTitle}" from the page permanently?
            <br />
            It will be gone forever.
          </h2>
          <div className="delete-popup-actions">
            <button className="delete-popup-yes-btn" type="button" onClick={handleConfirmClick}>
              Yes
            </button>
            <button className="delete-popup-no-btn" type="button" onClick={onClose}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
