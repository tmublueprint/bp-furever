import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import closeIcon from '../../assets/DeletePDFPopup/delete-pdf-remove.svg';
import PDFCard from '../PDFCard/PDFCard';
import type { PDFCardItem } from '../PDFCard/PDFCard';

type GuideApiItem = {
  guideID: string;
  postTitle: string;
  postSummary: string;
  imageLink: string;
  pdfLink: string;
};

type AddPopupProps = {
  onClose: () => void;
  onSaved: (pdf: PDFCardItem) => void;
};

const revokeBlobUrl = (url: string) => {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

function AddPopup({ onClose, onSaved }: AddPopupProps) {
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [pdfLink, setPdfLink] = useState('');
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const coverImageInputRef = useRef<HTMLInputElement | null>(null);
  const pdfInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      revokeBlobUrl(coverImagePreview);
    };
  }, [coverImagePreview]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  const resetState = () => {
    revokeBlobUrl(coverImagePreview);
    setCoverImagePreview('');
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

  const closePopup = () => {
    resetState();
    onClose();
  };

  const handleCoverImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    revokeBlobUrl(coverImagePreview);
    setCoverImagePreview(URL.createObjectURL(file));
  };

  const handleSaveNewPdf = async () => {
    try {
      const form = new FormData();
      const imageFile = coverImageInputRef.current?.files?.[0];
      const pdfFile = pdfInputRef.current?.files?.[0];

      if (!title.trim() || !summary.trim()) {
        alert('Title and summary are required.');
        return;
      }

      if (imageFile) {
        form.append('image', imageFile);
      } else if (coverImagePreview) {
        form.append('imageLink', coverImagePreview);
      }

      if (pdfFile) {
        form.append('pdf', pdfFile);
      } else if (pdfLink.trim()) {
        form.append('pdfLink', pdfLink.trim());
      }

      form.append('postTitle', title.trim());
      form.append('postSummary', summary.trim());

      const response = await fetch('/api/guides', {
        method: 'POST',
        body: form,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.error || response.statusText);
      }

      const result = (await response.json()) as { guide: GuideApiItem };

      onSaved({
        guideID: result.guide.guideID,
        id: result.guide.guideID,
        image: result.guide.imageLink,
        title: result.guide.postTitle,
        summary: result.guide.postSummary,
        link: result.guide.pdfLink,
      });

      closePopup();
    } catch (error) {
      console.error(error);
      alert(`Save failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <dialog ref={dialogRef} aria-labelledby="add-pdf-popup-title" onCancel={closePopup}>
      <button type="button" onClick={closePopup} aria-label="Close add PDF popup">
        <img src={closeIcon} alt="" aria-hidden="true" />
      </button>

      <h2 id="add-pdf-popup-title">Add PDF</h2>

      <div>
        <p>Cover Image</p>
        <input ref={coverImageInputRef} type="file" accept="image/*" onChange={handleCoverImageFileChange} />
      </div>

      <div>
        <p>Title</p>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
      </div>

      <div>
        <p>Summary</p>
        <input type="text" value={summary} onChange={(event) => setSummary(event.target.value)} />
      </div>

      <div>
        <p>PDF</p>
        <input ref={pdfInputRef} type="file" accept="application/pdf" />
      </div>

      <p>Or</p>

      <div>
        <p>Hyperlink</p>
        <input type="text" value={pdfLink} onChange={(event) => setPdfLink(event.target.value)} />
      </div>

      <PDFCard
        image={coverImagePreview}
        title={title || 'Preview title'}
        summary={summary || 'Preview summary'}
        link={pdfLink || '#'}
      />


      <div>
        <button type="button" onClick={closePopup}>
          Cancel
        </button>
        <button type="button" onClick={handleSaveNewPdf}>
          Save PDF
        </button>
      </div>
    </dialog>
  );
}

export default AddPopup;
