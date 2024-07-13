import { useParams } from 'react-router-dom'

import Burndown from '../widgets/Burndown/Burndown';
import KanbanBoard from '../widgets/Kanban/KanbanBoard';
import IssuesBoard from '../widgets/Issues/IssuesBoard';

import useFetchProject from '../hooks/useFetchProject';


const TaigaProjectDetails = () => {
    const { slug } = useParams();
    const project = useFetchProject(slug);

   
    const date = new Date(project.created_date);
    const formattedDate = date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const projectLink = process.env.REACT_APP_TAIGA_URL + "/project/" + slug;

    return (
        <div className="p-10">
            <p className="text-4xl font-bold">{project.name}</p>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 pt-10">
                
                <div className="grid grid-cols-1 justify-items-center">
                    {project?.id
                        ?<Burndown project={project.id} total_milestones={project.total_milestones ?? 10} total_story_points={project.total_story_points ?? 10}/>
                        :<p></p>
                    }
                </div>

                <div className="">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Project information</h2>
                            <hr/>
                            <p><strong>Date:</strong> {formattedDate}</p>
                            <p><strong>Link:</strong> <a href={projectLink} target='_blank' className='text-blue-900'>Project Details</a></p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl mt-10">
                        <div className="card-body">
                            <h2 className="card-title">Project description</h2>
                            <hr/>

                            <p>{project.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {project?.id
                ?<div>
                    <IssuesBoard project={project.id}/>
                    <KanbanBoard project={project.id}/>
                </div>
                :<p></p>
            }

        
        </div>
    )
}

export default TaigaProjectDetails;