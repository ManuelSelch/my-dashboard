import React from "react";

import useFetchIssues from "../../hooks/useFetchIssues";

const IssuesBoard = ({project}) => {
    const issues = useFetchIssues(project);

    return (
        <div>
            <p className='text-4xl font-bold pt-10'>Issues Tracker</p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Priority</th>
                            <th>Issue</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue) => (
                            <tr key={issue.id}>
                                <td>{issue.type}</td>
                                <td>{issue.priority}</td>
                                <td><strong>#{issue.id}</strong> {issue.subject}</td>
                                <td>{issue.status}</td>
                            </tr>
                        ))}

                        
                    </tbody>
                </table>
        </div>
    );
};

export default IssuesBoard;

