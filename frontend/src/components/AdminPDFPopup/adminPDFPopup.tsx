import { useState, MouseEvent } from 'react'; 
import './adminPDFPopup.css'; 
import imageIcon from '../../assets/PDFPopup/image-icon.svg'; 
import pdfIcon from '../../assets/PDFPopup/pdf-icon.svg'; 
import xMark from '../../assets/PDFPopup/x.svg'; 
import PDFCard from '../PDFCard/PDFCard'; 

function AdminPDFPopup({ visible, onClose }: { visible: boolean, onClose: () => void }) {

    if (!visible) return null;

    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const [titleText, setTitleText] = useState(''); 
    const [summaryText, setSummaryText] = useState(''); 

    const handleTitleTextChange = (e) => {
        setTitleText(e.target.value); 
    }
    const handleSummaryTextChange = (e) => {
        setSummaryText(e.target.value); 
    }
    const handleCancelClick = (e) => {
        onClose(); 
    }
    /*const handleImgClick = () => {

    }
    const handlePDFClick = () => {

    }
    const handleAddPDFClick = () => {
    }
    const handleCancelClick = () => {
    }
    */

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}> 
            <div className="admin-pdf-popup-container">
        
                <div className="pdf-popup-header-component">
                    <h1 id="add-pdf-title" style={{fontWeight: '700'}}>Add a new PDF</h1>
                    <h3 className="details-text">Add details about your guide and upload relevant files</h3>
                    <button className="cancel-btn" id="cancel-btn" onClick={handleCancelClick}>
                        <span style={{fontWeight: '600', fontSize: '1.5em'}}>Close</span>
                        <img src={xMark} alt="x-mark" style={{width: '25px', height: 'auto', paddingTop: '2px'}}></img>
                    </button>
                </div>

                <div className="edit-pdf-section">
                    <h3>Title</h3>
                    <input type="text" id="title-text-box" className="textbox" onChange={handleTitleTextChange} placeholder="Enter a title"></input>
                    <h3>Summary Text</h3>
                    <textarea id="summary-text-box" className="textbox" placeholder="A short summary of what's in the PDF" onChange={handleSummaryTextChange} rows={1}></textarea>
                    
                    <h3>Image</h3>
                    <div id="img-file-btn-card" className="file-card">
                        <a id="image-file-btn" /*onClick={handleImgClick}*/>
                            <img src={imageIcon} alt="choose-image-icon" className="icon"/>
                        </a>
                        <div className="font-card-text">
                            <h3 style={{fontSize: '1.5em', fontWeight: '400', margin: '0'}}>Choose an image file</h3>        
                            <h3 style={{fontSize: 'var(--font-size-paragraph)', fontWeight: '400', margin: '0'}}>JPG, PNG, etc.</h3>             
                        </div>
                    </div>

                    <h3>PDF</h3>
                    <div id="pdf-file-btn-card" className="file-card">
                        <a id="pdf-file-btn" /*onClick={handlePDFClick}*/>
                            <img src={pdfIcon} alt="choose-pdf-icon" className="icon"/>
                        </a>
                        <div className="font-card-text">
                            <h3 style={{fontSize: '1.5em', fontWeight: '400', margin: '0'}}>Choose a PDF file</h3>        
                            <h3 style={{fontSize: 'var(--font-size-paragraph)', fontWeight: '400', margin: '0'}}>Only PDF's are supported.</h3>             
                        </div>
                    </div>


                    <div id="edit-pdf-btn-container">
                        <button className="edit-pdf-btn" id="add-pdf-btn" /*onClick={handleAddPDFClick}*/>Add PDF</button>
                        <button className="edit-pdf-btn" id="cancel-pdf-btn" /*onClick={handleCancelClick}*/>Cancel</button>
                    </div>

                </div>

                <div className="preview-section">
                    <h3>Preview</h3>
                    <h3 className="details-text" style={{marginBottom: '20px'}}>Add details about your guide and upload relevant files</h3>
                    <PDFCard title={titleText === '' ? "Title text goes here" : titleText} 
                    summary={summaryText === '' ? "Short one line summary of what's covered in the guide" : summaryText}/> 
                </div>

            </div>
        </div>
    ); 
}


export default AdminPDFPopup;