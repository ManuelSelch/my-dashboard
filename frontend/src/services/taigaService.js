import taiga from "./backends/taigaBackend";

const service = {
    getProjects: async () => {
        return taiga.get("projects");
    },

    getIssues: async (project) => {
        const statusList = await taiga.get("issue-statuses?project="+project);
        const typeList = await taiga.get("issue-types");
        const priorityList = await taiga.get("priorities");
        const issues = await taiga.get("issues?project="+project);

        const issuesDTO = issues.map(issue => {
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

        return issuesDTO;
    },

    getUserStories: async (project) => {
        return await taiga.get("userstories?project="+project);
    },

    getUserStoryStatuses: async (project) => {
        return await taiga.get("userstory-statuses?project="+project);
    }
}

export default service;