import React from 'react';
import { SideBarHeader } from './SideBarHeader';

const AccessDeniedPage = () => {
    return (
        <>
            <SideBarHeader titulo=''></SideBarHeader>
            <br /><br /><br /><br />

            <div>
                <h1>Acceso Denegado</h1>
                <p>No tienes permiso para acceder a esta página.</p>
            </div>
        </>
    );
};

export default AccessDeniedPage;
