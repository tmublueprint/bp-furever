import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import './style.css';
import PDFcard from '../../components/PDFCard/PDFCard';
import DeletePopup from '../../components/DeletePopup/DeletePopup';
import closeIcon from '../../assets/DeletePDFPopup/delete-pdf-remove.svg';

function Admin() {
  const [coverImage, setCoverImage] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [pdfLink, setPdfLink] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return () => {
      if (coverImage.startsWith('blob:')) {
        URL.revokeObjectURL(coverImage);
      }
    };
  }, [coverImage]);

  useEffect(() => {
    return () => {
      if (pdfLink.startsWith('blob:')) {
        URL.revokeObjectURL(pdfLink);
      }
    };
  }, [pdfLink]);

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

  const handleDeleteButtonClick = () => {
    setShowDeletePopup(true);
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      const imageInput = (document.querySelector('#admin-image-input') as HTMLInputElement);
      const pdfInput = (document.querySelector('#admin-pdf-input') as HTMLInputElement);

      const imageFile = imageInput?.files?.[0];
      const pdfFile = pdfInput?.files?.[0];

      if (imageFile) form.append('image', imageFile);
      else if (coverImage) form.append('imageLink', coverImage);

      if (pdfFile) form.append('pdf', pdfFile);
      else if (pdfLink) form.append('pdfLink', pdfLink);

      form.append('postTitle', title);
      form.append('postSummary', summary);

      const resp = await fetch('/api/guides', {
        method: 'POST',
        body: form,
      });

      if (!resp.ok) {
        const err = await resp.json();
        alert('Save failed: ' + (err?.error || resp.statusText));
        return;
      }

      await resp.json();
      alert('Guide saved');
      // Optionally you could set state from returned guide
    } catch (e) {
      console.error(e);
      alert('Save failed');
    }
  };

  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
    deleteButtonRef.current?.focus();
  };

  return (
    <>
      <main id="admin-container">
        <div id="admin-input-container">
          <div>
            <p>Cover Image</p>
            <input
              id="admin-image-input"
              type="file"
              accept="image/*"
              onChange={handleCoverImageFileChange}
            ></input>
          </div>
          <div id="title-input-container">
            <p>Title</p>
            <input
              type="text"
              style={{ height: 16, margin: 'auto 0 auto 10px' }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></input>
          </div>
          <div id="summary-input-container">
            <p>Summary</p>
            <input
              type="text"
              style={{ height: 16, margin: 'auto 0 auto 10px' }}
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
            ></input>
          </div>
          <div>
            <p>PDF</p>
            <input
              id="admin-pdf-input"
              type="file"
              accept="application/pdf"
              onChange={handlePdfFileChange}
            ></input>
          </div>
          <p>Or</p>
          <div>
            <p>Hyperlink</p>
            <input
              type="text"
              value={pdfLink}
              onChange={(event) => setPdfLink(event.target.value)}
            ></input>
          </div>
        </div>
        <div id="admin-preview-container">
          <PDFcard image={coverImage} title={title} summary={summary} link={pdfLink} />
          <button id="admin-save-btn" type="button" onClick={handleSave}>Save</button>
          <button
            id="admin-delete-btn"
            type="button"
            onClick={handleDeleteButtonClick}
            ref={deleteButtonRef}
          >
            <img id="delete-pdf-remove-icon" src={closeIcon} aria-hidden = "true" alt="Close" />
            Remove PDF
          </button>
        </div>
        <DeletePopup visible={showDeletePopup} onClose={handleCloseDeletePopup} pdfTitle={title} />
      </main>
    </>
  )
}

export default Admin
