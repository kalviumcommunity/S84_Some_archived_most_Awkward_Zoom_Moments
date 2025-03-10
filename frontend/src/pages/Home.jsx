import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Some Archived Most Awkward Zoom Moments
      </h1>

      <p className="text-lg text-gray-700 text-center max-w-2xl">
        Ever had an awkward moment on Zoom? You're not alone! This platform is a collection of the funniest and most embarrassing Zoom moments. 
        Share your own mishaps, rate others, and explore categories like "Worst Virtual Backgrounds" or "Most Embarrassing Mutes."
      </p>

      <div className="mt-6 space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Key Features</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg">
          <li>Submit your funniest Zoom moments with videos or descriptions.</li>
          <li>Rate other people's moments on a cringe scale of 1-5.</li>
          <li>Search for specific types of awkward moments.</li>
          <li>Personalized feed based on your favorite moments.</li>
          <li>"Zoom Moment of the Week" leaderboard.</li>
          <li>"Random Awkward Zoom Moment" button for endless fun.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">Tech Stack</h2>
        <p className="text-gray-700 text-lg">
          <strong>Frontend:</strong> React (Vite), Tailwind CSS<br />
          <strong>Backend:</strong> Express.js, MongoDB<br />
          <strong>Authentication:</strong> Session-based login<br />
          <strong>Deployment:</strong> GitHub Pages (Frontend), Render (Backend)
        </p>
      </div>

      <div className="mt-6">
        <a 
          href="https://s84-some-archived-most-awkward-zoom.onrender.com/moments" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
          Visit Live Project
        </a>
      </div>
    </div>
  );
}
