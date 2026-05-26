import type { ReactNode } from "react";
import PDFCard, { type PDFCardItem } from "../PDFCard/PDFCard";
import "./PDFGallery.css";

interface PDFGalleryProps<TItem extends PDFCardItem = PDFCardItem> {
  pdfList: TItem[];
  className?: string;
  renderCardAction?: (pdf: TItem, index: number) => ReactNode;
}

function PDFGallery<TItem extends PDFCardItem>({
  pdfList,
  className = "",
  renderCardAction,
}: PDFGalleryProps<TItem>) {
  const galleryClassName = ["pdf-gallery", className].filter(Boolean).join(" ");

  return (
    <div className={galleryClassName}>
      {pdfList.map((pdf, index) => (
        <div className="pdf-gallery-item" key={pdf.id ?? pdf.guideID ?? `${pdf.title}-${index}`}>
          <PDFCard image={pdf.image} title={pdf.title} summary={pdf.summary} link={pdf.link} />
          {renderCardAction && (
            <div className="pdf-gallery-card-action">{renderCardAction(pdf, index)}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PDFGallery;
