import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';
import { AlertaEmergente } from './AlertaEmergente';
import { SideBarHeader } from './SideBarHeader';

import dayjs from 'dayjs';


//TIP: TENER SIEMPRE PRENDIDO EL INSPECTOR WEB (CONSOLA) EN EL NAVEGADOR PARA VER TODOS LOS ERRORES EN VIVO 
const TraCapturaDeResultados = () => {
  const [datosResultadosBD, setdatosResultadosBD] = useState([]);
  const [datosResultados, setdatosResultados] = useState([]);
  const [datosEquipo1BD, setDatosEquipo1BD] = useState([]);
  const [datosEquipo1, setDatosEquipo1] = useState([]);
  const [datosEquipo2BD, setDatosEquipo2BD] = useState([]);
  const [datosEquipo2, setDatosEquipo2] = useState([]);
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
  const [fechaHora, setFechaHora] = useState('');

  
  //DatosPantalla
  const [claLiga, setClaLiga] = useState(-1);
  const [claTorneo, setClaTorneo] = useState(-1);
  const [idJornada, setIdJornada] = useState(-1);
  const [esMuestraCamposReq, setEsMuestraCamposReq] = useState(false);
  
  const onAceptar = () => {
    setEsMuestraCamposReq(false)
  };

  const guardarCapturaDeResultados = async (e) => {
    e.preventDefault();

    //FALTA TRABAJAR EN ESTA PARTE CUANDO VEAMOS LO DE LA EDICIÓN DE GOLES

    //convierte arreglo a xml para parametro sql
    var xmlString
    xmlString = ''
    // console.log(datosEquipos)
    // return
    if (esEditar) {
      //const datosJugadoresEquipo1 = datosEquipo1.filter((equipo1) => {return equipo1.ActivoChk;});
      const datosJugadoresEquipo1 = datosEquipo1.map(({ IdLiga, IdTorneo, IdJornada, IdEquipo }) => ({ IdLiga, IdTorneo, IdJornada, IdEquipo }));
      const xmlDoc = document.implementation.createDocument(null, "data");
      const rootElement = xmlDoc.documentElement;
      datosJugadoresEquipo1.forEach(item => {
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
      console.log(xmlString);
    }
    return

    //convierte arreglo a xml para parametro sql
    var xmlString2
    xmlString2 = ''
    // console.log(datosEquipos)
    // return
    if (esEditar) {
      //const datosJugadoresEquipo1 = datosEquipo1.filter((equipo1) => {return equipo1.ActivoChk;});
      const datosJugadoresEquipo2 = datosEquipo2.map(({ IdLiga, IdTorneo, IdJornada, IdEquipo }) => ({ IdLiga, IdTorneo, IdJornada, IdEquipo }));
      const xmlDoc2 = document.implementation.createDocument(null, "data");
      const rootElement2 = xmlDoc2.documentElement;
      datosJugadoresEquipo2.forEach(item => {
        const itemElement2 = xmlDoc2.createElement("item");
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            const propElement2 = xmlDoc2.createElement(key);
            propElement2.textContent = item[key];
            itemElement2.appendChild(propElement2);
          }
        }
        rootElement2.appendChild(itemElement2);
      });
      xmlString2 = new XMLSerializer().serializeToString(xmlDoc2);
      // console.log(xmlString);
    }

    const data = {
      pnIdLiga: claLiga,
      pnIdTorneo: claTorneo,
      pnIdJornada: idJornada,
      pnIdEquipo: idEquipo1,
      ptFechaHora: fechaHora,
      pnEsEditarResultados: esEditarResultados,
      psXmlEquipo1: xmlString,
      psXmlEquipo2: xmlString2
    };
    const apiReq = config.apiUrl + '/GuardarCapturaDeResultados';
    try {

      // todo validar requeridas las horas

      if (claLiga == -1) { setEsMuestraCamposReq(true); return }
      if (claTorneo == -1) { setEsMuestraCamposReq(true); return }
      if (idJornada == -1) { setEsMuestraCamposReq(true); return }
      if (idEquipo1 == -1) { setEsMuestraCamposReq(true); return }
      if (fechaHora.trim == '') { setEsMuestraCamposReq(true); return }
      // console.log(esMuestraCamposReq)
      console.log('Guardando Captura de Resultados', data);
      // if (claLiga == claLiga) return
      await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' });
      inicializaCampos()
      setEsEditar(false)//regresa al grid
      setEsNuevo(false)

    } catch (error) {
      console.error('Error al guardar la captura de resultados', error);
    }
  };


 
  const inicializaCampos = () => {
    //DatosPantalla
    setClaLiga(-1)
    setClaTorneo(-1)
    setIdJornada(-1)
    setIdEquipo1(0)
    setIdEquipo2(0)
    setFechaHora('')
  };
  const cancelar = () => {
    inicializaCampos()
    setEsEditar(false)    
  };
  

  const handleLiga = (value, claLiga) => {//limpia combos hijo 
    setClaLiga(value)
    setClaTorneo(-1)
    setIdJornada(-1)
  };


  const filtraLocalComboTorneo = () => {    
    var datosFiltrados = datosTorneoBD
    datosFiltrados = claLiga > 0 ? datosTorneoBD.filter(item => item.IdLiga == claLiga) : datosTorneoBD;
    setDatosTorneo(datosFiltrados);
  }

  const filtraLocalComboJornada = () => {
    var datosFiltrados = datosJornadaBD
    datosFiltrados = claLiga > 0 ? datosJornadaBD.filter(item => item.IdLiga == claLiga) : datosJornadaBD;
    datosFiltrados = claTorneo > 0 ? datosJornadaBD.filter(item => item.IdTorneo == claTorneo) : datosJornadaBD;
    setDatosJornada(datosFiltrados);
  }

  const filtraLocal = () => {
    if (esEditar) 
    {
        return//sale si es modo edicion
    }
    
    var datosFiltrados = datosResultadosBD
    datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : datosFiltrados;
    datosFiltrados = claTorneo > 0 ? datosFiltrados.filter(item => item.IdTorneo == claTorneo) : datosFiltrados;
    datosFiltrados = idJornada > 0 ? datosFiltrados.filter(item => item.IdJornada == idJornada) : datosFiltrados;

    setdatosResultados(datosFiltrados);

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
      .catch(error => console.error('Error al obtener las ligas', error));

    apiUrl = 'http://localhost:3000/ConsultarCombo?psSpSel=%22ConsultarTorneosCmb%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosTorneoBD(response.data)
        setDatosTorneo(response.data)
      }
      )
      .catch(error => console.error('Error al obtener los torneos', error));

    apiUrl = 'http://localhost:3000/ConsultarCombo?psSpSel=%22ConsultarJornadasCmb%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosJornadaBD(response.data)
        setDatosJornada(response.data)
      }
      )
      .catch(error => console.error('Error al obtener las Jornadas', error));

  }, []);// se ejecuta 1 vez al inicio solamente

  //Carga la consulta de resultados desde BD
  useEffect(() => {
    if (esEditar) 
    {
     
      //Obtiene la información de los jugadores del equipo 1
      apiUrl = 'http://localhost:3000/ConsultarJugadoresEquipo';
      console.log(apiUrl)
      axios.get(apiUrl,{ params: { pnIdLiga: claLiga, pnIdTorneo: claTorneo, pnIdJornada: idJornada, pnIdEquipo: idEquipo1 } })
        .then(response => {
          setDatosEquipo1BD(response.data);
          setDatosEquipo1(response.data);
        })
        .catch(error => console.error('Error al obtener datos:', error))

        //Obtiene la información de los jugadores del equipo 1
        apiUrl = 'http://localhost:3000/ConsultarJugadoresEquipo';
        axios.get(apiUrl,{ params: { pnIdLiga: claLiga, pnIdTorneo: claTorneo, pnIdJornada: idJornada, pnIdEquipo: idEquipo2 } })
          .then(response => {
            setDatosEquipo2BD(response.data);
            setDatosEquipo2(response.data);
          })
          .catch(error => console.error('Error al obtener datos:', error))
      return//sale si es modo edicion
    }

    //Obtiene la información de los partidos programados, según la liga, torneo y jornada especificados
    var apiUrl = 'http://localhost:3000/ConsultarCapturaDeResultados';
    axios.get(apiUrl,{ params: { pnIdLiga: claLiga, pnIdTorneo: claTorneo, pnIdJornada: idJornada } })
      .then(response => {
        setdatosResultadosBD(response.data);
        setdatosResultados(response.data);
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
      header: 'Capturar',
      accessorKey: 'Descripcion',
      footer: 'Capturar'
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
      header: 'Goles',
      accessorKey: 'GolesEquipo1',
      footer: 'Goles'
      ,visible :true
    },
    {
      header: 'Goles',
      accessorKey: 'GolesEquipo2',
      footer: 'Goles'
      ,visible :true
    },
    {
      header: 'Visitante',
      accessorKey: 'Equipo2',
      footer: 'Visitante'
      ,visible:true
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


  const columnsEquipo1 = [
    {
      header: 'IdLiga',
      accessorKey: 'IdLiga',
      footer: 'IdLiga'
      , visible: false
      , eseditable: false
    },
    {
      header: 'IdTorneo',
      accessorKey: 'IdTorneo',
      footer: 'IdTorneo'
      , visible: false
      , eseditable: false
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
      , visible: false
      , eseditable: false
    },
    {
      header: 'IdJugador',
      accessorKey: 'IdJugador',
      footer: 'IdJugador'
      , visible: false
      , eseditable: false
    },
    {
      header: 'Jugador',
      accessorKey: 'Jugador',
      footer: 'Jugador'
      , visible: true
      , eseditable: false
    },
    {
      header: 'Goles',
      accessorKey: 'Goles',
      footer: 'Goles'
      , visible: true
    },
    {
      header: 'TA',
      accessorKey: 'TAEditChk',
      footer: 'TA'
      , visible: true
    },
    {
      header: 'TR',
      accessorKey: 'TREditChk',
      footer: 'TR'
      , visible: true
    },
    {
      header: 'A',
      accessorKey: 'AEditChk',
      footer: 'A'
      , visible: true
    }
  ];

  const columnsEquipo2 = [
    {
      header: 'IdLiga',
      accessorKey: 'IdLiga',
      footer: 'IdLiga'
      , visible: false
      , eseditable: false
    },
    {
      header: 'IdTorneo',
      accessorKey: 'IdTorneo',
      footer: 'IdTorneo'
      , visible: false
      , eseditable: false
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
      , visible: false
      , eseditable: false
    },
    {
      header: 'IdJugador',
      accessorKey: 'IdJugador',
      footer: 'IdJugador'
      , visible: false
      , eseditable: false
    },
    {
      header: 'Jugador',
      accessorKey: 'Jugador',
      footer: 'Jugador'
      , visible: true
      , eseditable: false
    },
    {
      header: 'Goles',
      accessorKey: 'Goles',
      footer: 'Goles'
      , visible: true
      , eseditable: true
    },
    {
      header: 'TA',
      accessorKey: 'TAEditChk',
      footer: 'TA'
      , visible: true
    },
    {
      header: 'TR',
      accessorKey: 'TREditChk',
      footer: 'TR'
      , visible: true
    },
    {
      header: 'A',
      accessorKey: 'AEditChk',
      footer: 'A'
      , visible: true
    }
  ];


  const handleEdit = (rowData, id) => {
    setClaLiga(rowData.original.IdLiga)
    setClaTorneo(rowData.original.IdTorneo)
    setIdJornada(rowData.original.IdJornada)
    setIdEquipo1(rowData.original.IdEquipo1)
    setEquipo1(rowData.original.Equipo1)
    setIdEquipo2(rowData.original.IdEquipo2)
    setEquipo2(rowData.original.Equipo2) 
    setFechaHora(rowData.original.FechaHora2)
    setEsEditar(false)
    if (id == 'Descripcion') {
       console.log(id)
      setEsEditar(true)
    }
     
   
  }

  return (
    <>
      <SideBarHeader titulo={esEditar ? 'Captura de Resultados' : 'Resultados'}></SideBarHeader>
      <br/><br/><br/><br/>
      <div>        
        {!esEditar ?//----------------------------MODO GRID pinta filtros al inicio
          <>
            <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={(value) => handleLiga(value, claLiga)} />
            <ElementoCampo type="select" lblCampo="Torneo: " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} />
            <ElementoCampo type="select" lblCampo="Jornada: " claCampo="campo" nomCampo={idJornada} options={datosJornada} onInputChange={setIdJornada} />
            <SimpleTable data={datosResultados} columns={columns} handleEdit={handleEdit} />
          </>
          ://----------------------------MODO EDICION
          <div>
            <form onSubmit={guardarCapturaDeResultados}>
              <br />
              <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={setClaLiga} editable={false} />
              <ElementoCampo type="select" lblCampo="Torneo: " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} editable={false} />
              <ElementoCampo type="select" lblCampo="Jornada: " claCampo="campo" nomCampo={idJornada} options={datosJornada} onInputChange={setIdJornada} editable={false} />
              <hr />
              <ElementoCampo type='datetime-local' lblCampo="Fecha Hora*:" claCampo="fechahora" nomCampo={fechaHora} onInputChange={setFechaHora} />
              <hr />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left' }}>
                <span>
                    <SimpleTable data={datosEquipo1} setData={setDatosEquipo1} columns={columnsEquipo1} handleEdit={handleEdit} esOcultaBotonNuevo={true} esOcultaFiltro={true} />
                </span>                
                <span>
                    <SimpleTable data={datosEquipo2} setData={setDatosEquipo2} columns={columnsEquipo2} handleEdit={handleEdit} esOcultaBotonNuevo={true} esOcultaFiltro={true} />
                </span>
              </div>                       
              
                            
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
      </div>
    </>
  );
};

export default TraCapturaDeResultados;
