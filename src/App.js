import './App.css';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ListingPage from './pages/ListingPage';
import NotFoundPage from './pages/NotFoundPage';
import EmployeeLogin  from './pages/EmployeeLogin';
import EmployeePropSettings from './pages/EmployeePropSettings';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useState } from 'react';
import Footer from './components/Footer';
import React from 'react';

function App() {
  const [ login,setLogin ] = useState(false);
  const [ menuOpen,setMenuOpen ] = useState(false);

  const updateLogin = (newLoginState) => {
   setLogin(newLoginState);
  }
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }
  return (
      <div className="App">
        <BrowserRouter>
            <NavBar menuOpen={menuOpen} toggleMenu={toggleMenu} setMenuOpen={setMenuOpen} />
            <Routes>
              <Route path='/' element={<HomePage menuOpen={menuOpen} />} />
              <Route path='/aboutus' element={<AboutUs />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/listings' element={<ListingPage />} />
              <Route path='/*' element={<NotFoundPage />} />
              <Route path='/settings' element={login ? <EmployeePropSettings /> : <Navigate to="/login" />} />
              <Route path='/login' element={<EmployeeLogin updateLogin={updateLogin} />} />
            </Routes>
          <Footer />
        </BrowserRouter>
      </div> 
  );
}
export default App;
