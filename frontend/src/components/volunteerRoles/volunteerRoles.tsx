import { useState } from 'react';
import Role1 from '../../assets/Volunteer/on-site-support.svg'; 
import Role2 from '../../assets/Volunteer/foster-care.svg'; 
import Role3 from '../../assets/Volunteer/driver-support.svg';
import checkButton from '../../assets/Volunteer/checkmark.svg'; 
import "./volunteerRoles.css";

function VolunteerRoles(){

    type RoleId = 'onsite' | 'foster' | 'driver';

    const [selectedRole, setSelectedRole] = useState<RoleId>('onsite');

    const roleInfo = {
        onsite: {
            title: "General Volunteer Requirements",
            items: [
                "Available during baby season (minimum 2× per week, 4-hour shifts)",
                "Valid driver's license",
                "Must be 18 years or older",
                "Resume required (no cover letter) plus 2 references",
                "Tetanus, Season Flu, and Avian Influenza Vaccines",
                "RVS Exam completed (MNRF— Aylmer District)",
                "—To complete the rabies vector species exam and get study material email",
                "mnfr.ay@ontario.ca",
                "—Experience with wildlife or animal rescue is considered an asset."
            ]
        },
        foster: {
            title: "Foster Care Requirements",
            items: [
                "Available during baby season (minimum 2× per week, 4-hour shifts)",
                "Valid driver's license",
                "Must be 18 years or older",
                "Resume required (no cover letter) plus 2 references",
                "Tetanus, Season Flu, and Avian Influenza Vaccines",
                "RVS Exam completed (MNRF— Aylmer District)",
                "—To complete the rabies vector species exam and get study material email",
                "mnfr.ay@ontario.ca",
                "—Experience with wildlife or animal rescue is considered an asset."
            ]
        },
        driver: {
            title: "Driver Volunteer Requirements",
            items: [
                "A Valid Driver license",
                "Willing to drive a minimum of 1 hour away",
                "Brief description of your past career history and your interest in helping",
                "Willing to be on an 'on call' basis as we never know when, where or the condition of the animal(s).",
                "—Experience with wildlife or animal rescue is considered an asset."
            ]
        }
    }

    return (
        <>
            <section className="roles-container">
                <h2 className="roles-title">Volunteer Roles & Opportunities</h2>
                <h3 className="roles-subtitle">Click below to learn more about each role</h3>
                <div className="roles">
                    {[
                        { id: 'onsite', img: Role1, alt: 'house icon', label: 'On-Site Support', desc:'Assisting with daily rehabilitation and care tasks.'},
                        { id: 'foster', img: Role2, alt: 'baby bottle icon', label: 'Foster Care', desc: 'Providing temporary care in their homes for wildlife in need.'},
                        { id: 'driver', img: Role3, alt: 'car icon', label: 'Driver Support', desc: 'Helping transport wildlife or supplies when required.'},
                    ].map(role => (
                        <div
                            key={role.id}
                            className={`role ${selectedRole == role.id ? 'active' :''}`}
                            onClick={() => setSelectedRole(selectedRole === role.id ? 'onsite': role.id as RoleId)}
                        >
                            {selectedRole === role.id && (
                                <img src={checkButton} alt="role selected" className="role-active-check" />
                            )}
                            <img src={role.img} alt={role.alt}/>
                            <h3>{role.label}</h3>
                            <p>{role.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="green-vector"></div>
            </section>

            <section className="requirement-container">
                <h2 className="requirement-title">
                    {roleInfo[selectedRole].title}
                </h2>
                <div className="requirements">
                    <ul className="requirement-list">
                        {roleInfo[selectedRole].items.map((item, index) => (
                            <li key={index} className="requirement-item"> ✔ {item}</li>
                        ))}
                    </ul>
                </div>
                <div className="requirement-vector">
                    <h1 className="requirement-vector-text">Wildlife rehabilitation is a long-term commitment, especially during baby season.<br />Volunteers must be dependable and available as scheduled.</h1>
                </div>
            </section>
        </>
    )
}

export default VolunteerRoles;