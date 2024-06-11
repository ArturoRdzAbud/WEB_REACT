import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';
import { AlertaEmergente } from './AlertaEmergente';
import { SideBarHeader } from './SideBarHeader';
import { ElementoToastNotification } from './ElementoToastNotification';
import config from '../config'; // archivo configs globales del proy
import dayjs from 'dayjs';

import Close from '../svg/icon-close.svg?react'
import Save from '../svg/icon-save.svg?react'


//TIP: TENER SIEMPRE PRENDIDO EL INSPECTOR WEB (CONSOLA) EN EL NAVEGADOR PARA VER TODOS LOS ERRORES EN VIVO 
const TraProgramacionDePartidos = () => {
  const [datosProgramacionBD, setDatosProgramacionBD] = useState([]);
  const [datosProgramacion, setDatosProgramacion] = useState([]);
  //Filtros  
  const [datosLiga, setDatosLiga] = useState([]);
  const [datosTorneo, setDatosTorneo] = useState([]);
  const [datosTorneoBD, setDatosTorneoBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
  const [datosJornada, setDatosJornada] = useState([]);
  const [datosJornadaBD, setDatosJornadaBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
  //>
  const [esEditar, setEsEditar] = useState(false);
  const [idEquipo1, setIdEquipo1] = useState(0);
  const [idEquipo2, setIdEquipo2] = useState(0);
  const [equipo1, setEquipo1] = useState('');
  const [equipo2, setEquipo2] = useState('');
  const [programado, setProgramado] = useState(0);
  const [fechaHora, setFechaHora] = useState('');

  
  //DatosPantalla
  const [claLiga, setClaLiga] = useState(-1);
  const [claTorneo, setClaTorneo] = useState(-1);
  const [idJornada, setIdJornada] = useState(-1);
  const [esMuestraCamposReq, setEsMuestraCamposReq] = useState(false);
  const [alertaMensaje, setAlertaMensaje] = useState('');
  
  const onAceptar = () => {
    setEsMuestraCamposReq(false)
  };

  const onAceptarC = () => {
    setAlertaMensaje('')
  };

  const guardarProgramacionDePartidos = async (e) => {
    e.preventDefault();
    const data = {
      pnIdLiga: claLiga,
      pnIdTorneo: claTorneo,
      pnIdJornada: idJornada,
      pnIdEquipo1: idEquipo1,
      pnIdEquipo2: idEquipo2,
      pnProgramado: programado,
      ptFechaHora: fechaHora
    };
    const apiReq = 'http://localhost:3000/GuardarProgramacionDePartidos';
    try {

      if (claLiga == -1) { setEsMuestraCamposReq(true); return }
      if (claTorneo == -1) { setEsMuestraCamposReq(true); return }
      if (idJornada == -1) { setEsMuestraCamposReq(true); return }
      // console.log(esMuestraCamposReq)
          // if (claLiga == claLiga) return
      await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' })
      .then(response => {    
        if (!response.data == '') {
            console.log('REGRESA ERROR:')
            if (response.data.originalError === undefined) {
                console.log('response.data: ' + response.data)
                setAlertaMensaje(response.data)
            }
            else {
                console.log('response.data.originalError.info.message: ' + response.data.originalError.info.message)
                setAlertaMensaje(response.data.originalError.info.message)
            }
        } else {
          console.log('guardo correctamente')  
          inicializaCampos()
          setEsEditar(false)//regresa al grid
        }
      })    

    } catch (error) {
      console.error('Error al guardar el equipo', error);
    }
  };
  const inicializaCampos = () => {
    // console.log('Inicializa')
    //DatosPantalla
    setClaLiga(-1)
    setClaTorneo(-1)
    setIdJornada(-1)
    setIdEquipo1(0)
    setIdEquipo2(0)
    setProgramado(0)
    setFechaHora('')
  };
  const cancelar = () => {
    // console.log('Edición cancelada');
    inicializaCampos()
    setEsEditar(false)    
  };
  

  const handleLiga = (value, claLiga) => {//limpia combos hijo 
   
    setClaLiga(value)
    setClaTorneo(-1)
    setIdJornada(-1)
  };


  const filtraLocalComboTorneo = () => {
     //console.log('filtraLocalComboTorneo')
    var datosFiltrados = datosTorneoBD
    datosFiltrados = claLiga > 0 ? datosTorneoBD.filter(item => item.IdLiga == claLiga) : [];
    setDatosTorneo(datosFiltrados);
    //console.log(datosFiltrados)
  }
  const filtraLocalComboJornada = () => {
     //console.log('filtraLocalComboJornada')

    var datosFiltrados = datosJornadaBD
    datosFiltrados = claLiga > 0 ? datosJornadaBD.filter(item => item.IdLiga == claLiga) : [];
    datosFiltrados = claTorneo > 0 ? datosJornadaBD.filter(item => item.IdTorneo == claTorneo) : [];
    setDatosJornada(datosFiltrados);
    //console.log(datosFiltrados)
  }
  const filtraLocal = () => {
    
    if (esEditar) return//sale si es modo edicion

    var datosFiltrados = datosProgramacionBD
    datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : datosFiltrados;
    datosFiltrados = claTorneo > 0 ? datosFiltrados.filter(item => item.IdTorneo == claTorneo) : datosFiltrados;
    datosFiltrados = idJornada > 0 ? datosFiltrados.filter(item => item.IdJornada == idJornada) : datosFiltrados;

    setDatosProgramacion(datosFiltrados);
    

  };
  //-------------------------------------------------------------------SECCION USE EFFFECT
  // llena arreglos de combos
  useEffect(() => {
    var apiUrl = 'http://localhost:3000/ConsultarCombo?psSpSel=%22ConsultarLigasCmb%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosLiga(response.data)
      }
      )
      .catch(error => console.error('Error al obtener LIGA', error));

    apiUrl = 'http://localhost:3000/ConsultarCombo?psSpSel=%22ConsultarTorneosCmb%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosTorneoBD(response.data)
        //setDatosTorneo(response.data)
      }
      )
      .catch(error => console.error('Error al obtener TORNEO', error));

    apiUrl = 'http://localhost:3000/ConsultarCombo?psSpSel=%22ConsultarJornadasCmb%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosJornadaBD(response.data)
        //setDatosJornada(response.data)
      }
      )
      .catch(error => console.error('Error al obtener Jornadas', error));

  }, []);// se ejecuta 1 vez al inicio solamente

  //Carga equipos desde BD
  useEffect(() => {
    if (esEditar) return//sale si es modo edicion
    const apiUrl = 'http://localhost:3000/ConsultarProgramacionDePartidos';
    axios.get(apiUrl,{ params: { pnIdLiga: claLiga, pnIdTorneo: claTorneo, pnIdJornada: idJornada } })
      .then(response => {
        setDatosProgramacionBD(response.data);
        setDatosProgramacion(response.data);
      })
      .catch(error => console.error('Error al obtener datos:', error))
      .finally(() => {
        inicializaCampos()
      });
  }, [esEditar]); // Se EJECUTA CUANDO CAMBIA la bandera esEditar

  useEffect(() => {
    filtraLocalComboTorneo()
  }, [claLiga]);//Se llama al modificar el combo liga modo edicion/nuevo

  useEffect(() => {
    filtraLocalComboJornada()
  }, [claLiga, claTorneo]);//Se llama al modificar el combo Torneo modo edicion/nuevo

  useEffect(() => {
    filtraLocal()
  }, [claLiga, claTorneo, idJornada]); //Se invoca al interactuar con los filtros arriba del grid

  const columns = [
    {
      header: 'IdLiga',
      accessorKey: 'IdLiga',
      footer: 'IdLiga'
      ,visible:false
    },
    {
      header: 'IdTorneo',
      accessorKey: 'IdTorneo',
      footer: 'IdTorneo'
      ,visible:false
    },
    {
      header: 'IdJornada',
      accessorKey: 'IdJornada',
      footer: 'IdJornada'
      ,visible:false
    },
    {
      header: 'IdEquipo1',
      accessorKey: 'IdEquipo1',
      footer: 'IdEquipo1'
      ,visible :false
    },
    {
      header: 'IdEquipo2',
      accessorKey: 'IdEquipo2',
      footer: 'IdEquipo2'
      ,visible :false
    },
    {
      header: 'Programar',
      accessorKey: 'Descripcion',
      footer: 'Programar'
      ,visible:true
    },
    {
      header: 'Liga',
      accessorKey: 'Liga',
      footer: 'Liga'
      ,visible:true
    },
    {
      header: 'Torneo',
      accessorKey: 'Torneo',
      footer: 'Torneo'
      ,visible:true
    },
    {
      header: 'Jornada',
      accessorKey: 'Jornada',
      footer: 'Jornada'
      ,visible:true
    },
    {
      header: 'Local',
      accessorKey: 'Equipo1',
      footer: 'Local'
      ,visible:true
    },
    {
      header: 'Result.',
      accessorKey: 'Resultado',
      footer: 'Result.'
      ,visible :true
    },
    {
      header: 'Visitante',
      accessorKey: 'Equipo2',
      footer: 'Visitante'
      ,visible:true
    },
    {
      header: 'Prog.',
      accessorKey: 'ProgramadoChk',
      footer: 'Prog.'
      ,visible:true
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    },
    {
      header: 'Fecha Hora',
      accessorKey: 'FechaHora',
      footer: 'Fecha Hora'
      ,visible:true
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    },
    {
      header: 'Fecha Hora2',
      accessorKey: 'FechaHora2',
      footer: 'Fecha Hora2'
      ,visible:false
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    }
  ];

  const handleEdit = (rowData) => {
    setClaLiga(rowData.original.IdLiga)
    setClaTorneo(rowData.original.IdTorneo)
    setIdJornada(rowData.original.IdJornada)
    setIdEquipo1(rowData.original.IdEquipo1)
    setIdEquipo2(rowData.original.IdEquipo2)
    setEquipo1(rowData.original.Equipo1)
    setEquipo2(rowData.original.Equipo2)
    if (rowData.original.ProgramadoChk == false) { setProgramado(false) } else { setProgramado(true) }
    setFechaHora(rowData.original.FechaHora2)
    setEsEditar(true)

  
   
  }

  return (
    <>
      <SideBarHeader titulo={esEditar ? 'Programar Partido' : 'Programación de partidos'}></SideBarHeader>
      <br/><br/><br/><br/>
      <div>        
        {!esEditar ?//----------------------------MODO GRID pinta filtros al inicio
          <>
            <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={(value) => handleLiga(value, claLiga)} />
            <ElementoCampo type="select" lblCampo="Torneo: " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} />
            <ElementoCampo type="select" lblCampo="Jornada: " claCampo="campo" nomCampo={idJornada} options={datosJornada} onInputChange={setIdJornada} />
            <SimpleTable data={datosProgramacion} columns={columns} handleEdit={handleEdit} />
          </>
          ://----------------------------MODO EDICION
          <div>
            <form onSubmit={guardarProgramacionDePartidos}>
              <br />
              <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={setClaLiga} editable={false} />
              <ElementoCampo type="select" lblCampo="Torneo: " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} editable={false} />
              <ElementoCampo type="select" lblCampo="Jornada: " claCampo="campo" nomCampo={idJornada} options={datosJornada} onInputChange={setIdJornada} editable={false} />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span>
                    <ElementoCampo type='text' lblCampo="Local: " claCampo="local" nomCampo={equipo1} onInputChange={setEquipo1} editable={false} />
                </span>
                <span>
                    <h2>VS</h2>
                </span>
                <span>
                    <ElementoCampo type='text' lblCampo="Visitante: " claCampo="visitante" nomCampo={equipo2} onInputChange={setEquipo2} editable={false} />
                </span>
            </div>

            
              <ElementoCampo type='checkbox' lblCampo="Programado*: " claCampo="programado" nomCampo={programado} onInputChange={setProgramado} />
              <ElementoCampo type='datetime-local' lblCampo="Fecha Hora*:" claCampo="fechahora" nomCampo={fechaHora} onInputChange={setFechaHora} />
              <button type="submit" className="btn btn-primary" >Guardar</button>
              <button type="button" className="btn btn-primary" onClick={cancelar}>Cancelar</button>
              
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
        {alertaMensaje &&
          <ElementoToastNotification
              mensaje={alertaMensaje}
              onAceptar={onAceptarC}
          ></ElementoToastNotification>
        }
        
      </div>
    </>
  );
};

export default TraProgramacionDePartidos;
