import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Facebook from './pages/Facebook';
import FoundAnimal from './pages/FoundAnimal';
import Education from './pages/Education';
import Landing from './pages/LandingPage';
import Volunteer from './pages/Volunteer';
import ErrorPage from './pages/ErrorPage';
import { ProtectedRoute } from './components/ProtectRoute/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin/>}/>
          <Route 
            path="/admin"
            element={
            <ProtectedRoute>
              <Admin/>
            </ProtectedRoute>
          }/>
          {/* <Route path="/facebook" element={<Facebook/>} /> */}
          <Route path="/foundAnAnimal" element={<FoundAnimal/>} />
          <Route path="/education" element={<Education/>} />
          <Route path="/" element={<Landing/>} />
          <Route path="/volunteer" element={<Volunteer/>} />
          <Route path="*" element={<ErrorPage />} /> {/* Any other page which is not found above */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App