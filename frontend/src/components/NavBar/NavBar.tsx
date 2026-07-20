
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import fureverLogo from '../../assets/NavBar/fureverLogo.svg'; 
import fureverIcon from '../../assets/NavBar/fureverIcon.svg'; 
import hamburgerMenuPlaceHolder from '../../assets/NavBar/hamburger_menu.svg'; 
import xIcon from '../../assets/NavBar/x-icon.svg'; 
import './NavBar.css';


function NavBar() {
  useEffect(() => {
    document.title = "Fur-Ever Wild Rehabilitation";

    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = fureverIcon;
  }, []);

  const [hideMenu, setHideMenu] = useState(true);

  const handleMenuClick = () => {
      setHideMenu(prev => !prev); 
  }; 

  return (
    <header>
      <nav id="navbar">
        <img src={fureverLogo} id="furever-logo" alt="furever-logo" style={{height: "90px"}}/>
        
        { hideMenu && <a id="hamburger-menu-wrapper" onClick={handleMenuClick}>
          <img src={hamburgerMenuPlaceHolder} id="hamburger-menu" alt="hamburger-menu"/> 
        </a>}

        <div className={hideMenu ? "navlink-container" : "navlink-container show-side-menu"} id="navlink-container">
          { !hideMenu && <a id="x-icon-wrapper" onClick={handleMenuClick}>
            <img src={xIcon} id="closing-icon" alt="closing-icon"/>
          </a> }
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/education" className={({ isActive }) => isActive ? "active" : ""}>Education</NavLink>
          <NavLink to="/volunteer" className={({ isActive }) => isActive ? "active" : ""}>Volunteer</NavLink>
          {/* <NavLink to="/facebook" className={({ isActive }) => isActive ? "active" : ""}>Facebook</NavLink> */}
          <NavLink to="/foundAnAnimal" className={({ isActive }) => isActive ? "active" : ""}>Found An Animal</NavLink>
          <NavLink to="https://www.facebook.com/FEVRWR/" className={({ isActive }) => isActive ? "active" : ""}>Facebook</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default NavBar
