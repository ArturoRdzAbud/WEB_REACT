import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';
import { AlertaEmergente } from './AlertaEmergente';
import { SideBarHeader } from './SideBarHeader';
import config from '../config'; // archivo configs globales del proy
import Close from '../svg/icon-close.svg?react'
import Save from '../svg/icon-save.svg?react'

//TIP: TENER SIEMPRE PRENDIDO EL INSPECTOR WEB (CONSOLA) EN EL NAVEGADOR PARA VER TODOS LOS ERRORES EN VIVO 

const CatTiposDeSancion = () => {

  const [datosTiposBd, setDatosTiposBd] = useState([]);
  const [datosTipos, setDatosTipos] = useState([]);
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
  const [juegosSuspension, setJuegosSuspension] = useState(0);

  //datos de registro
  const [idLiga, setIdLiga] = useState(0);
  const [accion, setAccion] = useState(0);

  const [esMuestraCamposReq, setEsMuestraCamposReq] = useState(false);

  const onAceptar = () => {
    setEsMuestraCamposReq(false)
  };

  const guardarTiposDeSancion = async (e) => {
    e.preventDefault();

    const data = {
      pnIdLiga: idLiga,
      pnIdTipoSancion: idTipoSancion,
      psClave: clave,
      psDescripcion: descripcion,
      pnJuegosSuspension: juegosSuspension,
      pnCausaBaja: causaBaja,
      pnActivo: activo,
      pnAccion: accion
    };

    const apiReq = config.apiUrl + '/GuardarTiposDeSancion';

    try {
      console.log('Guardando Tipos de Sanción', data);
      if (idLiga == 0) { setEsMuestraCamposReq(true); return }
      if (clave.trim() == '') { setEsMuestraCamposReq(true); return }
      if (descripcion.trim() == '') { setEsMuestraCamposReq(true); return }
      if (juegosSuspension === null || juegosSuspension === '' || juegosSuspension < 0 || isNaN(juegosSuspension)) { setEsMuestraCamposReq(true); return }

      await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' });
      //console.log('Guardando Tipos de Sanción', data);
      inicializaCampos()
      setEsEditar(false)//regresa al grid
      setEsNuevo(false)
    } catch (error) {
      console.error('Error al guardar el tipo de sanción', error);
    }
  };
  const inicializaCampos = () => {
    //TODO LIMPIAR CADA FILTRO A SU VALOR INICIAL
    setEsVerBaja(true)
    setActivo(true)
    setLigaF(-1)

    //Campos 
    setIdLiga(0)
    setIdTipoSancion(0)
    setDescripcion('')
    setClave('')
    setJuegosSuspension(0)
    setCausaBaja(false)
    setAccion(0)
  };
  const cancelar = () => {
    console.log('Edición cancelada');
    inicializaCampos()
    setEsEditar(false)
    setEsNuevo(false)
  };
  const nuevo = () => {
    inicializaCampos()
    setEsEditar(true)
    setEsNuevo(true)
    setAccion(1)
  };

  //se ejecuta 1 vez al inicio se
  // llenan combos
  useEffect(() => {
    var apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarLigasCmb%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosLiga(response.data)
      }
      )
      .catch(error => console.error('Error al obtener LIGA', error));

  }, []);   // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente

  useEffect(() => {
    // Cambia la URL a la de tu API
    //const apiUrl = 'http://localhost:3000/ConsultarTiposDeSancion?pnIdLiga=1';
    const apiUrl = config.apiUrl + '/ConsultarTiposDeSancion';
    //axios.get(apiUrl)
    if (esEditar) return//sale si es modo edicion
    //axios.get('http://localhost:3000/ConsultarTiposDeSancion', { params: { pnIdLiga: ligaF } })
    axios.get(apiUrl, { params: { pnIdLiga: ligaF } })
      .then(response => { setDatosTipos(response.data); setDatosTiposBd(response.data) })
      .catch(error => console.error('Error al obtener datos:', error))
      .finally(() => {
        inicializaCampos()
      });
  }, [esEditar]);  // useEffect se ejecuta cuando se modifica la propiedad esEditar

  const filtraLocal = () => {
    // TODO IR FILTRANDO LOCALMENTE CAMPO POR CAMPO SIN IR A BASE DE DATOS
    var datosFiltrados = datosTiposBd
    datosFiltrados = !esVerBaja ? datosTiposBd.filter(item => item.ActivoChk) : datosTiposBd;
    datosFiltrados = ligaF > 0 ? datosFiltrados.filter(item => item.IdLiga == ligaF) : datosFiltrados;

    setDatosTipos(datosFiltrados);
  }

  useEffect(() => {
    filtraLocal()
  }, [esVerBaja, ligaF]); //Se invoca al interactuar con los filtros arriba del grid



  const columns = [
    {
      header: 'Id',
      accessorKey: 'IdTipoSancion',
      footer: 'Id'
      , visible: false
    },
    {
      header: 'Clave',
      accessorKey: 'Clave',
      footer: 'Clave'
      , visible: true
    },
    {
      header: 'Descripción',
      accessorKey: 'Descripcion',
      footer: 'Descripción'
      , visible: true
    },
    {
      header: 'Juegos Suspensión',
      accessorKey: 'JuegosSuspension',
      footer: 'Juegos Suspensión'
      , visible: true
    },
    {
      header: 'Causa Baja',
      accessorKey: 'CausaBaja',
      footer: 'Causa Baja'
      , visible: true
      , cell: ({ getValue }) => (getValue() ? 'Si' : 'No')
    },
    {
      header: 'Activo',
      accessorKey: 'ActivoChk',
      footer: 'Activo'
      , visible: true
      , cell: ({ getValue }) => (getValue() ? 'Si' : 'No')
    }
  ];


  // }
  const handleEdit = (rowData) => {
    setEsEditar(true)
    setClave(rowData.original.Clave)
    setDescripcion(rowData.original.Descripcion)
    setIdTipoSancion(rowData.original.IdTipoSancion)
    setJuegosSuspension(rowData.original.JuegosSuspension)
    setCausaBaja(rowData.original.CausaBaja)
    if (rowData.original.ActivoChk == false) { setActivo(false) } else { setActivo(true) }

    setIdLiga(rowData.original.IdLiga)
    setAccion(0)//0 para MODIF 1 para nuevo

  }


  return (
    <div>
      {/*{esNuevo ? (<h1>Nuevo Tipos de Sanción</h1>) : esEditar ? <h1>Editar Tipos de Sanción</h1> : <h1>Tipos de Sanción</h1>}*/}
      <SideBarHeader titulo={esNuevo ? 'Nuevo Tipos de Sanción' : esEditar ? 'Editar Tipos de Sanción' : 'Tipos de Sanción'}></SideBarHeader>
      <br /><br /><br /><br />
      {/*<hr></hr>*/}
      {!esEditar ?
        <>
          {/*<button type="button" className="btn btn-primary" onClick={nuevo}>Nuevo</button>*/}
          <ElementoCampo type='checkbox' lblCampo="Ver Inactivos:" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} />
          <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={ligaF} options={dataLiga} onInputChange={setLigaF} />
          {/*<p>Parrafo temporal para ver parametros del SP a Base de datos|@IdLiga={ligaF}|</p>*/}
          <SimpleTable data={datosTipos} columns={columns} handleEdit={handleEdit} handleNuevo={nuevo} />
        </>
        :
        <>
          <form onSubmit={guardarTiposDeSancion}>
            <br />
            {/* <ElementoCampo type='checkbox' lblCampo="Ver Baja :" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} /> */}
            <ElementoCampo type="select" lblCampo="Liga*: " claCampo="campo" nomCampo={idLiga} options={dataLiga} onInputChange={setIdLiga} editable={esNuevo} />
            <ElementoCampo type='text' lblCampo="Clave* :" claCampo="Clave" onInputChange={setClave} nomCampo={clave} editable={esNuevo} />
            <ElementoCampo type='text' lblCampo="Descripción* :" claCampo="Descripcion" onInputChange={setDescripcion} nomCampo={descripcion} />
            <ElementoCampo type='number' lblCampo="Juegos de Suspensión* :" claCampo="JuegosSuspension" nomCampo={juegosSuspension} onInputChange={setJuegosSuspension} />
            <ElementoCampo type='checkbox' lblCampo="Causa Baja* :" claCampo="CausaBaja" nomCampo={causaBaja} onInputChange={setCausaBaja} />
            <ElementoCampo type='checkbox' lblCampo="Activo :" claCampo="activo" nomCampo={activo} onInputChange={setActivo} />

            <button type="submit" className="btn btn-primary" >Guardar</button>
            <button type="button" className="btn btn-primary" onClick={cancelar}>Cancelar</button>

            {/*<p>Parrafo temporal para ver parametros del SP a Base de datos|@accion={accion}|@IdTipoSancion={idTipoSancion}|@sDescripcion={descripcion}|@sActivo={activo.toString()}|</p>*/}
          </form>
        </>
      }
      {esMuestraCamposReq &&
        <AlertaEmergente
          titulo={'Alerta'}
          mensaje={'Los datos con * son requeridos, favor de validar.'}
          mostrarBotonAceptar={true}
          mostrarBotonCancelar={false}
          onAceptar={onAceptar}
        ></AlertaEmergente>
      }
    </div>
  );
};

export default CatTiposDeSancion;
