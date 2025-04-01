import { Link } from "react-router-dom";

const MomentCard = ({ moment, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">{moment.title}</h2>
      <p className="text-gray-700">{moment.description}</p>
      
      {moment.image && (
        <img src={moment.image} alt="Awkward Zoom moment" className="rounded mt-2" />
      )}

      <p className="text-sm text-gray-400">Category: {moment.category}</p>

      <div className="flex items-center justify-between mt-3">
        <span className="text-sm text-gray-500">Rating: {moment.rating}/5</span>
        <button className="text-blue-500 hover:underline">Rate This Moment</button>
      </div>

      {/* Edit & Delete Buttons */}
      <div className="flex justify-between mt-3">
        <Link
          to={`/update/${moment._id}`} 
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this moment?")) {
              onDelete(moment._id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MomentCard;
