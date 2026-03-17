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

    return(
        <div id="PDFCard">
            <div id="pdf-card-image-container">
                <img id="pdf-card-image" src={image || placeholder} alt=""></img>
                <img id="pdf-card-overlayed-img" src={missingImg}></img>
            </div>
            <div id="pdf-card-content">
                <h1>{title}</h1>
                <p>{summary}</p>
                <a id="pdf-card-btn" href={link} target="_blank" rel="noopener noreferrer">Read Guide
                    <div id="pdf-btn-imgs">
                        <img id="pdf-card-arrow" src={arrow} alt="Arrow"></img>
                        <img id="pdf-card-ellipse" src={ellipse}></img>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default PDFCard;