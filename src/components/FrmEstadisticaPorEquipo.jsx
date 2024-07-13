import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';
import { SideBarHeader } from './SideBarHeader';
import '../css/FrmEstadisticaPorEquipo.css'; // Archivo CSS para estilos

//TIP: TENER SIEMPRE PRENDIDO EL INSPECTOR WEB (CONSOLA) EN EL NAVEGADOR PARA VER TODOS LOS ERRORES EN VIVO 
const FrmEstadisticaPorEquipo = () => {
  const [datosEstadisticaEquipoBD, setdatosEstadisticaEquipoBD] = useState([]);
  const [datosEstadisticaEquipo, setdatosEstadisticaEquipo] = useState([]);

  //Filtros  
  const [datosLiga, setDatosLiga] = useState([]);
  const [datosTorneo, setDatosTorneo] = useState([]);
  const [datosTorneoBD, setDatosTorneoBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
  const [datosJornada, setDatosJornada] = useState([]);
  const [datosJornadaBD, setDatosJornadaBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
  //>
    
  //DatosPantalla
  const [claLiga, setClaLiga] = useState(-1);
  const [claTorneo, setClaTorneo] = useState(-1);
  const [idJornada, setIdJornada] = useState(-1);
  

  const handleLiga = (value, claLiga) => {//limpia combos hijo 
    console.log('ENTRA A handleLiga y limpia combos de torneo y liga')
    setClaLiga(value)
    setClaTorneo(-1)
    setIdJornada(-1)
  };


  const filtraLocalCombo = () => {    
    var datosFiltrados = datosTorneoBD
    datosFiltrados = claLiga > 0 ? datosTorneoBD.filter(item => item.IdLiga == claLiga) : [];
    setDatosTorneo(datosFiltrados);

    datosFiltrados = datosJornadaBD
    datosFiltrados = claLiga > 0 ? datosJornadaBD.filter(item => item.IdLiga == claLiga) : [];
    datosFiltrados = claTorneo > 0 ? datosJornadaBD.filter(item => item.IdTorneo == claTorneo) : [];
    setDatosJornada(datosFiltrados);
  }

 

  const filtraLocal = () => {
       
    var datosFiltrados = datosEstadisticaEquipoBD
    datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : [];
    datosFiltrados = claTorneo > 0 ? datosFiltrados.filter(item => item.IdTorneo == claTorneo) : [];
    datosFiltrados = idJornada > 0 ? datosFiltrados.filter(item => item.IdJornada == idJornada) : [];

    setdatosEstadisticaEquipo(datosFiltrados);

  };

  //-------------------------------------------------------------------SECCION USE EFFFECT
  // llena arreglos de combos
  useEffect(() => {
    var apiUrl = 'http://localhost:3000/ConsultarCombo?psSpSel=%22ConsultarLigasCmb%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosLiga(response.data);
      }
      )
      .catch(error => console.error('Error al obtener las ligas', error));

    apiUrl = 'http://localhost:3000/ConsultarCombo?psSpSel=%22ConsultarTorneosCmb%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosTorneoBD(response.data);
        //setDatosTorneo(response.data);
      }
      )
      .catch(error => console.error('Error al obtener los torneos', error));
    
    apiUrl = 'http://localhost:3000/ConsultarCombo?psSpSel=%22ConsultarJornadasCmb%22';
    axios.get(apiUrl)
        .then(response => {
          setDatosJornadaBD(response.data);
          //setDatosJornada(response.data);          
        }
        )
        .catch(error => console.error('Error al obtener las Jornadas', error));

  }, []);// se ejecuta 1 vez al inicio solamente


   //Obtiene la información de la estadistica por equipo, según la liga, torneo y jornada especificados
   useEffect(() => {

    
    var apiUrl = 'http://localhost:3000/ConsultarEstadisticaPorEquipo';
    axios.get(apiUrl,{ params: { pnIdLiga: claLiga, pnIdTorneo: claTorneo, pnIdJornada: idJornada } })
      .then(response => {
        setdatosEstadisticaEquipoBD(response.data);
        setdatosEstadisticaEquipo(response.data);
      })
      .catch(error => console.error('Error al obtener datos:', error))
    
    filtraLocal()

  }, [claTorneo,idJornada]);// se ejecuta cuando se modifica el combo de Jornada

  useEffect(() => {
    filtraLocalCombo()
  }, [claLiga,claTorneo]);//Se llama al modificar el combo liga modo edicion/nuevo

  
  //LIMPIA CAMPOS HIJOS DE COMBOS AL MOVER PADRES
  useEffect(() => {
    setClaTorneo(-1)
    }, [claLiga]);
  useEffect(() => {
      setIdJornada(-1)
  }, [claTorneo]);

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
      header: 'IdEquipo',
      accessorKey: 'IdEquipo',
      footer: 'IdEquipo'
      ,visible :false
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
      header: 'Equipo',
      accessorKey: 'Equipo',
      footer: 'Equipo'
      ,visible:true
    },
    {
      header: 'P',
      accessorKey: 'P',
      footer: 'P'
      ,visible :true
    },
    {
      header: 'DG',
      accessorKey: 'DG',
      footer: 'DG'
      ,visible:true
    },
    {
      header: 'PJ',
      accessorKey: 'PJ',
      footer: 'PJ'
      ,visible:true
    },
    {
      header: 'PG',
      accessorKey: 'PG',
      footer: 'PG'
      ,visible:true
    },
    {
      header: 'PE',
      accessorKey: 'PE',
      footer: 'PE'
      ,visible:true
    },
    {
      header: 'PP',
      accessorKey: 'PP',
      footer: 'PP'
      ,visible:true
    },
    {
      header: 'GF',
      accessorKey: 'GF',
      footer: 'GF'
      ,visible:true
    },
    {
      header: 'GC',
      accessorKey: 'GC',
      footer: 'GC'
      ,visible:true
    }
  ];



  const handleEdit = (rowData, id) => {
    setClaLiga(rowData.original.IdLiga)
    setClaTorneo(rowData.original.IdTorneo)
    setIdJornada(rowData.original.IdJornada)    
   
  }

  return (
    <>
      <SideBarHeader titulo={'Estadisticas por equipo'}></SideBarHeader>
      <br/><br/><br/><br/>
      <div>        
          <>
            <ElementoCampo type="select" lblCampo="Liga:* " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={(value) => handleLiga(value, claLiga)} />
            <ElementoCampo type="select" lblCampo="Torneo:* " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} />
            <ElementoCampo type="select" lblCampo="Jornada: " claCampo="campo" nomCampo={idJornada} options={datosJornada} onInputChange={setIdJornada} />
            <label htmlFor="label" className="labelLeft">Los filtros con * son requeridos</label>
            <SimpleTable data={datosEstadisticaEquipo} columns={columns} handleEdit={handleEdit} />
          </>
          
      </div>
    </>
  );
};

export default FrmEstadisticaPorEquipo;
