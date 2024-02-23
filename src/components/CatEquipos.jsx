import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';
import { AlertaEmergente } from './AlertaEmergente';


//TIP: TENER SIEMPRE PRENDIDO EL INSPECTOR WEB (CONSOLA) EN EL NAVEGADOR PARA VER TODOS LOS ERRORES EN VIVO 
const CatEquipos = () => {
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
    const apiReq = 'http://localhost:3000/GuardarEquipo';
    try {

      if (claLiga == -1) { setEsMuestraCamposReq(true); return }
      if (claTorneo == -1) { setEsMuestraCamposReq(true); return }
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
    // console.log('Inicializa')
    setEsVerBaja(true)
    //Campos 
    setNombre('')
    //DatosPantalla
    setClaLiga(-1)
    setClaTorneo(-1)

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
    datosFiltrados = !esVerBaja ? datosEquiposBD.filter(item => item.Activo) : datosEquiposBD;
    datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : datosFiltrados;
    datosFiltrados = claTorneo > 0 ? datosFiltrados.filter(item => item.IdTorneo == claTorneo) : datosFiltrados;

    setDatosEquipos(datosFiltrados);
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
        setDatosTorneo(response.data)
      }
      )
      .catch(error => console.error('Error al obtener TORNEO', error));
  }, []);// se ejecuta 1 vez al inicio solamente

  //Carga equipos desde BD
  useEffect(() => {
    if (esEditar) return//sale si es modo edicion
    const apiUrl = 'http://localhost:3000/ConsultarGrid?psSpSel=%22BuscarEquipos%22';
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
      ,visible :false
    },
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
      header: 'Nombre',
      accessorKey: 'Nombre',
      footer: 'Nombre'
      ,visible:true
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    },
    {
      header: 'Activo',
      accessorKey: 'ActivoChk',
      footer: 'Activo'
      ,visible:true
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    }
  ];

  const handleEdit = (rowData) => {
    setEsEditar(true)
    setNombre(rowData.original.Nombre)
    setIdEquipo(rowData.original.IdEquipo)
    if (rowData.original.Activo == false) { setActivo(false) } else { setActivo(true) }

    setClaLiga(rowData.original.IdLiga)
    setClaTorneo(rowData.original.IdTorneo)
    setAccion(0)//0 para MODIF 1 para nuevo
  }

  return (
    <>
      <div>
        {esNuevo ? (<h1>Nuevo Equipo</h1>) : esEditar ? <h1>Editar Equipo</h1> : <h1>Equipos</h1>}
        <hr></hr>
        {!esEditar ?//----------------------------MODO GRID pinta filtros al inicio
          <>
            <button type="button" className="btn btn-primary" onClick={nuevo}>Nuevo</button>
            <ElementoCampo type='checkbox' lblCampo="Ver Inactivos :" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} />
            <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={(value) => handleLiga(value, claLiga)} />
            <ElementoCampo type="select" lblCampo="Torneo: " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} />
            <SimpleTable data={datosEquipos} columns={columns} handleEdit={handleEdit} />
          </>
          ://----------------------------MODO EDICION/NUEVO REGISTRO
          <div>
            <form onSubmit={guardarEquipo}>
              <br />
              <ElementoCampo type="select" lblCampo="Liga*: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={setClaLiga} editable={esNuevo} />
              <ElementoCampo type="select" lblCampo="Torneo*: " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} editable={esNuevo} />
              <ElementoCampo type='text' lblCampo="Nombre* :" claCampo="nombre" onInputChange={setNombre} nomCampo={nombre} tamanioString="100"/>
              <ElementoCampo type='checkbox' lblCampo="Activo :" claCampo="activo" nomCampo={activo} onInputChange={setActivo} />
              <button type="submit" className="btn btn-primary" >Guardar</button>
              <button type="button" className="btn btn-primary" onClick={cancelar}>Cancelar</button>
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

export default CatEquipos;
