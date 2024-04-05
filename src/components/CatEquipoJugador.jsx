import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import ElementoListas from './ElementoListas';
import StrictModeDroppable from './StrictModeDroppable';
import { ElementoCampo } from './ElementoCampo';
import { AlertaEmergente } from './AlertaEmergente';
import { SideBarHeader } from './SideBarHeader';
import config from '../config'; // archivo configs globales del proy

import { ElementoBotones } from './ElementoBotones';
import { CatEquipoJugadorRel1 } from './CatEquipoJugadorRel1';
import { useLocation } from 'react-router-dom';




const CatEquipoJugador = () => {
    const location = useLocation();
    const buttonRefNuevo = useRef(null);
    const params = new URLSearchParams(location.search);
    const esNuevoP = params.get('esNuevoP');


    const [datosJugBD, setDatosJugBD] = useState([]);
    const [datosJug, setDatosJug] = useState([]);
    const [datosJugEquipo, setDatosJugEquipo] = useState([]);

    //Filtros
    const [esVerBaja, setEsVerBaja] = useState(false);
    const [datosLiga, setDatosLiga] = useState([]);
    const [datosTorneo, setDatosTorneo] = useState([]);
    const [datosTorneoBD, setDatosTorneoBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
    const [datosEquiposBD, setDatosEquiposBD] = useState([]);
    const [datosEquipos, setDatosEquipos] = useState([]);
    var datosFiltrados2 = []
    //>
    const [esEditar, setEsEditar] = useState(false);
    // const [esNuevo, setEsNuevo] = useState(false);
    const [esFin, setEsFin] = useState(false);
    const [idEquipo, setIdEquipo] = useState(0);
    const [nombre, setNombre] = useState('');
    const [activo, setActivo] = useState(false);
    const [filtro, setFiltro] = useState('');

    //datos de registro
    const [accion, setAccion] = useState(0);

    //DatosPantalla
    const [claLiga, setClaLiga] = useState(-1);
    const [claTorneo, setClaTorneo] = useState(-1);
    const [claEquipo, setClaEquipo] = useState(-1);
    const [esMuestraCamposReq, setEsMuestraCamposReq] = useState(false);

    const onAceptar = () => {
        setEsMuestraCamposReq(false)
        setEsFin(false)
    };

    const inicializaCampos = () => {
        setEsVerBaja(true)
        //Campos 
        setNombre('')
        //DatosPantalla
        setClaLiga(-1)
        setClaTorneo(0)//tinyint en bd no acepta negativos
        setClaEquipo(0)

        setIdEquipo(0)
        setNombre('')
        setActivo(true)
        setAccion(0)

        setDatosJug(Empty1)
        setDatosJugEquipo(Empty2)
        setEsFin(false)
    };

    const handleLiga = (value, claLiga) => {//limpia combos hijo 
        setClaLiga(value)
        setClaTorneo(-1)
        setClaEquipo(-1)
    };


    const filtraLocalCombo = () => {
        var datosFiltrados = datosTorneoBD
        datosFiltrados = claLiga > 0 ? datosTorneoBD.filter(item => item.IdLiga == claLiga) : [];
        setDatosTorneo(datosFiltrados);

        datosFiltrados = datosEquiposBD
        datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : [];
        datosFiltrados = claTorneo > 0 ? datosFiltrados.filter(item => item.IdTorneo == claTorneo) : [];
        setDatosEquipos(datosFiltrados);
    }
    const filtraLocal = (esFiltraDisp) => {

        const regex = new RegExp(filtro, 'i');
        // return

        filtraLocalCombo()//Asigna la Dependencia de combos 

        var datosFiltrados = datosJugBD
        
        // datosFiltrados = !esVerBaja ? datosFiltrados.filter(item => item.ActivoChk) : datosFiltrados;

        //campos requeridos
        datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : [];
        datosFiltrados = claTorneo > 0 ? datosFiltrados : [];
        datosFiltrados = claEquipo > 0 ? datosFiltrados : [];

        // datosFiltrados = claTorneo > 0 ? datosFiltrados.filter(item => item.IdTorneo == claTorneo) : datosFiltrados;
        if (datosFiltrados.length > 0) {

            //Llena Asignados
            datosFiltrados2 = datosFiltrados.filter(item => item.IdTorneo == claTorneo)
            datosFiltrados2 = datosFiltrados2.filter(item => item.IdEquipo == claEquipo)
            
            //Llena Disponibles
            datosFiltrados = datosFiltrados.filter(item => item.IdLiga == claLiga)
            datosFiltrados = datosFiltrados.filter(item => item.IdTorneo == claTorneo)
            datosFiltrados = datosFiltrados.filter(item => item.IdEquipo == 0)
            datosFiltrados = filtro != '' ? datosFiltrados.filter(item => regex.test(item.content)) : datosFiltrados;//Aplica el Filtro en disponibles

            // if(datosFiltrados.length==0){
            //     datosFiltrados2 = filtro != '' ? datosFiltrados2.filter(item => regex.test(item.content)) : datosFiltrados2;//Aplica el Filtro en ASIGNADOS SI NO LO ENCUENTRA EN DISPONIBLES
            // }

            setDatosJug(datosFiltrados);
            if (!esFiltraDisp) setDatosJugEquipo(datosFiltrados2);
        } else {
            setDatosJug(Empty1);
            setDatosJugEquipo(Empty2);
        }
    };
    //-------------------------------------------------------------------SECCION USE EFFFECT
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

        //apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarEquipoCmb%22';
        apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarEquipoTorneoCmb%22';
        axios.get(apiUrl)
            .then(response => {
                setDatosEquiposBD(response.data)
                setDatosEquipos(response.data)
            }
            )
            .catch(error => console.error('Error al obtener EQUIPOS', error));

        if (esNuevoP == '1') {
            buttonRefNuevo.current.click();
        }


    }, []);// se ejecuta 1 vez al inicio solamente

    //Carga jugadores desde BD
    useEffect(() => {
        const apiUrl = config.apiUrl + '/ConsultarGrid?psSpSel=%22ConsultarJugadoresRel1%22';
        axios.get(apiUrl)
            .then(response => {
                setDatosJugBD(response.data);
                // setDatosJug(response.data);
            })
            .catch(error => console.error('Error al obtener datos JUGADOR:', error))
            .finally(() => {
                // inicializaCampos()
                filtraLocalCombo()
            });
    }, [esEditar]); // Se EJECUTA CUANDO CAMBIA la bandera esEditar

    useEffect(() => {
        filtraLocalCombo()
    }, [claLiga, claTorneo]);//Se llama al modificar el combo liga modo edicion/nuevo

    //LIMPIA CAMPOS HIJOS DE COMBOS AL MOVER PADRES
    useEffect(() => {
        setClaTorneo(-1)
    }, [claLiga]);
    useEffect(() => {
        setClaEquipo(-1)
    }, [claTorneo]);


    useEffect(() => {
        filtraLocal()
    }, [esVerBaja, claLiga, claTorneo, claEquipo]); //Se invoca al interactuar con los filtros arriba del grid


    const Empty1 = [
        { id: 'item1', content: 'Selecione un equipo para ver Asignados...' },
    ];

    const Empty2 = [
        { id: 'item2', content: 'Selecione un equipo para ver Disponibles...' },

    ];

    const guardar = (async () => {
        setEsEditar(true)
        // e.preventDefault();

        var xmlString
        xmlString = ''

        const datosEquiposFiltrados = datosJugEquipo//data2
        const datosEquipos2 = datosEquiposFiltrados.map(({ IdLiga, IdJugador }) => ({ IdLiga, IdJugador }));
        const xmlDoc = document.implementation.createDocument(null, "data");
        const rootElement = xmlDoc.documentElement;
        datosEquipos2.forEach(item => {
            const itemElement = xmlDoc.createElement("item");
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    const propElement = xmlDoc.createElement(key);
                    propElement.textContent = item[key];
                    itemElement.appendChild(propElement);
                }
            }
            rootElement.appendChild(itemElement);
        });
        xmlString = new XMLSerializer().serializeToString(xmlDoc);

        const data = {
            pnIdLiga: claLiga,
            pnIdTorneo: claTorneo,
            pnIdEquipo: claEquipo,
            // psNombre: nombre,
            // pnActivo: activo,
            pnAccion: accion,
            psXmlJugadores: xmlString
        };

        const apiReq = config.apiUrl + '/GuardarJugadorxEquipo';
        try {

            if (claLiga == -1) { setEsMuestraCamposReq(true); return }
            if (claTorneo == -1) { setEsMuestraCamposReq(true); return }
            if (claEquipo == -1) { setEsMuestraCamposReq(true); return }
            // if (xmlString == '') { setEsMuestraCamposReq(true); return }
            // if (nombre.trim === '') { setEsMuestraCamposReq(true); return }
            console.log('Guardando Jugadores x Equipo', data);
            // if (claLiga == claLiga) return
            await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' });

            // return
            // inicializaCampos()
            // setEsEditar(true)//regresa al grid
            setEsEditar(false)
            // setEsNuevo(false)
            setEsFin(true)

        } catch (error) {
            console.error('Error al guardar los jugadores x equipo', error);
        }

    })

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
        console.log('modal')
    };


    return (
        <>
            <SideBarHeader titulo={'Jugadores x Equipo'}></SideBarHeader>
            <br /><br /><br /><br />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" title="Copiar Jugadores" className="btn btn-secondary" onClick={openModal}>Copiar</button>
            <ElementoBotones guardar={guardar} esOcultaCancelar={true}></ElementoBotones>
            </div>

            {/* <ElementoCampo type='checkbox' lblCampo="Ver Inactivos :" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} /> */}
            <ElementoCampo type="select" lblCampo="Liga*: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={(value) => handleLiga(value, claLiga)} />
            <ElementoCampo type="select" lblCampo="Torneo*: " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} />
            <ElementoCampo type="select" lblCampo="Equipo*: " claCampo="campo" nomCampo={claEquipo} options={datosEquipos} onInputChange={setClaEquipo} />


            <ElementoListas
                data1={datosJugEquipo}
                data2={datosJug}
                enc1={'Asignados* :'}
                setData1={setDatosJugEquipo}
                setData2={setDatosJug}
                enc2={'Disponibles : '}

                filtro={filtro}
                setFiltro={setFiltro}
                filtraLocal={filtraLocal}
            // filtraLocal2={filtraLocal}
            >
            </ElementoListas>


            {esMuestraCamposReq &&
                <AlertaEmergente
                    titulo={'Alerta'}
                    mensaje={'Los datos con * son requeridos, favor de validar.'}
                    mostrarBotonAceptar={true}
                    mostrarBotonCancelar={false}
                    onAceptar={onAceptar}
                ></AlertaEmergente>
                // : <p></p>
            }
            {esFin &&
                <AlertaEmergente
                    titulo={'Alerta'}
                    mensaje={'Los datos fueron guardados correctamente.'}
                    mostrarBotonAceptar={true}
                    mostrarBotonCancelar={false}
                    onAceptar={onAceptar}
                ></AlertaEmergente>
                // : <p></p>
            }

            <CatEquipoJugadorRel1 isOpen={isOpen} setIsOpen={setIsOpen}></CatEquipoJugadorRel1>


        </>
    );
};

export default CatEquipoJugador;
