import apiService from './apiService';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
const backendService = apiService(API_BASE_URL);

export default backendService;
