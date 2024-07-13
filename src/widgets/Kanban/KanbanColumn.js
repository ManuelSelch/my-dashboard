import React from "react";

import KanbanHeader from "./KanbanHeader";
import KanbanCard from "./KanbanCard";

const KanbanColumn = ({status, stories}) => {
    return (
        <div className="bg-white rounded px-2 py-2">
            <KanbanHeader name={status?.name} color={status?.color}/>
            
            <div className="grid grid-rows-2 gap-2">
                {stories.map(story => (
                    <KanbanCard key={story.id} id={story.id} title={story.subject}/>
                ))}
            </div>
        </div>
    );
};

export default KanbanColumn;