import { useEffect, useState } from 'react';
import UserDropdown from '../components/UserDropdown';

function MomentsPage() {
  const [moments, setMoments] = useState([]);

  const fetchMoments = (userId = '') => {
    const url = userId
      ? `https://s84-some-archived-most-awkward-zoom.onrender.com/moments/user/${userId}`
      : `https://s84-some-archived-most-awkward-zoom.onrender.com/moments`;

    fetch(url)
      .then(res => res.json())
      .then(data => setMoments(data));
  };

  useEffect(() => {
    fetchMoments();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Awkward Zoom Moments</h1>
      <UserDropdown onSelect={(userId) => fetchMoments(userId)} />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {moments.map(moment => (
          <div key={moment._id} className="p-4 border rounded shadow">
            <h2 className="font-semibold">{moment.title}</h2>
            <p>{moment.description}</p>
            <p className="text-sm text-gray-500">Posted by: {moment.created_by?.username || 'Unknown'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MomentsPage;
