"use client";
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
export default function AdminLogin() {
  const { login, logout, isAuthenticated } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (login(password)) {
      setPassword('');
      setShowLogin(false);
    } else {
      setError('Invalid password');
    }
  };

  if (isAuthenticated) {
    return (
      <div className="p-4 mb-6 border border-green-200 rounded-lg bg-green-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 mr-3 bg-green-500 rounded-full"></div>
            <span className="font-semibold text-green-800">Admin Mode Active</span>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm text-white transition-colors bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 mb-6 border border-gray-200 rounded-lg bg-gray-50">
      {!showLogin ? (
        <div className="text-center">
          <button
            onClick={() => setShowLogin(true)}
            className="bg-[#4A154B] hover:bg-[#3A0E3A] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Admin Login
          </button>
          <p className="mt-2 text-sm text-gray-600">
            Authorized personnel only
          </p>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-[#4A154B] mb-3 text-center">
            Admin Authentication
          </h3>
          
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A154B] focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="mb-3 text-sm text-center text-red-600">{error}</div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#4A154B] hover:bg-[#3A0E3A] text-white py-2 rounded-lg font-semibold transition-colors"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              className="flex-1 py-2 font-semibold text-white transition-colors bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}