import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import config from '../config'; // archivo configs globales del proy

import '../css/Login.css'; // Asegúrate de crear y ajustar este archivo CSS según sea necesario
import { SideBarHeader } from './SideBarHeader';
import { PerfilContext } from './PerfilContext'; // Importa el contexto
import { useNavigate } from 'react-router-dom';
import { ElementoToastNotification } from './ElementoToastNotification';

export const Login = () => {
  const [esLoginValido, setEsLoginValido] = useState(-1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const { setPerfil, setEsConLicencia, setNombreUsuario } = useContext(PerfilContext);
  const [alertaMensaje, setAlertaMensaje] = useState('');

  const navigate = useNavigate();
  const ruta = '/FrmUsuario';
  const rutaHome = '/';

  const [esMuestraCamposReq, setEsMuestraCamposReq] = useState(false);
  const [datosLogin, setDatosLogin] = useState([]);
  const [datosLoginBD, setDatosLoginBD] = useState([]);

  const onAceptarB = () => {
    setEsMuestraCamposReq(false)
    // setEsMuestraConfirmacion(false)
    // setEsFin(false)
  };

  // useEffect(() => {
  //   if (!datosLoginBD.length > 0){
  //     console.log('sale')
  //     return
  //   }
  //   console.log('esLoginValido:' + datosLoginBD[0].esLoginValido)
  //   setEsLoginValido(datosLoginBD[0].esLoginValido)
  // }, [datosLoginBD])

  useEffect(() => {
    // validaDatos()

  }, [esLoginValido])

  // const validaDatos = () => {
  //   // console.log('validaDatos')


  // }

  useEffect(() => {
    // if (datosLoginBD !== null) {
    if (datosLoginBD.length > 0) {
      console.log('Datos de login actualizados:', datosLoginBD);
      if (datosLoginBD[0].esLoginValido == 1) {
        console.log('si')
        setPerfil(datosLoginBD[0].perfil)
        setEsConLicencia(datosLoginBD[0].esConLicencia)
        setNombreUsuario(datosLoginBD[0].nombreUsuario)
        navigate(rutaHome);
      } else {
        console.log('no')
        setAlertaMensaje('Usuario o contraseña incorrectos, Favor de validar')
      }

    }
  }, [datosLoginBD]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
    console.log({ email, password, rememberMe });
    // const data = {
    //   pnIdUser: email,
    //   psPass: password,
    // };

    if (email.trim() === '') { setEsMuestraCamposReq(true); return }
    if (password.trim() === '') { setEsMuestraCamposReq(true); return }

    const params = {
      psSpSel: '"ConsultarLogin"',
      psUser: email,
      psPass: password,
    };
    const headers = {
      'Access-Control-Allow-Origin': '*'
    };

    try {
      var apiUrl = config.apiUrl + '/ConsultarLogin';
      // await axios.get(apiUrl, { data }, { 'Access-Control-Allow-Origin': '*' })
      await axios.get(apiUrl, {
        params,
        headers
      })
        // .then(response => {
        //   setDatosLigaBD(response.data);
        // })
        // .catch(error => console.error('Error al obtener datos:', error))
        // .finally(() => {
        //   inicializaCampos()
        // });
        .then(response => {
          if (response.data == '') {
            // if (response.data.originalError.info.message) {
            // console.log('REGRESA ERROR:')
            if (response.data.originalError === undefined) {
              console.log('REGRESA undefined:')
              console.log(response.data)
              setAlertaMensaje(response.data)
              return
            }
            else {
              console.log('REGRESA originalError:')
              console.log(response.data.originalError.info.message)
              setAlertaMensaje(response.data.originalError.info.message)
              return
            }
          } else {
            setDatosLoginBD(response.data);
          }
        })
    } catch (error) {
      console.error('Error al consultar LOGIN', error);
      return
    }

  };
  const alta = () => {
    navigate(ruta);
  };
  const onAceptarC = () => {
    setAlertaMensaje('')
  };

  return (
    <>
      <SideBarHeader titulo='Inicio Sesión' esConLogin='false'></SideBarHeader>
      <br /><br /><br /><br />


      <section className="text-center text-lg-start">
        <div className="card mb-3">
          <div className="row g-0 d-flex align-items-center">

            {/* <div className="col-lg-4 d-none d-lg-flex"> */}
            <div className="col-lg-2 d-none d-lg-flex">

              {/* <img
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              alt="Trendy Pants and Shoes"
              className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
            /> */}

            </div>
            <div className="col-lg-8">
              <div className="card-body py-5 px-md-5">
                <form onSubmit={handleSubmit}>
                  {/* Email input */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      // type="email"
                      type="text"
                      id="form2Example1"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="username"
                      autoComplete="username"
                    />
                    <label className="form-label" htmlFor="form2Example1">
                      {/* Email address */}
                      Usuario*
                    </label>
                  </div>

                  {/* Password input */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example2"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      autoComplete="current-password"
                    />
                    <label className="form-label" htmlFor="form2Example2">
                      {/* Password */}
                      Contraseña*
                    </label>
                  </div>

                  {/* 2 column grid layout for inline styling */}
                  <div className="row mb-4">
                    {/* <div className="col d-flex justify-content-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="form2Example31"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="form2Example31">
                        Remember me
                      </label>
                    </div>
                  </div> */}

                    {/* <div className="col">
                    <a href="#!">Forgot password?</a>
                  </div> */}

                  </div>

                  {/* Submit button */}
                  <button
                    //type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-block mb-4"
                    onClick={handleSubmit}
                  >
                    Entrar
                  </button>

                  <button
                    // type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-block mb-4"
                    onClick={alta}
                  >
                    Registrarse
                  </button>





                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {alertaMensaje &&
        <ElementoToastNotification
          mensaje={alertaMensaje}
          onAceptar={onAceptarC}
        ></ElementoToastNotification>
      }

      {esMuestraCamposReq &&
        <ElementoToastNotification
          mensaje={'Los datos con * son requeridos, favor de validar.'}
          onAceptar={onAceptarB}
        ></ElementoToastNotification>
        // : <p></p>
      }

    </>
  );
};

export default Login;
