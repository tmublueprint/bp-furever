import { useEffect, useRef, useState } from 'react';
import './style.css';
import AddPopup from '../../components/AddPopup/AddPopup';
import DeletePopup from '../../components/DeletePopup/DeletePopup';
import Footer from '../../components/Footer/Footer';
import PDFGallery from '../../components/PDFGallery/PDFGallery';
import type { PDFCardItem } from '../../components/PDFCard/PDFCard';
import closeIcon from '../../assets/DeletePDFPopup/delete-pdf-remove.svg';
import fureverLogo from '../../assets/NavBar/fureverLogo.svg';
import { pdfData } from '../Education';

type AdminPdf = PDFCardItem & {
  id: string;
};

type GuideApiItem = {
  guideID: string;
  postTitle: string;
  postSummary: string;
  imageLink: string;
  pdfLink: string;
};

const createAdminPdf = (pdf: PDFCardItem, index: number): AdminPdf => ({
  ...pdf,
  id: String(pdf.id ?? pdf.guideID ?? `pdf-${index + 1}`),
});

const mapGuideApiItem = (guide: GuideApiItem): PDFCardItem => ({
  guideID: guide.guideID,
  id: guide.guideID,
  image: guide.imageLink,
  title: guide.postTitle,
  summary: guide.postSummary,
  link: guide.pdfLink,
});

const revokeBlobUrl = (url: string) => {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

function Admin() {
  const [pdfs, setPdfs] = useState<AdminPdf[]>(() => pdfData.map(createAdminPdf));
  const [pdfPendingDelete, setPdfPendingDelete] = useState<AdminPdf | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const deleteButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const addButtonRef = useRef<HTMLButtonElement | null>(null);
  const pdfsRef = useRef<AdminPdf[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadGuides = async () => {
      try {
        const response = await fetch('/api/guides');

        if (!response.ok) {
          throw new Error(`Failed to load guides: ${response.status}`);
        }

        const guides = (await response.json()) as GuideApiItem[];

        if (!isMounted) {
          return;
        }

        if (guides.length > 0) {
          setPdfs(guides.map((guide, index) => createAdminPdf(mapGuideApiItem(guide), index)));
        } else {
          setPdfs(pdfData.map(createAdminPdf));
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setPdfs(pdfData.map(createAdminPdf));
        }
      }
    };

    loadGuides();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    pdfsRef.current = pdfs;
  }, [pdfs]);

  const openAddPopup = () => {
    setShowAddPopup(true);
  };

  const closeAddPopup = () => {
    setShowAddPopup(false);
    addButtonRef.current?.focus();
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

  const handleConfirmDelete = async () => {
    if (!pdfPendingDelete) {
      return;
    }

    const pendingPdf = pdfPendingDelete;
    const guideID = pendingPdf.guideID ?? pendingPdf.id;

    try {
      const response = await fetch(`/api/guides/${encodeURIComponent(guideID)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error || response.statusText);
      }

      revokeBlobUrl(pendingPdf.image);
      revokeBlobUrl(pendingPdf.link);
      setPdfs((currentPdfs) => currentPdfs.filter((pdf) => pdf.id !== pendingPdf.id));
    } catch (error) {
      console.error(error);
      alert(`Delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  };


  const handleSavedPdf = (pdf: PDFCardItem) => {
    setPdfs((currentPdfs) => [...currentPdfs, createAdminPdf(pdf, pdfsRef.current.length)]);
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
              onClick={openAddPopup}
              ref={addButtonRef}
            >
              <span aria-hidden="true">+</span>
              Add new PDF
            </button>
          </div>

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

        {showAddPopup && <AddPopup onClose={closeAddPopup} onSaved={handleSavedPdf} />}

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
