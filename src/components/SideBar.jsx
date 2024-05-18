import React, { useRef, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../css/Sidebar.css';

import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'

//pantallas

import CatEquipos from './CatEquipos';
import CatTiposDeSancion from './CatTiposDeSancion';
import CatArbitro from './CatArbitro';
import CatEquipoTorneo from './CatEquipoTorneo';
import CatEquipoJugador from './CatEquipoJugador';
import CatJugador from './CatJugador';
import TraEstadisticaJugador from './TraEstadisticaJugador';
//Iconos
import EquiposSvg from '../svg/equipos.svg?react'
import BalonSvg from '../svg/balon.svg?react'
import Arbitrosvg from '../svg/arbitro.svg?react'
import Tarjetasvg from '../svg/tarjetas.svg?react'
import Programacionsvg from '../svg/evento-de-calendario.svg?react'
import EquipoTorneoSvg from '../svg/menu-equipo-torneo.svg?react'
import EquipoJugadorSvg from '../svg/menu-equipo-jugador.svg?react'
import EstadisticaJugadorSvg from '../svg/menu-estadistica-jugador.svg?react'
import EstadisticaEquipoSvg from '../svg/menu-estadistica-equipo.svg?react'
import CapturaResultadosSvg from '../svg/menu-captura-resultados.svg?react'

import TraProgramacionDePartidos from './TraProgramacionDePartidos';
import TraCapturaDeResultados from './TraCapturaDeResultados';
import EstEstadisticaPorEquipo from './EstEstadisticaPorEquipo';


// export default props => {
export const SideBar = () => {

    // const menuRef = useRef(null); // Create a ref

    const [isOpen, setOpen] = useState(false)
    const handleIsOpen = () => {
        setOpen(!isOpen)
    }
    const closeMenu = () => {
        // Close the menu programmatically
        // You can access the menu instance using ref
        // For example, if you have a ref like `menuRef`
        // menuRef.current.closeMenu();
        setOpen(false)
    };

    return (

        <>


            {/*  


        //npm install react-burger-menu@2.7.1 --force
        //npm install axios
        //npm install react-router-dom
        //npm install @tanstack/react-table
        //npm install --save-dev vite-plugin-svgr
        //20240312 npm install react-beautiful-dnd //https://medium.com/@wbern/getting-react-18s-strict-mode-to-work-with-react-beautiful-dnd-47bc909348e4
            //para que funcione en desarrollo comentar el strictmode en el archivo main.jsx
        //20240408 npm install react-bootstrap bootstrap
            // para que funcionene los modales bootstrap en react




        https://app.netlify.com/
        https://www.digitalocean.com/community/tutorials/react-react-burger-menu-sidebar  
        https://www.npmjs.com/package/react-burger-menu   
        https://tanstack.com/table/latest/docs/introduction
        https://iconsvg.xyz/
        https://www.svgviewer.dev/
        https://picsvg.com/


                https://github.com/azouaoui-med/react-pro-sidebar/blob/master/storybook/Playground.tsx
                https://azouaoui-med.github.io/react-pro-sidebar/iframe.html?id=playground--playground&args=&viewMode=story
                https://www.geeksforgeeks.org/how-to-create-a-responsive-sidebar-with-dropdown-menu-in-reactjs/

      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/salads">
        Salads
      </a>
      <a className="menu-item" href="/pizzas">
        Pizzas
      </a>
      <a className="menu-item" href="/desserts">
        Desserts
      </a> */}


            <BrowserRouter>


                <Menu isOpen={isOpen}
                    onOpen={handleIsOpen}
                    onClose={handleIsOpen}>
                    <ul className='navbar-nav'>
                        <li className="nav-item">
                            {/* <NavLink to='/Equipos' className='nav-link' > <EquiposSvg />{expanded ? ' Equipos' : ''} </NavLink> */}
                            <NavLink onClick={closeMenu} to='/Equipos' className='nav-link' > <EquiposSvg />{' Equipos'} </NavLink>
                            <NavLink onClick={closeMenu} to='/EquipoTorneo' className='nav-link' > <EquipoTorneoSvg />{' Torneos'} </NavLink>
                            <NavLink onClick={closeMenu} to='/EquipoJugador' className='nav-link' > <EquipoJugadorSvg />{' Jugadores x Equipo'} </NavLink>
                            {/* <NavLink to='/Equipos' className='nav-link' >{' Equipos'} </NavLink> */}
                            <NavLink onClick={closeMenu} to='/RegdeArbitro' className='nav-link' > <Arbitrosvg />{' Registro de Arbitro'} </NavLink>
                            <NavLink onClick={closeMenu} to='/TiposDeSancion' className='nav-link' > <Tarjetasvg />{' Tipos de Sanción'} </NavLink>
                            <NavLink onClick={closeMenu} to='/ProgramacionDePartidos' className='nav-link' > <Programacionsvg />{' Programación de Partidos '} </NavLink>
                            <NavLink onClick={closeMenu} to='/CatJugador' className='nav-link' > <Arbitrosvg />{' Jugadores'} </NavLink>
                            <NavLink onClick={closeMenu} to='/CapturaDeResultados' className='nav-link' > <CapturaResultadosSvg />{' Captura De Resultados '} </NavLink>
                            <NavLink onClick={closeMenu} to='/EstEstadisticaPorEquipo' className='nav-link' > <EstadisticaEquipoSvg />{' Estadistica por equipo '} </NavLink>
                            
                            <NavLink onClick={closeMenu} to='/EstadisticaJugador' className='nav-link' > <EstadisticaJugadorSvg />{' Estadistica x Jugador '} </NavLink>
                        </li>
                    </ul>
                </Menu>


                <div className='container'>
                    <Routes>
                        
                        <Route path='/Equipos' element={<CatEquipos />} />
                        <Route path='/EquipoTorneo' element={<CatEquipoTorneo />} />
                        <Route path='/EquipoJugador' element={<CatEquipoJugador />} />
                        <Route path='/RegdeArbitro' element={<CatArbitro />} />
                        <Route path='/TiposDeSancion' element={<CatTiposDeSancion />} />
                        <Route path='/ProgramacionDePartidos' element={<TraProgramacionDePartidos />} />
                        <Route path='/CatJugador' element={<CatJugador />} />
                        <Route path='/CapturaDeResultados' element={<TraCapturaDeResultados />} />
                        <Route path='/EstEstadisticaPorEquipo' element={<EstEstadisticaPorEquipo />} />
                        
                        <Route path='/EstadisticaJugador' element={<TraEstadisticaJugador />} />
                    </Routes>
                </div>


            </BrowserRouter>

        </>

    );
};