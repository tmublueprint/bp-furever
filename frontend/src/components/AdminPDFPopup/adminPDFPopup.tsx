import { useEffect, useState, type ChangeEvent, type FormEvent, type MouseEvent } from 'react'; 
import './adminPDFPopup.css'; 
import imageIcon from '../../assets/PDFPopup/image-icon.svg'; 
import pdfIcon from '../../assets/PDFPopup/pdf-icon.svg'; 
import xMark from '../../assets/PDFPopup/x.svg'; 
import PDFCard from '../PDFCard/PDFCard'; 

type AdminPDFSubmission = {
    postTitle: string;
    postSummary: string;
    imageFile: File;
    pdfFile: File;
};

interface AdminPDFPopupProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (submission: AdminPDFSubmission) => Promise<void>;
}

function AdminPDFPopup({ visible, onClose, onSubmit }: AdminPDFPopupProps) {
    const [titleText, setTitleText] = useState('');
    const [summaryText, setSummaryText] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (visible) {
            return;
        }

        setTitleText('');
        setSummaryText('');
        setImageFile(null);
        setPdfFile(null);
        setImagePreview('');
        setErrorMessage('');
        setIsSubmitting(false);
    }, [visible]);

    useEffect(() => {
        if (!imageFile) {
            setImagePreview('');
            return;
        }

        const previewUrl = URL.createObjectURL(imageFile);
        setImagePreview(previewUrl);

        return () => {
            URL.revokeObjectURL(previewUrl);
        };
    }, [imageFile]);

    if (!visible) return null;

    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleTitleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleText(e.target.value);
        setErrorMessage('');
    };

    const handleSummaryTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setSummaryText(e.target.value);
        setErrorMessage('');
    };

    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImageFile(e.target.files?.[0] ?? null);
        setErrorMessage('');
    };

    const handlePdfFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPdfFile(e.target.files?.[0] ?? null);
        setErrorMessage('');
    };

    const handleCancelClick = () => {
        onClose();
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedTitle = titleText.trim();
        const trimmedSummary = summaryText.trim();

        if (!trimmedTitle || !trimmedSummary || !imageFile || !pdfFile) {
            setErrorMessage('Add a title, summary, image, and PDF before saving.');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        try {
            await onSubmit({
                postTitle: trimmedTitle,
                postSummary: trimmedSummary,
                imageFile,
                pdfFile,
            });
        } catch (submitError) {
            const message = submitError instanceof Error ? submitError.message : 'Failed to save the PDF.';
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}>
            <form className="admin-pdf-popup-container" onSubmit={handleSubmit}>
                <div className="pdf-popup-header-component">
                    <h1 id="add-pdf-title" style={{ fontWeight: '700' }}>Add a new PDF</h1>
                    <h3 className="details-text">Add details about your guide and upload relevant files</h3>
                    <button className="cancel-btn" id="cancel-btn" type="button" onClick={handleCancelClick}>
                        <span style={{ fontWeight: '600', fontSize: '1.5em' }}>Close</span>
                        <img src={xMark} alt="x-mark" style={{ width: '25px', height: 'auto', paddingTop: '2px' }} />
                    </button>
                </div>

                <div className="edit-pdf-section">
                    <h3>Title</h3>
                    <input
                        type="text"
                        id="title-text-box"
                        className="textbox"
                        onChange={handleTitleTextChange}
                        placeholder="Enter a title"
                        value={titleText}
                    />
                    <h3>Summary Text</h3>
                    <textarea
                        id="summary-text-box"
                        className="textbox"
                        placeholder="A short summary of what's in the PDF"
                        onChange={handleSummaryTextChange}
                        rows={1}
                        value={summaryText}
                    />

                    <h3>Image</h3>
                    <label id="img-file-btn-card" className="file-card" htmlFor="admin-image-input">
                        <span id="image-file-btn">
                            <img src={imageIcon} alt="choose-image-icon" className="icon" />
                        </span>
                        <div className="font-card-text">
                            <h3 style={{ fontSize: '1.5em', fontWeight: '400', margin: '0' }}>Choose an image file</h3>
                            <h3 style={{ fontSize: 'var(--font-size-paragraph)', fontWeight: '400', margin: '0' }}>
                                {imageFile ? imageFile.name : 'JPG, PNG, etc.'}
                            </h3>
                        </div>
                        <input
                            id="admin-image-input"
                            className="file-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                        />
                    </label>

                    <h3>PDF</h3>
                    <label id="pdf-file-btn-card" className="file-card" htmlFor="admin-pdf-input">
                        <span id="pdf-file-btn">
                            <img src={pdfIcon} alt="choose-pdf-icon" className="icon" />
                        </span>
                        <div className="font-card-text">
                            <h3 style={{ fontSize: '1.5em', fontWeight: '400', margin: '0' }}>Choose a PDF file</h3>
                            <h3 style={{ fontSize: 'var(--font-size-paragraph)', fontWeight: '400', margin: '0' }}>
                                {pdfFile ? pdfFile.name : "Only PDF's are supported."}
                            </h3>
                        </div>
                        <input
                            id="admin-pdf-input"
                            className="file-input"
                            type="file"
                            accept="application/pdf"
                            onChange={handlePdfFileChange}
                        />
                    </label>

                    {errorMessage && (
                        <p className="admin-pdf-error" role="alert">
                            {errorMessage}
                        </p>
                    )}

                    <div id="edit-pdf-btn-container">
                        <button className="edit-pdf-btn" id="add-pdf-btn" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Add PDF'}
                        </button>
                        <button className="edit-pdf-btn" id="cancel-pdf-btn" type="button" onClick={handleCancelClick} disabled={isSubmitting}>
                            Cancel
                        </button>
                    </div>
                </div>

                <div className="preview-section">
                    <h3>Preview</h3>
                    <h3 className="details-text" style={{ marginBottom: '20px' }}>Add details about your guide and upload relevant files</h3>
                    <PDFCard
                        image={imagePreview}
                        title={titleText === '' ? 'Title text goes here' : titleText}
                        summary={summaryText === '' ? "Short one line summary of what's covered in the guide" : summaryText}
                        link="#"
                    />
                </div>
            </form>
        </div>
    );
}

export default AdminPDFPopup;