import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";
import { CodeIcon } from "lucide-react";

function SQLInput() {
    const [code, setCode] = useState("SELECT * FROM table_x WHERE ...");

    return (
        <div className="border border-[#173B45] min-h-full flex-1 flex flex-col overflow-hidden rounded">
            <header className="p-3 flex items-center gap-2 border-b text-white font-bold bg-[#173B45]">
                <CodeIcon size={16} /> <p>SQL Code</p>
            </header>
            <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) => highlight(code, languages.sql)}
                textareaClassName="!text-white"
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
