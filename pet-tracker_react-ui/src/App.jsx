import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CreatePetPage from './pages/CreatePetPage';
import EditPetPage from './pages/EditPetPage';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import MyPetsPage from './pages/MyPetsPage';



function App() {
  const [petToEdit, setPetToEdit] = useState([]);

  return (
    <>
      <div className="app">
        <header>
          <h1>Pet Health Tracker</h1>
          <p>A simple way to log, monitor, and manage your pet's health.</p>
        </header>
          <Router>
              <Navigation/>
            <Routes>
              <Route path="/" element={<HomePage setPetToEdit={setPetToEdit} />}></Route>
              <Route path="/calendar" element={<CalendarPage />}></Route>
              <Route path="/myPets" element={<MyPetsPage setPetToEdit={setPetToEdit} />}></Route>
              <Route path="/createPet" element={<CreatePetPage />}></Route>
              <Route path="/editPet" element={<EditPetPage petToEdit={petToEdit} />}></Route>
            </Routes>
          </Router>
      </div>

    </>
  )
}

export default App

