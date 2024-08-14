import React, { useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import Body from "../../widgets/Body";
import Heading from "../../widgets/Heading";

import ProjectInfos from "./widgets/ProjectInfos";
import AdminSlider from "./widgets/AdminSlider";
import Slider from "./widgets/Slider";
import { viewProject, saveProject } from "./ProjectFeature";


import Button from "../../widgets/Common/Button";

const ProjectDetails = () => {
    const home = useSelector((state) => state.home);
    const projects = useSelector((state) => state.projects);
    const projectDetails = useSelector((state) => state.project);
    

    const dispatch = useDispatch();

    const { slug } = useParams();
    const project = projects.find((p) => p.slug === slug)

    useEffect(() => {
        if(!project)
            return;

        if(projectDetails.project && projectDetails.project.slug === project.slug)
            return;

        dispatch(viewProject(project));
    })

    if(projectDetails.project) {
        return(
            <Body>
                <Heading>{project.name}</Heading>

                <div className="grid grid-cols-2 max-lg:grid-cols-1 pt-10">
                    <div className="p-5 object-none object-center bottom-0">
                        {home.isEditMode
                        ? <AdminSlider />
                        : <div>{projectDetails.project.images?.length > 0 && <Slider images={projectDetails.project.images}/>}</div>
                        }
                    </div>

                    <div>
                        <ProjectInfos />
                    </div>
                </div>

                {home.isEditMode &&                
                    <Button 
                        name="Save" 
                        onClick={() => dispatch(saveProject())} 
                        disabled={!projectDetails.isChange}
                    />
                }

            
            </Body>
        );
    }
    
    return(<div></div>);
};

export default ProjectDetails;