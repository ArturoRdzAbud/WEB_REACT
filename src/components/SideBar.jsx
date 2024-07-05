import React, { useRef, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../css/Sidebar.css';

import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'

//pantallas
import CatLiga from './CatLiga';
import CatEquipos from './CatEquipos';
import CatEquipoTorneo from './CatEquipoTorneo';
import CatJugador from './CatJugador';
import CatEquipoJugador from './CatEquipoJugador';
import CatArbitro from './CatArbitro';
import CatTiposDeSancion from './CatTiposDeSancion';

import TraProgramacionDePartidos from './TraProgramacionDePartidos';
import TraCapturaDeResultados from './TraCapturaDeResultados';

import EstEstadisticaPorEquipo from './EstEstadisticaPorEquipo';
import TraEstadisticaJugador from './TraEstadisticaJugador';

//Iconos
import LigaSvg from '../svg/menu-liga.svg?react'
import EquiposSvg from '../svg/equipos.svg?react'
import EquipoTorneoSvg from '../svg/menu-equipo-torneo.svg?react'
import JugadoresSvg from '../svg/jugador-de-futbol.svg?react'
import EquipoJugadorSvg from '../svg/menu-equipo-jugador.svg?react'
import Arbitrosvg from '../svg/arbitro.svg?react'
import Arbitros2vg from '../svg/arbitro-final.svg?react'
import Tarjetasvg from '../svg/tarjetas.svg?react'

import Programacionsvg from '../svg/evento-de-calendario.svg?react'
import CapturaResultadosSvg from '../svg/menu-captura-resultados.svg?react'

import EstadisticaEquipoSvg from '../svg/menu-estadistica-equipo.svg?react'
import EstadisticaJugadorSvg from '../svg/menu-estadistica-jugador.svg?react'
import BalonSvg from '../svg/balon.svg?react'



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
                            {/*Configuración inicial*/}
                            <NavLink onClick={closeMenu} to='/Liga' className='nav-link' > <LigaSvg />{' Ligas '} </NavLink>
                            <NavLink onClick={closeMenu} to='/Equipos' className='nav-link' > <EquiposSvg />{' Equipos'} </NavLink>
                            <NavLink onClick={closeMenu} to='/EquipoTorneo' className='nav-link' > <EquipoTorneoSvg />{' Torneos'} </NavLink>
                            <NavLink onClick={closeMenu} to='/CatJugador' className='nav-link' > <JugadoresSvg />{' Jugadores'} </NavLink>
                            <NavLink onClick={closeMenu} to='/EquipoJugador' className='nav-link' > <EquipoJugadorSvg />{' Jugadores x Equipo'} </NavLink>
                            <NavLink onClick={closeMenu} to='/Arbitros' className='nav-link' > <Arbitros2vg />{' Árbitros'} </NavLink>
                            <NavLink onClick={closeMenu} to='/TiposDeSancion' className='nav-link' > <Tarjetasvg />{' Tipos de Sanción'} </NavLink>

                            {/*Operación de las ligas y torneos*/}
                            <NavLink onClick={closeMenu} to='/ProgramacionDePartidos' className='nav-link' > <Programacionsvg />{' Programación de Partidos '} </NavLink>
                            <NavLink onClick={closeMenu} to='/CapturaDeResultados/true' className='nav-link' > <CapturaResultadosSvg />{' Captura De Resultados '} </NavLink>

                            {/*Consulta de estadisticas*/}
                            <NavLink onClick={closeMenu} to='/CapturaDeResultados/false' className='nav-link' > <CapturaResultadosSvg />{' Consulta De Resultados '} </NavLink>
                            <NavLink onClick={closeMenu} to='/EstEstadisticaPorEquipo' className='nav-link' > <EstadisticaEquipoSvg />{' Estadistica por equipo '} </NavLink>                            
                            <NavLink onClick={closeMenu} to='/EstadisticaJugador' className='nav-link' > <EstadisticaJugadorSvg />{' Estadistica x Jugador '} </NavLink>
                        </li>
                    </ul>
                </Menu>


                <div className='container'>
                    <Routes>
                        {/*Configuración inicial*/}
                        <Route path='/Liga' element={<CatLiga />} />
                        <Route path='/Equipos' element={<CatEquipos />} />
                        <Route path='/EquipoTorneo' element={<CatEquipoTorneo />} />
                        <Route path='/CatJugador' element={<CatJugador />} />
                        <Route path='/EquipoJugador' element={<CatEquipoJugador />} />
                        <Route path='/Arbitros' element={<CatArbitro />} />
                        <Route path='/TiposDeSancion' element={<CatTiposDeSancion />} />

                        {/*Operación de las ligas y torneos*/}
                        <Route path='/ProgramacionDePartidos' element={<TraProgramacionDePartidos />} />                        
                        <Route path='/CapturaDeResultados/:muestraLinkCaptura' element={<TraCapturaDeResultados />} />

                        {/*Consulta de estadisticas*/}
                        <Route path='/CapturaDeResultados/:muestraLinkCaptura' element={<TraCapturaDeResultados />} />
                        <Route path='/EstEstadisticaPorEquipo' element={<EstEstadisticaPorEquipo />} />                        
                        <Route path='/EstadisticaJugador' element={<TraEstadisticaJugador />} />                        
                    </Routes>
                </div>


            </BrowserRouter>

        </>

    );
};