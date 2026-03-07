import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Facebook from './pages/Facebook';
import FoundAnimal from './pages/FoundAnimal';
import Education from './pages/Education';
import Landing from './pages/LandingPage';
import Volunteer from './pages/Volunteer';
import ErrorPage from './pages/ErrorPage';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin/>} /> {/* Do not leave this public! */}
        <Route path="/facebook" element={<Facebook/>} />
        <Route path="/foundAnAnimal" element={<FoundAnimal/>} />
        <Route path="/education" element={<Education/>} />
        <Route path="/" element={<Landing/>} />
        <Route path="/volunteer" element={<Volunteer/>} />
        <Route path="/contact-us" element={<ContactUs/>} /> 
        <Route path="*" element={<ErrorPage />} /> {/* Any other page which is not found above */}
      </Routes>

    </BrowserRouter>
  )
}

export default App