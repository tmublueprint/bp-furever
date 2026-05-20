import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import './style.css';
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
  const [coverImage, setCoverImage] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [pdfLink, setPdfLink] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [pdfPendingDelete, setPdfPendingDelete] = useState<AdminPdf | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const draftCoverImageRef = useRef('');
  const draftPdfLinkRef = useRef('');
  const deleteButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const pdfsRef = useRef<AdminPdf[]>([]);
  const nextPdfIdRef = useRef(pdfData.length + 1);

  useEffect(() => {
    pdfsRef.current = pdfs;
  }, [pdfs]);

  useEffect(() => {
    return () => {
      revokeBlobUrl(draftCoverImageRef.current);
      revokeBlobUrl(draftPdfLinkRef.current);
      pdfsRef.current.forEach((pdf) => {
        revokeBlobUrl(pdf.image);
        revokeBlobUrl(pdf.link);
      });
    };
  }, []);

  const resetDraft = (shouldRevoke = true) => {
    if (shouldRevoke) {
      revokeBlobUrl(draftCoverImageRef.current);
      revokeBlobUrl(draftPdfLinkRef.current);
    }

    draftCoverImageRef.current = '';
    draftPdfLinkRef.current = '';
    setCoverImage('');
    setTitle('');
    setSummary('');
    setPdfLink('');

    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = '';
    }

    if (pdfInputRef.current) {
      pdfInputRef.current.value = '';
    }
  };

  const handlePdfFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    revokeBlobUrl(draftPdfLinkRef.current);

    const newPdfUrl = URL.createObjectURL(file);
    draftPdfLinkRef.current = newPdfUrl;
    setPdfLink(newPdfUrl);
  };

  const handleCoverImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    revokeBlobUrl(draftCoverImageRef.current);

    const newCoverImageUrl = URL.createObjectURL(file);
    draftCoverImageRef.current = newCoverImageUrl;
    setCoverImage(newCoverImageUrl);
  };

  const handlePdfLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    revokeBlobUrl(draftPdfLinkRef.current);

    const nextPdfLink = event.target.value;
    draftPdfLinkRef.current = nextPdfLink;
    setPdfLink(nextPdfLink);

    if (pdfInputRef.current) {
      pdfInputRef.current.value = '';
    }
  };

  const handleAddPdf = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedSummary = summary.trim();
    const trimmedPdfLink = pdfLink.trim();

    if (!trimmedTitle || !trimmedPdfLink) {
      return;
    }

    const newPdf: AdminPdf = {
      id: `admin-added-pdf-${nextPdfIdRef.current}`,
      image: coverImage,
      title: trimmedTitle,
      summary: trimmedSummary,
      link: trimmedPdfLink,
    };

    nextPdfIdRef.current += 1;
    setPdfs((currentPdfs) => [newPdf, ...currentPdfs]);
    resetDraft(false);
    setIsAddFormOpen(false);
  };

  const handleCancelAddPdf = () => {
    resetDraft();
    setIsAddFormOpen(false);
  };

  const handleAddPdfButtonClick = () => {
    //implement popup add pdf functionality here.
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
    <div className="admin-page-shell">
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
              onClick={handleAddPdfButtonClick}
            >
              <span aria-hidden="true">+</span>
              Add new PDF
            </button>
          </div>

          {isAddFormOpen && (
            <form className="admin-add-pdf-form" onSubmit={handleAddPdf}>
              <label>
                Cover Image
                <input
                  ref={coverImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageFileChange}
                />
              </label>
              <label>
                Title
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </label>
              <label>
                Summary
                <input
                  type="text"
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                />
              </label>
              <label>
                PDF
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfFileChange}
                />
              </label>
              <label>
                Hyperlink
                <input type="text" value={pdfLink} onChange={handlePdfLinkChange} required />
              </label>
              <div className="admin-add-pdf-actions">
                <button type="submit">Save PDF</button>
                <button type="button" onClick={handleCancelAddPdf}>
                  Cancel
                </button>
              </div>
            </form>
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
