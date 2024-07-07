import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const useFetchIssues = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const statusList = await apiService.get("issue-statuses");
            const typeList = await apiService.get("issue-types");
            const priorityList = await apiService.get("priorities");
            const issues = await apiService.get("issues");

            const updatedIssues = issues.map(issue => {
                const status = statusList.find(s => s.id === issue.status);
                const type = typeList.find(s => s.id === issue.type);
                const priority = priorityList.find(s => s.id === issue.priority);
                return {
                    ...issue,
                    status: status ? status.name : 'unknown',
                    type: type ? type.name : 'unknown',
                    priority: priority ? priority.name : 'unknown'
                };
            });
            setData(updatedIssues);
        };

        fetchData();

    }, []);

    return data;
};

export default useFetchIssues;
