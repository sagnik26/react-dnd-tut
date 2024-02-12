import React from "react"
import { Column, Id } from "../types"
import Trashicon from "../icons/Trashicon"

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
}

const ColumnContainer: React.FC<Props> = ({ column, deleteColumn }) => {
  return (
    <div className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      {/* Column title */}
      <div className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between">
        <div className="flex gap-2">
            <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
                0
            </div>
            {column.title}
        </div>
        <button onClick={() => deleteColumn(column.id)}>
            <Trashicon />
        </button>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow">Content</div> 

      {/* Column footer */}
      <div>Footer</div>
    </div>
  )
}

export default ColumnContainer
