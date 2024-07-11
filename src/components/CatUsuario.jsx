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


const CatUsuario = () => {

    const [datosUsuarioBd, setdatosUsuarioBd] = useState([]);
    const [datosUsuario, setdatosUsuario] = useState([]);
    //Filtros
    const [esVerBaja, setEsVerBaja] = useState(false);
    
    //combo
    const [dataPerfil, setDatosPerfil] = useState([]);

    const [esNuevo, setEsNuevo] = useState(false);
    const [esEditar, setEsEditar] = useState(false);
    const [esFin, setEsFin] = useState(false);


    //datos de registro
    const [idUsuario, setIdUsuario] = useState(0);
    const [activo, setActivo] = useState(false);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [idPerfil, setIdPerfil] = useState(0);    
    const [accion, setAccion] = useState(0);    
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [alertaMensaje, setAlertaMensaje] = useState('');


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
            accessorKey: 'IdUsuario',
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
            header: 'Correo',
            accessorKey: 'Correo',
            footer: 'Correo',
            visible: true
        },
        {
            header: 'IdPerfil',
            accessorKey: 'IdPerfil',
            footer: 'idPerfil',
            visible: false
        },
        {
            header: 'Perfil',
            accessorKey: 'NombrePerfil',
            footer: 'Perfil',
            visible: true
        },
        {
            header: 'Login',
            accessorKey: 'Login',
            footer: 'Login',
            visible: true
        },
        {
            header: 'Password',
            accessorKey: 'Password',
            footer: 'Password',
            visible: true
        },
        {
            header: 'Activo',
            accessorKey: 'ActivoChk',
            footer: 'Activo',
            visible: true
        }
    ];


    useEffect(() => {
        var apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarPerfilesCmb%22';
        axios.get(apiUrl)
            .then(response => {
                setDatosPerfil(response.data)
            }
            )
            .catch(error => console.error('Error al obtener Perfiles', error));

    }, []);

   

    useEffect(() => {
        // Cambia la URL a la de tu API
        const apiUrl = config.apiUrl + '/ConsultarUsuarios';
        //axios.get(apiUrl)
        if (esEditar) return
        axios.get(apiUrl)
            .then(response => { setdatosUsuario(response.data); setdatosUsuarioBd(response.data) })
            .catch(error => console.error('Error al obtener datos:', error))
            .finally(() => {
                inicializaCampos()
            });
    }, [esEditar]); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente

    const filtraLocal = () => {
        // TODO IR FILTRANDO LOCALMENTE CAMPO POR CAMPO SIN IR A BASE DE DATOS
        var datosFiltrados = datosUsuarioBd
        datosFiltrados = !esVerBaja ? datosUsuarioBd.filter(item => item.ActivoChk) : datosUsuarioBd;
        
        setdatosUsuario(datosFiltrados);
    }

    useEffect(() => {
        filtraLocal()
    }, [esVerBaja]); //Se invoca al interactuar con los filtros arriba del grid



    const handleEdit = (rowData) => {
        setEsEditar(true)
        console.log(rowData.original)

        setIdUsuario(rowData.original.IdUsuario)
        setNombre(rowData.original.Nombre || "")
        setCorreo(rowData.original.Correo || "")
        setIdPerfil(rowData.original.IdPerfil || "")        
        setLogin(rowData.original.Login || "")
        setPassword(rowData.original.Password || "")
        if (rowData.original.ActivoChk == false) { setActivo(false) } else { setActivo(true) }

        setAccion(0)//0 para MODIF 1 para nuevo  
        
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

        //Campos 
        setIdUsuario(0)
        setNombre('')
        setCorreo('')
        setIdPerfil(-1)
        setAccion(0)
        setEsFin(false)
    }


    const guardarUsuario = async (e) => {
        e.preventDefault();

        const data = {
            pnIdUsuario: idUsuario,
            psNombreUsuario: nombre,
            psCorreo: correo,
            pnIdPerfil: idPerfil,
            psLogin: login,
            psPassword: password,
            pnActivo: activo,
            pnAccion: accion
        };



        const apiReq = config.apiUrl + '/GuardarUsuario';

        try {
            console.log('Guardando Usuario', data);
            //console.log(foto);

            if (nombre.trim == '') { setEsMuestraCamposReq(true); return }
            if (correo.trim == '') { setEsMuestraCamposReq(true); return }
            if (login.trim == '') { setEsMuestraCamposReq(true); return }
            if (password.trim == '') { setEsMuestraCamposReq(true); return }
            if (idPerfil === '') { setEsMuestraCamposReq(true); return }

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
            console.error('Error al guardar el usuario', error);
        }
    };

    return (
        <>
            <SideBarHeader titulo={esNuevo ? 'Nuevo Usuario' : esEditar ? 'Editar Usuario' : 'Usuarios'}></SideBarHeader>
            <br /><br /><br /><br />

            {!esEditar ?
                <>

                    <ElementoCampo type='checkbox' lblCampo="Ver Inactivos:" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} />
                    <SimpleTable data={datosUsuario} columns={columns} handleEdit={handleEdit} handleNuevo={nuevo} />

                </>
                :
                <>
                    <form onSubmit={guardarUsuario} autoComplete="off">
                        <br />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ flexGrow: 1 }}>
                                <ElementoCampo type='text' lblCampo="Nombre* :" claCampo="Nombre" nomCampo={nombre} onInputChange={setNombre} tamanioString={100} />
                                <ElementoCampo type='email' lblCampo="Correo* :" claCampo="Correo" nomCampo={correo} onInputChange={setCorreo} tamanioString={50} />
                                <ElementoCampo type="select" lblCampo="Perfil*: " claCampo="NombrePerfil" nomCampo={idPerfil} options={dataPerfil} onInputChange={setIdPerfil} />
                                
                            </span>
                            <span style={{ flexGrow: 0.5 }}>
                                <h2></h2>
                            </span>
                            <span style={{ flexGrow: 1 }}>
                               
                                <ElementoCampo type='text' lblCampo="Login* :" claCampo="Login" nomCampo={login} onInputChange={setLogin} tamanioString={30} />
                                <ElementoCampo type='text' lblCampo="Password* :" claCampo="Password" onInputChange={setPassword} tamanioString={100} />
                                                                

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

                        {/*<p>Parrafo temporal para ver parametros del SP a Base de datos|@IdLiga={idLiga}|@idUsuario={idUsuario}|@fN={fechaNacimiento}|@idPerfil={idPerfil}|@Activo={activo.toString()}|</p>*/}
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

export default CatUsuario
