import React, { useState, useEffect } from 'react';
import './styles.css';
import initSqlJs from 'sql.js';

// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from '!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm';
import Header from './components/Header';
import Tables from './components/Tables';
import SQLInput from './components/SQLInput';

export default function App() {
    const [db, setDb] = useState(null);
    const [error, setError] = useState(null);

    useEffect(async () => {
        try {
            const SQL = await initSqlJs({ locateFile: () => sqlWasm });
            setDb(new SQL.Database());
        } catch (err) {
            setError(err);
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="px-5 pb-5 pt-3 flex-1 flex gap-3">
                <Tables />
                <SQLInput />
            </main>
        </div>
    );
}
