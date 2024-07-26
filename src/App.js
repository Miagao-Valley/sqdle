import React, { useState, useEffect } from 'react';
import './styles.css';
import initSqlJs from 'sql.js';

// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from '!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm';
import Header from './components/Header';
import Tables from './components/Tables';
import SQLInput from './components/SQLInput';
import sampleData from './mockData/sampleData';
import { generateSELECTAllTablesSQL } from './helpers/sql';

export default function App() {
    const [db, setDb] = useState(null);
    const [error, setError] = useState(null);
    const [tables, setTables] = useState([]);

    useEffect(async () => {
        try {
            const SQL = await initSqlJs({ locateFile: () => sqlWasm });
            setDb(new SQL.Database());
        } catch (err) {
            setError(err);
        }
    }, []);

    useEffect(() => {
        if (!db) {
            return;
        }

        try {
            db.exec(sampleData.data.query);

            const allTableSQL = generateSELECTAllTablesSQL(
                sampleData.data.table_names,
            );

            const a = db.exec(allTableSQL);

            console.log(a);
        } catch (err) {
            console.error(err);
            setError(err);
        }
    }, [db]);

    return (
        <div className="flex flex-col min-h-screen bg-[#F8EDED]">
            <Header />
            <main className="px-5 pb-5 pt-3 flex-1 flex gap-3">
                <Tables tables={tables} />
                <SQLInput />
            </main>
        </div>
    );
}
