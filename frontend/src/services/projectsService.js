import dashboard from "./backends/dashboardBackend";

const service = { 
    getAll: async () => {
        return await dashboard.get("projects");
    },

    create: async (project) => {
        await dashboard.post("projects", project);
    },

    update: async (project) => {
        await dashboard.put("projects/"+project.slug, project);
    },

    delete: async (slug) => {
        return await dashboard.delete("projects/"+slug);
    }
};

export default service;