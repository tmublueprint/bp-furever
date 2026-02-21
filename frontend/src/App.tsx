import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import FoundAnimal from './pages/FoundAnimal';
import GeneralInfo from './pages/GeneralInfo';
import Landing from './pages/LandingPage';
import Volunteer from './pages/Volunteer';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin/>} /> {/* Do not leave this public! */}
        <Route path="/blog" element={<Blog/>} />
        <Route path="/foundAnAnimal" element={<FoundAnimal/>} />
        <Route path="/information" element={<GeneralInfo/>} />
        <Route path="/" element={<Landing/>} />
        <Route path="/volunteer" element={<Volunteer/>} />
        <Route path="*" element={<ErrorPage />} /> {/* Any other page which is not found above */}
      </Routes>

    </BrowserRouter>
  )
}

export default App