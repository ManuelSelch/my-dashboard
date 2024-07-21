import apiService from './apiService';

const API_BASE_URL = process.env.REACT_APP_TAIGA_URL + '/api/v1';
const taigaService = apiService(API_BASE_URL);

export default taigaService;
