import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import Input from "../Common/Input";
import FileUpload from "../Common/FileUpload";
import Dropdown from "../Common/Dropdown";


import useAdmin from "../../hooks/useAdmin";
import useFetchProjects from "../../hooks/useFetchProjects";

const ProjectPopupData = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const [project, setProject] = useState(null);
  const [file, setFile] = useState(null);

  function reset() {
    setProject(null);
    setFile(null);
  }

  return {
    isShowing, setIsShowing, 
    isCreate, setIsCreate, 

    project, setProject,

    file, setFile,

    reset
  };
}

const ProjectPopup = ({popupData}) => {
  const wrapperRef = useRef(null);
  const {fetchProjects, createProject, updateProject} = useAdmin();
  const projects = useFetchProjects();

  const uploadFile = async (imgName) => {
    if (popupData.file) {
      console.log('Uploading file...');
  
      const formData = new FormData();
      formData.append('file', popupData.file, imgName);
  
      try {
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch('http://localhost:5001/uploads', {
          method: 'POST',
          body: formData,
        });
  
        const data = await result.json();
  
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };


  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        popupData.setIsShowing(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef, popupData])

  useEffect(() => {
    let html = document.querySelector("html")

    if (html) {
      if (popupData.isShowing && html) {
        html.style.overflowY = "hidden"

        const focusableElements =
          'button, [href], input, select, textarea, [tabIndex]:not([tabIndex="-1"])'

        const modal = document.querySelector("#modal") // select the modal by it's id

        const firstFocusableElement =
          modal.querySelectorAll(focusableElements)[0] // get first element to be focused inside modal

        const focusableContent = modal.querySelectorAll(focusableElements)

        const lastFocusableElement =
          focusableContent[focusableContent.length - 1] // get last element to be focused inside modal

        document.addEventListener("keydown", function (e) {
          let isTabPressed = e.key === "Tab" || e.keyCode === 9

          if (!isTabPressed) {
            return
          }

          if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus() // add focus for the last focusable element
              e.preventDefault()
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              // if focused has reached to last focusable element then focus first focusable element after pressing tab
              firstFocusableElement.focus() // add focus for the first focusable element
              e.preventDefault()
            }
          }
        })

        firstFocusableElement.focus()
      } else {
        html.style.overflowY = "visible"
      }
    }
  }, [popupData.isShowing])

  const handleSave = async () => {
    popupData.setIsShowing(false);
    
    const slug = popupData.isCreate ? popupData.project.title.replace(/\s+/g, '-').toLowerCase() : popupData.project.slug;

    var data = {
      "name": popupData.project.title,
      "logo_big_url": popupData.project.big_img_url,
      "slug": slug,
      "taigaSlug": popupData.project.taigaSlug
    };
    if(popupData.file) {
      const imgName = slug + ".jpg";
      const imgPath = process.env.REACT_APP_BACKEND_URL + "/uploads/" + imgName;
      await uploadFile(imgName);
      data["logo_big_url"] = imgPath;
    }

    if(popupData.isCreate) {
      await createProject(data);
    } else {
      await updateProject(data);
    }
    fetchProjects();
  };

  function handleReplaceFile() {
    popupData.setImg(null);
  }

  function handleUpdateTitle(title) {
    const project = {
      ...popupData.project,
      title: title,
    };
    popupData.setProject(project);
  }

  function handleUpdateDesciption(description) {
    const project = {
      ...popupData.project,
      description: description,
    };
    popupData.setProject(project);
  }

  function handleUpdateTaigaSlug(taigaSlug) {
    const project = {
      ...popupData.project,
      taigaSlug: taigaSlug,
    };
    popupData.setProject(project);
  }

  return (
    <>
      {popupData.isShowing && typeof document !== "undefined"
        ? ReactDOM.createPortal(
            <div
              className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-4a content-4a"
              aria-modal="true"
              tabIndex="-1"
              role="dialog"
            >
              {/*    <!-- Modal --> */}
              <div
                ref={wrapperRef}
                className="flex max-h-[90vh] flex-col gap-4 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                id="modal"
                role="document"
              >
                {/*        <!-- Modal header --> */}
                <header id="header-4a" className="flex items-center">
                  <h3 className="flex-1 text-lg font-medium text-slate-700">
                    {popupData.isCreate
                    ? <p>New Project</p>
                    : <p>Edit Project</p>
                    }
                  </h3>
                  <button
                    onClick={() => popupData.setIsShowing(false)}
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
                      value={popupData.project.title} 
                      setValue={handleUpdateTitle}
                    />
                    <Input 
                      name="Description" 
                      value={popupData.project.description} 
                      setValue={handleUpdateDesciption}
                    />
                    <Dropdown 
                      items={projects} 
                      currentItem={projects.find((p) => p.slug === popupData.project.taigaSlug)} 
                      setCurrentItem={(p) => {handleUpdateTaigaSlug(p.slug)}} 
                    />
                    {popupData.project.big_img_url == null
                      ? <FileUpload file={popupData.file} setFile={popupData.setFile}/>
                      :  <div className='flex justify-center'>
                          <button 
                            onClick={handleReplaceFile}
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
                  <button onClick={handleSave} className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                    {popupData.isCreate 
                      ? <span>Create</span>
                      : <span>Save</span>
                    }
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}

export {ProjectPopupData, ProjectPopup}