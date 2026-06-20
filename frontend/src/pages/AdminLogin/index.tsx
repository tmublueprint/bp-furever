import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebaseApp';
import './style.css'

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err: any) {
            setError('Invalid email or password.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className='admin-login-page'>
            <div className='admin-login-card'>
                <h1 className='admin-login-title'>Admin Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className='admin-login-field'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div className='admin-login-field'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    {error && <p role="alert">{error}</p>}
                    <button type="submit" className='admin-login-submit' disabled={submitting}>
                        {submitting ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
}