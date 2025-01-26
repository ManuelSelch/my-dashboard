
import React from "react";

const ActionButtons = ({children, icon, onClick, position="fixed"}) => {
    return (
      <>
        {/*<!-- Component: Left sided fab button with tooltips --> */}
        <div className={position + " bottom-0 left-0 z-10 ml-2 mb-2"}>
          <div className="group flex flex-col-reverse gap-2">
            <button 
                className="group relative z-50 inline-flex h-12 items-center justify-center gap-2 self-center whitespace-nowrap rounded bg-emerald-500 px-6 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                onClick={onClick}
            >
              <span className="relative transition duration-300 only:-mx-6 group-hover:rotate-45">
                <i className={"fa-solid " + icon}></i>
              </span>
            </button>
  
            {children}
            
          </div>
        </div>
        {/*<!-- End Left sided fab button with tooltips --> */}
      </>
    )
};




export const ActionOption = ({name, icon, onClick}) => {
    return (
        <button
            className="group relative inline-flex h-0 w-0 translate-y-2 items-center justify-center gap-2 self-center justify-self-center overflow-hidden whitespace-nowrap rounded bg-emerald-50 px-6 text-sm font-medium tracking-wide text-emerald-500 opacity-0 transition duration-300 hover:overflow-visible hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none group-hover:h-12 group-hover:w-12 group-hover:translate-y-0 group-hover:opacity-100"
            onClick={onClick}
        >
            <span className="relative only:-mx-6">
            <i className={"fa-solid " + icon}></i>
            </span>
            <span
            role="tooltip"
            className="invisible absolute left-full top-1/2 z-10 ml-2 w-24 -translate-y-1/2 rounded bg-slate-700 p-2 text-xs text-white opacity-0 transition-all before:invisible before:absolute before:right-full before:top-1/2 before:z-10 before:-mt-1 before:ml-2 before:border-y-4 before:border-r-4 before:border-y-transparent before:border-r-slate-700 before:opacity-0 before:transition-all before:content-[''] group-hover:visible group-hover:block group-hover:opacity-100 group-hover:before:visible group-hover:before:opacity-100"
            >
            {name}
            </span>
        </button>
    );
};

export default ActionButtons;
