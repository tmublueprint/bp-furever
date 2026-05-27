import type { ReactNode } from "react";
import PDFCard from "../PDFCard/PDFCard";
import type { PDFCardItem } from "../PDFCard/PDFCard";
import "./PDFGallery.css";

interface PDFGalleryProps<TItem extends PDFCardItem> {
  pdfList: TItem[];
  className?: string;
  renderCardAction?: (pdf: TItem) => ReactNode;
}

function PDFGallery<TItem extends PDFCardItem>({ pdfList, className = "", renderCardAction }: PDFGalleryProps<TItem>) {
  const galleryClassName = ["pdf-gallery", className].filter(Boolean).join(" ");

  return (
    <div className={galleryClassName}>
      {pdfList.map((pdf) => (
        <div key={pdf.guideID || pdf.id || `${pdf.title}-${pdf.link}`}>
          <PDFCard
            image={pdf.image}
            title={pdf.title}
            summary={pdf.summary}
            link={pdf.link}
          />
          {renderCardAction ? renderCardAction(pdf) : null}
        </div>
      ))}
    </div>
  );
}

export default PDFGallery;
