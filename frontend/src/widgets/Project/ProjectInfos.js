import React from "react";

export default function ProjectInfos({slug, created_date, description}) {
    const date = new Date(created_date);
    const formattedDate = date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const projectLink = process.env.REACT_APP_TAIGA_URL + "/project/" + slug;

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

                <p>{description}</p>
            </div>
        </div>
        {/*<!-- End Basic card --> */}
        </>
    )
}
