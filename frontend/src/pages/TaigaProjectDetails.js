import React from "react";
import { useParams } from 'react-router-dom'

import ProjectInfos from '../widgets/Project/ProjectInfos';
import Slider from '../widgets/Project/Slider';
// import Burndown from '../widgets/Burndown/Burndown';
import KanbanBoard from '../widgets/Kanban/KanbanBoard';
import IssuesBoard from '../widgets/Issues/IssuesBoard';

import Body from '../widgets/Body';
import Heading from '../widgets/Heading';

import useAdmin from '../hooks/useAdmin';
import useFetchProject from '../hooks/useFetchProject';


const TaigaProjectDetails = () => {
    const { slug } = useParams();
    const { projects } = useAdmin();

    const project = projects ? projects.find((p) => p.slug === slug) : null
    const taigaProject = useFetchProject(project?.taigaSlug);

    if(project !== null){
        return (
            <Body>
                <Heading>{project?.name}</Heading>
               
                <div className="grid grid-cols-2 max-lg:grid-cols-1 pt-10">
                    <div className="p-5 object-none object-center bottom-0">
                        <Slider />
                    </div>

                    <div>
                        <ProjectInfos 
                            slug={taigaProject?.slug} 
                            created_date={taigaProject?.created_date} 
                            description={project.description}
                            setDescription={() => {}}
                        />

                        
                        
                        
                    </div>
                </div>

                {taigaProject?.is_kanban_activated &&
                    <KanbanBoard project={taigaProject.id}/> 
                }

                {taigaProject?.is_issues_activated && 
                    <IssuesBoard project={taigaProject.id}/> 
                }
            </Body>
        )
    }
    return (
        <div></div>
    );
}

export default TaigaProjectDetails;