import { useEffect, useState } from 'react';

function UserDropdown({ onSelect }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://s84-some-archived-most-awkward-zoom.onrender.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)} className="p-2 border rounded">
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
