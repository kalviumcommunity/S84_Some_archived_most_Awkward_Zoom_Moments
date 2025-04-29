import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDropdown({ onSelect, defaultValue = "" }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://s84-some-archived-most-awkward-zoom.onrender.com/users');
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      value={defaultValue}
      className="p-2 border rounded"
    >
      <option value="">Select User</option>
      {users.map(user => (
        <option key={user._id} value={user._id}>
          {user.username}
        </option>
      ))}
    </select>
  );
}

export default UserDropdown;
