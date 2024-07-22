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
            <GripVertical size={12} />
        </div>
    );
});

function Tables() {
    return (
        <ResizableBox
            className="border rounded bg-gray-300 min-h-full"
            axis="x"
            handle={<ResizeBar />}
            resizeHandles={['e']}
            width={650}
        >
            <div className="overflow-hidden">
                table asdasdasdahksdhaksdhkasdkj
            </div>
        </ResizableBox>
    );
}

export default Tables;
