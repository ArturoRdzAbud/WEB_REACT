import React, { useEffect, useState } from 'react';
import Circle from '../svg/check-circle.svg?react';
import '../css/ToastNotification.css';

export const ElementoToastNotification = ({ titulo, mensaje, mostrarBotonAceptar = true, mostrarBotonCancelar = true, onAceptar, onCancelar }) => {
    const [mostrarAlerta, setMostrarAlerta] = useState(true);

    const handleAceptar = () => {
        // console.log('toast')
        setMostrarAlerta(false);
        //console.log(onAceptar)
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

    useEffect(() => {
        // handleAceptar()

        // const delay = 3000; // 1 segundo (1000 milisegundos)
        const delay = 6000; // 1 segundo (1000 milisegundos)
        const timerId = setTimeout(() => {
            handleAceptar();
        }, delay);
        // Limpieza del temporizador al desmontar el componente
        return () => clearTimeout(timerId);

    }, []);// se ejecuta 1 vez al inicio solamente


    return (
        <>

            {/* <img
                            src="assets/check-circle.svg"
                            alt="Success"
                            className="notification__icon"
                        /> */}

            {/* {mostrarAlerta && (
                <div className="body_notification">
                    <div className="notification">
                        <div className="notification__body">
                            
                            <Circle />
                            {mensaje}
                        </div>
                        <div className="notification__progress"></div>
                    </div>
                </div>

            )} */}

            {mostrarAlerta && (
                <div className="notification">
                    <div className="notification__body">
                        <Circle className="notification__icon" />
                        {mensaje}
                    </div>
                    <div className="notification__progress"></div>
                </div>
            )}
        </>
    );
};

export default ElementoToastNotification;
