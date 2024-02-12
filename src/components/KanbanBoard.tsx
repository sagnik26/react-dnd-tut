import { useMemo, useState } from "react"
import Plusicon from "../icons/Plusicon"
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col: any) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
        distance: 3 // 3px
    }
  }))

  const createNewColumn = () => {
    const columnToAdd: Column = {
        id: generateId(),
        title: `Column ${columns.length + 1}`
    }

    setColumns([...columns, columnToAdd])
  }

  const generateId = () => {
    // generate a random number between 0 and 10000
    return Math.floor(Math.random() * 10001)
  }

  const deleteColumn = (id: Id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  }

  const onDragStart = (event: DragStartEvent) => {
    console.log("DRAG", event);
    if(event?.active?.data?.current?.type === "Column") {
        setActiveColumn(event?.active?.data?.current?.column);
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if(!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if(activeColumnId === overColumnId) return;

    setColumns(columns => {
        const activeColumnIndex = columns.findIndex((col: Column) => col.id === activeColumnId);
        const overColumnIndex = columns.findIndex((col: Column) => col.id === overColumnId); 

        return arrayMove(columns, activeColumnIndex, overColumnIndex);
    })
  }

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-2">
        <div className="flex gap-4">
            <SortableContext items={columnsId}>
            {
                columns.map((col: any) => (
                   <ColumnContainer key={col.id} column={col} deleteColumn={() => deleteColumn(col.id)} />
                ))
            }
            </SortableContext>

        </div>
        <button 
            className="flex gap-2 h-[60px] w-[350px] min-w-[358px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2"
            onClick={() => createNewColumn()}
        >
          <Plusicon />
          Add Column
        </button>
        </div>

        {createPortal(
            <DragOverlay>
                {
                    activeColumn &&  
                    <ColumnContainer 
                        key={activeColumn.id} 
                        column={activeColumn} 
                        deleteColumn={() => deleteColumn(activeColumn.id)} 
                    />
                }
            </DragOverlay>, document.body)
        }
      </DndContext>
    </div>
  )
}

export default KanbanBoard
