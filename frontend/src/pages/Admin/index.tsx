import { useEffect, useRef, useState } from 'react';
import './style.css';
import AdminPDFPopup from '../../components/AdminPDFPopup/adminPDFPopup'; 
import DeletePopup from '../../components/DeletePopup/DeletePopup';
import Footer from '../../components/Footer/Footer';
import PDFGallery, { type PDFGalleryItem } from '../../components/PDFGallery/PDFGallery';
import closeIcon from '../../assets/DeletePDFPopup/delete-pdf-remove.svg';
import fureverLogo from '../../assets/NavBar/fureverLogo.svg';

type AdminPdf = PDFGalleryItem & {
  id: string;
};

type GuideRecord = {
  guideID: string;
  postTitle: string;
  postSummary: string;
  imageLink: string;
  pdfLink: string;
};

type AdminPdfSubmission = {
  postTitle: string;
  postSummary: string;
  imageFile: File;
  pdfFile: File;
};

const createAdminPdf = (guide: GuideRecord): AdminPdf => ({
  id: guide.guideID,
  image: guide.imageLink,
  title: guide.postTitle,
  summary: guide.postSummary,
  link: guide.pdfLink,
});

const readErrorMessage = async (response: Response, fallbackMessage: string) => {
  try {
    const payload = (await response.json()) as { error?: string };
    return payload.error ?? fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

function Admin() {
  const [pdfs, setPdfs] = useState<AdminPdf[]>([]);
  const [showPDFPopup, setShowPDFPopup] = useState(false);
  const [pdfPendingDelete, setPdfPendingDelete] = useState<AdminPdf | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const deleteButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const loadGuides = async () => {
      try {
        const response = await fetch('/api/guides');

        if (!response.ok) {
          throw new Error(await readErrorMessage(response, 'Failed to load guides.'));
        }

        const guides = (await response.json()) as GuideRecord[];
        setPdfs(guides.map(createAdminPdf));
        setStatusMessage('');
      } catch (error) {
        console.error('Failed to load admin guides:', error);
        setStatusMessage('Unable to load guides right now.');
      }
    };

    void loadGuides();
  }, []);

  useEffect(() => {
    document.body.style.overflow = showPDFPopup || showDeletePopup ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [showDeletePopup, showPDFPopup]);

  const handleAddPDFButtonClick = () => {
    setStatusMessage('');
    setShowPDFPopup(true); 
  };

  const handleClosePDFPopup = () => {
    setShowPDFPopup(false);
  };

  const handleCreatePdf = async (submission: AdminPdfSubmission) => {
    const formData = new FormData();
    formData.append('postTitle', submission.postTitle);
    formData.append('postSummary', submission.postSummary);
    formData.append('image', submission.imageFile);
    formData.append('pdf', submission.pdfFile);

    const response = await fetch('/api/guides', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(await readErrorMessage(response, 'Failed to save the PDF.'));
    }

    const payload = (await response.json()) as { guide?: GuideRecord };

    if (payload.guide) {
      setPdfs((currentPdfs) => [createAdminPdf(payload.guide as GuideRecord), ...currentPdfs.filter((pdf) => pdf.id !== payload.guide?.guideID)]);
    }

    setStatusMessage('');
    setShowPDFPopup(false);
  };

  const handleDeleteButtonClick = (pdf: AdminPdf) => {
    setPdfPendingDelete(pdf);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    const pendingPdfId = pdfPendingDelete?.id;

    setShowDeletePopup(false);
    setPdfPendingDelete(null);

    if (pendingPdfId) {
      deleteButtonRefs.current[pendingPdfId]?.focus();
    }
  };

  const handleConfirmDelete = () => {
    if (!pdfPendingDelete) {
      return Promise.resolve();
    }

    return fetch(`/api/guides/${pdfPendingDelete.id}`, {
      method: 'DELETE',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(await readErrorMessage(response, 'Failed to delete the PDF.'));
      }

      setPdfs((currentPdfs) => currentPdfs.filter((pdf) => pdf.id !== pdfPendingDelete.id));
      setStatusMessage('');
    });
  };

  return (
    <div className="admin-page-container">
      <header className="admin-header">
        <div className="admin-header-content">
          <img className="admin-logo" src={fureverLogo} alt="Fur-Ever Wild Rehabilitation" />
          <p className="admin-header-title">Admin Page</p>
        </div>
      </header>

      <main id="admin-container" className="admin-main">
        <section className="admin-current-pdfs" aria-labelledby="admin-current-pdfs-title">
          <div className="admin-section-header">
            <h1 id="admin-current-pdfs-title">Current PDFs</h1>
            <button
              className="admin-add-pdf-btn"
              type="button"
              onClick={handleAddPDFButtonClick}
            >
              <span aria-hidden="true">+</span>
              Add new PDF
            </button>
          </div>

          {showPDFPopup && (
            <AdminPDFPopup
              visible={showPDFPopup}
              onClose={handleClosePDFPopup}
              onSubmit={handleCreatePdf}
            />
          )}


          <PDFGallery
            className="admin-pdf-gallery"
            pdfList={pdfs}
            renderCardAction={(pdf) => (
              <button
                className="admin-remove-pdf-btn"
                type="button"
                onClick={() => handleDeleteButtonClick(pdf)}
                ref={(element) => {
                  deleteButtonRefs.current[pdf.id] = element;
                }}
              >
                <img src={closeIcon} aria-hidden="true" alt="" />
                Remove PDF
              </button>
            )}
          />

          {statusMessage && <p className="admin-status-message">{statusMessage}</p>}
          {!statusMessage && pdfs.length === 0 && <p className="admin-status-message">No PDFs have been added yet.</p>}
        </section>

        <DeletePopup
          visible={showDeletePopup}
          onClose={handleCloseDeletePopup}
          onConfirm={handleConfirmDelete}
          pdfTitle={pdfPendingDelete?.title ?? ''}
        />
      </main>

      <Footer />
    </div>
  );
}

export default Admin;
