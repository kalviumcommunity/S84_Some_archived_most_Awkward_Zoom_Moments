import { useState, useEffect } from "react";

const AddEntity = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [moments, setMoments] = useState([]);

  // Fetch moments from the server
  useEffect(() => {
    fetch("https://s84-some-archived-most-awkward-zoom.onrender.com/moments")
      .then((res) => res.json())
      .then((data) => setMoments(data))
      .catch((err) => console.error("Error fetching moments:", err));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMoment = { 
      title, 
      description, 
      category: category || "default", // Use the category state variable
      rating: rating || 0 // Use the rating state variable
    };

    const response = await fetch("https://s84-some-archived-most-awkward-zoom.onrender.com/moments", {
      if (response.ok) {
        const savedMoment = await response.json();
        setMoments([...moments, savedMoment.moment]);
        setTitle("");
        setDescription("");
      }
    if (response.ok) {
      setMoments([...moments, newMoment]);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add a New Awkward Zoom Moment</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Enter Moment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          placeholder="Describe the moment..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>

      <h3 className="text-xl font-semibold">Submitted Moments</h3>
      <ul>
        {moments.map((moment, index) => (
          <li key={index} className="p-3 border-b">{moment.title}: {moment.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddEntity;
