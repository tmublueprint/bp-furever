import './AnimalBox.css';
import LeavePageIcon from '../../assets/leave-page.svg'

type AnimalBoxProps = {
    label?: string;
    hyperlink?: string;
    image?: string;
};


// default values set
function AnimalBox({label = "Animal", hyperlink = "/foundananimal", image}: AnimalBoxProps) {
    const boxColor = image ? "white" : "black";
    return ( 
        <div className="box" style={{backgroundImage: `url(${image})`}}>
            <h3 style={{color: boxColor}}>{label}</h3>
            <a href={hyperlink} className="url" aria-hidden = "true">
                <p>Learn what to do</p>
                <img src={LeavePageIcon} alt="Click here to learn what to do" aria-hidden = "true"/>
            </a>
        </div>
    )
}

export default AnimalBox;