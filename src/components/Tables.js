import { GripVertical } from "lucide-react";
import React from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const ResizeBar = React.forwardRef((props, ref) => {
    const { handleAxis, ...restProps } = props;
    return (
        <div
            ref={ref}
            {...restProps}
            className="absolute -right-3 top-0 h-full handle-bar flex items-begin justify-center cursor-ew-resize"
        >
            <GripVertical size={12} color="#173B45" className="mt-20" />
        </div>
    );
});

function Tables({ tables }) {
    return (
        <ResizableBox
            className="border border-[#173B45] rounded bg-[#173B45] min-h-full text-white"
            axis="x"
            handle={<ResizeBar />}
            resizeHandles={["e"]}
            width={800}
        >
            <div className="overflow-hidden p-4 space-y-4">
                {tables.slice(0, tables.length - 1).map((table) => (
                    <div key={table.name}>
                        <h2 className="text-base uppercase">{table.name}</h2>
                        <div className="ag-theme-quartz">
                            <AgGridReact
                                domLayout="autoHeight"
                                autoSizeStrategy={{ type: "fitGridWidth" }}
                                rowData={table.rows}
                                columnDefs={table.columns}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </ResizableBox>
    );
}

export default Tables;
