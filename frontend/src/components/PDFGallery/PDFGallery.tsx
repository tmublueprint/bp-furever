import PDFCard from "../PDFCard/PDFCard";
import "./PDFGallery.css";

type PDFCardProps = React.ComponentProps<typeof PDFCard>;

interface PDFGalleryProps {
    pdfList: (PDFCardProps & { guideID?: string })[];
}

function PDFGallery({ pdfList }: PDFGalleryProps) {
  return (
    <div className="pdf-gallery">
      {pdfList.map((pdf) => (
        <PDFCard
          key={pdf.guideID || `${pdf.title}-${pdf.link}`}
          image={pdf.image}
          title={pdf.title}
          summary={pdf.summary}
          link={pdf.link}
        />
      ))}
    </div>
  );
}

export default PDFGallery;