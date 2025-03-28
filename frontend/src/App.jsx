
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AddEntity from "./Pages/AddEntity";

function App() {

  return (
    <>
     <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/add-entity" element={<AddEntity />} />
     </Routes>
    </>
  )
}

export default App
