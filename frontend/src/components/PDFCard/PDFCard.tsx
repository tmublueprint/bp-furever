import "./PDFCard.css";
import arrow from "../../assets/PDFCard/pdf-card-arrow.svg";
import placeholder from "../../assets/PDFCard/pdf-card-img-placeholder.svg";
import missingImg from "../../assets/PDFCard/pdf-card-missing-img.svg";
import ellipse from "../../assets/PDFCard/pdf-card-ellipse.svg";

interface PDFCardProps{
    image: string;
    title: string;
    summary: string;
    link: string;
}

function PDFCard({image, title, summary, link}: PDFCardProps){
    const hasCustomImage = Boolean(image);

    return(
        <div className="PDFCard">
            <div className="pdf-card-image-container">
                <img className="pdf-card-image" src={image || placeholder} alt=""></img>
                {!hasCustomImage && <img className="pdf-card-overlayed-img" src={missingImg}></img>}
            </div>
            <div className="pdf-card-content">
                <h1>{title}</h1>
                <p>{summary}</p>
                <a className="pdf-card-btn" href={link} target="_blank" rel="noopener noreferrer">Read Guide
                    <div className="pdf-btn-imgs">
                        <img className="pdf-card-arrow" src={arrow} alt="Arrow" aria-hidden="true"></img>
                        <img className="pdf-card-ellipse" src={ellipse} aria-hidden="true" ></img>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default PDFCard;