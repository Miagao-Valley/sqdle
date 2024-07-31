import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";
import initSqlJs from "sql.js";

// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
import Header from "./components/Header";
import Tables from "./components/Tables";
import SQLInput from "./components/SQLInput";
import sampleData from "./mockData/sampleData";
import { generateSELECTAllTablesSQL } from "./helpers/sql";
import {
    transformSQLDataToTable,
    transformToValidatedTable,
} from "./helpers/tables";

import { Send, Table } from "lucide-react";
import clsx from "clsx";
import Result from "./components/Result";

function useTodaysChallenge() {
    const [db, setDb] = useState(null);
    const [error, setError] = useState(null);

    const handleSetup = useCallback((db) => {
        try {
            const { query, table_names } = sampleData.data;

            db.exec(query);

            const allTableSQL = generateSELECTAllTablesSQL(table_names);

            const res = db.exec(allTableSQL);
            let tablesGenerated = res.map((data, index) =>
                transformSQLDataToTable(data, table_names[index])
            );

            // Find the target table
            const targetTableIndex = tablesGenerated.findIndex(
                (table) => table.name === "target"
            );
            const targetTable = tablesGenerated[targetTableIndex];
            setTargetTable(targetTable);

            // Remove target table
            tablesGenerated = tablesGenerated.filter(
                (table) => table.name !== "target"
            );

            // Push to the first index
            tablesGenerated.unshift(targetTable);

            setTables(tablesGenerated);

            // Deny access to "target" table
            db.exec("DROP TABLE target");
        } catch (err) {
            console.error(err);
            setError(err);
        }
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const SQL = await initSqlJs({ locateFile: () => sqlWasm });
                const db = new SQL.Database();
                handleSetup(db);
                setDb(db);
            } catch (err) {
                setError(err);
            }
        })();
    }, []);

    const [tables, setTables] = useState([]);
    const [targetTable, setTargetTable] = useState(null);

    return { tables, targetTable, db, error, setError };
}

export default function App() {
    const { tables, targetTable, db, error, setError } = useTodaysChallenge();
    const [result, setResult] = useState(null);

    const [selectedTab, setSelectedTab] = useState("tables");

    function runSQL(code) {
        if (!db || !targetTable) {
            return;
        }

        setSelectedTab("result");

        try {
            const result = db.exec(code);

            if (result && result.length > 0) {
                if (result.length > 1) {
                    setError(
                        "Output is more than one table. Try again with another query"
                    );
                    return;
                }

                const tableData = transformSQLDataToTable(result[0], "answer");
                const validatedTableData = transformToValidatedTable(
                    targetTable,
                    tableData
                );

                setResult(validatedTableData);
            } else {
                setResult(null);
            }

            setError(null);
        } catch (error) {
            console.error(error);
            setResult(null);
            setError(error);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F8EDED]">
            <Header />
            <main className="px-5 pb-5 pt-3 flex-1 flex gap-3 flex-wrap-reverse">
                <section className="border rounded bg-white min-h-full overflow-hidden flex-1 min-w-[600px]">
                    <header className="flex items-center py-3 border-b text-white font-bold bg-[#173B45]">
                        <button
                            className={clsx(
                                "flex items-center gap-2 px-4 border-r",
                                selectedTab === "tables"
                                    ? "text-white"
                                    : "text-gray-400"
                            )}
                            onClick={() => setSelectedTab("tables")}
                        >
                            <Table size={16} /> <p>Tables</p>
                        </button>
                        <button
                            className={clsx(
                                "flex items-center gap-2 px-4",
                                selectedTab === "result"
                                    ? "text-white"
                                    : "text-gray-400"
                            )}
                            onClick={() => setSelectedTab("result")}
                        >
                            <Send size={16} /> Result
                        </button>
                    </header>
                    <div
                        className={clsx(
                            selectedTab === "tables" ? "block" : "hidden",
                            "p-4"
                        )}
                    >
                        <Tables tables={tables} />
                    </div>
                    <div
                        className={clsx(
                            selectedTab === "result" ? "block" : "hidden",
                            "p-4"
                        )}
                    >
                        <Result
                            targetTable={targetTable}
                            result={result}
                            error={error}
                            isRendered={selectedTab === "result"}
                        />
                    </div>
                </section>
                <SQLInput runSQL={runSQL} />
            </main>
        </div>
    );
}
