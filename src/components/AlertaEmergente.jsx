import React, { useState } from 'react';

export const AlertaEmergente = ({ titulo,mensaje, mostrarBotonAceptar = true, mostrarBotonCancelar = true, onAceptar, onCancelar }) => {
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
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{titulo}</h5>
                {/* <button type="button" className="close" onClick={handleCancelar}>
                  <span aria-hidden="true">&times;</span>
                </button> */}
              </div>
              <div className="modal-body">
                <p>{mensaje}</p>
              </div>
              <div className="modal-footer">
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
