import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';

//TIP: TENER SIEMPRE PRENDIDO EL INSPECTOR WEB (CONSOLA) EN EL NAVEGADOR PARA VER TODOS LOS ERRORES EN VIVO 

const CatTiposDeSancion = () => {

  const [data, setDatos] = useState([]);

  const [esEditar, setEsEditar] = useState(false);
  const [idEquipo, setIdEquipo] = useState(0);
  const [nombre, setNombre] = useState('');
  const [activo, setActivo] = useState(false);
  const [capitan, setCapitan] = useState('');
  /*
  const guardarEquipo = async (e) => {
    e.preventDefault();

    const data = {
      pnIdLiga: 1,
      pnIdTorneo: 6,
      pnIdEquipo: 0,
      psNombre: nombre,
      pnActivo: activo,
      pnAccion: 1
    };

    const apiReq = 'http://localhost:3000/GuardarEquipo';

    try {
      await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' });
      console.log('Guardando equipo', data);
      // Puedes redirigir o realizar otras acciones después de guardar el equipo
    } catch (error) {
      console.error('Error al guardar el equipo', error);
    }
  };
  const cancelar = () => {
    // Aquí puedes realizar acciones cuando se cancela la edición
    console.log('Edición cancelada');
    setEsEditar(false)
    // Por ejemplo, puedes redirigir a la página anterior
    // Asumiendo que estás utilizando React Router
    // Si no, ajusta esta parte según tu enrutamiento
    // import { useHistory } from 'react-router-dom';
    // const history = useHistory();
    // history.goBack();
  };
*/
  useEffect(() => {
    // Cambia la URL a la de tu API
    const apiUrl = 'http://localhost:3000/ConsultarTiposDeSancion?pnIdLiga=1';

    // Haciendo la solicitud a la API utilizando Axios
    axios.get(apiUrl)
      .then(response => setDatos(response.data))
      .catch(error => console.error('Error al obtener datos:', error));

    // console.log(data)    




  }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente



  const columns = [
    {
      header: 'Clave',
      accessorKey: 'Clave',
      footer: 'Clave'
    },
    {
      header: 'Descripción',
      accessorKey: 'Descripcion',
      footer: 'Descripción'
    },
    {
      header: 'Juegos Suspensión',
      accessorKey: 'JuegosSuspension',
      footer: 'Juegos Suspension'
    },
    {
      header: 'Causa Baja',
      accessorKey: 'CausaBaja',
      footer: 'Causa Baja'
    },
    {
      header: 'Activa',
      accessorKey: 'Activa',
      footer: 'Activa'
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    }
  ];


  // }
  const handleEdit = (rowData) => {
    setEsEditar(true)
    // console.log(esEditar);
    // console.log(rowData.original.IdEquipo);
    // console.log(rowData.original.Activo);
    setNombre(rowData.original.Activo)
    setIdEquipo(rowData.original.IdEquipo)
    //if (rowData.original.Activo == 'false') { setActivo(false) } else { setActivo(true) }
    if (rowData.original.Activo == false) { setActivo(false) } else { setActivo(true) }
    // handleSetNombre(rowData.original.Activo)//Asigna nombre

  }


  return (
    <div>
      <h1>Tipos de Sanción</h1>
      <hr></hr>
      {!esEditar ?
        <>
          <ElementoCampo type='checkbox' lblCampo="Ver Baja :" claCampo="activo" nomCampo={activo} onInputChange={setActivo} />
          <SimpleTable data={data} columns={columns} handleEdit={handleEdit} />
        </>
        :


        <div>
          {/* 
          <form onSubmit={guardarEquipo}>
            <br />

            <ElementoCampo type='text' lblCampo="Activo* :" claCampo="nombre" onInputChange={setNombre} nomCampo={nombre} />
            <ElementoCampo type='text' lblCampo="Capitán del Equipo :" claCampo="claCapitan" nomCampo={capitan} onInputChange={setCapitan} />
            <ElementoCampo type='checkbox' lblCampo="Activo :" claCampo="activo" nomCampo={activo} onInputChange={setActivo} />

            <button type="submit" className="btn btn-primary" >Guardar</button>
            <button type="button" className="btn btn-primary" onClick={cancelar}>Cancelar</button>

            <p>Parrafo temporal para ver parametros del SP a Base de datos|@intIdEquipo={idEquipo}|@sNombre={nombre}|@sCapitan={capitan}|@sActivo={activo.toString()}|</p>
          </form>
          */}
        </div>

      }
    </div>
  );
};

export default CatTiposDeSancion;