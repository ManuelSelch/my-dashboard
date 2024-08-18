import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/react-splide/css";

// common
import Button from '../common/Button';
import FileUpload from '../common/FileUpload';
import Heading from '../common/Heading';
import Body from '../common/Body';
import TextArea from "../common/TextArea";

// common taiga
import IssuesBoard from '../common/taiga/IssuesBoard';
import KanbanBoard from '../common/taiga/KanbanBoard';

// feature
import {thunks as projectsThunks} from '../features/ProjectsFeature';
import {thunks as taigaThunks} from '../features/TaigaFeature';

const burndownChartConfig = {
    colors : ['#758694', '#9CDBA6', '#E90074'],
    chart: {
        type: 'area',
        id: "backlog"
    },

    stroke: {
        curve: 'straight'
    },

    dataLabels: {
        enabled: false,
    },

    xaxis: {
       
    },

    
}

const ProjectDetails = () => {
    const { slug } = useParams();

    const isEditMode = useSelector((state) => state.user.isEditMode);
    const projects = useSelector((state) => state.projects);
    const taiga = useSelector((state) => state.taiga);
    const dispatch = useDispatch();
    
    const [project, setProject] = useState(null);
    const [isChange, setChange] = useState(false);
    
    const taigaProject = taiga.projects.find((p) => p.id === project?.taigaProject);

    useEffect(() => {
        if(project)
            return;

        setProject(projects.find((p) => p.slug === slug))

        dispatch(taigaThunks.fetchProjects());
        dispatch(taigaThunks.fetchIssues());
        dispatch(taigaThunks.fetchUserStories());
        dispatch(taigaThunks.fetchUserStoryStatuses());

    }, [setProject, dispatch, project, projects, slug]);

    function updateDescription(desciption) {
        const updatedProject = {...project, desciption: desciption};
        setProject(updatedProject);
        setChange(true);
    }

    async function addSliderImage(file) {
        await dispatch(projectsThunks.uploadSliderImage(project, file));

        const imgName = project.slug + "-" + project.images.length + ".jpg";
        const imgPath = process.env.REACT_APP_BACKEND_URL + "/uploads/" + imgName;
        let images = [...project.images];
        images.push(imgPath);

        const updatedProject = {...project, images: images};
        setProject(updatedProject);
        setChange(true);
    }

    function deleteSliderImage(index) {
        let images = [...project.images];
        images.splice(index, 1);

        var updatedProject = {...project, images: images};
        setProject(updatedProject);
        setChange(true);
    }

    function saveProject() {
        dispatch(projectsThunks.updateProject(project))
        setChange(false);
    }

    if(project) {
        return(
            <Body>
                <Heading>{project.name}</Heading>

                <div className="grid grid-cols-2 max-lg:grid-cols-1 pt-10">
                    <div className="p-5 object-none object-center bottom-0">
                        {isEditMode
                        ? 
                        <AdminSlider 
                            project={project}
                            addSliderImage={(file) => addSliderImage(file)}
                            deleteSliderImage={(index) => deleteSliderImage(index)}
                        />
                        : 
                        <div>{project.images.length > 0 && <Slider images={project.images}/>}</div>
                        }
                    </div>

                    <ProjectInfos project={project} slug={taigaProject?.slug} isEditMode={isEditMode} updateDescription={(s) => updateDescription(s)}/>
                </div>


                {taigaProject &&
                <KanbanBoard 
                    stories={taiga.userStories.filter((s) => s.project === taigaProject.id)}
                    statuses={taiga.userStoryStatuses.filter((s) => s.project === taigaProject.id && s.is_archived === false)}
                />
                }

                {taigaProject &&
                <IssuesBoard
                    issues={taiga.issues.filter((i) => i.project === taigaProject.id && i.is_closed === false)}
                />
                }

                

                {isEditMode &&                
                    <Button 
                        name="Save" 
                        onClick={saveProject} 
                        disabled={!isChange}
                    />
                }

            
            </Body>
        );
    }
    
    return(<div></div>);
};

const AdminSlider = ({project, addSliderImage, deleteSliderImage}) => {
    return (
        <div>
            {project.images && 
                project.images.map((img, index) => (
                    <AdminImage img={img} key={index} handleDeleteImage={() => deleteSliderImage(index)}/>
                ))
            }

            <FileUpload file={null} setFile={(file) => addSliderImage(file)}/>
        </div>
    );
};

const AdminImage = ({img, handleDeleteImage}) => {
    return (
        <div className="m-5">
            <img
                src={img}
                width={"50%"}
                className="m-auto"
                alt = "img"
            />
            <div className="flex justify-center">
                <Button name="Delete" onClick={handleDeleteImage}/>
            </div>
        </div>
    );
};


const ProjectInfos = ({project, slug, isEditMode, updateDescription}) => {
    const date = new Date(null);
    const formattedDate = date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const lastLink = project.links[project.links.length - 1];

    return (
        <div>
            {/*<!-- Component: Basic card --> */}
            <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                <div className="p-6">
                    <h3 className="mb-4 text-xl font-medium text-slate-700">
                    Project information
                    </h3>
                    <p><strong>Date:</strong> {formattedDate}</p>
                    <p><strong>Links: </strong> 
                        {project.links.map(link => (
                            <a key={link.url} href={link.url} target='_blank' rel="noreferrer" className='text-blue-900'>
                                {link.name}
                                {(link !== lastLink) &&
                                <>, </>
                                }
                            </a>
                           
                            
                        ))}
                    </p>
                    <hr className="m-5"/>

                    
                    <h3 className="mb-4 text-xl font-medium text-slate-700">
                    Project description
                    </h3>

                    {isEditMode
                        ? <TextArea 
                            name="Desciption" 
                            value={project.description}
                            setValue={(s) => updateDescription(s)}
                        />
                        : <div dangerouslySetInnerHTML={{__html: project.description}} />
                    }

                    
                </div>
            </div>
            {/*<!-- End Basic card --> */}
        </div>
    )
};

const Slider = ({images}) => {
    return (
        <Splide 
            options={{
                type: "loop",
                arrows: false,
                pagination: false,
                breakpoints: {
                  1000: {
                    perPage: 1,
                  },
                },
            }}
        >
            {images.map(image => (
                <SplideSlide key={image}>
                    <img src={image} alt="Image 1" className='max-h-[80vh] m-auto'/>
                </SplideSlide>
            ))}
        </Splide>
    );
}


export default ProjectDetails;