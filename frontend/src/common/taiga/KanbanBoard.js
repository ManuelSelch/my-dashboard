import React from "react";

const KanbanBoard = ({stories, statuses}) => {
    return (
        <div className="p-2">
            <p className="pt-10 text-4xl font-bold">Kanban Board</p>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-5 pt-10">
                {statuses.map((status) => (
                    <KanbanColumn key={status?.id ?? 0} status={status} stories={stories.filter(m => m.status === status?.id)}/>
                ))}
            </div>
        </div>
    );
};

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

const KanbanCard = ({id, title}) => {
    return (
        <div className="p-2 rounded shadow-sm border-gray-100 border-2">
            <h3 className="text-sm mb-3 text-gray-700"><strong>#{id}</strong> {title}</h3>
        </div>
    );
};

export default KanbanBoard;