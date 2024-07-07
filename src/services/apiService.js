const API_BASE_URL = process.env.REACT_APP_TAIGA_URL + '/api/v1';

const apiService = {
    get: async (endpoint, auth=true) => {
        try {
            var headers = {
                'Content-Type': 'application/json'
            }
            if(auth) {
                headers['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem("taigaToken"));
            }

            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'GET',
                headers: headers
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    },
    post: async (endpoint, data, auth=true) => {
        try {
            var headers = {
                'Content-Type': 'application/json'
            }
            if(auth) {
                headers['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem("taigaToken"));
            }

            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    },
    // ... other methods (put, delete, etc  .)
};

export default apiService;
