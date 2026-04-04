// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// ^ May be required later
import "./HowFurEverHelps.css";

import leaf from "../../assets//HowFurEverHelps/leaf-icon.svg";
import handshake from "../../assets/HowFurEverHelps/handshake-icon.svg";
import group from "../../assets/HowFurEverHelps/group-icon.svg";

function HowFurEverHelps() {
    return (
        <>
            <div id="how-furever-helps">
                <h2>How Fur-Ever Helps</h2>
                <div id="how-furever-helps-info">
                    <div className="furever-helps-card">
                        <img id="leaf" src={leaf} alt="leaf icon" aria-hidden = "true"></img>
                        <h3>Wildlife Education</h3>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh eu </p>
                    </div>
                    <div className="furever-helps-card">
                        <img id="handshake" src={handshake} alt="handshaking icon" aria-hidden = "true"></img>
                        <h3>Guidance & Support</h3>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh eu </p>
                    </div>
                    <div className="furever-helps-card">
                        <img id="group" src={group} alt="group icon" aria-hidden = "true"></img>
                        <h3>Community Awareness</h3>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh eu </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HowFurEverHelps;