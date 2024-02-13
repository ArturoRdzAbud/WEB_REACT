import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';

//TIP: TENER SIEMPRE PRENDIDO EL INSPECTOR WEB (CONSOLA) EN EL NAVEGADOR PARA VER TODOS LOS ERRORES EN VIVO 

const CatTiposDeSancion = () => {

  const [data, setDatos] = useState([]);
  const [dataD, setDatosD] = useState([]);
  //Filtros
  const [esVerBaja, setEsVerBaja] = useState(false);
  const [ligaF, setLigaF] = useState(-1);
  const [dataLiga, setDatosLiga] = useState([]);

  //>
  const [esEditar, setEsEditar] = useState(false);
  const [esNuevo, setEsNuevo] = useState(false);
  const [idTipoSancion, setIdTipoSancion] = useState(0);
  const [clave, setClave] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [causaBaja, setCausaBaja] = useState(false);
  const [activo, setActivo] = useState(false);
  const [juegosSuspension, setJuegosSuspension] = useState('');

  //datos de registri
  const [idLiga, setIdLiga] = useState(0);
  const [accion, setAccion] = useState(0);

  const guardarTiposDeSancion = async (e) => {
    e.preventDefault();

    const data = {
      pnIdLiga: idLiga,
      pnIdTipoSancion: idTipoSancion,
      psClave: clave,
      psdescripcion: descripcion,
      pnJuegosSuspension: juegosSuspension,
      pnCausaBaja: causaBaja,
      pnActivo: activo,
      pnAccion: accion
    };

    const apiReq = 'http://localhost:3000/GuardarTiposDeSancion';

    try {
      await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' });
      console.log('Guardando Tipos de Sanción', data);
      inicializaCampos()
      setEsEditar(false)//regresa al grid
    } catch (error) {
      console.error('Error al guardar el tipo de sanción', error);
    }
  };
  const inicializaCampos = () => {
    //TODO LIMPIAR CADA FILTRO A SU VALOR INICIAL
    setEsVerBaja(false)
    setLigaF(-1)
    //setTorneoF(-1)
    //Campos 
    setIdLiga(0)
    setIdTipoSancion(0)
    setDescripcion('')
    setClave('')
    setJuegosSuspension(0)
    setCausaBaja(false)
  };
  const cancelar = () => {
    console.log('Edición cancelada');
    inicializaCampos()
    setEsEditar(false)
  };
  const nuevo = () => {
    inicializaCampos()
    setEsEditar(true)
    setEsNuevo(true)
  };

  //se ejecuta 1 vez al inicio se
  // llenan combos
  useEffect(() => {
    var apiUrl = 'http://localhost:3000/ConsultarCombo?psSpSel=%22ConsultarLigasCmb%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosLiga(response.data)
      }
      )
      .catch(error => console.error('Error al obtener LIGA', error));

  }, []);

  useEffect(() => {
    // Cambia la URL a la de tu API
    const apiUrl = 'http://localhost:3000/ConsultarTiposDeSancion?pnIdLiga=1';
    axios.get(apiUrl)
      .then(response => { setDatos(response.data); setDatosD(response.data) })
      .catch(error => console.error('Error al obtener datos:', error));
  }, [esEditar]); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente

  useEffect(() => {
    // TODO IR FILTRANDO LOCALMENTE CAMPO POR CAMPO SIN IR A BASE DE DATOS
    var datosFiltrados = data
    datosFiltrados = esVerBaja ? data.filter(item => item.Activo) : data;
    datosFiltrados = ligaF > 0 ? datosFiltrados.filter(item => item.IdLiga == ligaF) : datosFiltrados;
    //datosFiltrados = torneoF > 0 ? datosFiltrados.filter(item => item.IdTorneo == torneoF) : datosFiltrados;

    setDatosD(datosFiltrados);
  }, [esVerBaja, ligaF]); //AGREGAR AQUI CADA FILTRO PARA QUE SE FILTRE CADA VEZ QUE CAMBIA UNO



  const columns = [
    {
      header: 'Clave',
      accessorKey: 'Clave',
      footer: 'Clave'
    },
    {
      header: 'Descripción',
      accessorKey: 'Descripcion',
      footer: 'Descripción'
    },
    {
      header: 'Juegos Suspensión',
      accessorKey: 'JuegosSuspension',
      footer: 'Juegos Suspension'
    },
    {
      header: 'Causa Baja',
      accessorKey: 'CausaBaja',
      footer: 'Causa Baja'
    },
    {
      header: 'Activa',
      accessorKey: 'Activo',
      footer: 'Activa'
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    }
  ];


  // }
  const handleEdit = (rowData) => {
    setEsEditar(true)
    setDescripcion(rowData.original.descripcion)
    setIdTipoSancion(rowData.original.idTipoSancion)
    if (rowData.original.Activo == false) { setActivo(false) } else { setActivo(true) }

    setIdLiga(rowData.original.IdLiga)
    setAccion(0)//0 para MODIF 1 para nuevo

  }


  return (
    <div>
      <h1>Tipos de Sanción</h1>
      <hr></hr>
      {!esEditar ?
        <>
          <button type="button" className="btn btn-primary" onClick={nuevo}>Nuevo</button>
          <ElementoCampo type='checkbox' lblCampo="Ver Baja :" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} />
          <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={ligaF} options={dataLiga} onInputChange={setLigaF} />
          <SimpleTable data={dataD} columns={columns} handleEdit={handleEdit} />
        </>
        :


        <div>
          {/* 
          <form onSubmit={guardarEquipo}>
            <br />

            <ElementoCampo type='text' lblCampo="Activo* :" claCampo="nombre" onInputChange={setNombre} nomCampo={nombre} />
            <ElementoCampo type='text' lblCampo="Capitán del Equipo :" claCampo="claCapitan" nomCampo={capitan} onInputChange={setCapitan} />
            <ElementoCampo type='checkbox' lblCampo="Activo :" claCampo="activo" nomCampo={activo} onInputChange={setActivo} />

            <button type="submit" className="btn btn-primary" >Guardar</button>
            <button type="button" className="btn btn-primary" onClick={cancelar}>Cancelar</button>

            <p>Parrafo temporal para ver parametros del SP a Base de datos|@intIdEquipo={idEquipo}|@sNombre={nombre}|@sCapitan={capitan}|@sActivo={activo.toString()}|</p>
          </form>
          */}
        </div>

      }
    </div>
  );
};

export default CatTiposDeSancion;
