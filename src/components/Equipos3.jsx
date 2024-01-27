import React from 'react';

const Equipos3 = () => {
  const datos = [
    { id: 1, nombre: 'Equipo 1', activo: true },
    { id: 2, nombre: 'Equipo 2', activo: false },
    { id: 3, nombre: 'Equipo 3', activo: true }
  ];

  return (
    <div>
       <button
          type="submit"
          style={{ marginLeft: '190px', marginRight: 'auto', marginTop: '10px' }}
        >
          Nuevo Equipo 3
        </button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Activo</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((fila) => (
          <tr key={fila.id}>
            <td>{fila.id}</td>
            <td>{fila.nombre}</td>
            <td>{fila.activo ? 'Sí' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table> 
    </div>
  );
};

export default Equipos3;
