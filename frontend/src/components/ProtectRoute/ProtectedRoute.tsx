// frontend/src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { ReactNode } from 'react';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser, isAdmin, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // wait for onAuthStateChanged to resolve

  if (!currentUser || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}