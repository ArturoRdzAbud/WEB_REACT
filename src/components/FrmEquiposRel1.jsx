import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import { ElementoCampo } from './ElementoCampo';
import { ElementoBotones } from './ElementoBotones';
import { AlertaEmergente } from './AlertaEmergente';
import config from '../config'; // archivo configs globales del proy
import { ElementoToastNotification } from './ElementoToastNotification';

export const FrmEquiposRel1 = ({
    claLiga
    ,idEquipo
    ,datosLiga
    ,setClaLiga
    ,esNuevo
    ,setEsEditar
    ,setEsNuevo
    ,inicializaCampos
    ,cancelar
    ,setNombre
    ,nombre
    ,activo
    ,setActivo
    ,accion
}) => {

    const [esMuestraCamposReq, setEsMuestraCamposReq] = useState(false);
    const [alertaMensaje, setAlertaMensaje] = useState('');

    const guardarEquipo = async (e) => {
        // console.log(claLiga)

        e.preventDefault();
        const data = {
          pnIdLiga: claLiga,
          pnIdTorneo: 0,
          pnIdEquipo: idEquipo,
          psNombre: nombre,
          pnActivo: activo,
          pnAccion: accion
        };
        const apiReq = config.apiUrl + '/GuardarEquipo';
        try {
    
          if (claLiga == -1) { setEsMuestraCamposReq(true); return }
          // if (claTorneo == -1) { setEsMuestraCamposReq(true); return }
          if (nombre.trim === '') { setEsMuestraCamposReq(true); return }
          // console.log(esMuestraCamposReq)
          console.log('Guardando equipo', data);
          
          await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' })
          .then(response => {    
            if (!response.data == '') {
                console.log('REGRESA ERROR:')
                if (response.data.originalError === undefined) {
                    console.log(response.data)
                    setAlertaMensaje(response.data)
                }
                else {
                    console.log(response.data.originalError.info.message)
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
          console.error('Error al guardar el equipo', error);
        }

      };
      const onAceptar = () => {
        setEsMuestraCamposReq(false)
      };
      
      const onAceptarC = () => {
        setAlertaMensaje('')
      };

    return (
        <>
            <form onSubmit={guardarEquipo}>
                <br />
                <ElementoBotones cancelar={cancelar}></ElementoBotones>

                <ElementoCampo type="select" lblCampo="Liga*: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={setClaLiga} editable={esNuevo} />
                {/* <ElementoCampo type="select" lblCampo="Torneo*: " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} editable={esNuevo} /> */}
                <ElementoCampo type='text' lblCampo="Nombre* :" claCampo="nombre" onInputChange={setNombre} nomCampo={nombre} tamanioString="100" />
                <ElementoCampo type='checkbox' lblCampo="Activo :" claCampo="activo" nomCampo={activo} onInputChange={setActivo} />
            </form>

            {esMuestraCamposReq &&
                <AlertaEmergente
                    titulo={'Alerta'}
                    mensaje={'Los datos con * son requeridos, favor de validar.'}
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

// export default FrmEquiposRel1;