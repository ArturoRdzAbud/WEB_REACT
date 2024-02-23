import React, { useState } from 'react';
import Alerta from '../svg/icon-alert.svg?react';

export const AlertaEmergente = ({ titulo, mensaje, mostrarBotonAceptar = true, mostrarBotonCancelar = true, onAceptar, onCancelar }) => {
  const [mostrarAlerta, setMostrarAlerta] = useState(true);

  const handleAceptar = () => {
    setMostrarAlerta(false);
    if (onAceptar) {
      onAceptar();
    }
  };

  const handleCancelar = () => {
    setMostrarAlerta(false);
    if (onCancelar) {
      onCancelar();
    }
  };

  return (
    <>
      {mostrarAlerta && (
        <div className="modal d-flex justify-content-center align-items-center" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content" style={{ border: '1px solid black' }}>
              <div className="modal-header" style={{ backgroundColor: '#373a47', borderColor: '#373a47', color:'#ffffff' }}>
                <h5 className="modal-title"><Alerta /> {titulo}</h5>
                 {/* <button type="button" className="close" onClick={handleCancelar}>
                  <span aria-hidden="true">&times;</span>
                </button> */}
              </div>
              <div className="modal-body">
                <p>{mensaje}</p>
              </div>
              <div className="modal-footer" style={{ backgroundColor: '#373a47', borderColor: '#373a47' }}>
                {mostrarBotonCancelar && (
                  <button type="button" className="btn btn-secondary" onClick={handleCancelar}>Cancelar</button>
                )}
                {mostrarBotonAceptar && (
                  <button type="button" className="btn btn-primary" onClick={handleAceptar}>Aceptar</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertaEmergente;
