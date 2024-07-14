import React from "react";

const KanbanCard = ({id, title}) => {
    return (
        <div className="p-2 rounded shadow-sm border-gray-100 border-2">
            <h3 className="text-sm mb-3 text-gray-700"><strong>#{id}</strong> {title}</h3>
        </div>
    );
};

export default KanbanCard;