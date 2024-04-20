import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SimpleTable from './SimpleTable';
import { ElementoCampo } from './ElementoCampo';

import { SideBarHeader } from './SideBarHeader';
import config from '../config'; // archivo configs globales del proy


import { ElementoBotones } from './ElementoBotones';
import { CatEquiposRel1 } from './CatEquiposRel1';
import { ElementoImagen } from './ElementoImagen';
import { useLocation } from 'react-router-dom';

//TIP: TENER SIEMPRE PRENDIDO EL INSPECTOR WEB (CONSOLA) EN EL NAVEGADOR PARA VER TODOS LOS ERRORES EN VIVO 
const CatEquipos = () => {
  const location = useLocation();
  // const { esNuevoP } = new URLSearchParams(location.search);
  const buttonRefNuevo = useRef(null);
  // const referencia = useRef(null);
  const params = new URLSearchParams(location.search);
  const esNuevoP = params.get('esNuevoP');



  const [datosEquiposBD, setDatosEquiposBD] = useState([]);
  const [datosEquipos, setDatosEquipos] = useState([]);
  //Filtros
  const [esVerBaja, setEsVerBaja] = useState(false);
  const [datosLiga, setDatosLiga] = useState([]);
  const [datosTorneo, setDatosTorneo] = useState([]);
  const [datosTorneoBD, setDatosTorneoBD] = useState([]);//se guarda en otro arreglo para filtrarlo localmente
  //>
  const [esEditar, setEsEditar] = useState(false);
  const [esNuevo, setEsNuevo] = useState(false);
  const [idEquipo, setIdEquipo] = useState(0);
  const [nombre, setNombre] = useState('');
  const [activo, setActivo] = useState(false);
  const [hexData, setHexData] = useState('');

  //datos de registro
  const [accion, setAccion] = useState(0);

  //DatosPantalla
  const [claLiga, setClaLiga] = useState(-1);
  const [claTorneo, setClaTorneo] = useState(-1);




  const inicializaCampos = () => {
    // console.log('Inicializa')
    setEsVerBaja(true)
    //Campos 
    setNombre('')
    //DatosPantalla
    setClaLiga(-1)
    setClaTorneo(0)//tinyint en bd no acepta negativos

    setIdEquipo(0)
    setNombre('')
    setActivo(true)
    setAccion(0)
  };
  const cancelar = () => {
    // console.log('Edición cancelada');
    inicializaCampos()
    setEsEditar(false)
    setEsNuevo(false)
    if (esNuevoP) {
      regresa
    }
  };
  const regresa = () => {
    // const parametros = {
    //   esNuevoP: 1,
    //   esNuevo2P: '2',
    // };
    // const ruta = `/Equipos?esNuevoP=${parametros.esNuevoP}&esNuevo2P=${parametros.esNuevo2P}`;
    // navigate(ruta);
  }
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
    setClaTorneo(-1)
  };


  const filtraLocalCombo = () => {
    // console.log('filtraLocalCombo')
    var datosFiltrados = datosTorneoBD
    datosFiltrados = claLiga > 0 ? datosTorneoBD.filter(item => item.IdLiga == claLiga) : datosTorneoBD;
    setDatosTorneo(datosFiltrados);
  }
  const filtraLocal = () => {
    filtraLocalCombo()//Asigna la Dependencia de combos 

    var datosFiltrados = datosEquiposBD
    datosFiltrados = !esVerBaja ? datosEquiposBD.filter(item => item.ActivoChk) : datosEquiposBD;
    datosFiltrados = claLiga > 0 ? datosFiltrados.filter(item => item.IdLiga == claLiga) : datosFiltrados;
    datosFiltrados = claTorneo > 0 ? datosFiltrados.filter(item => item.IdTorneo == claTorneo) : datosFiltrados;

    setDatosEquipos(datosFiltrados);
    // console.log(ref1.current)
  };
  //-------------------------------------------------------------------SECCION USE EFFFECT
  // llena arreglos de combos
  useEffect(() => {
    var apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarLigasCmb%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosLiga(response.data)
      }
      )
      .catch(error => console.error('Error al obtener LIGA', error));

    apiUrl = config.apiUrl + '/ConsultarCombo?psSpSel=%22ConsultarTorneosCmb%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosTorneoBD(response.data)
        setDatosTorneo(response.data)
      }
      )
      .catch(error => console.error('Error al obtener TORNEO', error));

    // console.log(esNuevoP)
    if (esNuevoP == '1') {
      // setClaLiga(5);
      // console.log(claLiga)
      buttonRefNuevo.current.click();
      // console.log(claLiga)
    }

    console.log('entra')
    setHexData('FFD8FFE000104A46494600010101006000600000FFDB00430007050506050407060506080707080A110B0A09090A150F100C1118151A19181518171B1E27211B1D251D1718222E222528292B2C2B1A202F332F2A32272A2B2AFFDB0043010708080A090A140B0B142A1C181C2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2AFFC0001108007A00BB03012200021101031101FFC4001F0000010501010101010100000000000000000102030405060708090A0BFFC400B5100002010303020403050504040000017D01020300041105122131410613516107227114328191A1082342B1C11552D1F02433627282090A161718191A25262728292A3435363738393A434445464748494A535455565758595A636465666768696A737475767778797A838485868788898A92939495969798999AA2A3A4A5A6A7A8A9AAB2B3B4B5B6B7B8B9BAC2C3C4C5C6C7C8C9CAD2D3D4D5D6D7D8D9DAE1E2E3E4E5E6E7E8E9EAF1F2F3F4F5F6F7F8F9FAFFC4001F0100030101010101010101010000000000000102030405060708090A0BFFC400B51100020102040403040705040400010277000102031104052131061241510761711322328108144291A1B1C109233352F0156272D10A162434E125F11718191A262728292A35363738393A434445464748494A535455565758595A636465666768696A737475767778797A82838485868788898A92939495969798999AA2A3A4A5A6A7A8A9AAB2B3B4B5B6B7B8B9BAC2C3C4C5C6C7C8C9CAD2D3D4D5D6D7D8D9DAE2E3E4E5E6E7E8E9EAF2F3F4F5F6F7F8F9FAFFDA000C03010002110311003F00FA468A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028ACEB9F106956927972DEC464FF9E719DEDF92E4D573E27B62331D96A322FF00792D1F1401B34566DA78834DBC93CB4B911CDD0C53031B8FC1B15A54005145140051451400514514005145140051451400514514005145140051450480324E00EF400554B8D5AC2D6EBECD73790C5379466F2DDC03B01C6EFA64D62EB1E2F8ED6D2E5F48885E1B752649C9C4319F42DFC47B60573FE00D0A5D62F6EFC5DE2445B9BDBB7D96C187CB146BC7CABE99FE59A6075ABABDCEA2BFF124B5DF19E97571948FEA07DE6FD07BD1FD84D7633ACDF4D77DCC487CA8FF0021C9FC49ABFA85FDB695A6CF7B7AE23B7B78CBBB63A014DD2754B6D6B47B5D4EC1CBDB5DC4B2C4C4609523238A4054BA36DA15BC31E99610F9F3CAB145146026E3D49271D0004FE15AD58768DFDA9E28B8BAEB6FA729B688F6694E0C87F0185FCEB728020BBB1B5BE8BCBBCB78E65F475CE3E9E959FA6AC9A6EA52696F23CB0347E75B33B659541C3213DF048C7B1AD7AACF69BF548AECB7FAA85E30BFEF1524FF00E3B401668A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A4775442CEC155464927000AE7DF5ABBD6D9EDFC3400881DAFA84ABF22FAEC1FC67DFA500686A9AE59E9215266692E24FF556D10DD2487D87F5E959C9A66A5AE9F335E6FB2D99FBB610BF2C3FE9A30EBF41C55FD2B42B5D2B74ABBAE2EE4FF5B7531DD2487EBD87B0AA7E2AD786956460B79425DCC84EFEBE4463EF4847B7403B920500737E216FF84835DB6F0CE91B62B3B76C4BE52E1548FBC78FEE8381FED1F6AEFADADA2B3B58ADADD02451204451D80AE7FC17A0FF0065E9A6EEE23297574012AC72D1C7D5509F5E493EAC4D50F11F8D26B1F1A69FA269BB192189EF35695973E4C014ED51FED33631FF00D7A6041F112F25BD8D343B239966DA9C7FCF5932A83F01B9FF00E022B7AE047E16F095B5869A83CC8A24B3B38FFBCF8DABFE27D81AC0F0ADA4DACF89AE358BD4F96D1D80E720DC3001B1EC8A153EA0D50F15F8B4C7ACAB58627BC0CD67A4DB8E4BCC78926C770BF747FC0A802EEB1E20B7F0BDADAF87ACEF5A29D57CCBFBF584CBF665272CED8180CC49C67A75AA317C47B9D1F4692CE6864D7756B29AE7CF10E148B689C8F39BB0257000EE6ACCFA08D0FC13FD8064373ACF881CC771331DCCECDFEB1C9F455CFE9EB5D269DE0DD2348FED796C6DF13EAC4B5D48C725BE5DA147A0F6F73401B56B711DDDA437309CC7320743EA08C8A96B0BC152B4BE0BD377FDE8E2F28FFC0095FE95BB48028A28A0028A28A0028A28A0028A28A0028A28A002B3757D7ACF4754598B4B732F10DB42374921F61E9EFD2A85EEBD3DEDD3E9DE1A44B8B853B66BA6FF00536FF53FC4DEC2AE691A05BE96EF70EEF757D37FAEBB9B976F61E83D850067C7A3EA1AF4827F1237936A0EE8F4D89BE5FF00B68DFC47DBA57471C690C6B1C48A88A30AAA3000A7553D4F528B4DB70CEAD24B21D90C29F7A46F41FD4F61401575FF001258F876084DE3179EEA4115B5BC632F33938000FA9E4F415CD68D6035ED7EE2E2F678EE16DA6537451B2AF38E5621FEC2039F76E6B8C92CF5BF1078AEF2FED258EF7596474B06E441648320C99FAE554F7393D0569E95F05AF3FE11DB4B6D4FC4D7B67771BBDC49FD9CDB55A6618DECDD588E7D07F5607A178A3C4D67E17D02E752BA612345F245029F9A590FDD403D49C7F3AF26C5DE8BA64B79A9132EB9AADD24971B577B19DB98E155EA446BF311EA1455E83C15A5E9FE2D9AF34D92E751923B9D909BD99A512DD6D00B73FC2806E63DCF1D80A996CF598358B9F1059FD863D3ADEDDA0B5D53509B8B73B899E711E3E76738C723818E94087AF8FA2B6B23E0FD074CBDB7D4A02B0CCF2A83E5AB757C827F78C4F0BD72727815D15B697A2782EDE0D6356823975968FC881506F939E91443F99F724D739E1279AE899BC336525F5CEE6297D7C0AC68CC7E799CFF001C8DE83851815DF68DE168B4FBC6D4B52B87D4F559061AEA61F707F7635E883E9400CD034ABC92FA4D775E0A3509D764300395B48BFB80F763D49AE809C2927A014B583E2BD4DED74F5D3EC7E7D4B52260B68C1E467EF39F651CE7E9486278240FF8446D1978591A475FA19188ADFAADA758C5A6E996D6500C476F1AC6BF4031566800A28A2800A28A2800A28A2800A28A28011982A966200032493D2B9896EAEFC5733DB6972BDB692876CD78BC35C7AAC7E83D5BF2A6DFCADE2AD5A4D26D6464D2ED4817D321C79CDFF3C81F4F5FCABA48BECD6D125BC2638D235C2A020600F6A0065869F6BA659A5AD8C2B0C2838551FA9F53566AA5C6ABA7DAAE6E6FADE21FEDCAA3FAD61EA9F10342B18585A5DAEA175D12DED4190B1F7C0381EF401B7A96A50E9B0AB481A49646D90C29CB4ADE807F5ED5CDEB76B712594F6EF297D7B5485A1B7109E2D108C1209E80776EE6B321F154B0DF2B43A36A1A9EB9768444648BC98D17D17772A83B9C64D5CD2F4DF188F3679469D6779727335CCACD33E3B2A8180147614C0DCF0AF862CFC29A24763684C926019A77E5A56C6324FF0021DAB3FC6FE31B0F0FE91242350863BFB8FDD44A0EE68F3D5CA8C9C01CFD714F3E109EF06ED7BC41A85E0EAD1C4E2DE3FC93923EA6B99F0E786B4DD6BC5173AA5B58456FA2D8BF956E71CDCB29C9624F55DDF9E0500645B5F6AD716B1D8E8DA54B626F51ADEDAEEFCF962DEDC0CBC98EA59BEF16E3A815B5E1CF063EBD7515EF882F24D434AB4509656CCBB21908E37841FC3E99E4F5A9B4A82EBC75E29BDD5A66DBE1E4C5BDB8190D7414FCDFF002DC9F5C015E88AAA8A150055518000E00A006C50C7044B1411AC71A8C2AA0C003E94FA09C75AE62FBC5335F5E3E99E12856FEED4ED96E9BFE3DEDBFDE61F78FFB22901A1AFF0088ADB42863528D737B7076DAD9C5CC9337B0EC3D4F4155FC3FA1DC41732EB1AE3ACDAB5CAE1B6FDCB74EA224F6F53DCD49A1F86A2D2A692FAF276BFD5671FBEBC987CD8FEEA8FE15F615B740051451400514514005145140051451400561F8A7529ED6C62B2D38FF00C4C2FDFC9831FC3FDE7FA01CD6E573764BFDA1E3ED46E24E574D852DE207B338DEC7F2C0A00AF17C38D084112CEB7723AA00ECB792A076EEC55580C935343F0F3C2F036E5D2D59B182CF2BB1FCC9AE9AB98D63C471BDC4D65697896B0C2DE5DCDE9E4AB7FCF38C7F13FF002FAD004771A46876973F61D1744B29F50C02DBA3052007F89CFF004EA7F5A48562D1A5934FD0614BED666C1B898A85487D0B91F740EC839FE752D9595EDDD98B7D3524D1F4F63979A419BA9FD4F3F773EA727D856EE9FA75AE97682DECA2F2D33927392C7B924F24FB9A00AFA4E8E9A689269A56BABE9F99EE5C7CCFEC3D147602B4A8A280392F15EA92EA1A943E11D1E5DB7B789BEF2543CDADB776F666E83F3ADEFEC6B21A09D1A38BCBB2301B7D9192A421183823A71DEB3FC39E158B41BED56FE5B86BCBFD52E9A69AE1D7042670918F40AB8153EADE29D274790437373E65D37DCB5814C92B1F651CFE7401A365676FA758C3676512C36F0208E38D0602A81802B3F59F1369BA1958AE6469AEE4FF0055676EBBE690FB28FE6702B2B778A3C47C20FF00847AC1BAB1C3DD38F6EC9FA9AD6D17C33A66841DACA12D712732DCCCDBE590FBB1E680323FB2F5CF149DFAF48DA5698DD34EB77FDEC83FE9A38E9FEE8AE96C6C2D74DB34B5B0B78EDE0418548D700558A2800A28A2800A28A2800A28A2800A28A2800A28A2800AE634FB85D37C7BAB5A5D1118D4563B8B76638DE5502328F7180715D3D51D5347B0D66D843A8DBACAA0E55BA321F50C3906802F563E99E15D2349BC9AEAD2DB33CB2BCA64918B9566393B73F779F4AA27C3BAD589FF00892F8926118E90DFC22703FE0590DFAD22C3E385E1AEF43907F7BC9941FCB34C0E9E8AE7058F8BA6E27D674FB707FE78599623FEFA6A43E119AE8E756F106A7763BA4720817F2403F9D2035750D774BD290B6A37F6F6FF00ECBC8371FA0EA6B1FF00E12F9F51F97C37A25E5FE781713AFD9E1FAEE6E4FE02B434FF000AE87A5B6FB3D360593BCAEBBDC9F5DC726B5E981CBFF62788357FF90F6B02D206EB69A6029C7A190FCC7F0C56B693E1ED2F444234DB38E266FBD26373B7D58F26B4A8A401451450014514500145145001480104E4E7278F6A5A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2803FFD9')

    // setClaLiga(3)
    // ref1.value='2'
    // console.log(claLiga)
    // if (ref1.current) {
    //   ref1.current.value = ref1.current.options[3].value;
    //}
    // console.log(ref1.current.options.length)

  }, []);// se ejecuta 1 vez al inicio solamente


  useEffect(() => {
    // console.log(buttonRefNuevo.current)
    // console.log(referencia.current)
  }, []); // Asegúrate de que el useEffect se dispare cuando los datos del combo cambien


  //Carga equipos desde BD
  useEffect(() => {
    if (esEditar) return//sale si es modo edicion
    const apiUrl = config.apiUrl + '/ConsultarGrid?psSpSel=%22BuscarEquipos%22';
    axios.get(apiUrl)
      .then(response => {
        setDatosEquiposBD(response.data);
        setDatosEquipos(response.data);
      })
      .catch(error => console.error('Error al obtener datos:', error))
      .finally(() => {
        inicializaCampos()
      });
  }, [esEditar]); // Se EJECUTA CUANDO CAMBIA la bandera esEditar

  useEffect(() => {
    // console.log('filtraLocalCombo')
    filtraLocalCombo()
  }, [claLiga]);//Se llama al modificar el combo liga modo edicion/nuevo

  useEffect(() => {
    filtraLocal()
  }, [esVerBaja, claLiga, claTorneo]); //Se invoca al interactuar con los filtros arriba del grid

  const columns = [
    {
      header: 'Id',
      accessorKey: 'IdEquipo',
      footer: 'Id'
      , visible: false
    },
    {
      header: 'IdLiga',
      accessorKey: 'IdLiga',
      footer: 'IdLiga'
      , visible: false
    },
    {
      header: 'IdTorneo',
      accessorKey: 'IdTorneo',
      footer: 'IdTorneo'
      , visible: false
    },
    {
      header: 'Liga',
      accessorKey: 'Liga',
      footer: 'Liga'
      , visible: true
    },
    {
      header: 'Torneo',
      accessorKey: 'Torneo',
      footer: 'Torneo'
      , visible: false
    },
    {
      header: 'Nombre',
      accessorKey: 'Nombre',
      footer: 'Nombre'
      , visible: true
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    },
    {
      header: 'Activo',
      accessorKey: 'ActivoChk',
      footer: 'Activo'
      , visible: true
      //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
    }
  ];

  const handleEdit = (rowData) => {
    setEsEditar(true)
    setNombre(rowData.original.Nombre)
    setIdEquipo(rowData.original.IdEquipo)
    if (rowData.original.ActivoChk == false) { setActivo(false) } else { setActivo(true) }

    setClaLiga(rowData.original.IdLiga)
    setClaTorneo(rowData.original.IdTorneo)
    setAccion(0)//0 para MODIF 1 para nuevo
  }

  const setRef = (ref) => {
    referencia.current = ref;
  };

  return (
    <>
      <SideBarHeader titulo={esNuevo ? ('Nuevo Equipo') : esEditar ? 'Editar Equipo' : 'Equipos'}></SideBarHeader>
      <br /><br /><br /><br />
      {/* <h1>hola</h1>
      <hr></hr> */}
      <div>
        {/* {esNuevo ? (<h1>Nuevo Equipo</h1>) : esEditar ? <h1>Editar Equipo</h1> : <h1>Equipos</h1>} */}
        {/* <hr></hr> */}
        {!esEditar ?//----------------------------MODO GRID pinta filtros al inicio
          <>
            <ElementoImagen hexData={hexData}></ElementoImagen>
            <ElementoCampo type='checkbox' lblCampo="Ver Inactivos :" claCampo="activo" nomCampo={esVerBaja} onInputChange={setEsVerBaja} />
            <ElementoCampo type="select" lblCampo="Liga: " claCampo="campo" nomCampo={claLiga} options={datosLiga} onInputChange={(value) => handleLiga(value, claLiga)} />
            {/* <ElementoCampo type="select" lblCampo="Torneo: " claCampo="campo" nomCampo={claTorneo} options={datosTorneo} onInputChange={setClaTorneo} /> */}
            <SimpleTable data={datosEquipos} columns={columns} handleEdit={handleEdit} handleNuevo={nuevo} buttonRefNuevo={buttonRefNuevo} />
          </>
          ://----------------------------MODO EDICION/NUEVO REGISTRO
          <div>
            <CatEquiposRel1
              claLiga={claLiga}
              idEquipo={idEquipo}
              datosLiga={datosLiga}
              setClaLiga={setClaLiga}
              esNuevo={esNuevo}
              setEsEditar={setEsEditar}
              setEsNuevo={setEsNuevo}
              inicializaCampos={inicializaCampos}
              cancelar={cancelar}
              setNombre={setNombre}
              nombre={nombre}
              activo={activo}
              setActivo={setActivo}
              accion={accion}
            ></CatEquiposRel1>
          </div>
        }

      </div>
    </>
  );
};

export default CatEquipos;
