import React from "react";
import TableCard from "./TableCard";

function TablesList({ tables, handleSubmit }) {
    return (
        <div className="bg-white mx-auto h-full scrollbar-hide">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                {
                    tables
                        ?.sort((a, b) => a.tableNumber - b.tableNumber)
                        .map((table) => {
                            return (
                                <TableCard key={table._id} table={table} handleSubmit={handleSubmit} />
                            )
                        })
                }
            </div>
        </div>
    );
}

export default TablesList;