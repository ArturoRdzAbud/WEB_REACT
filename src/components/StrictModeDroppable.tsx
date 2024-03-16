// StrictModeDroppable.tsx
import React, { useEffect, useState } from "react";
import { Droppable, DroppableProps,Draggable } from "react-beautiful-dnd";




export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  
  const initialData1 = [
    { id: 'item1', content: 'Item 1' },
    { id: 'item2', content: 'Item 2' },
    { id: 'item3', content: 'Item 3' },
  ];
  const [data1, setData1] = useState(initialData1);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  // return <Droppable {...props}>{children}</Droppable>;
  return  <Droppable droppableId="list1">
  {(provided) => (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      style={{ border: '1px solid black', padding: 8, width: 200 }}
    >
      {data1.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                userSelect: 'none',
                padding: 8,
                margin: '0 0 8px 0',
                backgroundColor: 'white',
                ...provided.draggableProps.style,
              }}
            >
              {item.content}
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  )}
</Droppable>
};

export default StrictModeDroppable
