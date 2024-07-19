import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import ElementoListas from './ElementoListas';
import StrictModeDroppable from './StrictModeDroppable';
import { ElementoCampo } from './ElementoCampo';
import { AlertaEmergente } from './AlertaEmergente';
import { ElementoToastNotification } from './ElementoToastNotification';
import { SideBarHeader } from './SideBarHeader';
import config from '../config'; // archivo configs globales del proy

import { useLocation } from 'react-router-dom';


export const FrmEstadisticaJugador = () => {
    const [datosJugBD, setDatosJugBD] = useState([]);
    const [datosJug, setDatosJug] = useState([]);

    //filtros
    const [datosLiga, setDatosLiga] = useState([]);
    const [datosTorneo, setDatosTorneo] = useState([]);
    const [datosTorneoBD, setDatosTorneoBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
    var datosFiltrados2 = []

    //DatosPantalla
    const [claLiga, setClaLiga] = useState(-1);
    const [claTorneo, setClaTorneo] = useState(-1);

    const inicializaCampos = () => {
        //DatosPantalla
        setClaLiga(-1)
        setClaTorneo(0)//tinyint en bd no acepta negativos

        setDatosJug(Empty1)
    };
    const handleLiga = (value, claLiga) => {//limpia combos hijo 
        setClaLiga(value)
        setClaTorneo(-1)
    };
    const filtraLocalCombo = () => {
        var datosFiltrados = datosTorneoBD
        datosFiltrados = claLiga > 0 ? datosTorneoBD.filter(item => item.IdLiga == claLiga) : [];
        setDatosTorneo(datosFiltrados);

    }
    const filtraLocal = () => {
        filtraLocalCombo()//Asigna la Dependencia de combos 
        var datosFiltrados = datosJugBD
        //campos requeridos
        datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : [];
        datosFiltrados = claTorneo > 0 ? datosFiltrados.filter(item => item.IdTorneo == claTorneo) : [];
        // datosFiltrados = claTorneo > 0 ? datosFiltrados : [];
        setDatosJug(datosFiltrados);
    };
    // llena arreglos de combos
    useEffect(() => {
        var apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarLigasCmb%22';
        axios.get(apiUrl)
            .then(response => {
                setDatosLiga(response.data)
            }
            )
            .catch(error => console.error('Error al obtener LIGA', error));

        apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarTorneosCmb%22';
        axios.get(apiUrl)
            .then(response => {
                setDatosTorneoBD(response.data)
                setDatosTorneo(response.data)
            }
            )
            .catch(error => console.error('Error al obtener TORNEO', error));


    }, []);// se ejecuta 1 vez al inicio solamente
    //Carga jugadores desde BD
    useEffect(() => {
        const apiUrl = config.apiUrl + '/ConsultarGrid?psSpSel=%22ConsultarEstadisticaJugadorRel1%22';
        axios.get(apiUrl)
            .then(response => {
                setDatosJugBD(response.data);
            })
            .catch(error => console.error('Error al obtener datos Estadistica x JUGADOR:', error))
            .finally(() => {
                filtraLocalCombo()
            });
    }, []); // Se EJECUTA CUANDO CAMBIA la bandera esEditar

    useEffect(() => {
        filtraLocalCombo()
    }, [claLiga, claTorneo]);//Se llama al modificar el combo liga modo edicion/nuevo

    //LIMPIA CAMPOS HIJOS DE COMBOS AL MOVER PADRES
    useEffect(() => {
        setClaTorneo(-1)
    }, [claLiga]);

    useEffect(() => {
        filtraLocal()
    }, [claLiga, claTorneo]); //Se invoca al interactuar con los filtros arriba del grid

    const columns = [

        {
            header: 'IdLiga',
            accessorKey: 'IdLiga',
            footer: 'IdLiga'
            , visible: false
        },
        {
            header: 'IdTorneo',
            accessorKey: 'IdTorneo',
            footer: 'IdTorneo'
            , visible: false
        },
        {
            header: 'Jugador',
            accessorKey: 'NomJugador',
            footer: 'Jugador'
            , visible: true
        },
        {
            header: 'Equipo',
            accessorKey: 'NomEquipo',
            footer: 'Equipo'
            , visible: false
        },
        {
            header: 'G',
            accessorKey: 'G',
            footer: 'G'
            , visible: true
            //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
        },
        {
            header: 'PJ',
            accessorKey: 'PJ',
            footer: 'PJ'
            , visible: true
            //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
        },
        {
            header: 'TA',
            accessorKey: 'TA',
            footer: 'TA'
            , visible: true
            //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
        },
        {
            header: 'TR',
            accessorKey: 'TR',
            footer: 'TR'
            , visible: true
            //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
        },
    ];

    return (
        <>
            <SideBarHeader titulo={'Estadistica x Jugador'}></SideBarHeader>
            <br /><br /><br /><br />

          

            {/* <ElementoCampo type='checkbox' lblCampo="Ver Inactivos :" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} /> */}
            <ElementoCampo type="select" lblCampo="Liga*: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={(value) => handleLiga(value, claLiga)} />
            <ElementoCampo type="select" lblCampo="Torneo*: " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} />

            <SimpleTable data={datosJug} columns={columns} esOcultaBotonNuevo={true} />


            {/* {esMuestraCamposReq &&
                // <AlertaEmergente
                //     titulo={'Alerta'}
                //     mensaje={'Los datos con * son requeridos, favor de validar.'}
                //     mostrarBotonAceptar={true}
                //     mostrarBotonCancelar={false}
                //     onAceptar={onAceptar}
                // ></AlertaEmergente>

                <ElementoToastNotification
                    mensaje={'Los datos con * son requeridos, favor de validar.'}
                    onAceptar={onAceptar}
                ></ElementoToastNotification>

                // : <p></p>
            } */}




        </>
    )
}

export default FrmEstadisticaJugador