import React, { useRef, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../css/Sidebar.css';

import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Equipos from './Equipos'
import CatEquipos from './CatEquipos';
import EquiposSvg from '../svg/equipos.svg?react'
import BalonSvg from '../svg/balon.svg?react'
import Arbitrosvg from '../svg/arbitro.svg?react'
import Tarjetasvg from '../svg/tarjetas.svg?react'
import CatTiposDeSancion from './CatTiposDeSancion';
import CatArbitro from './CatArbitro';


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



        https://app.netlify.com/
        https://www.digitalocean.com/community/tutorials/react-react-burger-menu-sidebar  
        https://www.npmjs.com/package/react-burger-menu   
        https://tanstack.com/table/latest/docs/introduction


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
                            <NavLink onClick={closeMenu} to='/' className='nav-link' > <BalonSvg />{' Alta de Equipo'} </NavLink>
                            {/* <NavLink to='/Equipos' className='nav-link' > <EquiposSvg />{expanded ? ' Equipos' : ''} </NavLink> */}
                            <NavLink onClick={closeMenu} to='/Equipos' className='nav-link' > <EquiposSvg />{' Equipos'} </NavLink>
                            {/* <NavLink to='/Equipos' className='nav-link' >{' Equipos'} </NavLink> */}
                            <NavLink onClick={closeMenu} to='/RegdeArbitro' className='nav-link' > <Arbitrosvg />{' Registro de Arbitro'} </NavLink>
                            <NavLink onClick={closeMenu} to='/TiposDeSancion' className='nav-link' > <Tarjetasvg />{' Tipos de Sanción'} </NavLink>
                        </li>
                    </ul>
                </Menu>


                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Equipos />} />
                        <Route path='/Equipos' element={<CatEquipos />} />
                        <Route path='/RegdeArbitro' element={<CatArbitro />} />
                        <Route path='/TiposDeSancion' element={<CatTiposDeSancion />} />
                    </Routes>
                </div>


            </BrowserRouter>

        </>

    );
};