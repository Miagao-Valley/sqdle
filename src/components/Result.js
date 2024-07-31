import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "../gridStyle/ag-grid-theme-builder.css";
import { Loader, Target } from "lucide-react";

function Result({ targetTable, result, error, isRendered }) {
    const answerGridRef = useRef(null);
    const targetGridRef = useRef(null);

    const sizeToFit = useCallback((gridRef) => {
        if (gridRef.current?.api) {
            gridRef.current.api.sizeColumnsToFit();
        }
    }, []);

    useEffect(() => {
        sizeToFit(answerGridRef);
    }, [result]);

    useEffect(() => {
        sizeToFit(targetGridRef);
    }, [isRendered]);

    const scoreColor = useMemo(() => {
        if (!result?.score || !targetTable) {
            return "text-black";
        }

        const perfectScore = targetTable.rows.length;

        if (result.score === perfectScore) {
            return "text-green-500";
        }

        if (result.score >= perfectScore / 2) {
            return "text-yellow-500";
        }

        return "text-red-500";
    }, [result, targetTable]);

    return (
        <div className="space-y-4">
            <div>
                <div className="flex gap-3 items-center">
                    <h2 className="font-bold text-lg">Answer</h2>
                    <p className="text-sm tracking-tighter">
                        (
                        <span className={scoreColor}>{result?.score ?? 0}</span>{" "}
                        / {targetTable?.rows.length ?? "?"})
                    </p>
                </div>
                <pre className="text-red-500">{(error || "").toString()}</pre>
                {result && (
                    <div>
                        <AgGridReact
                            ref={answerGridRef}
                            domLayout="autoHeight"
                            autoSizeStrategy={{ type: "fitGridWidth" }}
                            rowData={result.rows}
                            columnDefs={result.columns}
                        />
                    </div>
                )}
                {/* No result and no error */}
                {!result && !error && (
                    <pre className="text-red-600">No output.</pre>
                )}
            </div>

            <div>
                <div className="flex gap-1 items-center mb-1">
                    <Target size={12} color="red" />
                    <h2 className="text-sm font-bold">TARGET</h2>
                </div>
                {targetTable ? (
                    <div>
                        <AgGridReact
                            ref={targetGridRef}
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
