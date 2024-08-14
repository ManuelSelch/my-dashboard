import dashboard from "./backends/dashboardBackend";

export default { 
    getAll: async () => {
        return await dashboard.get("projects");
    },

    delete: async (slug) => {
        return await dashboard.delete("projects/"+slug);
    }
};