import React from "react";

const KanbanHeader = ({name, color, count}) => {
    return (
        <div className="flex flex-row justify-between items-center mb-2 mx-1">
            <div className="flex items-center">
                <h2 className="text-sm w-max px-1 rounded mr-2 text-black" style={{backgroundColor: color}}>{name}</h2>
                <p className="text-gray-400 text-sm">{count}</p>
            </div>
        </div>
    );
};

export default KanbanHeader;