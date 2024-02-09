//HOOK para cambiar los encabezados del arreglo para el combo ya que el componente lo espera como "value" y "label"
import { useState, useEffect } from 'react';

const UseNormalizaCombo = (datos, campoMappings) => {
  const [datosConNombresNuevos, setDatosConNombresNuevos] = useState([]);

  useEffect(() => {
    // console.log(datos)
    // console.log(campoMappings)
    // console.log('ini UseNormalizaCombo')
    const cambiarNombresDeCampo = () => {
      const nuevosDatos = datos.map(item => {
        const newItem = {};
        Object.keys(item).forEach(key => {
          const newKey = campoMappings[key] || key;
          newItem[newKey] = item[key];
        });
        return newItem;
      });
      setDatosConNombresNuevos(nuevosDatos);
      // setDatos(nuevosDatos)
      // console.log(nuevosDatos)
    };

    

    cambiarNombresDeCampo();
  }, [datos, campoMappings]);

  return datosConNombresNuevos;
};

export default UseNormalizaCombo;
