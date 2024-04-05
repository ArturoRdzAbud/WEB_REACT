import { Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useState } from 'react';
// import dayjs from "dayjs";
import { ElementoCampo } from './ElementoCampo';
import { useEffect } from "react";
import { ElementoBotones } from './ElementoBotones';


export const ElementoListasHijo = ({
    droppableId
    , data1 = []
    , encabezado = ''
    , esOcultaFiltro = false
    , esOcultaGuardar = false
    , filtraLocal
    , filtro
    , setFiltro
}) => {
    // const [filtro, setFiltro] = useState("")

    // useEffect(() => {
    //     // console.log(filtro)
    //     filtraLocal
    // }, [filtro]);




    return (
        <>

            {/* <button onClick={filtraLocal}>HOLA</button> */}

            <div style={{ width: '100%', boxSizing: 'border-box' }}>

                {/* <h4 htmlFor="encabezadoLista" style={{ display: 'block', width: '100%' }}>{encabezado}</h4> */}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ textAlign: 'left' }}>{encabezado}</h4>
                    {!esOcultaFiltro ? (//&&
                        <ElementoCampo type='text' lblCampo="Filtro :" claCampo="filtro" valCampo={filtro} onInputChange={setFiltro} width='100%'
                            onInputChange2={() => filtraLocal(true)}
                        />) : (
                        <div style={{ height: '74px' }} />)
                    }
                </div>



                {/* {!esOcultaGuardar &&
                    <ElementoBotones></ElementoBotones>
                } */}

                {/* <span className="border border-primary"> */}
                <Droppable droppableId={droppableId}>
                    {(provided) => (
                        // <div className="list-group">
                        <ul
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="list-group"
                            style={{ border: '1px solid gray', padding: '8px', width: '95%' ,textAlign:'left' }} // Añadir borde alrededor de la lista
                        >
                            {data1.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="list-group-item list-group-item-action"
                                            // style={{textAlign:'left'}}
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
