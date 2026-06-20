import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebaseApp';

export function LogoutButton() {
    const navigate = useNavigate();

    async function handleLogout(){
        try {
            await signOut(auth);
            navigate('/admin/login');
        } catch (err) {
            console.error('Logout failed: ', err);
        }
    }

    return (
        <button type="button" onClick={handleLogout} className='admin-logout-btn'>
            Log out
        </button>
    )
}