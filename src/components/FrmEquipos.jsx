import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';

import { SideBarHeader } from './SideBarHeader';
import config from '../config'; // archivo configs globales del proy


import { ElementoBotones } from './ElementoBotones';
import { FrmEquiposRel1 } from './FrmEquiposRel1';
import { ElementoImagen } from './ElementoImagen';
import { useLocation } from 'react-router-dom';

//TIP: TENER SIEMPRE PRENDIDO EL INSPECTOR WEB (CONSOLA) EN EL NAVEGADOR PARA VER TODOS LOS ERRORES EN VIVO 
const FrmEquipos = () => {
  const location = useLocation();
  // const { esNuevoP } = new URLSearchParams(location.search);
  const buttonRefNuevo = useRef(null);
  // const referencia = useRef(null);
  const params = new URLSearchParams(location.search);
  const esNuevoP = params.get('esNuevoP');



  const [datosEquiposBD, setDatosEquiposBD] = useState([]);
  const [datosEquipos, setDatosEquipos] = useState([]);
  //Filtros
  const [esVerBaja, setEsVerBaja] = useState(false);
  const [datosLiga, setDatosLiga] = useState([]);
  const [datosTorneo, setDatosTorneo] = useState([]);
  const [datosTorneoBD, setDatosTorneoBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
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




  const inicializaCampos = () => {
    // console.log('Inicializa')
    setEsVerBaja(true)
    //Campos 
    setNombre('')
    //DatosPantalla
    setClaLiga(-1)
    setClaTorneo(0)//tinyint en bd no acepta negativos

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
    // const parametros = {
    //   esNuevoP: 1,
    //   esNuevo2P: '2',
    // };
    // const ruta = `/Equipos?esNuevoP=${parametros.esNuevoP}&esNuevo2P=${parametros.esNuevo2P}`;
    // navigate(ruta);
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
  };


  const filtraLocalCombo = () => {
    // console.log('filtraLocalCombo')
    var datosFiltrados = datosTorneoBD
    datosFiltrados = claLiga > 0 ? datosTorneoBD.filter(item => item.IdLiga == claLiga) : datosTorneoBD;
    setDatosTorneo(datosFiltrados);
  }
  const filtraLocal = () => {
    filtraLocalCombo()//Asigna la Dependencia de combos 

    var datosFiltrados = datosEquiposBD
    datosFiltrados = !esVerBaja ? datosEquiposBD.filter(item => item.ActivoChk) : datosEquiposBD;
    datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : datosFiltrados;
    datosFiltrados = claTorneo > 0 ? datosFiltrados.filter(item => item.IdTorneo == claTorneo) : datosFiltrados;

    setDatosEquipos(datosFiltrados);
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

    // console.log(esNuevoP)
    if (esNuevoP == '1') {
      // setClaLiga(5);
      // console.log(claLiga)
      buttonRefNuevo.current.click();
      // console.log(claLiga)
    }

    console.log('entra')

   

  }, []);// se ejecuta 1 vez al inicio solamente


  useEffect(() => {
    // console.log(buttonRefNuevo.current)
    // console.log(referencia.current)
  }, []); // Asegúrate de que el useEffect se dispare cuando los datos del combo cambien


  //Carga equipos desde BD
  useEffect(() => {
    if (esEditar) return//sale si es modo edicion
    const apiUrl = config.apiUrl + '/ConsultarGrid?psSpSel=%22BuscarEquipos%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosEquiposBD(response.data);
        setDatosEquipos(response.data);
      })
      .catch(error => console.error('Error al obtener datos:', error))
      .finally(() => {
        inicializaCampos()        
    
      });
  }, [esEditar]); // Se EJECUTA CUANDO CAMBIA la bandera esEditar

  useEffect(() => {
    // console.log('filtraLocalCombo')
    filtraLocalCombo()
  }, [claLiga]);//Se llama al modificar el combo liga modo edicion/nuevo

  useEffect(() => {
    filtraLocal()
  }, [esVerBaja, claLiga, claTorneo]); //Se invoca al interactuar con los filtros arriba del grid

  const columns = [
    {
      header: 'Id',
      accessorKey: 'IdEquipo',
      footer: 'Id'
      , visible: false
    },
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
      header: 'Liga',
      accessorKey: 'Liga',
      footer: 'Liga'
      , visible: true
    },
    {
      header: 'Torneo',
      accessorKey: 'Torneo',
      footer: 'Torneo'
      , visible: false
    },
    {
      header: 'Nombre',
      accessorKey: 'Nombre',
      footer: 'Nombre'
      , visible: true
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    },
    {
      header: 'Activo',
      accessorKey: 'ActivoChk',
      footer: 'Activo'
      , visible: true
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    }
  ];

  const handleEdit = (rowData) => {
    setEsEditar(true)
    setNombre(rowData.original.Nombre)
    setIdEquipo(rowData.original.IdEquipo)
    if (rowData.original.ActivoChk == false) { setActivo(false) } else { setActivo(true) }

    setClaLiga(rowData.original.IdLiga)
    setClaTorneo(rowData.original.IdTorneo)
    setAccion(0)//0 para MODIF 1 para nuevo
  }

  const setRef = (ref) => {
    referencia.current = ref;
  };

  return (
    <>
      <SideBarHeader titulo={esNuevo ? ('Nuevo Equipo') : esEditar ? 'Editar Equipo' : 'Equipos '}></SideBarHeader>
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
            <SimpleTable data={datosEquipos} columns={columns} handleEdit={handleEdit} handleNuevo={nuevo} buttonRefNuevo={buttonRefNuevo} />
          </>
          ://----------------------------MODO EDICION/NUEVO REGISTRO
          <div>
            <FrmEquiposRel1
              claLiga={claLiga}
              idEquipo={idEquipo}
              datosLiga={datosLiga}
              setClaLiga={setClaLiga}
              esNuevo={esNuevo}
              setEsEditar={setEsEditar}
              setEsNuevo={setEsNuevo}
              inicializaCampos={inicializaCampos}
              cancelar={cancelar}
              setNombre={setNombre}
              nombre={nombre}
              activo={activo}
              setActivo={setActivo}
              accion={accion}
            ></FrmEquiposRel1>
          </div>
        }

      </div>
    </>
  );
};

export default FrmEquipos;
