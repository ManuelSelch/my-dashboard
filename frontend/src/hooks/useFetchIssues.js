import { useState, useEffect } from 'react';
import useLogin from './useLogin';
import apiService from '../services/apiService';

const useFetchIssues = (project) => {
    const [data, setData] = useState([]);
    const {token} = useLogin(); 

    useEffect(() => {
        const fetchData = async () => {
            const statusList = await apiService.get("issue-statuses?project="+project, token);
            const typeList = await apiService.get("issue-types", token);
            const priorityList = await apiService.get("priorities", token);
            const issues = await apiService.get("issues", token);

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

    }, [token, project]);

    return data;
};

export default useFetchIssues;
