import './style.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import PDFGallery from '../../components/PDFGallery/PDFGallery';

const pdfData = [
  {
    id: 1, //to be change when needed
    image: "frontend/public/image/wildlife-proofing.png",
    title: "Wildlife proofing your property",
    summary: "A checklist for your home",
    link: "/frontend/public/pdf/Wildlife proofing your property_ A checklist for your home - Oakville.pdf",
  },
  {
    id: 2,
    image: "frontend/public/image/relocating-wildlife.png",
    title: "Relocating Wildlife Doesn't Work",
    summary: "Why relocation is not an effective solution",
    link: "frontend/public/pdf/Relocating Wildlife Doesn't Work.pdf",
  },
]

function Education() {
  return (
    <>
    <main className="education-page">
      <NavBar />
       <section className="education-hero">
         <div className="education-hero-container">
           <h1 className="education-hero-title">Wildlife Information & Guides</h1>
           <p className="education-hero-body">Practical guidance to help protect wildlife and coexist responsibly.</p>
         </div>
       </section>
       <section className='pdf-gallery'>
        <PDFGallery pdfList={pdfData} />
       </section>
      <Footer />
     </main>
    </>
  )
}

export default Education
