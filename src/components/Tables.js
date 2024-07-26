import { Info, Send, Table } from "lucide-react";
import React from "react";

import { AgGridReact } from "ag-grid-react";
import "../gridStyle/ag-grid-theme-builder.css";
import clsx from "clsx";

function Tables({ tables }) {
    return (
        <div className="border rounded bg-white min-h-full overflow-hidden flex-1 min-w-[600px]">
            <header className="flex items-center py-3 border-b text-white font-bold bg-[#173B45]">
                <button className="flex items-center gap-2 px-4 border-r">
                    <Table size={16} /> <p>Tables</p>
                </button>
                <button className="flex items-center gap-2 px-4 text-gray-400">
                    <Send size={16} /> Result
                </button>
            </header>
            <div className="p-4 space-y-4">
                {tables.map((table, index) => (
                    <div key={table.name}>
                        <h2
                            className={clsx(
                                "font-bold",
                                index === 0 ? "uppercase text-lg" : "text-base"
                            )}
                        >
                            {table.name}
                        </h2>
                        {index === 0 && (
                            <div className="text-sm flex gap-1 items-center mb-2">
                                <Info size={18} />
                                Using the other tables below, create the correct
                                SQL statement to get this target table.
                            </div>
                        )}
                        <div id="myGrid" className="ag-theme-builder">
                            <AgGridReact
                                domLayout="autoHeight"
                                autoSizeStrategy={{ type: "fitGridWidth" }}
                                rowData={table.rows}
                                columnDefs={table.columns}
                            />
                        </div>
                        {index === 0 && (
                            <div className="mt-8 h-2 bg-gray-300 rounded" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tables;
