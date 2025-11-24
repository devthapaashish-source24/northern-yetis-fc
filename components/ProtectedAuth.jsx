"use client";
import { useAuth } from '../contexts/AuthContext';
import MatchInfo from './MatchInfo';
import AdminLogin from './AdminLogin';
export default function ProtectedAuth() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <AdminLogin />
      
      {isAuthenticated && (
        <div>
          <MatchInfo />
        </div>
      )}
    </div>
  );
}