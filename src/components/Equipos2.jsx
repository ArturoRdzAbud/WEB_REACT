import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EquiposX = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    // Cambia la URL a la de tu API
    const apiUrl = 'http://localhost:3000/ConsultarGrid?psSpSel=%22BuscarEquipos%22';

    // Haciendo la solicitud a la API utilizando Axios
    axios.get(apiUrl)
      .then(response => setDatos(response.data))
      .catch(error => console.error('Error al obtener datos:', error));
  }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente

 
  const columnas = [
    { nombre: 'IdEquipo', etiqueta: 'cualquier cosa' },
    { nombre: 'Nombre', etiqueta: 'Nombre' }
  ];

  return (
    <div>
      <h1>Catálogo de equipos</h1>
      <table border="1">
        
        <thead>
          <tr>
            {columnas.map(columna => (
              <th key={columna.nombre}>{columna.etiqueta}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map(fila => (
            <tr key={fila.id}>
              {columnas.map(columna => (
                <td key={columna.nombre}>{fila[columna.nombre]}</td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default EquiposX;
