//componente para mostrar botones guardar cancelar
import Close from '../svg/icon-close.svg?react'
import Save from '../svg/icon-save.svg?react'

// import { useState, useEffect } from "react";
export const ElementoBotones = ({
    cancelar
    ,guardar
}) => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-danger" onClick={cancelar}><Close /></button>
                <button type="submit" className="btn btn-primary" onClick={guardar}><Save /></button>
            </div>
        </>
    )
}


