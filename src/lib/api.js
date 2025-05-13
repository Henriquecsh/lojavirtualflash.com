import axios from 'axios';

const Api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL,
    auth: {
        username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
        password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
    },
});

export default Api;