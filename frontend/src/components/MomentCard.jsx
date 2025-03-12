const MomentCard = ({ moment }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-2">{moment.title}</h2>
        <p className="text-gray-700">{moment.description}</p>
        {moment.image && <img src={moment.image} alt="Awkward Zoom moment" className="rounded mt-2" />}
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-gray-500">Rating: ⭐ {moment.rating}/5</span>
          <button className="text-blue-500 hover:underline">Rate This Moment</button>
        </div>
      </div>
    );
  };
  
  // Dummy data for now
  const dummyMoment = {
    title: "Forgot to mute — loud karaoke!",
    description: "Sang the entire chorus of 'Bohemian Rhapsody' without realizing everyone heard it.",
    image: "https://example.com/zoom-fail.jpg",
    rating: 4,
  };
  
  const App = () => (
    <div className="p-4">
      <MomentCard moment={dummyMoment} />
    </div>
  );
  
  export default App;
  