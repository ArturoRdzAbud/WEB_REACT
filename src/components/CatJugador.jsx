//import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';
import { AlertaEmergente } from './AlertaEmergente';
import { SideBarHeader } from './SideBarHeader';
import config from '../config'; // archivo configs globales del proy
import { ElementoBotones } from './ElementoBotones'
//import Close from '../svg/icon-close.svg?react'
//import Save  from '../svg/icon-save.svg?react'
//import dayjs from 'dayjs';



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

    const selectedFotoHandler = e => {
        console.log('File info working!')
        console.log(e.target.files[0]);
        //const formData = new FormData();
        //FILE INFO NAME WILL BE "my-image-file"
        //formData.append('piFotografia', e.target.files[0]);
        //setFoto(formData)
        setFoto(e.target.files[0])
        //console.log(foto)

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
            header: 'Número',
            accessorKey: 'Numero',
            footer: 'Número',
            visible: true
        },
        {
            header: 'Telefono',
            accessorKey: 'Telefono',
            footer: 'Telefono',
            visible: true
        },
        {
            header: 'Fecha Nacimiento',
            accessorKey: 'FechaNacimiento',
            footer: 'Fecha Nacimiento',
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

        setIdLiga(rowData.original.IdLiga)
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
        //setFoto(null)
    }

    const guardarFoto = async (e) => {
        e.preventDefault();

        const apiReq = config.apiUrl + '/GuardarJugadorFotografia';
        const formData = new FormData()
        formData.append('image', foto)
        formData.append('pnIdLiga', idLiga)
        //formData.append('pnIdJugador', idJugador)
        console.log('antes de la llamada')
        console.log('idLiga:' + idLiga)


        if (!foto) {
            alert('Debe seleccionar un archivo')
            return
        }
        else {
            try {
                await axios.post(apiReq, { formData }, { 'Content-Type': 'multipart/form-data' });
                //console.log(foto, idLiga, idJugador)
            } catch (error) {
                console.error('Error al guardar fotografia', error);
            }
        }
    }

    const guardarJugador = async (e) => {
        e.preventDefault();

        //const formData = new FormData()
        //formData.append('piFotografia', foto)

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

            await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*', "Content-Type": "multipart/form-data" });

            inicializaCampos()
            setEsEditar(false)//regresa al grid
            setEsNuevo(false)
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
                    <p>Parrafo temporal para ver parametros del SP a Base de datos|@IdLiga={ligaF}|@Activo={esVerBaja.toString()}|</p>
                    <SimpleTable data={datosJugador} columns={columns} handleEdit={handleEdit} handleNuevo={nuevo} />

                </>
                :
                <>
                    <form onSubmit={guardarJugador}>
                        <br />
                        <ElementoCampo type="select" lblCampo="Liga*: " claCampo="campo" nomCampo={idLiga} options={dataLiga} onInputChange={setIdLiga} editable={esNuevo} />
                        <ElementoCampo type='text' lblCampo="Nombre* :" claCampo="Nombre" nomCampo={nombre} onInputChange={setNombre} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ flexGrow: 1 }}>
                                <ElementoCampo type='number' lblCampo="Numero* :" claCampo="Numero" nomCampo={numero} onInputChange={setNumero} />
                            </span>
                            <span style={{ flexGrow: 1 }}>
                                <h2></h2>
                            </span>
                            <span style={{ flexGrow: 1 }}>
                                <ElementoCampo type='number' lblCampo="Teléfono* :" claCampo="Telefono" nomCampo={telefono} onInputChange={setTelefono} />
                            </span>
                        </div>
                        <ElementoCampo type='text' lblCampo="Correo* :" claCampo="Correo" nomCampo={correo} onInputChange={setCorreo} />
                        <ElementoCampo type='text' lblCampo="CURP* :" claCampo="Curp" nomCampo={curp} onInputChange={setCurp} />
                        <ElementoCampo type='checkbox' lblCampo="Activo :" claCampo="activo" nomCampo={activo} onInputChange={setActivo} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ flexGrow: 1 }}>
                                <ElementoCampo type='date' lblCampo="Fecha de Nacimiento* :" claCampo="FechaNacimiento" nomCampo={fechaNacimiento} onInputChange={setFechaNacimiento} />
                                {/*<input type='date' placeholder="Fecha de Nacimiento* :" id="FechaNacimiento" nomCampo={fechaNacimiento} onChange={setFechaNacimiento} className="form-control" />*/}
                            </span>
                            <span style={{ flexGrow: 1 }}>
                                <h2></h2>
                            </span>
                            <span style={{ flexGrow: 1 }}>
                                <ElementoCampo type="select" lblCampo="Genero*: " claCampo="campo" nomCampo={idGenero} options={dataGenero} onInputChange={setIdGenero} />
                            </span>
                        </div>




                        {/*<p>Parrafo temporal para ver parametros del SP a Base de datos|@IdLiga={idLiga}|@IdJugador={idJugador}|@fN={fechaNacimiento}|@IdGenero={idGenero}|@Activo={activo.toString()}|</p>*/}
                        {/*<button type="submit" className="btn btn-primary" title="Guardar">Guardar</button>*/}
                        {/*<button type="button" className="btn btn-primary" onClick={cancelar} title="Cancelar">Cancelar</button>*/}
                        <ElementoBotones cancelar={cancelar}></ElementoBotones>
                    </form>
                    <div><img alt="foto"></img></div>
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
        </>


    )
}

export default CatJugador
