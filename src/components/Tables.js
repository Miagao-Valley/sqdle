import { Info, Target } from "lucide-react";
import React from "react";

import { AgGridReact } from "ag-grid-react";
import "../gridStyle/ag-grid-theme-builder.css";
import clsx from "clsx";

function Tables({ tables }) {
    return (
        <div className="space-y-4">
            {tables.map((table, index) => (
                <div key={table.name}>
                    <div className="flex gap-1 items-center">
                        {index === 0 && <Target color="red" />}
                        <h2
                            className={clsx(
                                "font-bold",
                                index === 0 ? "uppercase text-lg" : "text-base"
                            )}
                        >
                            {table.name}
                        </h2>
                    </div>
                    {index === 0 && (
                        <p className="text-sm mb-2">
                            Using the other tables below, create the correct SQL
                            statement to get (SELECT) this target table.
                        </p>
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
    );
}

export default Tables;
