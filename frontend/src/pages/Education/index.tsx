import { useEffect, useState } from 'react';
import './style.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import PDFGallery from '../../components/PDFGallery/PDFGallery';
import type { PDFCardItem } from '../../components/PDFCard/PDFCard';
import wildlife from "../../assets/pdf/Relocating Wildlife Doesn't Work.pdf";
import property from '../../assets/pdf/Wildlife proofing your property A checklist for your home - Oakville.pdf';
import wildlifeProofingImage from '../../assets/pdf/wildlife-proofing.png';
import relocatingWildlifeImage from '../../assets/pdf/relocating-wildlife.png';

export const pdfData = [
  {
    guideID: 'fallback-wildlife-proofing',
    image: wildlifeProofingImage,
    title: 'Wildlife proofing your property',
    summary: 'A checklist for your home',
    link: property,
  },
  {
    guideID: 'fallback-relocating-wildlife',
    image: relocatingWildlifeImage,
    title: "Relocating Wildlife Doesn't Work",
    summary: 'Why relocation is not an effective solution',
    link: wildlife,
  },
];

type Guide = {
  guideID: string;
  postTitle: string;
  postSummary: string;
  imageLink: string;
  pdfLink: string;
};

function Education() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const firestoreGuides: PDFCardItem[] = guides.map((guide) => ({
    guideID: guide.guideID,
    image: guide.imageLink,
    title: guide.postTitle,
    summary: guide.postSummary,
    link: guide.pdfLink,
  }));
  const pdfList: PDFCardItem[] = firestoreGuides.length > 0 ? firestoreGuides : pdfData;

  useEffect(() => {
    const loadGuides = async () => {
      try {
        const response = await fetch('/api/guides');

        if (!response.ok) {
          throw new Error(`Failed to load guides: ${response.status}`);
        }

        const data = (await response.json()) as Guide[];
        setGuides(data);

        if (data.length === 0) {
          setError('');
        }
      } catch (fetchError) {
        console.error(fetchError);
        setError('Unable to load guides right now.');
      } finally {
        setLoading(false);
      }
    };

    loadGuides();
  }, []);

  return (
    <>
    <NavBar />
    <main className="education-page">
       <section className="education-hero">
         <div className="education-hero-container">
           <h1 className="education-hero-title">Wildlife Information & Guides</h1>
           <p className="education-hero-body">Practical guidance to help protect wildlife and coexist responsibly.</p>
         </div>
       </section>

       <section className='pdf-section'>
  {loading && <p className="education-status">Loading guides...</p>}
  {!loading && error && <p className="education-status">{error}</p>}
  {!loading && !error && <PDFGallery pdfList={pdfList} />}
       </section> 
    </main>
    <Footer />
    </>
  )
}

export default Education
