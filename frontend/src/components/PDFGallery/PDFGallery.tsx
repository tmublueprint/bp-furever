import PDFCard from "../PDFCard/PDFCard";
import "./PDFGallery.css";

type PDFCardProps = React.ComponentProps<typeof PDFCard>;

interface PDFGalleryProps {
    pdfList: PDFCardProps[];
}

function PDFGallery({ pdfList }: PDFGalleryProps) {
  return (
    <div className="pdf-gallery">
      {pdfList.map((pdf) => (
        <PDFCard
        //   key={pdf.id}     --to be revisited once ID is required
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