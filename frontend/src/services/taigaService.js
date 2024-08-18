import taiga from "./backends/taigaBackend";

const service = {
    getProjects: async () => {
        return await taiga.get("projects");
    },

    getIssues: async () => {
        const statusList = await taiga.get("issue-statuses");
        const typeList = await taiga.get("issue-types");
        const priorityList = await taiga.get("priorities");
        const issues = await taiga.get("issues");

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

    getUserStories: async () => {
        return await taiga.get("userstories");
    },

    getUserStoryStatuses: async () => {
        return await taiga.get("userstory-statuses");
    },

    getMilestones: async () => {
        return await taiga.get("milestones");
    }
}

export default service;