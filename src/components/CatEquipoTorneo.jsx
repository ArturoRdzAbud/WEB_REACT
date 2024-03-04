import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';
import { AlertaEmergente } from './AlertaEmergente';
import { SideBarHeader } from './SideBarHeader';
import config from '../config'; // archivo configs globales del proy

import Close from '../svg/icon-close.svg?react'
import Save from '../svg/icon-save.svg?react'
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';






//TIP: TENER SIEMPRE PRENDIDO EL INSPECTOR WEB (CONSOLA) EN EL NAVEGADOR PARA VER TODOS LOS ERRORES EN VIVO 
const CatEquipoTorneo = () => {
  const [datosTorneosBD, setDatosTorneosBD] = useState([]);
  const [datosTorneos, setDatosTorneos] = useState([]);
  const [datosEquiposBD, setDatosEquiposBD] = useState([]);
  const [datosEquipos, setDatosEquipos] = useState([]);
  //Filtros
  const [esVerBaja, setEsVerBaja] = useState(false);
  const [datosLiga, setDatosLiga] = useState([]);
  const [datosTorneo, setDatosTorneo] = useState([]);
  const [datosTorneoBD, setDatosTorneoBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
  const [datosTipoTorneo, setDatosTipoTorneo] = useState([]);
  const [datosTipoTorneoBD, setDatosTipoTorneoBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
  //>
  const [esEditar, setEsEditar] = useState(false);
  const [esEditarEquipos, setEsEditarEquipos] = useState(false);
  const [esNuevo, setEsNuevo] = useState(false);
  const [idEquipo, setIdEquipo] = useState(0);
  const [nombre, setNombre] = useState('');
  const [hi, setHi] = useState('');
  const [hf, setHf] = useState('');
  const [activo, setActivo] = useState(false);

  //datos de registro
  const [accion, setAccion] = useState(0);

  //DatosPantalla
  const [claLiga, setClaLiga] = useState(-1);
  const [claTorneo, setClaTorneo] = useState(-1);
  const [claTipoTorneo, setClaTipoTorneo] = useState(-1);
  const [esMuestraCamposReq, setEsMuestraCamposReq] = useState(false);
  // const history = useHistory();
  const navigate = useNavigate();


  const AgregarEquipo = () => {
    // history.push('/CatEquipos');
    const parametros = {
      esNuevoP: 1,
      esNuevo2P: '2',
    };
    const ruta = `/Equipos?esNuevoP=${parametros.esNuevoP}&esNuevo2P=${parametros.esNuevo2P}`;
    navigate(ruta);
  };

  const onAceptar = () => {
    setEsMuestraCamposReq(false)
  };
  const guardarEquipo = async (e) => {
    e.preventDefault();
    const data = {
      pnIdLiga: claLiga,
      pnIdTorneo: claTorneo,
      pnIdTipoTorneo: claTipoTorneo,
      // pnIdEquipo: idEquipo,
      psNombre: nombre,
      psHorarioInicio: hi,
      psHorarioFin: hf,
      pnActivo: activo,
      pnAccion: accion
    };
    const apiReq = config.apiUrl + '/GuardarTorneo';
    try {

      // console.log(claLiga);
      // console.log(claTorneo);
      // console.log(claTipoTorneo);
      // console.log(claLiga);
      // console.log(claLiga);
      // todo validar requeridas las horas

      if (claLiga == -1) { setEsMuestraCamposReq(true); return }
      if (claTorneo == -1 && !esNuevo) { setEsMuestraCamposReq(true); return }
      if (claTipoTorneo == -1) { setEsMuestraCamposReq(true); return }
      if (nombre.trim === '') { setEsMuestraCamposReq(true); return }
      if (hi.trim == '') { setEsMuestraCamposReq(true); return }
      if (hf.trim == '') { setEsMuestraCamposReq(true); return }
      // console.log(esMuestraCamposReq)
      console.log('Guardando Torneo', data);
      // if (claLiga == claLiga) return
      await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' });
      inicializaCampos()
      setEsEditar(false)//regresa al grid
      setEsEditarEquipos(false)
      setEsNuevo(false)
    } catch (error) {
      console.error('Error al guardar el equipo', error);
    }
  };
  const inicializaCampos = () => {
    // console.log('Inicializa')
    setEsVerBaja(true)
    //Campos 
    setNombre('')
    setHi('')
    setHf('')
    //DatosPantalla
    setClaLiga(-1)
    setClaTorneo(-1)
    setClaTipoTorneo(-1)

    setIdEquipo(0)
    setNombre('')
    setActivo(true)
    setAccion(0)
  };
  const cancelar = () => {
    // console.log('Edición cancelada');
    inicializaCampos()
    setEsEditar(false)
    setEsEditarEquipos(false)
    setEsNuevo(false)
  };
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
    setClaTipoTorneo(-1)
  };


  const filtraLocalCombo = () => {
    // console.log('filtraLocalCombo')
    var datosFiltrados = datosTorneoBD
    datosFiltrados = claLiga > 0 ? datosTorneoBD.filter(item => item.IdLiga == claLiga) : datosTorneoBD;
    setDatosTorneo(datosFiltrados);
    setDatosTipoTorneo(datosTipoTorneoBD);
  }
  const filtraLocal = () => {
    filtraLocalCombo()//Asigna la Dependencia de combos 
    var datosFiltrados = datosTorneosBD
    datosFiltrados = !esVerBaja ? datosTorneosBD.filter(item => item.ActivoChk) : datosTorneosBD;
    datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : datosFiltrados;
    datosFiltrados = claTorneo > 0 ? datosFiltrados.filter(item => item.IdTorneo == claTorneo) : datosFiltrados;
    datosFiltrados = claTipoTorneo > 0 ? datosFiltrados.filter(item => item.IdTipoTorneo == claTipoTorneo) : datosFiltrados;

    setDatosTorneos(datosFiltrados);
  };

  const filtraLocalEquipos = () => {
    // filtraLocalCombo()//Asigna la Dependencia de combos 
    var datosFiltrados = datosEquiposBD
    datosFiltrados = datosEquiposBD//!esVerBaja ? datosEquiposBD.filter(item => item.ActivoChk) : datosEquiposBD;
    datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : datosFiltrados;
    datosFiltrados = claTorneo > 0 ? datosFiltrados.filter(item => item.IdTorneo == claTorneo) : datosFiltrados;

    setDatosEquipos(datosFiltrados);
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

    apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarTipoTorneoCmb%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosTipoTorneoBD(response.data)
        setDatosTipoTorneo(response.data)
      }
      )
      .catch(error => console.error('Error al obtener TIPO TORNEO', error));

  }, []);// se ejecuta 1 vez al inicio solamente

  //Carga equipos desde BD
  useEffect(() => {
    if (esEditar) return//sale si es modo edicion
    var apiUrl = config.apiUrl + '/ConsultarGrid?psSpSel=%22BuscarTorneos%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosTorneosBD(response.data);
        setDatosTorneos(response.data);
      })
      .catch(error => console.error('Error al obtener datos:', error))
      .finally(() => {
        inicializaCampos()
      });

    //CARGA EQUIPOS DE TORNEOS  [dbo].[RelTorneoEquipo]
    apiUrl = config.apiUrl + '/ConsultarGrid?psSpSel=%22BuscarEquiposTorneo%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosEquiposBD(response.data);
        setDatosEquipos(response.data);
      })
      .catch(error => console.error('Error al obtener datos de equipos torneo:', error))
      .finally(() => {
        // inicializaCampos()
      });



  }, [esEditar]); // Se EJECUTA CUANDO CAMBIA la bandera esEditar

  useEffect(() => {
    filtraLocalCombo()
  }, [claLiga]);//Se llama al modificar el combo liga modo edicion/nuevo

  useEffect(() => {
    filtraLocal()
  }, [esVerBaja, claLiga, claTorneo, claTipoTorneo]); //Se invoca al interactuar con los filtros arriba del grid

  const columns = [
    // {
    //   header: 'Id',
    //   accessorKey: 'IdEquipo',
    //   footer: 'Id'
    //   ,visible :false
    // },
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
      header: 'IdTipoTorneo',
      accessorKey: 'IdTipoTorneo',
      footer: 'IdTipoTorneo'
      , visible: false
    },
    // {
    //   header: 'Liga',
    //   accessorKey: 'Liga',
    //   footer: 'Liga'
    //   ,visible:true
    // },
    // {
    //   header: 'Torneo',
    //   accessorKey: 'Torneo',
    //   footer: 'Torneo'
    //   ,visible:true
    // },
    // {
    //   header: 'Tipo Torneo',
    //   accessorKey: 'TipoTorneo',
    //   footer: 'Tipo Torneo'
    //   ,visible:true
    // },
    {
      header: 'Nombre',
      accessorKey: 'Nombre',
      footer: 'Nombre'
      , visible: true
    },
    {
      header: '#Equipos',
      accessorKey: 'Descripcion',
      footer: '#Equipos'
      , visible: true
    },
    {
      header: 'Inicio',
      accessorKey: 'HorarioInicio',
      footer: 'Inicio'
      , visible: true
    },
    {
      header: 'Fin',
      accessorKey: 'HorarioFin',
      footer: 'Fin'
      , visible: true
    },
    {
      header: 'Activo',
      accessorKey: 'ActivoChk',
      footer: 'Activo'
      , visible: true
    }
  ];

  const columnsEquipos = [
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
      header: 'IdEquipo',
      accessorKey: 'IdEquipo',
      footer: 'IdEquipo'
      , visible: false
    },
    {
      header: 'Nombre',
      accessorKey: 'Nombr3',//3 para Evitar que sea LINK
      footer: 'Nombre'
      , visible: true
    },
    {
      header: 'Activo',
      accessorKey: 'ActivoChk',
      footer: 'Activo'
      , visible: true
    }
  ];

  const handleEdit = (rowData, cellId) => {
    // console.log(cellId)
    setEsEditar(true)
    setEsEditarEquipos(false)
    if (cellId == 'Descripcion') {
      filtraLocalEquipos
      setEsEditarEquipos(true)
    }
    setNombre(rowData.original.Nombre)
    setHi(rowData.original.HorarioInicio)
    setHf(rowData.original.HorarioFin)
    setIdEquipo(rowData.original.IdEquipo)
    if (rowData.original.ActivoChk == false) { setActivo(false) } else { setActivo(true) }

    setClaLiga(rowData.original.IdLiga)
    setClaTorneo(rowData.original.IdTorneo)
    setClaTipoTorneo(rowData.original.IdTipoTorneo)
    setAccion(0)//0 para MODIF 1 para nuevo
  }

  return (
    <>
      <SideBarHeader titulo={esNuevo ? ('Nuevo Torneo') : esEditar ? 'Editar Torneo/Equipos' : 'Torneos'}></SideBarHeader>
      <br /><br /><br /><br />
      {/* <h1>hola</h1>
      <hr></hr> */}
      <div>
        {/* {esNuevo ? (<h1>Nuevo Equipo</h1>) : esEditar ? <h1>Editar Equipo</h1> : <h1>Equipos</h1>} */}
        {/* <hr></hr> */}
        {!esEditar ?//----------------------------MODO GRID pinta filtros al inicio
          <>
            <ElementoCampo type='checkbox' lblCampo="Ver Inactivos :" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} />
            <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={(value) => handleLiga(value, claLiga)} />
            {/* <ElementoCampo type="select" lblCampo="Torneo: " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} /> */}
            <ElementoCampo type="select" lblCampo="Tipo Torneo: " claCampo="campo" nomCampo={claTipoTorneo} options={datosTipoTorneo} onInputChange={setClaTipoTorneo} />
            <SimpleTable data={datosTorneos} columns={columns} handleEdit={handleEdit} handleNuevo={nuevo} />
          </>
          ://----------------------------MODO EDICION/NUEVO REGISTRO
          <div>
            <form onSubmit={guardarEquipo}>
              <br />
              {!esEditarEquipos &&
                <>
                  <ElementoCampo type="select" lblCampo="Liga*: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={setClaLiga} editable={esNuevo} />
                  {/* <ElementoCampo type="select" lblCampo="Torneo*: " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} editable={esNuevo} /> */}
                  <ElementoCampo type='text' lblCampo="Nombre* :" claCampo="nombre" onInputChange={setNombre} nomCampo={nombre} tamanioString="100" />
                  <ElementoCampo type="select" lblCampo="Tipo Torneo*: " claCampo="campo" nomCampo={claTipoTorneo} options={datosTipoTorneo} onInputChange={setClaTipoTorneo} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ flexGrow: 1 }}>
                      <ElementoCampo type='time' lblCampo="Horario Inicial* :" claCampo="nombre" onInputChange={setHi} nomCampo={hi} />
                    </span>
                    <span style={{ flexGrow: 1 }}>
                      <h2></h2>
                    </span>
                    <span style={{ flexGrow: 1 }}>
                      <ElementoCampo type='time' lblCampo="Horario Final* :" claCampo="nombre" onInputChange={setHf} nomCampo={hf} />
                    </span>
                  </div>

                  <ElementoCampo type='checkbox' lblCampo="Activo :" claCampo="activo" nomCampo={activo} onInputChange={setActivo} />
                </>
              }
              <div style={{ display: 'flex',justifyContent: 'flex-end'}}>
                <button type="button" className="btn btn-danger" onClick={cancelar}><Close /></button>
                <button type="submit" className="btn btn-primary" ><Save /></button>
              </div>
              {/* <button type="button" className="btn btn-secondary" onClick={AgregarEquipo}>Agregar Equipo</button> */}

              {esEditarEquipos &&//se muestra solo cuando ya existe el torneo
                <>
                <ElementoCampo type='text' lblCampo="Torneo :" claCampo="nombre" onInputChange={setNombre} nomCampo={nombre} tamanioString="100" editable={false} />
                <SimpleTable data={datosEquipos} columns={columnsEquipos} handleEdit={handleEdit} handleNuevo={AgregarEquipo} />
                </>
              }

              {/* <p>Parrafo temporal para ver parametros del SP a Base de datos|@intIdEquipo={idEquipo}|@sNombre={nombre}|@sActivo={activo.toString()}|</p> */}
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

export default CatEquipoTorneo;
