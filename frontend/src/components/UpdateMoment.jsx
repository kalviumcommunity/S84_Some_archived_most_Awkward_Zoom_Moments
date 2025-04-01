import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateMoment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [moment, setMoment] = useState({ title: "", description: "", category: "", rating: "" });

  useEffect(() => {
    fetch(`https://your-backend-url/moments/${id}`)
      .then((res) => res.json())
      .then((data) => setMoment(data))
      .catch((error) => console.error("Error fetching moment:", error));
  }, [id]);

  const handleChange = (e) => {
    setMoment({ ...moment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://your-backend-url/moments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(moment),
    })
      .then((res) => res.json())
      .then(() => navigate("/"))
      .catch((error) => console.error("Error updating moment:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input type="text" name="title" value={moment.title} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Title" required />
      <textarea name="description" value={moment.description} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Description" required />
      <input type="text" name="category" value={moment.category} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Category" required />
      <input type="number" name="rating" value={moment.rating} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Rating" required />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update Moment</button>
    </form>
  );
};

export default UpdateMoment;
