import React, { useEffect, useState } from 'react';

export const ElementoImagen = ({hexData}) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Supongamos que 'hexData' contiene la cadena hexadecimal de la imagen
    // const hexData = hexData;
    console.log(hexData)

    // Convertir la cadena hexadecimal a un ArrayBuffer
    const arrayBuffer = hexStringToBuffer(hexData);

    // Crear un Blob a partir del ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

    // Crear una URL de objeto para la imagen
    const url = URL.createObjectURL(blob);

    // Actualizar el estado con la URL de la imagen
    setImageUrl(url);

    // Limpiar la URL de la imagen cuando el componente se desmonte
    return () => URL.revokeObjectURL(url);
  }, []); // El segundo argumento vacío indica que este efecto se ejecuta solo una vez, similar a componentDidMount

  // Función para convertir una cadena hexadecimal en un ArrayBuffer
  const hexStringToBuffer = (hexString) => {
    const buffer = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < hexString.length; i += 2) {
      buffer[i / 2] = parseInt(hexString.substr(i, 2), 16);
    }
    return buffer;
  };

  return (
    <div>
      {/* Utilizar la URL de la imagen en el atributo src del elemento img */}
      <img src={imageUrl} alt="Imagen" />
    </div>
  );
};

export default ElementoImagen;
