import React, { useState } from 'react';
import axios from 'axios';

const EquipoForm = () => {
  const [nombre, setNombre] = useState('');
  const [activo, setActivo] = useState(false);

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
    // Por ejemplo, puedes redirigir a la página anterior
    // Asumiendo que estás utilizando React Router
    // Si no, ajusta esta parte según tu enrutamiento
    // import { useHistory } from 'react-router-dom';
    // const history = useHistory();
    // history.goBack();
  };

  return (
    <div>
      <form onSubmit={guardarEquipo}>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <div className="q-mb-lg">
          <input
            type="checkbox"
            id="activo"
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
          />
          <label htmlFor="activo">Activo</label>
        </div>

        <button type="submit" className="q-mr-md">Guardar</button>
        <button type="button" onClick={cancelar}>Cancelar</button>
      </form>
    </div>
  );
};

export default EquipoForm;
