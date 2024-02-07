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


      {/* <div className="app-container">
        <SideBar />
        <div className="main-content">
        </div>
      </div> */}



      <div className="App" id="outer-container">
        <SideBar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id="page-wrap">
          {/* <h1>Cool Restaurant</h1>
        <h2>Check out our offerings in the sidebar!</h2> */}
        </div>
      </div>


    </>
  )
}

export default App
