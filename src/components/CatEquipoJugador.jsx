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
import { useLocation } from 'react-router-dom';




const CatEquipoJugador = () => {
    const location = useLocation();
    const buttonRefNuevo = useRef(null);
    const params = new URLSearchParams(location.search);
    const esNuevoP = params.get('esNuevoP');


    const [datosJugBD, setDatosJugBD] = useState([]);
    const [datosJug, setDatosJug] = useState([]);

    //Filtros
    const [esVerBaja, setEsVerBaja] = useState(false);
    const [datosLiga, setDatosLiga] = useState([]);
    const [datosTorneo, setDatosTorneo] = useState([]);
    const [datosTorneoBD, setDatosTorneoBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
    const [datosEquiposBD, setDatosEquiposBD] = useState([]);
    const [datosEquipos, setDatosEquipos] = useState([]);
    //>
    const [esEditar, setEsEditar] = useState(false);
    const [esNuevo, setEsNuevo] = useState(false);
    const [idEquipo, setIdEquipo] = useState(0);
    const [nombre, setNombre] = useState('');
    const [activo, setActivo] = useState(false);

    //datos de registro
    const [accion, setAccion] = useState(0);

    //DatosPantalla
    const [claLiga, setClaLiga] = useState(-1);
    const [claTorneo, setClaTorneo] = useState(-1);
    const [claEquipo, setClaEquipo] = useState(-1);
    const [esMuestraCamposReq, setEsMuestraCamposReq] = useState(false);

    const onAceptar = () => {
        setEsMuestraCamposReq(false)
    };
    const guardarEquipo = async (e) => {
        e.preventDefault();
        const data = {
            pnIdLiga: claLiga,
            pnIdTorneo: claTorneo,
            pnIdEquipo: idEquipo,
            psNombre: nombre,
            pnActivo: activo,
            pnAccion: accion
        };
        const apiReq = config.apiUrl + '/GuardarEquipo';
        try {

            if (claLiga == -1) { setEsMuestraCamposReq(true); return }
            if (claTorneo == -1) { setEsMuestraCamposReq(true); return }
            if (claEquipo == -1) { setEsMuestraCamposReq(true); return }
            if (nombre.trim === '') { setEsMuestraCamposReq(true); return }
            // console.log(esMuestraCamposReq)
            console.log('Guardando equipo', data);
            // if (claLiga == claLiga) return
            await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' });
            inicializaCampos()
            setEsEditar(false)//regresa al grid
            setEsNuevo(false)
        } catch (error) {
            console.error('Error al guardar el equipo', error);
        }
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
    };
    const cancelar = () => {
        // console.log('Edición cancelada');
        inicializaCampos()
        setEsEditar(false)
        setEsNuevo(false)
        if (esNuevoP) {
            regresa
        }
    };
    const regresa = () => {

    }
    const nuevo = () => {
        // console.log('nuevo')
        inicializaCampos()
        setEsEditar(true)
        setEsNuevo(true)
        setAccion(1)//0 para MODIF 1 para nuevo
    };

    const handleLiga = (value, claLiga) => {//limpia combos hijo 
        // console.log('handleLiga')
        setClaLiga(value)
        setClaTorneo(-1)
        setClaEquipo(-1)
    };


    const filtraLocalCombo = () => {
        // console.log('filtraLocalCombo')
        var datosFiltrados = datosTorneoBD
        datosFiltrados = claLiga > 0 ? datosTorneoBD.filter(item => item.IdLiga == claLiga) : datosTorneoBD;
        setDatosTorneo(datosFiltrados);

        datosFiltrados = datosEquiposBD
        datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : datosEquiposBD;
        datosFiltrados = claTorneo > 0 ? datosFiltrados.filter(item => item.IdTorneo == claTorneo) : datosFiltrados;
        setDatosEquipos(datosFiltrados);
    }
    const filtraLocal = () => {
        filtraLocalCombo()//Asigna la Dependencia de combos 

        var datosFiltrados = datosJugBD
        datosFiltrados = !esVerBaja ? datosFiltrados.filter(item => item.ActivoChk) : datosJugBD;
        datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : datosFiltrados;
        // datosFiltrados = claTorneo > 0 ? datosFiltrados.filter(item => item.IdTorneo == claTorneo) : datosFiltrados;

        setDatosJug(datosFiltrados);
        // console.log(ref1.current)
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

        // console.log(esNuevoP)
        if (esNuevoP == '1') {
            // setClaLiga(5);
            // console.log(claLiga)
            buttonRefNuevo.current.click();
            // console.log(claLiga)
        }


    }, []);// se ejecuta 1 vez al inicio solamente


    useEffect(() => {
        // console.log(buttonRefNuevo.current)
        // console.log(referencia.current)
    }, []); // Asegúrate de que el useEffect se dispare cuando los datos del combo cambien


    //Carga jugadores desde BD
    useEffect(() => {
        if (esEditar) return//sale si es modo edicion
        const apiUrl = config.apiUrl + '/ConsultarGrid?psSpSel=%22ConsultarJugadoresRel1%22';
        axios.get(apiUrl)
            .then(response => {
                setDatosJugBD(response.data);
                setDatosJug(response.data);
            })
            .catch(error => console.error('Error al obtener datos JUGADOR:', error))
            .finally(() => {
                inicializaCampos()
            });
    }, [esEditar]); // Se EJECUTA CUANDO CAMBIA la bandera esEditar

    useEffect(() => {
        // console.log('filtraLocalCombo')
        filtraLocalCombo()
    }, [claLiga, claTorneo]);//Se llama al modificar el combo liga modo edicion/nuevo

    useEffect(() => {
        filtraLocal()
    }, [esVerBaja, claLiga, claTorneo, claEquipo]); //Se invoca al interactuar con los filtros arriba del grid

    const columns = [
        {
            header: 'Id',
            accessorKey: 'IdJugador',
            footer: 'Id'
            , visible: false
        },
        {
            header: 'IdLiga',
            accessorKey: 'IdLiga',
            footer: 'IdLiga'
            , visible: false
        },
        // {
        //   header: 'IdTorneo',
        //   accessorKey: 'IdTorneo',
        //   footer: 'IdTorneo'
        //   , visible: false
        // },
        // {
        //   header: 'Liga',
        //   accessorKey: 'Liga',
        //   footer: 'Liga'
        //   , visible: true
        // },
        // {
        //   header: 'Torneo',
        //   accessorKey: 'Torneo',
        //   footer: 'Torneo'
        //   , visible: false
        // },
        {
            header: 'Nombre',
            accessorKey: 'Nombre',
            footer: 'Nombre'
            , visible: true
            //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
        },
        {
            header: 'Número',
            accessorKey: 'Numero',
            footer: 'Número'
            , visible: true
            //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
        },
        {
            header: '',
            accessorKey: 'btnAdd',
            footer: ''
            , visible: true
            //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
        },
        // {
        //   header: 'Activo',
        //   accessorKey: 'ActivoChk',
        //   footer: 'Activo'
        //   , visible: true
        //   //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
        // }
    ];

    const handleEdit = (rowData) => {
        setEsEditar(true)
        setNombre(rowData.original.Nombre)
        setIdEquipo(rowData.original.IdEquipo)
        if (rowData.original.ActivoChk == false) { setActivo(false) } else { setActivo(true) }

        setClaLiga(rowData.original.IdLiga)
        setClaTorneo(rowData.original.IdTorneo)
        setClaEquipo(rowData.original.IdEquipo)
        setAccion(0)//0 para MODIF 1 para nuevo
    }

    const setRef = (ref) => {
        referencia.current = ref;
    };

    const initialData1 = [
        { id: 'item1', content: 'Item 1' },
        { id: 'item2', content: 'Item 2' },
        { id: 'item3', content: 'Item 3' },
      ];
      
      const initialData2 = [
        { id: 'item4', content: 'Arturo Rodriguez' },
        { id: 'item5', content: 'Rolando Loera' },
      
      ];
    const [data1, setData1] = useState(initialData1);
    const [data2, setData2] = useState(initialData2);

    const guardar= () => {
        console.log(data1)
        console.log(data2)
    }

    return (
        <>
            <SideBarHeader titulo={esNuevo ? ('Nuevo Jugador') : esEditar ? 'Editar Jugadores' : 'Jugadores'}></SideBarHeader>
            <br /><br /><br /><br />
            {/* <h1>hola</h1>
      <hr></hr> */}
            <div>
                {/* {esNuevo ? (<h1>Nuevo Equipo</h1>) : esEditar ? <h1>Editar Equipo</h1> : <h1>Equipos</h1>} */}
                {/* <hr></hr> */}
                {!esEditar ?//----------------------------MODO GRID pinta filtros al inicio
                    <>
                        <ElementoBotones cancelar={cancelar} guardar={guardar}></ElementoBotones>

                        {/* <ElementoCampo type='checkbox' lblCampo="Ver Inactivos :" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} /> */}
                        <ElementoCampo type="select" lblCampo="Liga*: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={(value) => handleLiga(value, claLiga)} />
                        <ElementoCampo type="select" lblCampo="Torneo*: " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} />
                        <ElementoCampo type="select" lblCampo="Equipo*: " claCampo="campo" nomCampo={claEquipo} options={datosEquipos} onInputChange={setClaEquipo} />


                        {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ flexGrow: 1 }}>
                                <SimpleTable data={datosJug} columns={columns} handleEdit={handleEdit} handleNuevo={nuevo} buttonRefNuevo={buttonRefNuevo} esConLink={false} esOcultaBotonNuevo={true} esOcultaBotonArriba={false}/>
                            </span>
                            <span style={{ flexGrow: 1 }}>
                                <h2></h2>
                            </span>
                            <span style={{ flexGrow: 1 }}>
                                <SimpleTable data={datosJug} columns={columns} handleEdit={handleEdit} handleNuevo={nuevo} buttonRefNuevo={buttonRefNuevo} esConLink={false} esOcultaBotonNuevo={true}/>
                            </span>
                        </div> */}

                        {/* <SimpleTable data={datosJug} columns={columns} handleEdit={handleEdit} handleNuevo={nuevo} buttonRefNuevo={buttonRefNuevo} esConLink={false} esOcultaBotonNuevo={true} esOcultaBotonArriba={true} pageSize={5} esOcultaFooter={true} esOcultaFiltro={true}/>
                        <br></br>
                        <SimpleTable data={datosJug} columns={columns} handleEdit={handleEdit} handleNuevo={nuevo} buttonRefNuevo={buttonRefNuevo} esConLink={false} esOcultaBotonNuevo={true} pageSize={5} esOcultaFooter={true}/> */}

                        <ElementoListas 
                            data1={data1} 
                            data2={data2}
                            enc1={'Asignados'}
                            setData1={setData1}
                            setData2={setData2}
                            enc2={'Disponibles'}
                            >
                        </ElementoListas>
                        {/* <StrictModeDroppable></StrictModeDroppable> */}



                    </>
                    ://----------------------------MODO EDICION/NUEVO REGISTRO
                    <div>
                        <form onSubmit={guardarEquipo}>
                            <br />
                            {/* <ElementoBotones cancelar={cancelar}></ElementoBotones>

              <ElementoCampo type="select" lblCampo="Liga*: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={setClaLiga} editable={esNuevo}  />
              <ElementoCampo type="select" lblCampo="Torneo*: " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} editable={esNuevo} />
              <ElementoCampo type="select" lblCampo="Equipo*: " claCampo="campo" nomCampo={claEquipo} options={datosEquipos} onInputChange={setClaEquipo} editable={esNuevo} /> */}

                            {/* <ElementoCampo type='text' lblCampo="Nombre* :" claCampo="nombre" onInputChange={setNombre} nomCampo={nombre} tamanioString="100" /> */}
                            {/* <ElementoCampo type='checkbox' lblCampo="Activo :" claCampo="activo" nomCampo={activo} onInputChange={setActivo} /> */}
                        </form>
                    </div>
                }
                {/* {setEsCargaInicial(true)}   */}

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
            </div>
        </>
    );
};

export default CatEquipoJugador;
