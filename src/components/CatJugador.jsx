//import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';
//import { AlertaEmergente } from './AlertaEmergente';
import { SideBarHeader } from './SideBarHeader';
import config from '../config'; // archivo configs globales del proy
//import Close from '../svg/icon-close.svg?react'
//import Save  from '../svg/icon-save.svg?react'


const CatJugador = () => {

    const [datosJugadorBd, setDatosJugadorBd] = useState([]);
    const [datosJugador, setDatosJugador] = useState([]);
    //Filtros
    const [esVerBaja, setEsVerBaja] = useState(false);
    const [ligaF, setLigaF] = useState(-1);
    //combo
    const [dataLiga, setDatosLiga] = useState([]);

    const [esNuevo, setEsNuevo] = useState(false)
    const [esEditar, setEsEditar] = useState(false)
    const [activo, setActivo] = useState(false);

    const columns = [
        {
            header: 'Id',
            accessorKey: 'IdJugador',
            footer: 'Id',
            visible: 'true'
        },
        {
            header: 'Nombre',
            accessorKey: 'Nombre',
            footer: 'Nombre',
            visible: 'true'
        },
        {
            header: 'Activo',
            accessorKey: 'ActivoChk',
            footer: 'Activo',
            visible: 'true'
        }
    ];

    // llenan combos
    useEffect(() => {
        var apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarLigasCmb%22';
        axios.get(apiUrl)
            .then(response => {
                setDatosLiga(response.data)
            }
            )
            .catch(error => console.error('Error al obtener LIGA', error));

    }, []);

    useEffect(() => {
        // Cambia la URL a la de tu API
        const apiUrl = config.apiUrl + '/ConsultarJugadores';
        //axios.get(apiUrl)
        if (esEditar) return
        axios.get(apiUrl)
            .then(response => { setDatosJugador(response.data); setDatosJugadorBd(response.data) })
            .catch(error => console.error('Error al obtener datos:', error))
            .finally(() => {
                inicializaCampos()
            });
    }, [esEditar]); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente

    const filtraLocal = () => {
        // TODO IR FILTRANDO LOCALMENTE CAMPO POR CAMPO SIN IR A BASE DE DATOS
        var datosFiltrados = datosJugadorBd
        datosFiltrados = !esVerBaja ? datosJugadorBd.filter(item => item.ActivoChk) : datosJugadorBd;
        datosFiltrados = ligaF > 0 ? datosFiltrados.filter(item => item.IdLiga == ligaF) : datosFiltrados;

        setDatosJugador(datosFiltrados);
    }

    useEffect(() => {
        filtraLocal()
    }, [esVerBaja, ligaF]); //Se invoca al interactuar con los filtros arriba del grid



    const handleEdit = (rowData) => {
        setEsEditar(true)
        setEsNuevo(false)
    }

    const nuevo = () => {
        setEsNuevo(true)
        setEsEditar(false)
    }

    const cancelar = () => {
        setEsEditar(false)
        setEsNuevo(false)
    }

    const inicializaCampos = () => {
        setEsVerBaja(true)
        setEsEditar(false)
        setEsNuevo(false)
    }

    return (
        <>
            <SideBarHeader titulo={esNuevo ? 'Nuevo Jugador' : esEditar ? 'Editar Jugador' : 'Jugadores'}></SideBarHeader>
            <br /><br /><br /><br />

            {!esEditar ?
                <>

                    {/*<button type="button" className="btn btn-primary" onClick={nuevo}>Nuevo</button>*/}
                    <ElementoCampo type='checkbox' lblCampo="Ver Inactivos:" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} />
                    <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={ligaF} options={dataLiga} onInputChange={setLigaF} />
                    <p>Parrafo temporal para ver parametros del SP a Base de datos|@IdLiga={ligaF}|@Activo={esVerBaja.toString()}|</p>
                    <SimpleTable data={datosJugador} columns={columns} handleEdit={handleEdit} handleNuevo={nuevo} />

                </>
                :
                <>
                    <button type="submit" className="btn btn-primary" >Guardar</button>
                    <button type="button" className="btn btn-primary" onClick={cancelar}>Cancelar</button>
                </>

            }
        </>


    )
}

export default CatJugador
