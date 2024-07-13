const API_BASE_URL = process.env.REACT_APP_TAIGA_URL + '/api/v1';

const apiService = {
    get: async (endpoint, token) => {
        try {
            var headers = {
                'Content-Type': 'application/json'
            }
            if(token) {
                headers['Authorization'] = 'Bearer ' + token;
            }

            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'GET',
                headers: headers
            });
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    },
    post: async (endpoint, data, token) => {
        try {
            var headers = {
                'Content-Type': 'application/json'
            }
            if(token) {
                headers['Authorization'] = 'Bearer ' + token;
            }

            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    },
    // ... other methods (put, delete, etc  .)
};

export default apiService;
