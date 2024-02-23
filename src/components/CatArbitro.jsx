import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';
import { AlertaEmergente } from './AlertaEmergente';


export const CatArbitro = () => {
  const [datosArbitroBD, setDatosArbitroBD] = useState([]);
  const [datosArbitro, setDatosArbitro] = useState([]);

  //Filtros
  const [esVerBaja, setEsVerBaja] = useState(false);
  const [datosLiga, setDatosLiga] = useState([]);

    //>
    const [esEditar, setEsEditar] = useState(false);
    const [esNuevo, setEsNuevo] = useState(false);
    /*------------------------------------*/
    const [idArbitro, setIdArbitro] = useState(0);
    //const [idLiga, setIdLiga] =  useState(0);
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState(0);
    const [curp, setCurp] = useState('');
    const [idPais, setIdPais] =  useState(0);
    const [idMunicipio, setIdMunicipio] =  useState(0);
    const [idEstado, setIdEstado] =  useState(0);
    const [fotografia, setfotografia] =  useState('');
    /*-------------------------------------------*/
    const [activo, setActivo] = useState(false);
    //datos de registro
    const [accion, setAccion] = useState(0);
  
    //DatosPantalla
    const [claLiga, setClaLiga] = useState(-1);
    const [esMuestraCamposReq, setEsMuestraCamposReq] = useState(false);

    const onAceptar = () => {
      setEsMuestraCamposReq(false)
    };

    const guardarArbitro = async (e) => {
      e.preventDefault();
      const data = {
        pnIdLiga: idLiga,
        pnIdArbitro: idArbitro,
        psNombre: nombre,
        psTelefono: telefono,
        psCurp: curp,
        pnIdPais: idPais,
        pnIdEstado: idEstado,
        pnIdMunicipio: idMunicipio,
        psFotografia:  fotografia,
        pnActivo: activo,
        pnAccion: accion
      };

      const apiReq = 'http://localhost:3000/GuardarArbitro';
      try {
  
        if (claLiga == -1) { setEsMuestraCamposReq(true); return }


        console.log('Guardando arbitro', data);
        // if (claLiga == claLiga) return
        await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' });
        inicializaCampos()
        setEsEditar(false)//regresa al grid
        setEsNuevo(false)
      } catch (error) {
        console.error('Error al guardar el arbitro', error);
      }
    };

    const inicializaCampos = () => {
      // console.log('Inicializa')
      setEsVerBaja(true)
      //Campos 

      //DatosPantalla
      setClaLiga(-1)   

      setActivo(true)
      setAccion(0)
    };

    const cancelar = () => {
      // console.log('Edición cancelada');
      inicializaCampos()
      setEsEditar(false)
      setEsNuevo(false)
    };
    const nuevo = () => {
      // console.log('nuevo')
      inicializaCampos()
      setEsEditar(true)
      setEsNuevo(true)
      setAccion(1)//0 para MODIF 1 para nuevo
    };
  
    const handleLiga = (value, claLiga) => {//limpia combos hijo 
      // console.log('handleLiga')
      setClaLiga(value)
    };


    const filtraLocal = () => {
 
      var datosFiltrados = datosArbitroBD
      datosFiltrados = !esVerBaja ? datosArbitroBD.filter(item => item.Activo) : datosArbitroBD;
      datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : datosFiltrados;
      //datosFiltrados = claTorneo > 0 ? datosFiltrados.filter(item => item.IdTorneo == claTorneo) : datosFiltrados;
  
      setDatosArbitro(datosFiltrados);
    };

      // llena arreglos de combos
      useEffect(() => {
        var apiUrl = 'http://localhost:3000/ConsultarCombo?psSpSel=%22ConsultarLigasCmb%22';
        axios.get(apiUrl)
          .then(response => {
            setDatosLiga(response.data)
          }
          )
          .catch(error => console.error('Error al obtener LIGA', error));
    
      }, []);// se ejecuta 1 vez al inicio solamente

  //Carga equipos desde BD
  useEffect(() => {
    if (esEditar) return//sale si es modo edicion
    axios.get('http://localhost:3000/ConsultarArbitros', { params: { pnIdLiga: idLiga }}) //&{ pnIdLiga: claLiga }
    //axios.get(apiUrl)
      .then(response => {
        setDatosArbitroBD(response.data);
        setDatosArbitro(response.data);
      })
      .catch(error => console.error('Error al obtener datos:', error))
      .finally(() => {
        inicializaCampos()
      });
  }, [esEditar]); // Se EJECUTA CUANDO CAMBIA la bandera esEditar

  useEffect(() => {
    filtraLocal()
  }, [esVerBaja, claLiga]); //Se invoca al interactuar con los filtros arriba del grid

  const columns = [
    {
      header: 'Id',
      accessorKey: 'IdArbitro',
      footer: 'Id'
      ,visible :false
    },
    {
      header: 'IdLiga',
      accessorKey: 'IdLiga',
      footer: 'IdLiga'
      ,visible:false
    },

    {
      header: 'Nombre',
      accessorKey: 'Nombre',
      footer: 'Nombre'
      ,visible:true
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    },
    {
      header: 'Activo',
      accessorKey: 'Activo',
      footer: 'Activo'
      ,visible:true
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    }
  ];

  const handleEdit = (rowData) => {
    setEsEditar(true)
    setNombre(rowData.original.Nombre)
    setIdArbitro(rowData.original.idArbitro)
    if (rowData.original.Activo == false) { setActivo(false) } else { setActivo(true) }

    setClaLiga(rowData.original.IdLiga)
    setAccion(0)//0 para MODIF 1 para nuevo
  }

  return (
    <>
    <div>
      {esNuevo ? (<h1>Registrar Arbitro</h1>) : esEditar ? <h1>Editar Arbitro</h1> : <h1>Arbitros</h1>}
      <hr></hr>
      {!esEditar ?//----------------------------MODO GRID pinta filtros al inicio
        <>
          <button type="button" className="btn btn-primary" onClick={nuevo}>Nuevo</button>
          <ElementoCampo type='checkbox' lblCampo="Ver Baja :" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} />
          <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={(value) => handleLiga(value, claLiga)} />
          <p>Parrafo temporal para ver parametros del SP a Base de datos|@IdLiga={claLiga}|</p>
          <SimpleTable data={datosArbitro} columns={columns} handleEdit={handleEdit} />
        </>
        ://----------------------------MODO EDICION/NUEVO REGISTRO
        <div>
       
          <ElementoCampo type="select" lblCampo="Liga*: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={setClaLiga} editable={esNuevo} />
          <ElementoCampo type="text" lblCampo="Nombre* :" claCampo="Nombre" onInputChange={setNombre} nomCampo={nombre}  editable={esNuevo}/> 
    |     <ElementoCampo type="text" lblCampo="CURP* :" claCampo="CURP"  nomCampo={curp}  onInputChange={setCurp} editable={esNuevo}/> 
          <ElementoCampo type="text" lblCampo="Celular* :" claCampo="Celular" placeholder="9999-9999 o 9999-99999"  nomCampo={telefono}  onInputChange={setTelefono} editable={esNuevo} />
          <br></br> 
          <h3>Registro de usuario</h3>
          <ElementoCampo type="text" lblCampo="Usuario* :" claCampo="Usuario"   /> 
          <ElementoCampo type='password' lblCampo="Password* :" claCampo="Password" placeholder="password" id="password" required/>
          <ElementoCampo type='file' lblCampo="Fotografia* :" claCampo="Fotografia" id="Fotografia" required/>
      </div>
      }

    </div>
  </>
);
};

   /* <div>
      <h1>Registro de Arbitro</h1>
      <hr></hr>
      <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={ligaF} options={dataLiga} onInputChange={setLigaF} />
      

    </div>
  )
}*/

export default CatArbitro;
