import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';
import { AlertaEmergente } from './AlertaEmergente';
import { SideBarHeader } from './SideBarHeader';
import config from '../config'; // archivo configs globales del proy
import { ElementoToastNotification } from './ElementoToastNotification';
import { ElementoBotones } from './ElementoBotones';


//TIP: TENER SIEMPRE PRENDIDO EL INSPECTOR WEB (CONSOLA) EN EL NAVEGADOR PARA VER TODOS LOS ERRORES EN VIVO 
const FrmConfiguraAccesoLigas = () => {
  
  const [datosUsuarios, setDatosUsuarios] = useState([]);
  const [datosAccesoLigas, setDatosAccesoLigas] = useState([]);
 
  //Filtros  
  const [datosUsuario, setDatosUsuario] = useState([]);
  
  //>
  const [esEditar, setEsEditar] = useState(false);
  
  
  //DatosPantalla
  const [idUsuario, setIdUsuario] = useState(-1); 
  const [accion, setAccion] = useState(0);   

  const [esMuestraCamposReq, setEsMuestraCamposReq] = useState(false);
  const [esRegresaDeEditar, setEsRegresaDeEditar] = useState(false);
  const [alertaMensaje, setAlertaMensaje] = useState('');

  
  const onAceptar = () => {
    setEsMuestraCamposReq(false)
  };

  const onAceptarC = () => {
    setAlertaMensaje('')
  };

  const guardarConfiguraAccesoLigas = async (e) => {
    e.preventDefault();

   
    //convierte arreglo a xml para parametro sql
    var xmlString
    xmlString = ''
    
    // return

    if (esEditar) {
      const datosAccesoLigasFiltrados = datosAccesoLigas.filter((LigaTorneo) => {return LigaTorneo.AccesoEditChk;});
      const datosConfiguraAccesoLigas = datosAccesoLigasFiltrados.map(({ IdLiga, IdTorneo, AccesoEditChk }) => ({ IdLiga, IdTorneo, AccesoEditChk }));
      console.log(datosConfiguraAccesoLigas)
      const xmlDoc = document.implementation.createDocument(null, "data");
      const rootElement = xmlDoc.documentElement;
      datosConfiguraAccesoLigas.forEach(item => {
        const itemElement = xmlDoc.createElement("item");
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            const propElement = xmlDoc.createElement(key);
            propElement.textContent = item[key];
            itemElement.appendChild(propElement);
          }
        }
        rootElement.appendChild(itemElement);
      });
      xmlString = new XMLSerializer().serializeToString(xmlDoc);
    }
    
    
    const data = {
      pnIdUsuario: idUsuario,      
      psXmlConfiguraAccesoLigas: xmlString
    };
    const apiReq = config.apiUrl + '/GuardarConfiguracionAccesoLigas';
    try {

      // todo validar requeridas las horas

      if (idUsuario == -1) { setEsMuestraCamposReq(true); return }
      await axios.post(apiReq, { data })
      .then(response => {    
        if (!response.data == '') {
            console.log('REGRESA ERROR:')
            if (response.data.originalError === undefined) {
                console.log('response.data: ' + response.data)
                setAlertaMensaje(response.data)
            }
            else {
                console.log('response.data.originalError.info.message: ' + response.data.originalError.info.message)
                setAlertaMensaje(response.data.originalError.info.message)
            }
        } else {
          console.log('guardo correctamente')  
          setEsRegresaDeEditar(true)
          inicializaCampos()
          setEsEditar(false)//regresa al grid
        }
      })    
      
    } catch (error) {
      console.error('Error al guardar la configuración de acceso a las ligas', error);
    }
  };


 
  const inicializaCampos = () => {
    //DatosPantalla
   
    setIdUsuario(-1)
    setAccion(0)
    
  };

  const cancelar = () => {
    setEsRegresaDeEditar(true)
    inicializaCampos()
    setEsEditar(false)    
  };
  

  

  //-------------------------------------------------------------------SECCION USE EFFFECT
  // llena arreglos de combos
  useEffect(() => {
    var apiUrl = 'http://localhost:3000/ConsultarCombo?psSpSel=%22ConsultarUsuariosAdministradoresCmb%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosUsuario(response.data)
      }
      )
      .catch(error => console.error('Error al obtener los usuarios', error));

     //Obtiene la información de los usuarios que tienen asociado el perfil de administrador
     apiUrl = 'http://localhost:3000/ConsultarUsuariosAdministradores';
     axios.get(apiUrl,{ params: {} })
       .then(response => {
         setDatosUsuarios(response.data);
       })
       .catch(error => console.error('Error al obtener datos:', error)) 
   
  }, []);// se ejecuta 1 vez al inicio solamente

  //Carga la consulta de resultados desde BD
  useEffect(() => {
    // console.log('ENTRA A USEEFFECT ESEDITAR: 0') 
    if (esEditar) 
    {
    //Obtiene la información de los las ligas y torneos a los que los usuarios administradores tienen acceso
    var apiUrl = 'http://localhost:3000/ConsultarConfiguracionAccesoLigas';
    axios.get(apiUrl,{ params: { pnIdUsuario: idUsuario } })
      .then(response => {
         setDatosAccesoLigas(response.data);
      })

      .catch(error => console.error('Error al obtener datos:', error))

      return//sale si es modo edicion
    }

     
    
     
  }, [esEditar]); // Se EJECUTA CUANDO CAMBIA la bandera esEditar

 
  const columns = [
    {
      header: 'IdUsuario',
      accessorKey: 'IdUsuario',
      footer: 'IdUsuario'
      ,visible:true
    },
    {
      header: 'Nombre',
      accessorKey: 'Nombre',
      footer: 'Nombre'
      ,visible:true
    },
    {
      header: 'Correo',
      accessorKey: 'Correo',
      footer: 'Correo'
      ,visible:true
    },
    {
      header: 'Activo',
      accessorKey: 'ActivoChk',
      footer: 'Activo'
      , visible: true
    }
  ];

  const columnsConfigura = [
    {
      header: 'IdLiga',
      accessorKey: 'IdLiga',
      footer: 'IdLiga'
      ,visible:false
    },
    {
      header: 'IdTorneo',
      accessorKey: 'IdTorneo',
      footer: 'IdTorneo'
      ,visible:false
    },
    {
      header: 'Liga',
      accessorKey: 'Liga',
      footer: 'Liga'
      ,visible:true
    },
    {
      header: 'Torneo',
      accessorKey: 'Torneo',
      footer: 'Torneo'
      ,visible:true
    },
    {
      header: 'Acceso',
      accessorKey: 'AccesoEditChk',
      footer: 'Acceso'
      , visible: true
    }
  ];
 


  const handleEdit = (rowData, id) => {
    setEsEditar(true)
    setIdUsuario(rowData.original.IdUsuario)
    setAccion(0)//0 para MODIF 1 para nuevo  
     
   
  }

  return (
    <>
      <SideBarHeader titulo={esEditar ? 'Configura acceso a ligas y torneos' : 'Usuarios Administradores'}></SideBarHeader>
      <br/><br/><br/><br/>
      <div>        
        {!esEditar ?//----------------------------MODO GRID pinta filtros al inicio
          <>
            <SimpleTable data={datosUsuarios} setData={setDatosUsuarios} columns={columns} handleEdit={handleEdit} esOcultaBotonNuevo={true} esOcultaFiltro={true} />
          </>
          ://----------------------------MODO EDICION
          <div>
            <form onSubmit={guardarConfiguraAccesoLigas}>
              <br />
              <ElementoBotones cancelar={cancelar}></ElementoBotones>
              <ElementoCampo type="select" lblCampo="Usuario: " claCampo="campo" nomCampo={idUsuario} options={datosUsuario} onInputChange={setIdUsuario} editable={false} />
              <SimpleTable data={datosAccesoLigas} setData={setDatosAccesoLigas} columns={columnsConfigura} handleEdit={handleEdit} esOcultaBotonNuevo={true}/>
                                                         
            </form>
          </div>
        }
        {/* {setEsCargaInicial(true)}   */}

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
        
      </div>
    </>
  );
};

export default FrmConfiguraAccesoLigas;
