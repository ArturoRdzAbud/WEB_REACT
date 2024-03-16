import { Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useState } from 'react';
// import dayjs from "dayjs";
import { ElementoCampo } from './ElementoCampo';
import { useEffect } from "react";


export const ElementoListasHijo = ({
    droppableId
    , data1 = []
    , encabezado = ''
    , esOcultaFiltro = false
}) => {
    const [filtro, setFiltro] = useState("")

    return (
        <>

            <div style={{ width: '100%', boxSizing: 'border-box' }}>

                <label htmlFor="encabezadoLista" style={{ display: 'block', width: '100%' }}>{encabezado}</label>
                {!esOcultaFiltro &&
                    <ElementoCampo type='text' lblCampo="Filtro :" claCampo="filtro" valCampo={filtro} onInputChange={setFiltro} width='95%'/>
                }
                {/* <span className="border border-primary"> */}
                <Droppable droppableId={droppableId}>
                    {(provided) => (
                        // <div className="list-group">
                        <ul
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="list-group"
                            style={{ border: '1px solid gray', padding: '8px', width: '95%' }} // Añadir borde alrededor de la lista
                        >
                            {data1.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="list-group-item list-group-item-action"
                                        >
                                            {item.content}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                        // </div>
                    )}
                </Droppable>
                {/* </span> */}
            </div>
        </>
    )
}
