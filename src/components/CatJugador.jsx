import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';
import { AlertaEmergente } from './AlertaEmergente';
import { SideBarHeader } from './SideBarHeader';
import config from '../config'; // archivo configs globales del proy
import { ElementoBotones } from './ElementoBotones'
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
//import Close from '../svg/icon-close.svg?react'
//import Save  from '../svg/icon-save.svg?react'
import { ElementoImagen } from './ElementoImagen'
import { alignPropType } from 'react-bootstrap/esm/types';
import { ElementoToastNotification } from './ElementoToastNotification';


const CatJugador = () => {

    const [datosJugadorBd, setDatosJugadorBd] = useState([]);
    const [datosJugador, setDatosJugador] = useState([]);
    //Filtros
    const [esVerBaja, setEsVerBaja] = useState(false);
    const [ligaF, setLigaF] = useState(-1);
    //combo
    const [dataLiga, setDatosLiga] = useState([]);
    const [dataGenero, setDatosGenero] = useState([]);

    const [esNuevo, setEsNuevo] = useState(false);
    const [esEditar, setEsEditar] = useState(false);
    const [esFin, setEsFin] = useState(false);


    //datos de registro
    const [idLiga, setIdLiga] = useState(0);
    const [idJugador, setIdJugador] = useState(0);
    const [activo, setActivo] = useState(false);
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState(null);
    const [telefono, setTelefono] = useState(null);
    const [correo, setCorreo] = useState('');
    const [curp, setCurp] = useState('');
    const [idGenero, setIdGenero] = useState(0);
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [foto, setFoto] = useState(null);
    const [accion, setAccion] = useState(0);
    const [userProfileImage, setUserProfileImage] = useState('');
    const [fotosn, setFotosn] = useState(null);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [alertaMensaje, setAlertaMensaje] = useState('');

    const selectedFotoHandler = e => {
        console.log('ARCHIVO SELECCIONADO:')
        setFoto(null)
        setUserProfileImage('')
        setFoto(e.target.files[0])

    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const [esMuestraCamposReq, setEsMuestraCamposReq] = useState(false);

    const onAceptar = () => {
        setEsMuestraCamposReq(false)
        setEsFin(false)
    };
    const onAceptarC = () => {
        setAlertaMensaje('')
    };

    const columns = [
        {
            header: 'Id',
            accessorKey: 'IdJugador',
            footer: 'Id',
            visible: true
        },
        {
            header: 'Nombre',
            accessorKey: 'Nombre',
            footer: 'Nombre',
            visible: true
        },
        {
            header: '#Num',
            accessorKey: 'Numero',
            footer: '#Num',
            visible: true
        },
        {
            header: 'Tel.',
            accessorKey: 'Telefono',
            footer: 'Tel.',
            visible: true
        },
        {
            header: 'Fecha Nac.',
            accessorKey: 'FechaNacimiento',
            footer: 'Fecha Nac.',
            visible: true
            , cell: ({ getValue }) => (isNaN(getValue()) ? getValue() : '')
            //, cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')
            //, cell: ({ getValue }) => (isNaN(getValue()) ? dayjs(getValue()).format('DD/MM/YYYY') : '')
        },
        {
            header: 'CURP',
            accessorKey: 'CURP',
            footer: 'CURP',
            visible: true
        },
        {
            header: 'IdGenero',
            accessorKey: 'IdGenero',
            footer: 'IdGenero',
            visible: false
        },
        {
            header: 'Genero',
            accessorKey: 'Genero',
            footer: 'Genero',
            visible: true
        },
        {
            header: 'Correo',
            accessorKey: 'Correo',
            footer: 'Correo',
            visible: true
        },
        {
            header: 'Login',
            accessorKey: 'Login',
            footer: 'Login',
            visible: false
        },
        {
            header: 'Activo',
            accessorKey: 'ActivoChk',
            footer: 'Activo',
            visible: true
        }
    ];

    // llenan combos
    useEffect(() => {
        var apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarLigasCmb%22';
        axios.get(apiUrl)
            .then(response => {
                setDatosLiga(response.data)
            }
            )
            .catch(error => console.error('Error al obtener LIGA', error));

    }, []);

    useEffect(() => {
        var apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarGenerosCmb%22';
        axios.get(apiUrl)
            .then(response => {
                setDatosGenero(response.data)
            }
            )
            .catch(error => console.error('Error al obtener Generos', error));

    }, []);

    const ConsultarJugadoresFoto = () => {

         // Cambia la URL a la de tu API
         const apiUrl = config.apiUrl + '/ConsultarJugadoresFoto';
         //axios.get(apiUrl)
         console.log(idLiga, idJugador)
         if (idLiga > 0 && idJugador > 0) {
             //axios.get('http://localhost:3000/ConsultarJugadores', { params: { pnIdLiga: ligaF } })
             axios.get(apiUrl, { params: { pnFotosn: fotosn, pnIdLiga: idLiga, pnIdJugador: idJugador } }
                 , {
                     responseType: 'blob' // Indicar que esperamos una respuesta binaria
                 })
                 .then(response => {
                     // Convertir la respuesta binaria a una URL de objeto
                     //console.log(response.data[0].HexadecimalData)
                     setUserProfileImage(response.data[0].HexadecimalData)
 
                 })
                 .catch(error => console.error('Error al obtener datos:', error))
         }
    };


    useEffect(() => {
        ConsultarJugadoresFoto();
    }, [esEditar]);

    useEffect(() => {
        // Cambia la URL a la de tu API
        const apiUrl = config.apiUrl + '/ConsultarJugadores';
        //axios.get(apiUrl)
        if (esEditar) return
        axios.get(apiUrl)
            .then(response => { setDatosJugador(response.data); setDatosJugadorBd(response.data) })
            .catch(error => console.error('Error al obtener datos:', error))
            .finally(() => {
                inicializaCampos()
            });
    }, [esEditar]); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente

    const filtraLocal = () => {
        // TODO IR FILTRANDO LOCALMENTE CAMPO POR CAMPO SIN IR A BASE DE DATOS
        var datosFiltrados = datosJugadorBd
        datosFiltrados = !esVerBaja ? datosJugadorBd.filter(item => item.ActivoChk) : datosJugadorBd;
        datosFiltrados = ligaF > 0 ? datosFiltrados.filter(item => item.IdLiga == ligaF) : datosFiltrados;

        setDatosJugador(datosFiltrados);
    }

    useEffect(() => {
        filtraLocal()
    }, [esVerBaja, ligaF]); //Se invoca al interactuar con los filtros arriba del grid



    const handleEdit = (rowData) => {
        setEsEditar(true)
        console.log(rowData.original)

        setNombre(rowData.original.Nombre || "")
        setNumero(rowData.original.Numero || "")
        setTelefono(rowData.original.Telefono || "")
        setCorreo(rowData.original.Correo || "")
        setIdJugador(rowData.original.IdJugador)
        setCurp(rowData.original.CURP || "")
        if (rowData.original.ActivoChk == false) { setActivo(false) } else { setActivo(true) }
        setIdGenero(rowData.original.IdGenero || "")
        setFechaNacimiento(isNaN(rowData.original.FechaNacimiento) ? formatDate(rowData.original.FechaNacimiento) : '')
        //setFechaNacimiento(isNaN(rowData.original.FechaNacimiento) ? dayjs(rowData.original.FechaNacimiento).format('YYYY-MM-DD') : '')
        setLogin(rowData.original.Login || "")

        setIdLiga(rowData.original.IdLiga)
        setAccion(0)//0 para MODIF 1 para nuevo  
        setFotosn(1)
        console.log('trae foto?:' + fotosn)
    }

    const nuevo = () => {
        inicializaCampos()
        setEsNuevo(true)
        setEsEditar(true)
        setAccion(1)

    }

    const cancelar = () => {
        inicializaCampos()
        setEsEditar(false)
        setEsNuevo(false)
        //console.log("foto:" + foto)
    }

    const inicializaCampos = () => {
        setEsVerBaja(true)
        setActivo(true)
        setLigaF(-1)

        //Campos 
        setIdLiga(0)
        setIdJugador(0)
        setNombre('')
        setNumero('')
        setTelefono('')
        setCorreo('')
        setCurp('')
        setIdGenero(-1)
        setFechaNacimiento('')
        setAccion(0)
        setEsFin(false)
        setUserProfileImage('')
        setFoto(null)
    }

    const guardarFoto = async (e) => {
        e.preventDefault();

        const apiReq = config.apiUrl + '/GuardarJugadorFotografia';
        const formData = new FormData()
        formData.append('foto', foto)
        formData.append('pnIdLiga', idLiga)
        formData.append('pnIdJugador', idJugador)
        console.log('antes de la llamada')
        console.log('idLiga:' + idLiga)

        // console.log(foto.size)

        if (!foto) {
            alert('Debe seleccionar un archivo')
            return
        }
        else if (foto.size > 1000000) {
            alert('El límite máximo del archivo es 1 MB. Favor de validar ')
            return
        }
        else {
            try {
                await axios.post(apiReq, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                console.log('guardo correctamente')  
                setEsFin(true)
                
            } catch (error) {
                if (!error.message == '') {
                    console.log('REGRESA ERROR:')
                    console.error('Error al guardar fotografia', error);
                    setAlertaMensaje('Error al guardar fotografia: ' + error.message)
                    
                }
            }
        }

        ConsultarJugadoresFoto();

    };

    const guardarJugador = async (e) => {
        e.preventDefault();

        const data = {
            pnIdLiga: idLiga,
            pnIdJugador: idJugador,
            psCurp: curp,
            psNombre: nombre,
            pnNumero: numero,
            pnTelefono: telefono,
            pdFechaNacimiento: fechaNacimiento,
            pnIdGenero: idGenero,
            psCorreo: correo,
            piFotografia: foto,
            psLogin: login,
            psPassword: password,
            pnActivo: activo,
            pnAccion: accion
        };



        const apiReq = config.apiUrl + '/GuardarJugador';

        try {
            console.log('Guardando Jugador', data);
            //console.log(foto);

            if (idLiga == -1) { setEsMuestraCamposReq(true); return }
            if (nombre.trim == '') { setEsMuestraCamposReq(true); return }
            if (numero === '') { setEsMuestraCamposReq(true); return }

            await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*', "Content-Type": "multipart/form-data" })
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
                        setEsNuevo(false)
                    }
                })


        } catch (error) {
            console.error('Error al guardar el jugador', error);
        }
    };

    return (
        <>
            <SideBarHeader titulo={esNuevo ? 'Nuevo Jugador' : esEditar ? 'Editar Jugador' : 'Jugadores'}></SideBarHeader>
            <br /><br /><br /><br />

            {!esEditar ?
                <>

                    {/*<button type="button" className="btn btn-primary" onClick={nuevo}>Nuevo</button>*/}
                    <ElementoCampo type='checkbox' lblCampo="Ver Inactivos:" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} />
                    <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={ligaF} options={dataLiga} onInputChange={setLigaF} />
                    {/* <p>Parrafo temporal para ver parametros del SP a Base de datos|@IdLiga={ligaF}|@Activo={esVerBaja.toString()}|</p> */}
                    <SimpleTable data={datosJugador} columns={columns} handleEdit={handleEdit} handleNuevo={nuevo} />

                </>
                :
                <>
                    <form onSubmit={guardarJugador} autoComplete="off">
                        <br />



                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ flexGrow: 1 }}>
                                <ElementoCampo type="select" lblCampo="Liga*: " claCampo="campo" nomCampo={idLiga} options={dataLiga} onInputChange={setIdLiga} editable={esNuevo} />
                                <ElementoCampo type='text' lblCampo="Nombre* :" claCampo="Nombre" nomCampo={nombre} onInputChange={setNombre} tamanioString={100} />
                                <ElementoCampo type='number' lblCampo="Numero* :" claCampo="Numero" nomCampo={numero} onInputChange={setNumero} tamanioString={3} />
                                <ElementoCampo type='tel' lblCampo="Teléfono* :" claCampo="Telefono" nomCampo={telefono} onInputChange={setTelefono} tamanioString={10} />

                                <ElementoCampo type='email' lblCampo="Correo* :" claCampo="Correo" nomCampo={correo} onInputChange={setCorreo} tamanioString={50} />
                                <ElementoCampo type='date' lblCampo="Fecha de Nacimiento* :" claCampo="FechaNacimiento" nomCampo={fechaNacimiento} onInputChange={setFechaNacimiento} />
                                {/*<input type='date' placeholder="Fecha de Nacimiento* :" id="FechaNacimiento" nomCampo={fechaNacimiento} onChange={setFechaNacimiento} className="form-control" />*/}


                            </span>
                            <span style={{ flexGrow: 0.5 }}>
                                <h2></h2>
                            </span>
                            <span style={{ flexGrow: 1 }}>
                                <div hidden={false} >
                                    {userProfileImage ? (
                                        // Mostrar la imagen si los datos están disponibles
                                        <ElementoImagen hexData={userProfileImage}></ElementoImagen>
                                    ) : (
                                        // Mostrar un mensaje de carga mientras se obtienen los datos
                                        <div className="blank-box"></div>
                                    )}
                                </div>

                                <ElementoCampo type='text' lblCampo="CURP* :" claCampo="Curp" nomCampo={curp} onInputChange={setCurp} tamanioString={18} />
                                <ElementoCampo type="select" lblCampo="Genero*: " claCampo="genero" nomCampo={idGenero} options={dataGenero} onInputChange={setIdGenero} />
                                <ElementoCampo type='text' lblCampo="Usuario :" claCampo="Login" nomCampo={login} onInputChange={setLogin} tamanioString={30} />
                                <ElementoCampo type='password' lblCampo="Contraseña :" claCampo="Password" onInputChange={setPassword} tamanioString={30} />

                            </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ flexGrow: 1 }}>

                            </span>
                            <span style={{ flexGrow: 1 }}>
                                <h2></h2>
                            </span>
                            <span style={{ flexGrow: 1 }}>

                            </span>
                        </div>

                        {/*<p>Parrafo temporal para ver parametros del SP a Base de datos|@IdLiga={idLiga}|@IdJugador={idJugador}|@fN={fechaNacimiento}|@IdGenero={idGenero}|@Activo={activo.toString()}|</p>*/}
                        {/*<button type="submit" className="btn btn-primary" title="Guardar">Guardar</button>*/}
                        {/*<button type="button" className="btn btn-primary" onClick={cancelar} title="Cancelar">Cancelar</button>*/}


                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ flexGrow: 1 }}>

                            </span>
                            <span style={{ flexGrow: 1 }}>
                                <h2></h2>
                            </span>
                            <span style={{ flexGrow: 1 }}>

                            </span>
                        </div>


                        <div className='container mt-2'>
                            <div className='card p-3'>
                                <div className='row'>
                                    <div className='col-7'>
                                        <input type='file' className='form-control' name="profile_pic" onChange={selectedFotoHandler} accept=".png, .jpg, .jpeg" />
                                    </div>
                                    {/* <span style={{ flexGrow: 1 }}>
                                        <h2></h2>
                                    </span> */}
                                    <div className='col-3'>
                                        <button type='button' onClick={guardarFoto} className='btn btn-primary col-12'>Cargar imagen</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <br></br>
                        <ElementoCampo type='checkbox' lblCampo="Activo :" claCampo="activo" nomCampo={activo} onInputChange={setActivo} />
                        <br></br>

                        <ElementoBotones cancelar={cancelar}></ElementoBotones>
                    </form>
                </>

            }
            {
                esMuestraCamposReq &&
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
            {alertaMensaje &&
                <ElementoToastNotification
                    mensaje={alertaMensaje}
                    onAceptar={onAceptarC}
                ></ElementoToastNotification>
            }
        </>


    )
}

export default CatJugador
