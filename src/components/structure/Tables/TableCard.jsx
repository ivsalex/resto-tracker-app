import React from "react";

function TableCard({ table, handleSubmit }) {
    return (
        <div key={table._id} onClick={() => handleSubmit(table._id)} className={`flex flex-col items-center justify-center p-12 border-2 m-2 ${table.isAvailable ? 'bg-available-500 hover:bg-available-600 cursor-pointer' : 'bg-unavailable cursor-not-allowed'} rounded`}>
            <div className="text-center">
                <div className="text-2xl font-bold mb-2">Table #{table.tableNumber}</div>
            </div>
            <div className="text-center">
                <div>Capacity: {table.capacity}</div>
            </div>
        </div>
    )
}

export default TableCard;