const apiService = (url) => {
    return {
        get: async (endpoint, token) => {
            try {
                var headers = {
                    'Content-Type': 'application/json'
                }
                if(token) {
                    headers['Authorization'] = 'Bearer ' + token;
                }

                const response = await fetch(`${url}/${endpoint}`, {
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

                const response = await fetch(`${url}/${endpoint}`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data),
                });
                return await response.json();
            } catch (error) {
                console.error('Fetch error:', error);
            }
        },

        put: async (endpoint, data, token) => {
            try {
                var headers = {
                    'Content-Type': 'application/json'
                }
                if(token) {
                    headers['Authorization'] = 'Bearer ' + token;
                }

                const response = await fetch(`${url}/${endpoint}`, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(data),
                });
                return await response.json();
            } catch (error) {
                console.error('Fetch error:', error);
            }
        },

        delete: async (endpoint, token) => {
            try {
                var headers = {
                    'Content-Type': 'application/json'
                }
                if(token) {
                    headers['Authorization'] = 'Bearer ' + token;
                }

                const response = await fetch(`${url}/${endpoint}`, {
                    method: 'DELETE',
                    headers: headers
                });
                return await response.json();
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
    }
};

export default apiService;
