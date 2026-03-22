import { useEffect, useState } from 'react';
import './style.css';
import PDFcard from '../../components/PDFCard/PDFCard';

function Admin() {
  const [coverImage, setCoverImage] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [pdfLink, setPdfLink] = useState('');

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

  const handlePdfFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleCoverImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <>
      <div id="admin-container">
        <div id="admin-input-container">
          <div>
            <p>Cover Image</p>
            <input
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
        </div>
      </div>
    </>
  )
}

export default Admin
