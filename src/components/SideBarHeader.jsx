import '../css/SideBarHeader.css';
export const SideBarHeader = ({titulo='Encabezado'}) => {
  return (
        <div className="header" hidden={true}>
          <h2 className="text">{titulo}</h2>
        </div>
  )
}
