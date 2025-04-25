import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/auth/logout',
        {},
        { withCredentials: true }
      );
      // Clear frontend user state
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
  );
}

export default Logout;