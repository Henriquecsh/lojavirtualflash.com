import axios from 'axios';

const wooCommerceApi = axios.create({
    baseURL: process.env.WOOCOMMERCE_API_URL, // Substitua pela URL do seu site
    auth: {
        username: process.env.WOOCOMMERCE_CONSUMER_KEY, // Substitua pela sua Consumer Key
        password: process.env.WOOCOMMERCE_CONSUMER_SECRET, // Substitua pela sua Consumer Secret
    },
    headers: {
        'Content-Type': 'application/json',
    },
});

export default getProducts = async () => {
    try {
        const response = await wooCommerceApi.get('/products');
        console.log(response.data);
        return response.data || [];
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
};