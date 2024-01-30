//componente para mostrar un campo
import { useState } from "react";
export const ElementoCampo = ({
  type = 'text'
  , lblCampo = 'lblCampo'
  , claCampo = 'claCampo'
  , nomCampo = ''
  , onInputChange
}) => {

  // const [value, setValue] = useState(nomCampo || '')
  const [value, setValue] = useState(nomCampo)

  const handleInputChange = (event) => {
    // console.log(event)
    //const newValue = event.target.value;
    const newValue = type == 'checkbox' ? event.target.checked : event.target.value;
    setValue(newValue)
    // console.log(newValue)
    if (onInputChange) {//Asigna el valor en el padre recibe de parametro el evento SET
      onInputChange(newValue);
    }
  }

  return (
    <>
      {type == 'checkbox' ?

        <div className="form-check form-switch">
          <input className="form-check-input"
            type={type} role="switch"
            id={claCampo}
            //checked={value=='on'?true:false} 
            checked={value}
            onChange={handleInputChange} />
          <label className="form-check-label" htmlFor={claCampo}>{lblCampo}</label>
        </div>

        // <div className="form-check">
        //   <input className="form-check-input"
        //     type={type}
        //     // value="1"
        //     id="flexCheckDefault"
        //     checked={true}
        //     onChange={handleInputChange}
        //     />
        //     <label className="form-check-label" htmlFor="flexCheckDefault">
        //       {lblCampo}
        //     </label>
        // </div>

        :
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
      }







    </>
  )
}


