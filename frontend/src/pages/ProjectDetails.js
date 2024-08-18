import React, { useEffect } from 'react';
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
import {actions, thunks} from '../features/ProjectFeature';

const ProjectDetails = () => {
    const isEditMode = useSelector((state) => state.user.isEditMode);
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

        dispatch(actions.viewProject(project));
    })

    if(projectDetails.project) {
        return(
            <Body>
                <Heading>{project.name}</Heading>

                <div className="grid grid-cols-2 max-lg:grid-cols-1 pt-10">
                    <div className="p-5 object-none object-center bottom-0">
                        {isEditMode
                        ? <AdminSlider />
                        : <div>{projectDetails.project.images?.length > 0 && <Slider images={projectDetails.project.images}/>}</div>
                        }
                    </div>

                    <div>
                        <ProjectInfos />
                    </div>
                </div>

                {isEditMode &&                
                    <Button 
                        name="Save" 
                        onClick={() => dispatch(thunks.saveProject())} 
                        disabled={!projectDetails.isChange}
                    />
                }

            
            </Body>
        );
    }
    
    return(<div></div>);
};

const AdminSlider = () => {
    const project = useSelector((state) => state.project.project);
    const dispatch = useDispatch();

    return (
        <div>
            {project.images && 
                project.images.map((img, index) => (
                    <AdminImage img={img} key={index} handleDeleteImage={() => dispatch(actions.deleteSliderImage(index))}/>
                ))
            }

            <FileUpload file={null} setFile={(file) => dispatch(thunks.uploadSliderImage(file))}/>
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


const ProjectInfos = () => {
    const isEditMode = useSelector((state) => state.user.isEditMode);
    const projectDetails = useSelector((state) => state.project);
  
    const dispatch = useDispatch();

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
                        value={projectDetails.project.description}
                        setValue={(s) => dispatch(actions.updateDescription(s))}
                    />
                    : <div dangerouslySetInnerHTML={{__html: projectDetails.project.description}} />
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
                  className="m-auto max-h-full w-full max-w-full"
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