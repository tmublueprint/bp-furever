import { useEffect, useRef, useState } from 'react';
import './style.css';
import AdminPDFPopup from '../../components/AdminPDFPopup/adminPDFPopup'; 
import DeletePopup from '../../components/DeletePopup/DeletePopup';
import Footer from '../../components/Footer/Footer';
import PDFGallery, { type PDFGalleryItem } from '../../components/PDFGallery/PDFGallery';
import closeIcon from '../../assets/DeletePDFPopup/delete-pdf-remove.svg';
import fureverLogo from '../../assets/NavBar/fureverLogo.svg';
import { pdfData } from '../Education';

type AdminPdf = PDFGalleryItem & {
  id: string;
};

const createAdminPdf = (pdf: PDFGalleryItem, index: number): AdminPdf => ({
  ...pdf,
  id: String(pdf.id ?? `pdf-${index + 1}`),
});

const revokeBlobUrl = (url: string) => {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

function Admin() {
  const [pdfs, setPdfs] = useState<AdminPdf[]>(() => pdfData.map(createAdminPdf));
  //const [coverImage, setCoverImage] = useState('');
  //const [title, setTitle] = useState('');
  //const [summary, setSummary] = useState('');
  //const [pdfLink, setPdfLink] = useState('');
  const [showPDFPopup, setShowPDFPopup] = useState(false);
  const [pdfPendingDelete, setPdfPendingDelete] = useState<AdminPdf | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const deleteButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const pdfsRef = useRef<AdminPdf[]>([]);

  useEffect(() => {
    pdfsRef.current = pdfs;
  }, [pdfs]);

  useEffect(() => {
    return () => {
      pdfsRef.current.forEach((pdf) => {
        revokeBlobUrl(pdf.image);
        revokeBlobUrl(pdf.link);
      });
    };
  }, []);

  useEffect(() => {
      if (showPDFPopup)
        document.body.style.overflow = "hidden";
    else
        document.body.style.overflow = "";
  }, [showPDFPopup]); 

  //for adding new pdf
  /*
  const handlePdfFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (pdfLink.startsWith('blob:')) {
      URL.revokeObjectURL(pdfLink);
    }

    const newPdfUrl = URL.createObjectURL(file);
    setPdfLink(newPdfUrl);
  };

  const handleCoverImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (coverImage.startsWith('blob:')) {
      URL.revokeObjectURL(coverImage);
    }

    const newCoverImageUrl = URL.createObjectURL(file);
    setCoverImage(newCoverImageUrl);
  };
  */

  const handleAddPDFButtonClick = () => {
    //implement popup add pdf functionality here.
    setShowPDFPopup(true); 
  };

  const handleClosePDFPopup = () => {
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
      return;
    }

    revokeBlobUrl(pdfPendingDelete.image);
    revokeBlobUrl(pdfPendingDelete.link);
    setPdfs((currentPdfs) => currentPdfs.filter((pdf) => pdf.id !== pdfPendingDelete.id));
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

          {showPDFPopup && <AdminPDFPopup visible={showPDFPopup} onClose={handleClosePDFPopup} />}


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
