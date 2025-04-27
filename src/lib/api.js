import axios from 'axios';

// URL base da API do WordPress
const API_BASE_URL = process.env.WORDPRESS_API_URL;

// Cria uma instância do Axios com a URL base
const wordpressApi = axios.create({
    baseURL: API_BASE_URL,
});

export default wordpressApi;