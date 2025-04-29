import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AddEntity from './Pages/AddEntity';
import UpdateMoment from './components/UpdateMoment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-entity" element={<AddEntity />} />
        <Route path="/update/:id" element={<UpdateMoment />} />
      </Routes>
    </Router>
  );
}

export default App;
