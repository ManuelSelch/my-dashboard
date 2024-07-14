import { useParams } from 'react-router-dom'

import ProjectInfos from '../widgets/Project/ProjectInfos';
import Slider from '../widgets/Project/Slider';
import Burndown from '../widgets/Burndown/Burndown';
import KanbanBoard from '../widgets/Kanban/KanbanBoard';
import IssuesBoard from '../widgets/Issues/IssuesBoard';

import Body from '../widgets/Body';
import Heading from '../widgets/Heading';

import useFetchProject from '../hooks/useFetchProject';


const TaigaProjectDetails = () => {
    const { slug } = useParams();
    const project = useFetchProject(slug);

    if(project?.id){
        return (
            <Body>
                <Heading>{project.name}</Heading>
               
                <div className="grid grid-cols-2 max-lg:grid-cols-1 pt-10">
                    <div className="p-5 object-none object-center bottom-0">
                        <Slider />
                    </div>

                    <div>
                        <ProjectInfos slug={slug} created_date={project.created_date} description={project.description}/>

                        
                        
                        
                    </div>
                </div>

                {project.is_kanban_activated &&
                    <KanbanBoard project={project.id}/> 
                }

                {project.is_issues_activated && 
                    <IssuesBoard project={project.id}/> 
                }
            </Body>
        )
    }
    return (
        <div></div>
    );
}

export default TaigaProjectDetails;