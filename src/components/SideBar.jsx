import { useState } from "react"

import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Equipos from './Equipos'
import CatEquipos from './CatEquipos';

export const SideBar = () => {

    const [expanded, setExpanded] = useState(false)

    const toggleSidebar = () => {
        setExpanded(!expanded)
        // classList.toggle("change")
    }


    return (

        <BrowserRouter>

            <div className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
                
                {/* <div className="toggle-button" onClick={toggleSidebar}>
                    {expanded ? '◄' : '►'} 
                </div> */}

                <div className={`${expanded ? 'change' : 'menu-container'}`} onClick={toggleSidebar} >
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>

                {/* <ul className="li.sidebar">
                <li className="li.sidebar">Inicio</li>
                <li className="li.sidebar">Perfil</li>
                <li className="li.sidebar">Configuración</li>
                 </ul> */}




                {/* <nav className='navbar navbar-expand navbar-light bg-light'> */}
                <ul className='navbar-nav'>
                    <li className="nav-item">
                        <NavLink to='/' className='nav-link' > Alta de Equipo </NavLink>
                        <NavLink to='/Equipos' className='nav-link' > Equipos </NavLink>
                    </li>
                </ul>
                {/* </nav> */}
            </div>

            <div className='container'>
                <Routes>
                    <Route path='/' element={<Equipos />} />
                    <Route path='/Equipos' element={<CatEquipos />} />
                </Routes>
            </div>

        </BrowserRouter>



    );
};

