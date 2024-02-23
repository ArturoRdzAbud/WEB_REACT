import '../css/SideBarHeader.css';
export const SideBarHeader = ({titulo='Encabezado'}) => {
  return (
        <div className="header">
          <h2 className="text">{titulo}</h2>
        </div>
  )
}
