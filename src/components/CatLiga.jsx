import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';
import { ElementoBotones } from './ElementoBotones';
import { SideBarHeader } from './SideBarHeader';
import config from '../config'; // archivo configs globales del proy
import { useNavigate } from 'react-router-dom';
import { ElementoToastNotification } from './ElementoToastNotification';


//TIP: TENER SIEMPRE PRENDIDO EL INSPECTOR WEB (CONSOLA) EN EL NAVEGADOR PARA VER TODOS LOS ERRORES EN VIVO 
const CatLiga = () => {
    const [datosLigaBD, setDatosLigaBD] = useState([]);
    //Filtros
    const [esVerBaja, setEsVerBaja] = useState(false);
    const [esVerCamposFiltro, setEsVerCamposFiltro] = useState(false);
    const [datosLiga, setDatosLiga] = useState([]);
    //pais estado municipo
    const [datosPais, setDatosPais] = useState([]);
    const [datosPaisBD, setDatosPaisBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
    const [datosEstado, setDatosEstado] = useState([]);
    const [datosEstadoBD, setDatosEstadoBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
    const [datosMunicipio, setDatosMunicipio] = useState([]);
    const [datosMunicipioBD, setDatosMunicipioBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
    //>
    const [esEditar, setEsEditar] = useState(false);
    const [esNuevo, setEsNuevo] = useState(false);
    const [esFin, setEsFin] = useState(false);


    //datos de registro
    const [accion, setAccion] = useState(0);

    //DatosPantalla
    const [activo, setActivo] = useState(false);
    const [claLiga, setClaLiga] = useState(-1);
    const [ligaNombre, setLigaNombre] = useState('');
    const [ligaRepresentante, setLigaRepresentante] = useState('');
    const [ligaTelefono, setLigaTelefono] = useState('');
    const [ligaCorreo, setLigaCorreo] = useState('');
    const [ligaPais, setLigaPais] = useState(-1);
    const [ligaEstado, setLigaEstado] = useState(-1);
    const [ligaMunicipio, setLigaMunicipio] = useState(-1);
    const [ligaPaisF, setLigaPaisF] = useState(-1);
    const [ligaEstadoF, setLigaEstadoF] = useState(-1);
    const [ligaMunicipioF, setLigaMunicipioF] = useState(-1);

    const [esMuestraCamposReq, setEsMuestraCamposReq] = useState(false);
    const [esMuestraConfirmacion, setEsMuestraConfirmacion] = useState(false);

    // const history = useHistory();
    const navigate = useNavigate();

    const onAceptar = () => {
        setEsMuestraCamposReq(false)
        setEsMuestraConfirmacion(false)
        setEsFin(false)

        inicializaCampos()
        setEsEditar(false)
        setEsNuevo(false)

    };
    const onAceptarB = () => {
        setEsMuestraCamposReq(false)
        setEsMuestraConfirmacion(false)
        setEsFin(false)
    };
    const guardarLiga = async (e) => {
        e.preventDefault();

        const data = {
            pnIdLiga: claLiga,
            psNombre: ligaNombre,
            psRepresentante: ligaRepresentante,
            psTelefono: ligaTelefono,
            psCorreo: ligaCorreo,
            pnPais: ligaPais,
            pnEstado: ligaEstado,
            pnMunicipio: ligaMunicipio,
            pnActivo: activo,
            pnAccion: accion,
        };
        const apiReq = config.apiUrl + '/GuardarLiga';
        try {
            // if (claLiga == -1) { setEsMuestraCamposReq(true); return }

            // console.log(ligaNombre.trim())
            // return

            if (ligaNombre.trim() === '') { setEsMuestraCamposReq(true); return }
            if (!ligaPais > 0) { setEsMuestraCamposReq(true); return }
            if (!ligaEstado > 0) { setEsMuestraCamposReq(true); return }
            if (!ligaMunicipio > 0) { setEsMuestraCamposReq(true); return }

            console.log('Guardando Liga', data);
            await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' });

            setEsFin(true)

            // inicializaCampos()
            // setEsEditar(false)
            // setEsNuevo(false)
            

        } catch (error) {
            console.error('Error al guardar LIGA', error);
        }
    };


    const inicializaCampos = () => {
        // console.log('Inicializa')
        setEsVerBaja(true)
        //Campos 
        setLigaNombre('')
        setLigaRepresentante('')
        setLigaTelefono('')
        setLigaCorreo('')
        
        setLigaPais(-1)
        setLigaEstado(-1)
        setLigaMunicipio(-1)

        //DatosPantalla
        setClaLiga(-1)

        setActivo(true)
        setAccion(0)
        setEsFin(false)
    };
    const cancelar = () => {
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

    const handlePais = (value, claPais) => {//limpia combos hijo 
        setLigaPaisF(value)
        setLigaEstado(-1)
        setLigaMunicipio(-1)
    };
    const handleEstado = (value, claEstado) => {//limpia combos hijo 
        setLigaEstadoF(value)
        setLigaMunicipio(-1)
    };
    const handleMunicipio = (value, claMunicipio) => {//limpia combos hijo 
        setLigaMunicipioF(value)
    };


    const filtraLocalCombo = (pais,estado) => {
        console.log(pais)

        var datosFiltrados = datosEstadoBD
        datosFiltrados = pais > 0 ? datosFiltrados.filter(item => item.IdPais == pais) : [];
        // console.log(datosFiltrados)
        setDatosEstado(datosFiltrados);

        datosFiltrados = datosMunicipioBD
        datosFiltrados = estado > 0 ? datosFiltrados.filter(item => item.IdPais == pais && item.IdEstados == estado) : [];
        // console.log(datosFiltrados)
        setDatosMunicipio(datosFiltrados);
    }
    const filtraLocal = () => {
        console.log('filtraLocal')
        filtraLocalCombo(ligaPaisF,ligaEstadoF)//Asigna la Dependencia de combos 
        var datosFiltrados = datosLigaBD
        datosFiltrados = !esVerBaja ? datosLigaBD.filter(item => item.ActivoChk) : datosLigaBD;
        datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : datosFiltrados;
        datosFiltrados = ligaPaisF > 0 ? datosFiltrados.filter(item => item.IdPais == ligaPaisF) : datosFiltrados;
        datosFiltrados = ligaEstadoF > 0 ? datosFiltrados.filter(item => item.IdEstado == ligaEstadoF) : datosFiltrados;
        datosFiltrados = ligaMunicipioF > 0 ? datosFiltrados.filter(item => item.IdMunicipio == ligaMunicipioF) : datosFiltrados;

        setDatosLiga(datosFiltrados);
    };

    //-------------------------------------------------------------------SECCION USE EFFFECT
    // llena arreglos de combos
    useEffect(() => {
        var apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarPaisCmb%22';
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

    }, []);// se ejecuta 1 vez al inicio solamente

    //Carga equipos desde BD

    useEffect(() => {
        if (esEditar) return//sale si es modo edicion
        var apiUrl = config.apiUrl + '/ConsultarGrid?psSpSel=%22BuscarLigas%22';
        axios.get(apiUrl)
            .then(response => {
                // console.log('Carga equipos desde BD')
                setDatosLigaBD(response.data);
                // console.log(datosLigaBD)
                // console.log(response.data)
                // setDatosLiga(response.data);
            })

            // .then(() => {
            //     filtraLocal()
            // })

            .catch(error => console.error('Error al obtener datos:', error))
            .finally(() => {
                inicializaCampos()
            });



    }, [esEditar]); // Se EJECUTA CUANDO CAMBIA la bandera esEditar

    useEffect(() => {
        filtraLocalCombo(ligaPaisF,ligaEstadoF)
    }, [ligaPaisF, ligaEstadoF, ligaMunicipioF]);//Se llama al modificar el combo liga modo edicion/nuevo
    useEffect(() => {
        filtraLocalCombo(ligaPais,ligaEstado)
    }, [ligaPais, ligaEstado, ligaMunicipio]);//Se llama al modificar el combo liga modo edicion/nuevo


    useEffect(() => {
        filtraLocal()
    }, [esVerBaja, ligaPaisF, ligaEstadoF, ligaMunicipioF, datosLigaBD]); //Se invoca al interactuar con los filtros arriba del grid



    const columns = [
        {
            header: 'IdLiga',
            accessorKey: 'IdLiga',
            footer: 'IdLiga'
            , visible: false
        },
        {
            header: 'Nombre',
            accessorKey: 'Nombre',
            footer: 'Nombre'
            , visible: true
        },
        {
            header: 'Representante',
            accessorKey: 'Representante',
            footer: 'Representante'
            , visible: true
        },
        {
            header: 'Telefono',
            accessorKey: 'Telefono',
            footer: 'Telefono'
            , visible: true
        },
        {
            header: 'Correo',
            accessorKey: 'Correo',
            footer: 'Correo'
            , visible: true
        },
        {
            header: 'Pais',
            accessorKey: 'País',
            footer: 'Pais'
            , visible: esVerCamposFiltro
        },
        {
            header: 'Estado',
            accessorKey: 'Estado',
            footer: 'Estado'
            , visible: esVerCamposFiltro
        },
        {
            header: 'Municipio',
            accessorKey: 'Municipio',
            footer: 'Municipio'
            , visible: esVerCamposFiltro
        },

        {
            header: 'Activo',
            accessorKey: 'ActivoChk',
            footer: 'Activo'
            , visible: true
        },
        {
            header: 'idPais',
            accessorKey: 'idPais',
            footer: 'idPais'
            , visible: false
        },
        {
            header: 'IdEstado',
            accessorKey: 'IdEstado',
            footer: 'IdEstado'
            , visible: false
        },
        {
            header: 'IdMunicipio',
            accessorKey: 'IdMunicipio',
            footer: 'IdMunicipio'
            , visible: false
        }
    ];



    const handleEdit = (rowData, cellId) => {
        // console.log(cellId)
        setEsEditar(true)

        setClaLiga(rowData.original.IdLiga)
        setLigaNombre(rowData.original.Nombre)
        setLigaRepresentante(rowData.original.Representante)
        setLigaTelefono(rowData.original.Telefono)
        setLigaCorreo(rowData.original.Correo)
        setLigaPais(rowData.original.IdPais)
        setLigaEstado(rowData.original.IdEstado)
        setLigaMunicipio(rowData.original.IdMunicipio)
        if (rowData.original.ActivoChk == false) { setActivo(false) } else { setActivo(true) }
        setAccion(0)//0 para MODIF 1 para nuevo
    }

    return (
        <>
            <SideBarHeader titulo={esNuevo ? ('Nueva Liga') : esEditar ? 'Edita Liga' : 'Ligas'}></SideBarHeader>
            <br /><br /><br /><br />

            <div>
                {!esEditar ?//----------------------------MODO GRID pinta filtros al inicio
                    <>
                        <ElementoCampo type='checkbox' lblCampo="Ver filtros en Tabla:" claCampo="activo" nomCampo={esVerCamposFiltro} onInputChange={setEsVerCamposFiltro} />
                        <ElementoCampo type='checkbox' lblCampo="Ver Inactivos :" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ flexGrow: 1 }}>
                                <ElementoCampo type="select" lblCampo="País: " claCampo="campo" nomCampo={ligaPaisF} options={datosPais} onInputChange={(value) => handlePais(value, ligaPaisF)} />
                            </span>
                            <span style={{ flexGrow: 1 }}>
                                <h2></h2>
                            </span>
                            <span style={{ flexGrow: 1 }}>
                                <ElementoCampo type="select" lblCampo="Estado: " claCampo="campo" nomCampo={ligaEstadoF} options={datosEstado} onInputChange={(value) => handleEstado(value, ligaEstadoF)} />
                            </span>
                        </div>
                        <ElementoCampo type="select" lblCampo="Municipio: " claCampo="campo" nomCampo={ligaMunicipioF} options={datosMunicipio} onInputChange={(value) => handleMunicipio(value, ligaMunicipioF)} />

                        <SimpleTable data={datosLiga} columns={columns} handleEdit={handleEdit} handleNuevo={nuevo} />
                    </>
                    ://----------------------------MODO EDICION/NUEVO REGISTRO
                    <div>
                        <form onSubmit={guardarLiga}>
                            <br />
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <ElementoBotones cancelar={cancelar}></ElementoBotones>
                            </div>
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ flexGrow: 1 }}>
                                        <ElementoCampo type='text' lblCampo="Nombre* :" claCampo="nombre" onInputChange={setLigaNombre} nomCampo={ligaNombre} tamanioString="100" />
                                        <ElementoCampo type='text' lblCampo="Representante :" claCampo="nombre" onInputChange={setLigaRepresentante} nomCampo={ligaRepresentante} tamanioString="100" />
                                        <ElementoCampo type='tel' lblCampo="Telefono :" claCampo="nombre" onInputChange={setLigaTelefono} nomCampo={ligaTelefono} tamanioString="100" />
                                        <ElementoCampo type='mail' lblCampo="Correo :" claCampo="nombre" onInputChange={setLigaCorreo} nomCampo={ligaCorreo} tamanioString="100" />
                                    </span>
                                    <span style={{ flexGrow: 1 }}>
                                        <h2></h2>
                                    </span>
                                    <span style={{ flexGrow: 1 }}>
                                        <ElementoCampo type="select" lblCampo="País*: " claCampo="campo" nomCampo={ligaPais} options={datosPais} onInputChange={setLigaPais} />
                                        <ElementoCampo type="select" lblCampo="Estado*: " claCampo="campo" nomCampo={ligaEstado} options={datosEstado} onInputChange={setLigaEstado} />
                                        <ElementoCampo type="select" lblCampo="Municipio*: " claCampo="campo" nomCampo={ligaMunicipio} options={datosMunicipio} onInputChange={setLigaMunicipio} />
                                    </span>
                                </div>

                                <ElementoCampo type='checkbox' lblCampo="Activo :" claCampo="activo" nomCampo={activo} onInputChange={setActivo} />
                            </>


                        </form>
                    </div>
                }

                {esMuestraCamposReq &&
                    // <AlertaEmergente
                    //     titulo={'Alerta'}
                    //     mensaje={'Los datos con * son requeridos, favor de validar.'}
                    //     mostrarBotonAceptar={true}
                    //     mostrarBotonCancelar={false}
                    //     onAceptar={onAceptar}
                    // ></AlertaEmergente>
                    <ElementoToastNotification
                        mensaje={'Los datos con * son requeridos, favor de validar.'}
                        onAceptar={onAceptarB}
                    ></ElementoToastNotification>
                    // : <p></p>
                }
                {esFin &&
                    <ElementoToastNotification
                        mensaje={'Los datos fueron guardados correctamente.'}
                        onAceptar={onAceptar}
                    ></ElementoToastNotification>
                }



            </div>
        </>
    );
};

export default CatLiga;
