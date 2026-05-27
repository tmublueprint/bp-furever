import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import './AddPDFPopup.css';
import PDFCard from '../PDFCard/PDFCard';
import type { PDFCardItem } from '../PDFCard/PDFCard';

type Props = {
  visible: boolean;
  onSave: (payload: { image: string; title: string; summary: string; link: string }) => void;
  onCancel: () => void;
};

const revoke = (url: string) => { if (url && url.startsWith('blob:')) URL.revokeObjectURL(url); };

export default function AddPDFPopup({ visible, onSave, onCancel }: Props) {
  const [coverImage, setCoverImage] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [pdfLink, setPdfLink] = useState('');
  const pdfInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const pdfFileRef = useRef<File | null>(null);
  const coverFileRef = useRef<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    return () => {
      revoke(coverImage);
      revoke(pdfLink);
    };
  }, [coverImage, pdfLink]);

  const handlePdfFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    revoke(pdfLink);
    const url = URL.createObjectURL(file);
    setPdfLink(url);
    pdfFileRef.current = file;
  };

  const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    revoke(coverImage);
    const url = URL.createObjectURL(file);
    setCoverImage(url);
    coverFileRef.current = file;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    const l = pdfLink.trim();
    if (!t || !l) return;
    // If files are selected, upload them to backend; otherwise send links
    (async () => {
      try {
        setSaving(true);
        const form = new FormData();
        form.append('postTitle', t);
        form.append('postSummary', summary.trim());

        if (coverFileRef.current) {
          form.append('image', coverFileRef.current);
        } else if (coverImage && coverImage.startsWith('http')) {
          form.append('imageLink', coverImage);
        }

        if (pdfFileRef.current) {
          form.append('pdf', pdfFileRef.current);
        } else if (l && (l.startsWith('http') || l.startsWith('/'))) {
          form.append('pdfLink', l);
        }

        const resp = await fetch('/api/guides', { method: 'POST', body: form });
        if (!resp.ok) {
          console.error('Upload failed', resp.status);
          return;
        }

        const body = await resp.json();
        const guide = body.guide;
        const imageOut = guide.imageLink ?? coverImage;
        const pdfOut = guide.pdfLink ?? l;

        onSave({ image: imageOut, title: guide.postTitle ?? t, summary: guide.postSummary ?? summary.trim(), link: pdfOut });
      } catch (err) {
        console.error('Save failed', err);
      } finally {
        setSaving(false);
        // cleanup local state
        setTitle(''); setSummary(''); setPdfLink(''); setCoverImage('');
        pdfFileRef.current = null; coverFileRef.current = null;
        if (pdfInputRef.current) pdfInputRef.current.value = '';
        if (coverInputRef.current) coverInputRef.current.value = '';
      }
    })();
  };

  if (!visible) return null;

  const previewItem: PDFCardItem = {
    image: coverImage,
    title: title || 'Preview title',
    summary: summary || 'Preview summary',
    link: pdfLink || '#',
  };

  return (
    <div className="addpdf-overlay">
      <div className="addpdf-popup" role="dialog" aria-modal="true">
        <form className="addpdf-form" onSubmit={handleSubmit}>
          <div id="admin-input-container">
            <div>
              <p>Cover Image</p>
              <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverImageChange} />
            </div>
            <div id="title-input-container">
              <p>Title</p>
              <input
                type="text"
                style={{ height: 16, margin: 'auto 0 auto 10px' }}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
            <div id="summary-input-container">
              <p>Summary</p>
              <input
                type="text"
                style={{ height: 16, margin: 'auto 0 auto 10px' }}
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
              />
            </div>
            <div>
              <p>PDF</p>
              <input ref={pdfInputRef} type="file" accept="application/pdf" onChange={handlePdfFileChange} />
            </div>
            <p>Or</p>
            <div>
              <p>Hyperlink</p>
              <input
                type="text"
                value={pdfLink}
                onChange={(event) => setPdfLink(event.target.value)}
              />
            </div>
            <div>
              <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save PDF'}</button>
              <button type="button" onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </form>
        <div id="admin-preview-container">
          <PDFCard image={previewItem.image} title={previewItem.title} summary={previewItem.summary} link={previewItem.link} />
        </div>
      </div>
    </div>
  );
}
