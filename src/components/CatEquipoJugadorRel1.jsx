import React, { useEffect, useState, useRef } from 'react';

export const CatEquipoJugadorRel1 = ({ isOpen, setIsOpen }) => {
    // const [isOpen, setIsOpen] = useState(isOpen);

    // const openModal = () => {
    //     setIsOpen(true);
    // };

    const closeModal = () => {
        setIsOpen(false);
    };
    const saveModal = () => {
        setIsOpen(false);
    };

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

            {isOpen && (
                <>

                    {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
                </button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button> */}

                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    contenido del modal...
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={saveModal}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )}

        </>
    )
}
