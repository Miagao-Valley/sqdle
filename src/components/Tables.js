import { GripVertical } from 'lucide-react';
import React from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ResizeBar = React.forwardRef((props, ref) => {
    const { handleAxis, ...restProps } = props;
    return (
        <div
            ref={ref}
            {...restProps}
            className="absolute -right-3 top-0 h-full handle-bar flex items-center justify-center cursor-ew-resize"
        >
            <GripVertical size={12} color="#173B45" />
        </div>
    );
});

function Tables({ tables }) {
    return (
        <ResizableBox
            className="border border-[#173B45] rounded bg-[#173B45] min-h-full text-white"
            axis="x"
            handle={<ResizeBar />}
            resizeHandles={['e']}
            width={650}
        >
            <div className="overflow-hidden">asdasda</div>
        </ResizableBox>
    );
}

export default Tables;
