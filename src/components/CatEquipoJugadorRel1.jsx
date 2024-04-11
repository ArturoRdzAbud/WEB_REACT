import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ElementoCampo } from './ElementoCampo';
import { ElementoBotones } from './ElementoBotones';
import axios from 'axios';
import config from '../config'; // archivo configs globales del proy

export const CatEquipoJugadorRel1 = ({ isOpen, setIsOpen, datosLiga, datosTorneoBD, setEsMuestraCamposReq, setEsFin }) => {
    // const [isOpen, setIsOpen] = useState(isOpen);

    // const openModal = () => {
    //     setIsOpen(true);
    // };

    const closeModal = () => {
        setIsOpen(false);
    };

    // const saveModal = () => {
    const saveModal = (async () => {
        const data = {
            pnIdLiga: claLigaOrigen,
            pnIdTorneo: claTorneoOrigen,
            pnIdLigaDestino: claLigaDestino,
            pnIdTorneoDestino: claTorneoDestino,
            pnAccion: 100,
        };

        const apiReq = config.apiUrl + '/GuardarJugadorxEquipo';
        try {
            if (claLigaOrigen == -1) { setEsMuestraCamposReq(true); return }
            if (claTorneoOrigen == -1) { setEsMuestraCamposReq(true); return }
            if (claLigaDestino == -1) { setEsMuestraCamposReq(true); return }
            if (claTorneoDestino == -1) { setEsMuestraCamposReq(true); return }
            console.log('Copiando Jugadores x Equipo', data);
            await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' });
            setEsFin(true)
        } catch (error) {
            console.error('Error al COPIAR los jugadores x equipo', error);
        }
        setIsOpen(false);
    });

    const [datosTorneoOrigen, setDatosTorneoOrigen] = useState([datosTorneoBD]);
    const [datosTorneoDestino, setDatosTorneoDestino] = useState([datosTorneoBD]);

    const [claLigaOrigen, setClaLigaOrigen] = useState(-1);
    const [claTorneoOrigen, setClaTorneoOrigen] = useState(-1);
    const [claLigaDestino, setClaLigaDestino] = useState(-1);
    const [claTorneoDestino, setClaTorneoDestino] = useState(-1);
    const handleLigaOrigen = (value, claLigaOrigen) => {//limpia combos hijo 
        setClaLigaOrigen(value)
        setClaTorneoOrigen(-1)
    };
    const handleLigaDestino = (value, claLigaDestino) => {//limpia combos hijo 
        setClaLigaDestino(value)
        setClaTorneoDestino(-1)
    };

    const filtraLocalComboOrigen = () => {
        var datosFiltrados = datosTorneoBD
        datosFiltrados = claLigaOrigen > 0 ? datosTorneoBD.filter(item => item.IdLiga == claLigaOrigen) : [];
        setDatosTorneoOrigen(datosFiltrados);
    }
    const filtraLocalComboDestino = () => {
        var datosFiltrados = datosTorneoBD
        datosFiltrados = claLigaDestino > 0 ? datosTorneoBD.filter(item => item.IdLiga == claLigaDestino) : [];
        setDatosTorneoDestino(datosFiltrados);
    }
    useEffect(() => {
        filtraLocalComboOrigen()
    }, [claLigaOrigen, claTorneoOrigen]);//Se llama al modificar el combo liga modo edicion/nuevo
    useEffect(() => {
        filtraLocalComboDestino()
    }, [claLigaDestino, claTorneoDestino]);//Se llama al modificar el combo liga modo edicion/nuevo


    return (
        <>
            {/* <div>
                <button onClick={openModal}>Abrir modal</button>
                {isOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <p>Contenido del modal...</p>
                        </div>
                    </div>
                )}
            </div> */}

            {/* {isOpen && (
            <button>Alam</button>
            )} */}

            {/* {isOpen && ( */}
            <>

                {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
                </button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button> */}

                <Modal show={isOpen} onHide={closeModal}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Copiar Jugadores de Torneo</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                {/* contenido del modal... */}


                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span>
                                        <ElementoCampo type="select" lblCampo="Liga*: " claCampo="campo" nomCampo={claLigaOrigen} options={datosLiga} onInputChange={(value) => handleLigaOrigen(value, claLigaOrigen)} />
                                        <ElementoCampo type="select" lblCampo="Torneo*: " claCampo="campo" nomCampo={claTorneoOrigen} options={datosTorneoOrigen} onInputChange={setClaTorneoOrigen} />
                                    </span>
                                    <span>
                                        <h1>→</h1>
                                        <h1>→</h1>
                                    </span>
                                    <span>
                                        <ElementoCampo type="select" lblCampo="Liga*: " claCampo="campo" nomCampo={claLigaDestino} options={datosLiga} onInputChange={(value) => handleLigaDestino(value, claLigaDestino)} />
                                        <ElementoCampo type="select" lblCampo="Torneo*: " claCampo="campo" nomCampo={claTorneoDestino} options={datosTorneoDestino} onInputChange={setClaTorneoDestino} />
                                    </span>
                                </div>

                            </div>
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={saveModal}>Save changes</button> */}
                                <ElementoBotones cancelar={closeModal} guardar={saveModal}></ElementoBotones>
                            </div>

                        </div>
                    </div>
                </Modal>


            </>
            {/* )} */}

        </>
    )
}
