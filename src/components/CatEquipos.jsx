import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';


const CatEquipos = () => {
  
  const [data, setDatos] = useState([]);

    useEffect(() => {
        // Cambia la URL a la de tu API
        const apiUrl = 'http://localhost:3000/ConsultarGrid?psSpSel=%22BuscarEquipos%22';

        // Haciendo la solicitud a la API utilizando Axios
        axios.get(apiUrl)
            .then(response => setDatos(response.data))
            .catch(error => console.error('Error al obtener datos:', error));

        // console.log(data)    

    }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente



  const columns = [
    {
        header: 'Id',
        accessorKey: 'IdEquipo',
        footer: 'Mi Id'
    },
    // { header: 'Nombre y Apellido',       código de refencia para cuando ocupemos concatenar dos columnas
    // accessorFn: row => `${row.nombre} ${row.apellido}`
    //},
    {
        header: 'Nombre',
        accessorKey: 'Nombre',
        footer: 'mi Nombre'
        //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    }
];

  return (
    <div>
       <h1>Catálogo de equipos</h1>
       <SimpleTable data={data} columns={columns}/>
    </div>
  );
};

export default CatEquipos;
