import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';


export const CatArbitro = () => {
    const [data, setDatos] = useState([]);
    const [dataD, setDatosD] = useState([]);
    //Filtros
    const [esVerBaja, setEsVerBaja] = useState(false);
    const [ligaF, setLigaF] = useState(-1);
    const [dataLiga, setDatosLiga] = useState([]);
    //>
    const [esEditar, setEsEditar] = useState(false);
    const [showPwd, setShowPwd] = useState(false)
    //const [idEquipo, setIdEquipo] = useState(0);
    //const [nombre, setNombre] = useState('');
    //const [activo, setActivo] = useState(false);
  
    const [idLiga, setIdLiga] = useState(0);
    //const [idTorneo, setIdTorneo] = useState(0);
    const [accion, setAccion] = useState(0);
  
    const guardarArbitro = async (e) => {
      e.preventDefault();
  
      const data = {
        pnIdLiga: idLiga,        
        pnIdArbitro: idArbitro,
        psNombre: nombre,
        psTelefono: telefono,
        psCurp: curp,
        pnActivo: activo,
        pnAccion: accion
      };
  
      const apiReq = 'http://localhost:3000/GuardarArbitro';
  
      try {
  
        await axios.post(apiReq, { data }, { 'Access-Control-Allow-Origin': '*' });
        console.log('Guardando los datos.', data);
        inicializaFiltros()
        setEsEditar(false)//regresa al grid
      } catch (error) {
        console.error('Error al guardar los datos.', error);
      }
    };
    const inicializaFiltros = () => {
      //TODO LIMPIAR CADA FILTRO A SU VALOR INICIAL
      //setEsVerBaja(false)
      setLigaF(-1)
    };
    const cancelar = () => {
      console.log('Edición cancelada');
      inicializaFiltros()
      setEsEditar(false)
    };
  
    useEffect(() => {
      const apiUrl = 'http://localhost:3000/ConsultarGrid?psSpSel=%22ConsultarLigasCmb%22';
      axios.get(apiUrl)
        .then(response => {
          setDatosLiga(response.data)
        }
        )
        .catch(error => console.error('Error al obtener LIGA', error));
    }, []);

    /*useEffect(() => {
      const apiUrl = 'http://localhost:3000/ConsultarGrid?psSpSel=%22BuscarEquipos%22';
      axios.get(apiUrl)
        .then(response => { setDatos(response.data); setDatosD(response.data) })
        .catch(error => console.error('Error al obtener datos:', error));
    }, [esEditar]); // ASEGURA QUE SE EJECUTA CUANDO CAMBIA esEditar recarga GRID*/
  
    useEffect(() => {
      // TODO IR FILTRANDO CAMPO POR CAMPO
      var datosFiltrados = data
      //datosFiltrados = esVerBaja ? data.filter(item => item.Activo) : data;
      datosFiltrados = ligaF > 0 ? datosFiltrados.filter(item => item.IdLiga == ligaF) : datosFiltrados;
      
      setDatosD(datosFiltrados);
    }, [esVerBaja, ligaF]); //AGREGAR AQUI CADA FILTRO
  
    const columns = [
      {
        header: 'Id',
        accessorKey: 'IdArbitro',
        footer: 'Id'
      },
      {
        header: 'Nombre',
        accessorKey: 'Nombre',
        footer: 'Nombre'
      },
      {
        header: 'Activo',
        accessorKey: 'Activo',
        footer: 'Activo'
      },
    ];
  
    const handleEdit = (rowData) => {
      setEsEditar(true)
      //setNombre(rowData.original.Nombre)
     // setIdEquipo(rowData.original.IdEquipo)
     // if (rowData.original.Activo == false) { setActivo(false) } else { setActivo(true) }
  
      setIdLiga(rowData.original.IdLiga)
      //setIdTorneo(rowData.original.IdTorneo)
      setAccion(0)//0 para MODIF 1 para nuevo
    }

  return (
    <div>
      <h1>Registro de Arbitro</h1>
      </div>
  )
}

export default CatArbitro;
