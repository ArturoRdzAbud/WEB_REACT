import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../css/Sidebar.css';

import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Equipos from './Equipos'
import CatEquipos from './CatEquipos';
import EquiposSvg from '../svg/equipos.svg?react'
import BalonSvg from '../svg/balon.svg?react'

// export default props => {
export const SideBar = () => {

    return (

        <>


            {/*  


        //npm install react-burger-menu@2.7.1 --force
        //npm install axios
        //npm install react-router-dom
        //npm install @tanstack/react-table
        //npm install --save-dev vite-plugin-svgr



        https://app.netlify.com/
        https://www.digitalocean.com/community/tutorials/react-react-burger-menu-sidebar     


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


                <Menu>
                    <ul className='navbar-nav'>
                        <li className="nav-item">
                            <NavLink to='/' className='nav-link' > <BalonSvg />{' Alta de Equipo'} </NavLink>
                            {/* <NavLink to='/Equipos' className='nav-link' > <EquiposSvg />{expanded ? ' Equipos' : ''} </NavLink> */}
                            <NavLink to='/Equipos' className='nav-link' > <EquiposSvg />{' Equipos'} </NavLink>
                            {/* <NavLink to='/Equipos' className='nav-link' >{' Equipos'} </NavLink> */}
                        </li>
                    </ul>
                </Menu>


                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Equipos />} />
                        <Route path='/Equipos' element={<CatEquipos />} />
                    </Routes>
                </div>


            </BrowserRouter>

        </>

    );
};