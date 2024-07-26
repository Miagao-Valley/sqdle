import React, { useState, useEffect } from "react";
import "./styles.css";
import initSqlJs from "sql.js";

// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
import Header from "./components/Header";
import Tables from "./components/Tables";
import SQLInput from "./components/SQLInput";
import sampleData from "./mockData/sampleData";
import { generateSELECTAllTablesSQL } from "./helpers/sql";
import { transformSQLDataToTable } from "./helpers/tables";

function useSQLDB() {
    const [db, setDb] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                console.log("init sql");
                const SQL = await initSqlJs({ locateFile: () => sqlWasm });
                setDb(new SQL.Database());
            } catch (err) {
                setError(err);
            }
        })();
    }, []);

    return { db, error, setError };
}

function useTodaysChallenge() {
    const [tables, setTables] = useState([]);
    const { db, error, setError } = useSQLDB();

    useEffect(() => {
        if (!db || error) {
            return;
        }

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

            // Remove target table
            tablesGenerated = tablesGenerated.filter(
                (table) => table.name !== "target"
            );

            // Push to the first index
            tablesGenerated.unshift(targetTable);

            setTables(tablesGenerated);
        } catch (err) {
            console.error(err);
            setError(err);
        }
    }, [db, error]);

    return { tables, error };
}

export default function App() {
    const { tables } = useTodaysChallenge();

    return (
        <div className="flex flex-col min-h-screen bg-[#F8EDED]">
            <Header />
            <main className="px-5 pb-5 pt-3 flex-1 flex gap-3 flex-wrap-reverse">
                <Tables tables={tables} />
                <SQLInput />
            </main>
        </div>
    );
}
