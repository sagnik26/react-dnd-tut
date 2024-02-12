import { useState } from "react"
import Plusicon from "../icons/Plusicon"
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

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

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto flex gap-2">
        <div className="flex gap-4">
            {
                columns.map((col: any) => (
                   <ColumnContainer key={col.id} column={col} deleteColumn={() => deleteColumn(col.id)} />
                ))
            }
        </div>
        <button 
            className="flex gap-2 h-[60px] w-[350px] min-w-[358px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2"
            onClick={() => createNewColumn()}
        >
          <Plusicon />
          Add Column
        </button>
      </div>
    </div>
  )
}

export default KanbanBoard
