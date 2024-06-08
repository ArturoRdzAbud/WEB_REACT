import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';
import { AlertaEmergente } from './AlertaEmergente';
import { SideBarHeader } from './SideBarHeader';
import config from '../config'; // archivo configs globales del proy
import { ElementoImagen } from './ElementoImagen'

export const CatArbitro = () => {
    const [datosArbitro, setDatosArbitro] = useState([]);
    const [datosArbitroBd, setDatosArbitroBd] = useState([]);
    //Filtros
    const [esVerBaja, setEsVerBaja] = useState(false);
    const [ligaF, setLigaF] = useState(-1);
    const [datosLiga, setDatosLiga] = useState([]);
    //>
    const [datosPais, setDatosPais] = useState([]);
    const [datosPaisBD, setDatosPaisBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
    const [datosEstado, setDatosEstado] = useState([]);
    const [datosEstadoBD, setDatosEstadoBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
    const [datosMunicipio, setDatosMunicipio] = useState([]);
    const [datosMunicipioBD, setDatosMunicipioBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente

    const [esEditar, setEsEditar] = useState(false);
    const [esNuevo, setEsNuevo] = useState(false);
    const [esFin, setEsFin] = useState(false);
    const [showPwd, setShowPwd] = useState(false)
    
      //datos de registro
     const [idLiga, setIdLiga] = useState(0);
     const [idArbitro, setIdArbitro] = useState(0);
     const [activo, setActivo] = useState(false);
     const [nombre, setNombre] = useState('');
     const [juegosArbitrados, setJuegosArbitrados] = useState(0);
     const [telefono, setTelefono] = useState(null);
     const [curp, setCurp] = useState('');
     const [idPais, setIdPais] = useState(0);
     const [idEstado, setIdEstado] = useState('');
     const [idMunicipio, setIdMunicipio] = useState('');
     const [fotografia, setFotografia] = useState(null);
     const [userProfileImage, setUserProfileImage] = useState('');
     const [fotosn, setFotosn] = useState(null);
     const [login, setLogin] = useState('');
     const [password, setPassword] = useState('');
     const [accion, setAccion] = useState(0);

     const [esMuestraCamposReq, setEsMuestraCamposReq] = useState(false);

     const selectedFotoHandler = e => {
      console.log('ARCHIVO SELECCIONADO:')
      setFotografia(null)
      setUserProfileImage('')
      setFotografia(e.target.files[0])

     };

     const guardarFoto = async (e) => {
          e.preventDefault();

          const apiReq = config.apiUrl + '/GuardarArbitroFotografia';
          const formData = new FormData()
          formData.append('piFotografia', fotografia)
          formData.append('pnIdLiga', idLiga)
          formData.append('pnIdArbitro', idArbitro)
          console.log('GUARDAR FOTOGRAFIA')
          
          if (!fotografia) {
              alert('Debe seleccionar un archivo')
              return
          }
          else if (fotografia.size > 1000000) {
              alert('El límite máximo del archivo es 1 MB. Favor de validar ')
              return
          }
          else {
              try {
                  await axios.post(apiReq, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                  setEsFin(true)
              } catch (error) {
                  console.error('Error al guardar fotografia', error);
              }
          }

          consultarArbitroFoto();

      };

     const onAceptar = () => {
      setEsMuestraCamposReq(false)
      setEsFin(false)
      };

     const guardarArbitro = async (e) => {
      e.preventDefault();

      if (idLiga == 0) { setEsMuestraCamposReq(true); return }
      if (nombre === null || nombre.trim() == '') { setEsMuestraCamposReq(true); return }
      if (telefono === null || telefono.trim() == '') { setEsMuestraCamposReq(true); return }
      if (curp === null || curp.trim() == '') { setEsMuestraCamposReq(true); return }
      if (idPais == 0) { setEsMuestraCamposReq(true); return }
      if (idEstado == 0) { setEsMuestraCamposReq(true); return }
      if (idMunicipio == 0) { setEsMuestraCamposReq(true); return }
      if ( juegosArbitrados === null || juegosArbitrados === '' || juegosArbitrados < 0 || isNaN(juegosArbitrados)) { setEsMuestraCamposReq(true); return }
      
  
      const data = {
        pnIdLiga: idLiga,        
        pnIdArbitro: idArbitro,
        psNombre: nombre,
        psTelefono: telefono,
        psCurp: curp,
        pnJuegosArbitrados: juegosArbitrados,
        pnIdPais: idPais,
        pnIdEstado: idEstado,
        pnIdMunicipio: idMunicipio,
        pnActivo: activo,
        pnAccion: accion
      };
  
      const apiReq = 'http://localhost:3000/GuardarArbitro';
      console.log('Guardando los datos.', data);
      //try {
        
        
        await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' })
        //.then(response => {
          console.log('guardo correctamente')
        //  console.log(response)
        //}
        //)
        .catch(error => console.error('Error al guardar arbitros', error));
        
        inicializaCampos()
        setEsEditar(false)//regresa al grid
        setEsNuevo(false)
      //} catch (error) {
      //  console.error('Error al guardar los datos.', error);
      //}
    };


    const inicializaCampos = () => {
      //TODO LIMPIAR CADA FILTRO A SU VALOR INICIAL
      setEsVerBaja(true)
      setActivo(true)
      setLigaF(-1)
      
      //Campos 
      setIdLiga(0)
      setIdArbitro(0)
      setNombre('')
      setTelefono('')
      setCurp('')
      setJuegosArbitrados(0)
      setIdPais(1)
      setIdEstado(0)
      setIdMunicipio(0)
      setActivo(true) 
          
      setAccion(0)//0 para MODIF 1 para nuevo
      setEsFin(false)
      setUserProfileImage('')
      setFotografia(null)

    };
   
    const cancelar = () => {
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
  
    useEffect(() => {
      var apiUrl = 'http://localhost:3000/ConsultarGrid?psSpSel=%22ConsultarLigasCmb%22';
      axios.get(apiUrl)
        .then(response => {
          setDatosLiga(response.data)
        }
        )
        .catch(error => console.error('Error al obtener LIGA', error));

        apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarPaisCmb%22';
        axios.get(apiUrl)
            .then(response => {
                setDatosPais(response.data)
            }
            )
            .catch(error => console.error('Error al obtener PAIS', error));

        apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarEstadoCmb%22';
        axios.get(apiUrl)
            .then(response => {
                setDatosEstadoBD(response.data)
                // setDatosEstado(response.data)
            }
            )
            .catch(error => console.error('Error al obtener Estado', error));

        apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarmunicipioCmb%22';
        axios.get(apiUrl)
            .then(response => {
                setDatosMunicipioBD(response.data)
                // setDatosMunicipio(response.data)
            }
            )
            .catch(error => console.error('Error al obtener municipio', error));
        

    }, []);

    useEffect(() => {
      // Cambia la URL a la de tu API
      const apiUrl = config.apiUrl + '/ConsultarArbitros';
      if (esEditar) return//sale si es modo edicion
      axios.get(apiUrl, { params: { pnIdLiga: ligaF } })
        .then(response => { setDatosArbitro(response.data); setDatosArbitroBd(response.data) })
        .catch(error => console.error('Error al obtener datos:', error))
        .finally(() => {
          inicializaCampos()
        });
    }, [esEditar]);  // useEffect se ejecuta cuando se modifica la propiedad esEditar
  
    useEffect(() => {
      consultarArbitroFoto();
    }, [esEditar]);

    const consultarArbitroFoto = () => {
       // Cambia la URL a la de tu API
       const apiUrl = config.apiUrl + '/ConsultarArbitroFoto';
       //axios.get(apiUrl)
       if (idLiga > 0 && idArbitro > 0) {
           
           axios.get(apiUrl, { params: { pnFotosn: fotosn, pnIdLiga: idLiga, pnIdArbitro: idArbitro } }
               , {
                   responseType: 'blob' // Indicar que esperamos una respuesta binaria
               })
               .then(response => {
                   // Convertir la respuesta binaria a una URL de objeto
                  
                   setUserProfileImage(response.data[0].HexadecimalData)      

               })
               .catch(error => console.error('Error al obtener datos:', error))
       }
    };
    
    const filtraLocalCombo = (pais,estado) => {
      
      var datosFiltrados = datosEstadoBD
      datosFiltrados = pais > 0 ? datosFiltrados.filter(item => item.IdPais == pais) : [];
      
      setDatosEstado(datosFiltrados);

      datosFiltrados = datosMunicipioBD
      datosFiltrados = estado > 0 ? datosFiltrados.filter(item => item.IdPais == pais && item.IdEstados == estado) : [];
      
      setDatosMunicipio(datosFiltrados);
  };
   
    const filtraLocal = () => {
    
      // TODO IR FILTRANDO LOCALMENTE CAMPO POR CAMPO SIN IR A BASE DE DATOS
      var datosFiltrados = datosArbitroBd
      datosFiltrados = !esVerBaja ? datosArbitroBd.filter(item => item.ActivoChk) : datosArbitroBd;
      datosFiltrados = ligaF > 0 ? datosFiltrados.filter(item => item.IdLiga == ligaF) : datosFiltrados;

      setDatosArbitro(datosFiltrados);
  };

  useEffect(() => {
      filtraLocal()
  }, [esVerBaja, ligaF]); //Se invoca al interactuar con los filtros arriba del grid

  useEffect(() => {
    filtraLocalCombo(idPais,idEstado)
  }, [idPais, idEstado, idMunicipio]);//Se llama al modificar el combo liga modo edicion/nuevo
  
    const columns = [
      {
        header: 'Id',
        accessorKey: 'IdLiga',
        footer: 'Id'
        ,visible: false
      },
      {
        header: 'Id',
        accessorKey: 'IdArbitro',
        footer: 'Id'
        ,visible: false
      },
      {
        header: 'Nombre',
        accessorKey: 'Nombre',
        footer: 'Nombre'
        ,visible: true
      },
      {
        header: 'Telefono',
        accessorKey: 'Telefono',
        footer: 'Telefono'
        ,visible: true
      },
      {
        header: 'Curp',
        accessorKey: 'Curp',
        footer: 'Curp'
        ,visible: true
      },
      {
        header: 'Juegos',
        accessorKey: 'JuegosArbitrados',
        footer: 'Juegos'
        ,visible: true
      },
      {
        header: 'IdPais',
        accessorKey: 'IdPais',
        footer: 'IdPais'
        , visible: false
      },
      {
        header: 'País',
        accessorKey: 'Pais',
        footer: 'País'
        , visible: true
      },
      {
        header: 'IdEstado',
        accessorKey: 'IdEstado',
        footer: 'IdEstado'
        , visible: false
      },
      {
        header: 'Estado',
        accessorKey: 'Estado',
        footer: 'Estado'
        , visible: true
      },
      {
        header: 'IdMunicipio',
        accessorKey: 'IdMunicipio',
        footer: 'IdMunicipio'
        , visible: false
      },
      {
        header: 'Municipio',
        accessorKey: 'Municipio',
        footer: 'Municipio'
        , visible: true
      },
      {
        header: 'Activo',
        accessorKey: 'ActivoChk',
        footer: 'Activo'
        ,visible: true
      },
    ];

  
    const handleEdit = (rowData) => {
        setEsEditar(true)
        setIdLiga(rowData.original.IdLiga)
        setIdArbitro(rowData.original.IdArbitro)
        setNombre(rowData.original.Nombre)
        setTelefono(rowData.original.Telefono)
        setCurp(rowData.original.Curp)
        setJuegosArbitrados(rowData.original.JuegosArbitrados)
        if (rowData.original.IdPais == 0 || rowData.original.IdPais === null) {
          setIdPais(1); // Inicializamos el País México
        } else {
          setIdPais(rowData.original.IdPais)
        }
        if (rowData.original.IdEstado == 0 || rowData.original.IdEstado === null) {
          setIdEstado(19); // Inicializamos el Estado Nuevo León
        } else {
          setIdEstado(rowData.original.IdEstado)
        }
        if (rowData.original.IdMunicipio == 0 || rowData.original.IdMunicipio === null) {
          setIdMunicipio(1); // Inicializamos el Municipio Monterrey
        } else {
          setIdMunicipio(rowData.original.IdMunicipio)
        }
        if (rowData.original.ActivoChk == false) { setActivo(false) } else { setActivo(true) }
            
        setAccion(0)//0 para MODIF 1 para nuevo
        setFotosn(1)
       
    };

    return (
      <div>
        <SideBarHeader titulo={esNuevo ? 'Nuevo Árbitro' : esEditar ? 'Editar Árbitro' : 'Árbitros'}></SideBarHeader>
        <br /><br /><br /><br />
        {!esEditar ?
          <>
            {/*<button type="button" className="btn btn-primary" onClick={nuevo}>Nuevo</button>*/}
            <ElementoCampo type='checkbox' lblCampo="Ver Inactivos:" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} />
            <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={ligaF} options={datosLiga} onInputChange={setLigaF} />
            {/*<p>Parrafo temporal para ver parametros del SP a Base de datos|@IdLiga={ligaF}|</p>*/}
            <SimpleTable data={datosArbitro} columns={columns} handleEdit={handleEdit} handleNuevo={nuevo} />
          </>
          :
          <>
            <form onSubmit={guardarArbitro}>
              <br />
              
              <div>
                  {userProfileImage ? (
                      // Mostrar la imagen si los datos están disponibles
                      <ElementoImagen hexData={userProfileImage}></ElementoImagen>
                  ) : (
                      // Mostrar un mensaje de carga mientras se obtienen los datos
                      <p>Cargando imagen...</p>
                  )}
              </div>

              <div className='container mt-2'>
                <div className='card p-3'>
                  <div className='row'>
                    <div className='col-7'>
                        <input type='file' className='form-control' name="profile_pic" onChange={selectedFotoHandler} accept=".png, .jpg, .jpeg" />
                    </div>

                    <div className='col-3'>
                        <button type='button' onClick={guardarFoto} className='btn btn-primary col-12'>Cargar imagen</button>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <ElementoCampo type="select" lblCampo="Liga*: " claCampo="campo" nomCampo={idLiga} options={datosLiga} onInputChange={setIdLiga} editable={esNuevo} />
              <ElementoCampo type='text' lblCampo="Nombre* :" claCampo="Nombre" onInputChange={setNombre} nomCampo={nombre}  />
              <ElementoCampo type='text' lblCampo="Telefono* :" claCampo="Telefono" onInputChange={setTelefono} nomCampo={telefono} />
              <ElementoCampo type='text' lblCampo="Curp* :" claCampo="Curp" onInputChange={setCurp} nomCampo={curp} />
              <ElementoCampo type='number' lblCampo="Juegos Arbitrados* :" claCampo="JuegosArbitrados" nomCampo={juegosArbitrados} onInputChange={setJuegosArbitrados} />
              <ElementoCampo type="select" lblCampo="País*: " claCampo="campo" nomCampo={idPais} options={datosPais} onInputChange={setIdPais} />
              <ElementoCampo type="select" lblCampo="Estado*: " claCampo="campo" nomCampo={idEstado} options={datosEstado} onInputChange={setIdEstado}  />
              <ElementoCampo type="select" lblCampo="Municipio*: " claCampo="campo" nomCampo={idMunicipio} options={datosMunicipio} onInputChange={setIdMunicipio}  />
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
        {esFin &&
          <AlertaEmergente
              titulo={'Alerta'}
              mensaje={'Los datos fueron guardados correctamente.'}
              mostrarBotonAceptar={true}
              mostrarBotonCancelar={false}
              onAceptar={onAceptar}
          ></AlertaEmergente>
          // : <p></p>
        }
      </div>
    );
}

export default CatArbitro;
