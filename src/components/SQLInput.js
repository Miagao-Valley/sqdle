import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";
import { CodeIcon, Play } from "lucide-react";

function SQLInput({ runSQL }) {
    const [code, setCode] = useState("");

    return (
        <div className="border flex-1 min-w-[400px] flex flex-col overflow-hidden rounded bg-white min-h-[200px]">
            <header className="p-3 border-b text-white bg-[#173B45] flex items-center gap-4">
                <div className="flex items-center gap-2 font-bold">
                    <CodeIcon size={16} /> <p>SQL Query</p>
                </div>
                <button
                    className="flex gap-1 items-center rounded bg-green-600 py-1 px-2 text-xs"
                    onClick={() => runSQL(code)}
                >
                    RUN <Play size={14} />
                </button>
            </header>
            <Editor
                value={code}
                placeholder="SELECT * FROM table_x WHERE ..."
                onValueChange={(code) => setCode(code)}
                highlight={(code) => highlight(code, languages.sql)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    flex: 1,
                }}
            />
        </div>
    );
}

export default SQLInput;
