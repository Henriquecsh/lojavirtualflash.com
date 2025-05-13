import React, { useEffect, useState } from "react";
import axios from 'axios';

const Flash = ({ option }) => {

    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL + '/flash-settings', {
                    auth: {
                        username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
                        password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
                    },
                });

                const data = response.data.filter(
                    (value) => value.includes(option)
                );

                setSettings(data);
            } catch (err) {
                console.error(err);
            } finally {
            }
        };
        fetchSettings();
    }, [option]);

    return settings;
};

export default Flash;