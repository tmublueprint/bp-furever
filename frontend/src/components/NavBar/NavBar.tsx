
import { NavLink } from "react-router-dom";
import fureverLogo from '../../assets/NavBar/fureverLogo.svg'; 
import './NavBar.css';

function NavBar() {
  return (
    <>
      <div id="navbar">
        <img src={fureverLogo} alt="furever-logo" style={{width: "85px", height: "90px", paddingLeft: "80px"}}/>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/education" className={({ isActive }) => isActive ? "active" : ""}>Education</NavLink>
        <NavLink to="/volunteer" className={({ isActive }) => isActive ? "active" : ""}>Volunteer</NavLink>
        <NavLink to="/facebook" className={({ isActive }) => isActive ? "active" : ""}>Facebook</NavLink>
        <NavLink to="/contact-us" className={({ isActive }) => isActive ? "active" : ""}>Contact Us</NavLink>
      </div>

    </>
  )
}

export default NavBar
