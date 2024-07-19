import '../css/SideBarHeader.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { PerfilContext } from './PerfilContext'; // Importa el contexto
// import { ElementoToastNotification } from './ElementoToastNotification';
import ElementoHeader from './ElementoHeader';


export const SideBarHeader = ({ titulo = 'Encabezado', esConLogin = true }) => {

  const navigate = useNavigate();
  // const ruta = `/Equipos?esNuevoP=${parametros.esNuevoP}&esNuevo2P=${parametros.esNuevo2P}&claLigaP=${parametros.claLigaP}`;
  // const ruta = `/Login`;
  const ruta = '/Login';
  const rutaHome = '/';
  // const [alertaMensaje, setAlertaMensaje] = useState('');

  const aceptar = () => {
    navigate(ruta);
  }
  const salir = () => {
    setEsConLicencia(0);
    setPerfil(1);
    navigate(rutaHome);
  }
  const { perfil, setPerfil, setEsConLicencia,nombreUsuario } = useContext(PerfilContext);
  // const [perfil, setPerfil] = useState(1);
  // const [perfil, setPerfil] = useContext(PerfilContext);


  return (
    <div className="header" hidden={false}>

      <h4 className="text">{titulo}</h4>
      {/* <ElementoHeader titulo={titulo}></ElementoHeader> */}

      {esConLogin == true &&
        <div className="buttons">
          {perfil == 1 ?
            < button type="button" className="Xbtn btn-primary" onClick={aceptar} title="Login">Login</button>
            :
            <>
              <span>{nombreUsuario},</span><button type="button" className="Xbtn btn-primary" onClick={salir} title="Login">Salir</button>
            </>
          }
        </div>
      }
    </div >
  )
}
