"use client"
import { createContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Api from "@/lib/api";
import { useContext } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {

    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { page, slug } = useParams();
    const currentPage = parseInt(page) || 1;
    const [currentCategory, setCurrentCategory] = useState(false);
    const [params, setParams] = useState({ per_page: 10, page: currentPage });
    const [notFound, setNotFound] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('busca') || '');


    useEffect(() => {
        const fetchProductsCategories = async () => {
            try {
                const response = await Api.get('/products/categories');
                const data = response.data ? response.data : [];

                if (!slug === false) {
                    const categoryID = data.find((category) => category.slug === slug);
                    if (!categoryID?.id) {
                        setNotFound(true);
                    } else {
                        setParams({ per_page: 10, page: currentPage, category: categoryID.id });
                        setCurrentCategory(categoryID.id);

                    }
                }

                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar os produtos');
                setLoading(false);
                console.error(err);
            }
        };

        fetchProductsCategories();

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await Api.get('/products', {
                    params: params,
                });

                setProductData(response.data);
                setTotalPages(parseInt(response.headers['x-wp-totalpages']));
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar os produtos');
                setLoading(false);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [currentCategory]);


    return (
        <ProductsContext.Provider value={{ productData, loading, error, page, slug, currentPage, currentCategory, params, notFound, totalPages }}>
            {children}
        </ProductsContext.Provider>
    )
};

export const useProductsContext = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProductsContext deve ser usado dentro de um ProductsProvider');
    }
    return context;
};