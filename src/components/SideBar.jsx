import React, { useRef, useState, useContext } from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../css/Sidebar.css';

import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import { PerfilContext } from './PerfilContext'; // Importa el contexto

//pantallas
import Home from './Home';
import Login from './Login';
import FrmLiga from './FrmLiga';
import FrmEquipos from './FrmEquipos';
import FrmEquipoTorneo from './FrmEquipoTorneo';
import FrmJugador from './FrmJugador';
import FrmEquipoJugador from './FrmEquipoJugador';
import FrmArbitro from './FrmArbitro';
import FrmTiposDeSancion from './FrmTiposDeSancion';
import FrmUsuario from './FrmUsuario';
import FrmConfiguraAccesoLigas from './FrmConfiguraAccesoLigas';

import FrmProgramacionDePartidos from './FrmProgramacionDePartidos';
import FrmCapturaDeResultados from './FrmCapturaDeResultados';

import FrmEstadisticaPorEquipo from './FrmEstadisticaPorEquipo';
import FrmEstadisticaJugador from './FrmEstadisticaJugador';

import ProtectedRoute from './ProtectedRoute';
import AccessDeniedPage from './AccessDeniedPage';



//Iconos
import HomeSvg from '../svg/icon-home.svg?react'
import LigaSvg from '../svg/menu-liga.svg?react'
import EquiposSvg from '../svg/equipos.svg?react'
import EquipoTorneoSvg from '../svg/menu-equipo-torneo.svg?react'
import JugadoresSvg from '../svg/menu-equipo-jugador.svg?react'
import EquipoJugadorSvg from '../svg/balon.svg?react'
import Arbitrosvg from '../svg/arbitro.svg?react'
import Arbitros2vg from '../svg/arbitro.svg?react'
import Tarjetasvg from '../svg/tarjetas.svg?react'
import UsuarioSvg from '../svg/usuario.svg?react'
import ConfiguraAccesoSvg from '../svg/configura-acceso.svg?react'

import Programacionsvg from '../svg/programacion-partidos.svg?react'
import CapturaResultadosSvg from '../svg/menu-captura-resultados.svg?react'

import ConsultaResultadosSvg from '../svg/consulta-resultados2.svg?react'
import EstadisticaEquipoSvg from '../svg/menu-estadistica-equipo.svg?react'
import EstadisticaJugadorSvg from '../svg/menu-estadistica-jugador.svg?react'
import BalonSvg from '../svg/balon.svg?react'



// export default props => {
export const SideBar = () => {
    const { perfil, esConLicencia } = useContext(PerfilContext);

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


    const [isEstadisticasOpen, setIsEstadisticasOpen] = useState(false);
    const toggleEstadisticas = () => {
        setIsEstadisticasOpen(!isEstadisticasOpen);
    };
    const [isPartidosOpen, setIsPartidosOpen] = useState(false);
    const togglePartidos = () => {
        setIsPartidosOpen(!isPartidosOpen);
    };
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const toggleAdmin = () => {
        setIsAdminOpen(!isAdminOpen);
    };
    const [isAccesosOpen, setIsAccesosOpen] = useState(false);
    const toggleAccesos = () => {
        setIsAccesosOpen(!isAccesosOpen);
    };
    const fontsize = {
        fontSize: '14px' // Puedes ajustar este valor al tamaño que desees
    };
    const fontsizeH = {
        fontSize: '18px', // Puedes ajustar este valor al tamaño que desees
        cursor: 'pointer',
    };
    // Estilos para la línea separadora
    const separatorStyles = {
        width: '100%',
        height: '1px',
        backgroundColor: '#ccc', // Color de la línea
        margin: '10px 0' // Espaciado alrededor de la línea
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

        SVG:
        https://www.freeconvert.com/es/svg-converter

        Iconos:
        https://favicon.io/favicon-converter/

        Login:
        https://mdbootstrap.com/docs/standard/extended/login/


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
                            <NavLink onClick={closeMenu} to='/' className='nav-link' > <HomeSvg />{''} </NavLink>
                            {/* <NavLink onClick={closeMenu} to='/Login' className='nav-link' > <HomeSvg />{' Login '} </NavLink> */}
                            <div style={separatorStyles}></div> {/* Línea de separación */}

                            <div className="menu-section">
                                <div className="menu-section-title" onClick={toggleAdmin} style={fontsizeH}>
                                    {isAdminOpen ? '▾' : '▸'} Configuración
                                </div>
                                <div style={separatorStyles}></div> {/* Línea de separación */}
                                {isAdminOpen && (
                                    <div style={fontsize}>
                                        <NavLink onClick={closeMenu} to='/Liga' className='nav-link' > <LigaSvg />{' Cátalogo de Ligas '} </NavLink>
                                        <NavLink onClick={closeMenu} to='/Equipos' className='nav-link' > <EquiposSvg />{' Cátalogo de Equipos'} </NavLink>
                                        <NavLink onClick={closeMenu} to='/EquipoTorneo' className='nav-link' > <EquipoTorneoSvg />{' Configuración de Torneos'} </NavLink>
                                        <NavLink onClick={closeMenu} to='/EquipoTorneo' className='nav-link' > <EquipoTorneoSvg />{' Generar Calendario'} </NavLink>
                                        <NavLink onClick={closeMenu} to='/CatJugador' className='nav-link' > <JugadoresSvg />{' Cátalogo de Jugadores'} </NavLink>
                                        <NavLink onClick={closeMenu} to='/EquipoJugador' className='nav-link' > <EquipoJugadorSvg />{' Configuración de Plantilla de Equipos'} </NavLink>
                                        <NavLink onClick={closeMenu} to='/Arbitros' className='nav-link' > <Arbitros2vg />{' Catálogo de Árbitros'} </NavLink>
                                        <NavLink onClick={closeMenu} to='/TiposDeSancion' className='nav-link' > <Tarjetasvg />{' Catálogo de Tipos de Sanción'} </NavLink>
                                    </div>
                                )}
                            </div>


                            {esConLicencia == -1 &&
                                <>
                                    <NavLink onClick={closeMenu} to='/CatUsuario' className='nav-link' > <JugadoresSvg />{' Usuarios'} </NavLink>
                                </>
                            }

                            {perfil >= 1 &&
                                <>

                                    <div className="menu-section">
                                        <div className="menu-section-title" onClick={togglePartidos} style={fontsizeH}>
                                            {isPartidosOpen ? '▾' : '▸'} Administración
                                        </div>
                                        <div style={separatorStyles}></div> {/* Línea de separación */}
                                        {isPartidosOpen && (
                                            <div style={fontsize}>
                                                {/*Operación de las ligas y torneos*/}
                                                <NavLink onClick={closeMenu} to='/ProgramacionDePartidos' className='nav-link' > <Programacionsvg />{' Programación de Partidos '} </NavLink>
                                                <NavLink onClick={closeMenu} to='/CapturaDeResultados/true' className='nav-link' > <CapturaResultadosSvg />{' Captura de Resultados '} </NavLink>
                                                {/*Consulta de estadisticas*/}
                                            </div>
                                        )}
                                    </div>


                                    <div className="menu-section">
                                        <div className="menu-section-title" onClick={toggleEstadisticas} style={fontsizeH}>
                                            {isEstadisticasOpen ? '▾' : '▸'} Analiticos
                                        </div>
                                        <div style={separatorStyles}></div> {/* Línea de separación */}
                                        {isEstadisticasOpen && (
                                            <div style={fontsize}>
                                                <NavLink onClick={closeMenu} to='/CapturaDeResultados/false' className='nav-link' > <CapturaResultadosSvg />{' Consulta de Resultados '} </NavLink>
                                                <NavLink onClick={closeMenu} to='/EstEstadisticaPorEquipo' className='nav-link' > <EstadisticaEquipoSvg />{' Estadistica por Equipo '} </NavLink>
                                                <NavLink onClick={closeMenu} to='/EstadisticaJugador' className='nav-link' > <EstadisticaJugadorSvg />{' Estadistica por Jugador '} </NavLink>
                                            </div>
                                        )}
                                    </div>

                                    <div className="menu-section" >
                                        <div className="menu-section-title" onClick={toggleAccesos} style={fontsizeH}>
                                            {isAccesosOpen ? '▾' : '▸'} Control de Accesos
                                        </div>
                                        <div style={separatorStyles}></div> {/* Línea de separación */}
                                        {isAccesosOpen && (
                                            <div style={fontsize}>
                                                <NavLink onClick={closeMenu} to='/CatUsuario' className='nav-link' > <JugadoresSvg />{' Registro de Usuarios'} </NavLink>
                                                <NavLink onClick={closeMenu} to='/FrmConfiguraAccesoLigas' className='nav-link' > <ConfiguraAccesoSvg />{' Configura Acceso a Ligas y Torneos'} </NavLink>
                                            </div>
                                        )}
                                    </div>

                                </>
                            }
                        </li>
                    </ul>
                </Menu>


                <div className='container'>

                    <Routes>
                        {/*Configuración inicial*/}
                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path='/' element={<Home />} /></Route>
                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path='/Login' element={<Login />} /></Route>
                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path="/access-denied" element={<AccessDeniedPage />} /></Route>

                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={2} />}><Route path='/Liga' element={<FrmLiga />} /></Route>

                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path='/Equipos' element={<FrmEquipos />} /></Route>
                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path='/EquipoTorneo' element={<FrmEquipoTorneo />} /></Route>
                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path='/Jugador' element={<FrmJugador />} /></Route>
                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path='/EquipoJugador' element={<FrmEquipoJugador />} /></Route>
                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path='/Arbitros' element={<FrmArbitro />} /></Route>
                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path='/TiposDeSancion' element={<FrmTiposDeSancion />} /></Route>
                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path='/Usuario' element={<FrmUsuario />} /></Route>
                        <Route path='/FrmConfiguraAccesoLigas' element={<FrmConfiguraAccesoLigas />} />

                        {/*Operación de las ligas y torneos*/}
                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path='/ProgramacionDePartidos' element={<FrmProgramacionDePartidos />} /></Route>
                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path='/CapturaDeResultados/:muestraLinkCaptura' element={<FrmCapturaDeResultados />} /></Route>

                        {/*Consulta de estadisticas*/}
                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path='/CapturaDeResultados/:muestraLinkCaptura' element={<FrmCapturaDeResultados />} /></Route>
                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path='/EstadisticaPorEquipo' element={<FrmEstadisticaPorEquipo />} /></Route>
                        <Route element={<ProtectedRoute profile={perfil} requiredProfile={1} />}><Route path='/EstadisticaJugador' element={<FrmEstadisticaJugador />} /></Route>

                        {/* <ProtectedRoute path="/Liga" element={<CatLiga />} profile={perfil} requiredProfile={2}/> */}
                        {/* <Route path="/Liga" element={<ProtectedRoute profile={perfil} requiredProfile={2} />}/> */}



                    </Routes>
                </div>


            </BrowserRouter>

        </>

    );
};