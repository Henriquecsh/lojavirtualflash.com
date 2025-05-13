"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';
import { useParams } from "next/navigation";

const paginationPrev = "/icon/pagination_icon01.svg";
const paginationNext = "/icon/pagination_icon02.svg";

export const BlogPagination = () => {
    const [error, setError] = useState(null);
    const { page, slug } = useParams();
    const currentPage = parseInt(page) || 1;
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({ per_page: 10, page: currentPage });

    useEffect(() => {

        // const fetchProductsCategories = async () => {
        //     try {
        //         const response = await axios.get(process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL + '/posts', {
        //             auth: {
        //                 username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY, // Substitua pela sua Consumer Key
        //                 password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET, // Substitua pela sua Consumer Secret
        //             },
        //         });

        //         const data = response.data ? response.data : [];
        //         const categorYID = data.find((category) => category.slug === slug);
        //         const paramCategoryID = categorYID?.id ? { category: categorYID.id } : {};

        //         setParams({ per_page: 10, page: currentPage, paramCategoryID });
        //         setLoading(false);
        //     } catch (err) {
        //         setError('Erro ao carregar os produtos');
        //         setLoading(false);
        //         console.error(err);
        //     }
        // };

        // fetchProductsCategories();

        const fetchBlogPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL + '/products', {
                    auth: {
                        username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY, // Substitua pela sua Consumer Key
                        password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET, // Substitua pela sua Consumer Secret
                    },
                    params: params,
                });

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
        fetchBlogPosts();
    }, [params.page]);


    return (
        <>
            {
                totalPages > 1 ? (
                    <>
                        <nav className="pagination__wrap mt-50">
                            <ul className="list-wrap">
                                <li className="link-arrow">
                                    <Link href={currentPage <= 2 ? `/blog` : `/blog/page/${currentPage - 1}`} className={currentPage > 1 ? '' : 'disabled-link'}><img src={paginationPrev} alt="Previous" className="injectable" /></Link>
                                </li>
                                <li>{" "} Página {currentPage} de {totalPages} {" "}</li>
                                <li className="link-arrow">
                                    <Link href={`/blog/page/${currentPage + 1}`} className={currentPage < totalPages ? '' : 'disabled-link'}><img src={paginationNext} alt="Next" className="injectable" /></Link>
                                </li>
                            </ul>
                        </nav>
                    </>
                ) : (
                    <>
                        <nav className="pagination__wrap mt-50">
                            <ul className="list-wrap">
                                <li>{" "} Página {currentPage} de {totalPages} {" "}</li>
                            </ul>
                        </nav>
                    </>
                )}
        </>
    )
};
