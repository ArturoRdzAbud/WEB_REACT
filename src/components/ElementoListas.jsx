import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ElementoListasHijo } from "./ElementoListasHijo"; // Ajusta la ruta


// const initialData1 = [
//   { id: 'item1', content: 'Item 1' },
//   { id: 'item2', content: 'Item 2' },
//   { id: 'item3', content: 'Item 3' },
// ];

// const initialData2 = [
//   { id: 'item4', content: 'Item 4' },
//   { id: 'item5', content: 'Item 5' },

// ];

export const ElementoListas = ({ data1, data2, setData1, setData2,enc1,enc2
  ,filtraLocal
  // ,filtraLocal2
  ,filtro
  ,setFiltro
}) => {
  // const [data1, setData1] = useState(initialData1);
  // const [data2, setData2] = useState(initialData2);











  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Si no tiene donde soltarlo no hace nada 
    if (!destination) return;

    // Si el elemento es soltado en su posición inicial, no se hace nada
    if (
      source.droppableId === destination.droppableId
      // && source.index === destination.index
    ) {
      return;
    }

    // Determinar desde donde se está arrastrando y hacia donde se va a soltar
    const sourceData = source.droppableId === 'list1' ? data1 : data2;
    const destData = destination.droppableId === 'list1' ? data1 : data2;

    // copea los datos originales para evitar modificaciones
    const newSourceData = Array.from(sourceData);
    const newDestData = Array.from(destData);

    //saca el arrastrado
    const [draggedItem] = newSourceData.splice(source.index, 1);

    //Insertar en la lista de destino
    newDestData.splice(destination.index, 0, draggedItem);

    //Actualizar listas
    if (source.droppableId === 'list1') {
      setData1(newSourceData);
      setData2(newDestData);
    } else {
      setData1(newDestData);
      setData2(newSourceData);
    }
  };

  // const filtraLocalElementoListas() {
    //  const filtraLocal2 = () => {
    //   console.log('Evento enviado desde Hijo2');
    //   filtraLocal; // Llamar a la función de manejo del evento proporcionada por el componente Padre
    // };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {/* <Droppable droppableId="list1">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="list-group"
              style={{ border: '1px solid black', padding: '8px', width: '45%' }} // Añadir borde alrededor de la lista
            >
              {data1.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="list-group-item"
                    >
                      {item.content}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable> */}

        <ElementoListasHijo droppableId={'list1'} data1={data1} encabezado={enc1} esOcultaFiltro={true}></ElementoListasHijo>
        <ElementoListasHijo droppableId={'list2'} data1={data2} encabezado={enc2} esOcultaGuardar={true} filtraLocal={filtraLocal} filtro={filtro} setFiltro={setFiltro}></ElementoListasHijo>
        {/* <Droppable droppableId="list2">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="list-group"
              style={{ border: '1px solid black', padding: '8px', width: '45%' }}
            >
              {data2.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="list-group-item"
                    >
                      {item.content}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable> */}
      </div>
    </DragDropContext>
  );
};

export default ElementoListas;