import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Glide from "@glidejs/glide"

// common
import Button from '../common/Button';
import FileUpload from '../common/FileUpload';
import Heading from '../common/Heading';
import Body from '../common/Body';
import TextArea from "../common/TextArea";

// feature
import {actions, thunks} from '../features/ProjectsFeature';

const ProjectDetails = () => {
    const { slug } = useParams();

    const isEditMode = useSelector((state) => state.user.isEditMode);
    const projects = useSelector((state) => state.projects);
    const [project, setProject] = useState(null);
    const [isChange, setChange] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(project)
            return;

        setProject(projects.find((p) => p.slug === slug))
    })

    function updateDescription(desciption) {
        const updatedProject = {...project, desciption: desciption};
        setProject(updatedProject);
        setChange(true);
    }

    async function addSliderImage(file) {
        await dispatch(thunks.uploadSliderImage(project, file));

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
        dispatch(thunks.updateProject(project))
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

                    <div>
                        <ProjectInfos project={project} isEditMode={isEditMode} updateDescription={(s) => updateDescription(s)}/>
                    </div>
                </div>

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

const ProjectInfos = ({project, isEditMode, updateDescription}) => {
    const date = new Date(null);
    const formattedDate = date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const projectLink = process.env.REACT_APP_TAIGA_URL + "/project/";

    return (
        <>
        {/*<!-- Component: Basic card --> */}
        <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
            <div className="p-6">
                <h3 className="mb-4 text-xl font-medium text-slate-700">
                   Project information
                </h3>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Link:</strong> <a href={projectLink} target='_blank' rel="noreferrer" className='text-blue-900'>Project Details</a></p>
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
        </>
    )
};

const Slider = ({images}) => {
  useEffect(() => {
    const slider = new Glide(".glide-01", {
      type: "carousel",
      focusAt: "center",
      perView: 1,
      autoplay: 300000,
      animationDuration: 700,
      gap: 24,
      classNames: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
    }).mount()

    return () => {
      slider.destroy()
    }
  }, [])
  
  return (
    <>
      {/*<!-- Component: Carousel with controls inside --> */}
      <div className="glide-01 relative w-full">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            {images.map((img, index) => (
              <li key={index}>
                <img
                  src={img}
                  className="m-auto max-h-[80vh] max-w-full"
                  alt = "img"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.0.2/glide.js"></script>
      {/*<!-- End Carousel with controls inside --> */}
    </>
  )
};


export default ProjectDetails;