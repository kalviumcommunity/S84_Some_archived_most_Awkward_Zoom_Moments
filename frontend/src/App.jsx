
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AddEntity from "./Pages/AddEntity";
import UpdateMoment from "./components/UpdateMoment";


function App() {

  return (
    <>
     <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/add-entity" element={<AddEntity />} />
      <Route path="/update/:id" element={<UpdateMoment />} />
     </Routes>
    </>
  )
}

export default App
