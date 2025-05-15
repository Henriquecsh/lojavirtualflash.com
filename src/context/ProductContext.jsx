"use client"
import { createContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Api from "@/lib/api";
import { useContext } from "react";

const placeholder = "/products/woocommerce-placeholder.png";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const { slug } = useParams();

    const [slides, setSlides] = useState([{ src: placeholder, alt: '' }]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await Api.get('/products', {
                    params: {
                        slug: slug
                    },
                });

                const data = response.data[0] ? response.data[0] : []
                setProduct(data);
                setCategories(data.categories);
                setTags(data.tags);
                setSlides(data.images);
                setAttributes(data.attributes);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar os produtos');
                setLoading(false);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    function formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor);
    }


    const handleQuantityChange = (type) => {
        if (type === "inc") {
            setQuantity((prev) => prev + 1);
        } else if (type === "dec" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    return (
        <ProductContext.Provider value={{ product, quantity, tags, categories, attributes, loading, error, slides, formatarMoeda, handleQuantityChange }}>
            {children}
        </ProductContext.Provider>
    )
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext deve ser usado dentro de um ProductProvider');
    }
    return context;
};