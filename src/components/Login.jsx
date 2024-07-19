import React, { useState, useContext } from 'react';
import '../css/Login.css'; // Asegúrate de crear y ajustar este archivo CSS según sea necesario
import { SideBarHeader } from './SideBarHeader';
import { PerfilContext } from './PerfilContext'; // Importa el contexto
import { useNavigate } from 'react-router-dom';
import { ElementoToastNotification } from './ElementoToastNotification';

export const Login = () => {
  const [esLoginValido, setEsLoginValido] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const { setPerfil, setEsConLicencia, setNombreUsuario } = useContext(PerfilContext);
  const [alertaMensaje, setAlertaMensaje] = useState('');

  const navigate = useNavigate();
  const ruta = '/CatUsuario';
  const rutaHome = '/';


  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
    console.log({ email, password, rememberMe });

    //valida usuario traer en un data set nombre completo, perfil actual y si es loginValido, esConLicencia
    setEsLoginValido(true)

    if (esLoginValido) {
      //Asigna Perfil desde BD
      setPerfil(2)
      setEsConLicencia(1)
      setNombreUsuario('Rolando')
      navigate(rutaHome);
    } else {
      setAlertaMensaje('Usuario o contraseña incorrectos, Favor de validar')
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
                      Usuario
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
                      Contraseña
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
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-block mb-4"
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


                  {alertaMensaje &&
                    <ElementoToastNotification
                      mensaje={alertaMensaje}
                      onAceptar={onAceptarC}
                    ></ElementoToastNotification>
                  }


                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Login;
