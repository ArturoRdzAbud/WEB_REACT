import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';


export const CatArbitro = () => {
    //Variables
    const [data, setDatos] = useState([]);
    const [esEditar, setEsEditar] = useState(false);

    //
    useEffect(() => {
        // Cambia la URL a la de tu API
        const apiUrl = 'http://localhost:3000/ConsultarArbitros?';
    
        // Haciendo la solicitud a la API utilizando Axios
        axios.get(apiUrl)
          .then(response => setDatos(response.data))
          .catch(error => console.error('Error al obtener datos:', error));
    
        //console.log(data)    
    
    
    
    
      }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente
    
    
    
      const columns = [
        {
          header: 'ID',
          accessorKey: 'IdArbitro',
          footer: 'ID'
        },
        {
          header: 'Nombre',
          accessorKey: 'Nombre',
          footer: 'Nombre'
        },
        {
          header: 'Activa',
          accessorKey: 'Activa',
          footer: 'Activa'
          //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
        }
      ];
      
      const handleEdit = (rowData) => {
        setEsEditar(true)
        setNombre(rowData.original.Id)
        setIdEquipo(rowData.original.IdEquipo)
        //if (rowData.original.Activo == 'false') { setActivo(false) } else { setActivo(true) }
        if (rowData.original.Activo == false) { setActivo(false) } else { setActivo(true) }
        // handleSetNombre(rowData.original.Activo)//Asigna nombre
      }

  return (
    <div>
      <h1>Registro de Arbitro</h1>
      <hr></hr>
      {!esEditar ?
        <>
          <SimpleTable data={data} columns={columns} handleEdit={handleEdit} />
        </>
        :
        <div>
          {/*
          //<form >
            <br />

            <ElementoCampo type='text' lblCampo="Activo* :" claCampo="nombre" />
            <ElementoCampo type='text' lblCampo="Capitán del Equipo :" claCampo="claCapitan" />


            <button type="submit" className="btn btn-primary" >Guardar</button>
            <button type="button" className="btn btn-primary" >Cancelar</button>

           
          //</form>*/
          }
        </div>

      }
    </div>
  )
}

export default CatArbitro;
