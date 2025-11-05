import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CreatePetPage from './pages/CreatePetPage';
import EditPetPage from './pages/EditPetPage';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import MyPetsPage from './pages/MyPetsPage';
import PetProfilePage from './pages/PetProfilePage';


function App() {
  const [petToEdit, setPetToEdit] = useState([]);

  return (
    <>
      <div className="app">
        <header>
          <h1>Pet Health Tracker</h1>
          <p>A simple way to log, monitor, and manage your pet's health</p>
        </header>
          <Router>
              <Navigation/>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/calendar" element={<CalendarPage />}></Route>
              <Route path="/myPets" element={<MyPetsPage />}></Route>
              <Route path="/createPet" element={<CreatePetPage />}></Route>
              <Route path="/editPet" element={<EditPetPage petToEdit={petToEdit} />}></Route>
              <Route path="/myPets/:id" element={<PetProfilePage setPetToEdit={setPetToEdit} />}></Route>
            </Routes>
          </Router>
      </div>

    </>
  )
}

export default App

