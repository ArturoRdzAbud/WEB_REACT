import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';


//TIP: TENER SIEMPRE PRENDIDO EL INSPECTOR WEB (CONSOLA) EN EL NAVEGADOR PARA VER TODOS LOS ERRORES EN VIVO 
const CatEquipos = () => {
  const [data, setDatos] = useState([]);
  const [dataD, setDatosD] = useState([]);
  //Filtros
  const [esVerBaja, setEsVerBaja] = useState(false);
  const [ligaF, setLigaF] = useState(-1);
  const [dataLiga, setDatosLiga] = useState([]);
  //>
  const [esEditar, setEsEditar] = useState(false);
  const [idEquipo, setIdEquipo] = useState(0);
  const [nombre, setNombre] = useState('');
  const [activo, setActivo] = useState(false);

  const [idLiga, setIdLiga] = useState(0);
  const [idTorneo, setIdTorneo] = useState(0);
  const [accion, setAccion] = useState(0);

  const guardarEquipo = async (e) => {
    e.preventDefault();

    const data = {
      pnIdLiga: idLiga,
      pnIdTorneo: idTorneo,
      pnIdEquipo: idEquipo,
      psNombre: nombre,
      pnActivo: activo,
      pnAccion: accion
    };

    const apiReq = 'http://localhost:3000/GuardarEquipo';

    try {

      await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' });
      console.log('Guardando equipo', data);
      inicializaFiltros()
      setEsEditar(false)//regresa al grid
    } catch (error) {
      console.error('Error al guardar el equipo', error);
    }
  };
  const inicializaFiltros = () => {
    //TODO LIMPIAR CADA FILTRO A SU VALOR INICIAL
    setEsVerBaja(false)
    setLigaF(-1)
  };
  const cancelar = () => {
    console.log('Edición cancelada');
    inicializaFiltros()
    setEsEditar(false)
  };

  useEffect(() => {
    const apiUrl = 'http://localhost:3000/ConsultarGrid?psSpSel=%22ConsultarLigasCmb%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosLiga(response.data)
      }
      )
      .catch(error => console.error('Error al obtener LIGA', error));
  }, []);
  useEffect(() => {
    const apiUrl = 'http://localhost:3000/ConsultarGrid?psSpSel=%22BuscarEquipos%22';
    axios.get(apiUrl)
      .then(response => { setDatos(response.data); setDatosD(response.data) })
      .catch(error => console.error('Error al obtener datos:', error));
  }, [esEditar]); // ASEGURA QUE SE EJECUTA CUANDO CAMBIA esEditar recarga GRID

  useEffect(() => {
    // TODO IR FILTRANDO CAMPO POR CAMPO
    var datosFiltrados = data
    datosFiltrados = esVerBaja ? data.filter(item => item.Activo) : data;
    datosFiltrados = ligaF > 0 ? datosFiltrados.filter(item => item.IdLiga == ligaF) : datosFiltrados;
    
    setDatosD(datosFiltrados);
  }, [esVerBaja, ligaF]); //AGREGAR AQUI CADA FILTRO

  const columns = [
    {
      header: 'Id',
      accessorKey: 'IdEquipo',
      footer: 'Id'
    },
    {
      header: 'IdLiga',
      accessorKey: 'IdLiga',
      footer: 'IdLiga'
    },
    {
      header: 'IdTorneo',
      accessorKey: 'IdTorneo',
      footer: 'IdTorneo'
    },
    {
      header: 'Liga',
      accessorKey: 'Liga',
      footer: 'Liga'
    },
    {
      header: 'Torneo',
      accessorKey: 'Torneo',
      footer: 'Torneo'
    },
    {
      header: 'Nombre',
      accessorKey: 'Nombre',
      footer: 'Nombre'
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    },
    {
      header: 'Activo',
      accessorKey: 'Activo',
      footer: 'Activo'
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    }
  ];

  const handleEdit = (rowData) => {
    setEsEditar(true)
    setNombre(rowData.original.Nombre)
    setIdEquipo(rowData.original.IdEquipo)
    if (rowData.original.Activo == false) { setActivo(false) } else { setActivo(true) }

    setIdLiga(rowData.original.IdLiga)
    setIdTorneo(rowData.original.IdTorneo)
    setAccion(0)//0 para MODIF 1 para nuevo
  }

  return (
    <div>
      <h1>Equipos</h1>
      <hr></hr>
      {!esEditar ?//----------------------------MODO EDICION/NUEVO REGISTRO
        <>
          <ElementoCampo type='checkbox' lblCampo="Ver Baja :" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} />
          <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={ligaF} options={dataLiga} onInputChange={setLigaF} />
          <ElementoCampo type="select" lblCampo="Torneo:" claCampo="campo" options={[
            { value: 'opcion1', label: 'test' },
            { value: 'opcion2', label: 'prueba' },
            //TODO completar con informacion de la base de datos leer y cachar el campo CLA
          ]} />
          <SimpleTable data={dataD} columns={columns} handleEdit={handleEdit} />
        </>
        ://----------------------------MODO GRID
        <div>
          <form onSubmit={guardarEquipo}>
            <br />


            <ElementoCampo type='text' lblCampo="Nombre* :" claCampo="nombre" onInputChange={setNombre} nomCampo={nombre} />
            {/* <ElementoCampo type='text' lblCampo="Capitán del Equipo :" claCampo="claCapitan" nomCampo={capitan} onInputChange={setCapitan} /> */}
            <ElementoCampo type='checkbox' lblCampo="Activo :" claCampo="activo" nomCampo={activo} onInputChange={setActivo} />

            <button type="submit" className="btn btn-primary" >Guardar</button>
            <button type="button" className="btn btn-primary" onClick={cancelar}>Cancelar</button>

            <p>Parrafo temporal para ver parametros del SP a Base de datos|@intIdEquipo={idEquipo}|@sNombre={nombre}|@sActivo={activo.toString()}|</p>
          </form>
        </div>

      }
    </div>
  );
};

export default CatEquipos;
