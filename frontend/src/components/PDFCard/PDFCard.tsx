import "./PDFCard.css";

interface PDFCardProps{
    title: string;
    summary: string;
    link: string;
}

function PDFCard({title, summary, link}: PDFCardProps){
    return(
        <div id="PDFCard">
            <img alt="Image"></img>
            <h3>{title}</h3>
            <p>{summary}</p>
            <a className="pdf-card-btn" href={link}>Read Guide<img alt="Arrow"></img></a>
        </div>
    )
}

export default PDFCard;