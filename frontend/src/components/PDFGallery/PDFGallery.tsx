import type { ComponentProps, ReactNode } from "react";
import PDFCard from "../PDFCard/PDFCard";
import "./PDFGallery.css";

type PDFCardProps = ComponentProps<typeof PDFCard>;

export type PDFGalleryItem = PDFCardProps & {
  id?: number | string;
};

interface PDFGalleryProps<TItem extends PDFGalleryItem = PDFGalleryItem> {
  pdfList: TItem[];
  className?: string;
  renderCardAction?: (pdf: TItem, index: number) => ReactNode;
}

function PDFGallery<TItem extends PDFGalleryItem>({
  pdfList,
  className = "",
  renderCardAction,
}: PDFGalleryProps<TItem>) {
  const galleryClassName = ["pdf-gallery", className].filter(Boolean).join(" ");

  return (
    <div className={galleryClassName}>
      {pdfList.map((pdf, index) => (
        <div className="pdf-gallery-item" key={pdf.id ?? `${pdf.title}-${index}`}>
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
