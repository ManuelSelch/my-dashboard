import React from "react";
import KanbanColumn from "./KanbanColumn";

import useFetchUserStories from "../../hooks/useFetchUserStories";
import useFetchUserStoryStatuses from "../../hooks/useFetchUserStoryStatuses";

const KanbanBoard = ({project}) => {
    const stories = useFetchUserStories(project);
    const statuses = useFetchUserStoryStatuses(project);

    return (
        <div className="h-screen p-2">
            <p className="pt-10 text-4xl font-bold">Kanban Board</p>

            <div className="grid lg:grid-cols-7 md:grid-cols-4 sm:grid-cols-2 gap-5 pt-10">
                {statuses.map((status) => (
                    <KanbanColumn key={status?.id ?? 0} status={status} stories={stories.filter(m => m.status === status?.id)}/>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;