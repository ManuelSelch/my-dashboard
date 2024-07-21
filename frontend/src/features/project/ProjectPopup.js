import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux';


// feature
import {updateName, updateDescription, saveProject, imageChanged, close} from "./ProjectFeature";

// common
import Input from "../../widgets/Common/Input";
import FileUpload from "../../widgets/Common/FileUpload";
import Dropdown from "../../widgets/Common/Dropdown";
import Button from "../../widgets/Common/Button";

const ProjectPopup = () => {
    const popup = useSelector((state) => state.project);
    const dispatch = useDispatch();

    const projects = [];
    const [file, setFile] = useState(null);

    function handleUpdateFile(file) {
        setFile(file);
        dispatch(imageChanged());
    }

    return (
        <div
            className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
            aria-labelledby="header-4a content-4a"
            aria-modal="true"
            tabIndex="-1"
            role="dialog"
        >
            {/*    <!-- Modal --> */}
            <div
            className="flex max-h-[90vh] flex-col gap-4 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
            id="modal"
            role="document"
            >
            {/*        <!-- Modal header --> */}
            <header id="header-4a" className="flex items-center">
                <h3 className="flex-1 text-lg font-medium text-slate-700">
                {popup.isCreate
                ? <p>New Project</p>
                : <p>Edit Project</p>
                }
                </h3>
                <button
                onClick={() => dispatch(close())}
                className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide  text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                aria-label="close dialog"
                >
                <span className="relative only:-mx-5">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    role="graphics-symbol"
                    aria-labelledby="title-79 desc-79"
                    >
                    <title id="title-79">Icon title</title>
                    <desc id="desc-79">
                        A more detailed description of the icon
                    </desc>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </span>
                </button>
            </header>
            {/*        <!-- Modal body --> */}
            <div id="content-4a" className="flex-1">
                <div className="flex flex-col" style={{width: "80vw", maxWidth: "1000px"}}>
                <Input 
                    name="Title" 
                    value={popup.project.name} 
                    setValue={(s) => dispatch(updateName(s))}
                />
                <Input 
                    name="Description" 
                    value={popup.project.description} 
                    setValue={(s) => dispatch(updateDescription(s))}
                />
                <Dropdown 
                    items={projects} 
                    currentItem={projects.find((p) => p.slug === popup.project.taigaSlug)} 
                    
                />
                {popup.project.big_img_url == null
                    ? <FileUpload file={file} setFile={handleUpdateFile}/>
                    :  <div className='flex justify-center'>
                        <button 
                        
                            className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                        >
                        Replace file
                    </button>
                </div>
                }
                </div>
            </div>
            {/*        <!-- Modal actions --> */}
            <div className="flex justify-center gap-2">
                <Button 
                    name={popup.isCreate ? "Create" : "Save"}
                    onClick={() => dispatch(saveProject(file))}
                    disabled={!popup.isChange}
                />
            </div>
            </div>
        </div>
    );
};

export default ProjectPopup;