import React, { useCallback, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "../gridStyle/ag-grid-theme-builder.css";
import { Loader, Target } from "lucide-react";

function Result({ targetTable, result, error }) {
    const gridRef = useRef(null);

    const sizeToFit = useCallback(() => {
        if (gridRef.current?.api) {
            gridRef.current.api.sizeColumnsToFit();
            // gridRef.current.api.sizeColumnsToFit();
        }
    }, [gridRef.current]);

    useEffect(() => {
        sizeToFit();
    }, [result]);

    return (
        <div className="space-y-4">
            <div>
                <div className="flex gap-3 items-center">
                    <h2 className="font-bold text-lg">Answer</h2>
                    <p className="text-sm tracking-tighter">
                        (<span className="text-red-500">0</span> / 10)
                    </p>
                </div>
                <pre className="text-red-500">{(error || "").toString()}</pre>
                {result && (
                    <div id="myGrid" className="ag-theme-builder">
                        <AgGridReact
                            ref={gridRef}
                            domLayout="autoHeight"
                            autoSizeStrategy={{ type: "fitGridWidth" }}
                            rowData={result.rows}
                            columnDefs={result.columns}
                        />
                    </div>
                )}
                {/* No result and no error */}
                {!result && !error && (
                    <p className="text-red-600">
                        No output. Try another query.
                    </p>
                )}
            </div>

            <div>
                <div className="flex gap-1 items-center mb-1">
                    <Target size={12} color="red" />
                    <h2 className="text-sm font-bold">TARGET</h2>
                </div>
                {targetTable ? (
                    <div id="myGrid" className="ag-theme-builder">
                        <AgGridReact
                            domLayout="autoHeight"
                            autoSizeStrategy={{ type: "fitGridWidth" }}
                            rowData={targetTable.rows}
                            columnDefs={targetTable.columns}
                        />
                    </div>
                ) : (
                    <Loader className="animate-spin" />
                )}
            </div>
        </div>
    );
}

export default Result;
