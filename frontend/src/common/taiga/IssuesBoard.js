import React from "react";

const IssuesBoard = ({issues}) => {  
    return ( 
    <> 
    {/*<!-- Component: Responsive Table --> */}
    <table className="w-full text-left border border-separate rounded border-slate-200 mt-10" cellSpacing="0">
        <tbody>
        <tr>
            <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Type</th>
            <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Priority</th>
            <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Issue</th>
            <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Status</th>
        </tr>
        {issues.map((issue) => (
        <tr key={issue.id} className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none">
            <td data-th="Type" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{issue.type}</td>
            <td data-th="Priority" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{issue.priority}</td>
            <td data-th="Issue" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "><strong>#{issue.id } </strong> &nbsp; {issue.subject}</td>
            <td data-th="Status" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{issue.status}</td>
        </tr>
        ))}
        </tbody>
    </table>
    {/*<!-- End Responsive Table --> */}
    </> 
  ) 
}

export default IssuesBoard;