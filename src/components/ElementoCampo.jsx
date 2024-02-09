//componente para mostrar un campo
import { useState, useEffect } from "react";
export const ElementoCampo = ({
  type = 'text'
  , lblCampo = 'lblCampo'
  , claCampo = 'claCampo'
  , nomCampo = ''
  , onInputChange
  //, valCampo
  , options = []// Nuevo prop para las opciones del combo desplegable
  //,options = [{ value: '', label: 'Seleccionar' }, ...] // Agrega una opción por defecto al combo desplegable
}) => {

  // const [value, setValue] = useState(nomCampo || '')
  const [value, setValue] = useState(nomCampo)

  const handleInputChange = (event) => {
    // console.log(event)
    //const newValue = event.target.value;
    const newValue = type === 'checkbox' ? event.target.checked : event.target.value;
    setValue(newValue)
    // console.log(newValue)

    if (onInputChange) {//Asigna el valor en el padre recibe de parametro el evento SET
      onInputChange(newValue);
    }
  }

  // Actualiza el valor cuando cambia `nomCampo` externamente
  useEffect(() => {
    setValue(nomCampo);
  }, [nomCampo]);

  return (
    <>
      {type == 'checkbox' ? (

        <div className="form-check form-switch">
          <input className="form-check-input"
            type={type} role="switch"
            id={claCampo}
            //checked={value=='on'?true:false} 
            checked={value}
            onChange={handleInputChange} />
          <label className="form-check-label" htmlFor={claCampo}>{lblCampo}</label>
        </div>

      ) : type == 'text' ? ( // Si el tipo es 'texto', mostrar un campo texto
        <div className="form-floating mb-3">
          <input className="form-control"
            type={type}
            id={claCampo}
            placeholder={lblCampo}
            value={value}
            onChange={handleInputChange}
          />
          <label htmlFor="floatingInput">{lblCampo}</label>
        </div>


      ) : type == 'select' ? ( // Si el tipo es 'select', mostrar un combo desplegable
        <div className="form-floating mb-3">
          <select className="form-select" id={claCampo} value={value} onChange={handleInputChange}>
          {[{ value: '-1', label: '' }, ...options].map((option, index) => (
            // {options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
          <label htmlFor={claCampo}>{lblCampo}</label>
        </div>)


        : (<p>Tipo de campo no válido</p>)
        
        }








    </>
  )
}


