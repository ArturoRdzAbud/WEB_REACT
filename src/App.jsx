import React from 'react';
import './App.css'

import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Equipos from './components/Equipos'
//import Equipos2 from './components/Equipos2'
import CatEquipos from './components/CatEquipos';

import { SideBar } from './components/SideBar';

function App() {
  return (
    <>
    
    
     {/* <BrowserRouter>


      <nav className='navbar navbar-expand navbar-light bg-light'>
        <ul className='navbar-nav'>
          <li className="nav-item">
            <NavLink to='/' className='nav-link' > Alta de Equipo </NavLink>
            <NavLink to='/Equipos' className='nav-link' > Catálogo de Equipos </NavLink>
          </li>
        </ul>
      </nav>


      

      <div className='container'>
        <Routes>
          <Route path='/' element={<Equipos />} />
          <Route path='/Equipos' element={<CatEquipos />} />
          
        </Routes>
      </div>

    </BrowserRouter>  */}


<div className="app-container">
      <SideBar />
      <div className="main-content">
        {/* Contenido principal de la aplicación */}
        {/* <h1>Contenido Principal</h1> */}
      </div>
    </div>

  
    </>
  )
}

export default App
