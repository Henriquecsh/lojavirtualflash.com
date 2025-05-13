"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from 'axios';

const placeholder = "/blog/placeholder.png";
const rightArrow = "/icon/right_arrow.svg";

export const BlogPostsAll = () => {

    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { page } = useParams();
    const currentPage = parseInt(page) || 1;
    const [params, setParams] = useState({ per_page: 10, page: currentPage });


    useEffect(() => {
        const fetchBlogPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL + '/posts', {
                    auth: {
                        username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY, // Substitua pela sua Consumer Key
                        password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET, // Substitua pela sua Consumer Secret
                    },
                    params: params,
                });

                setBlogPosts(response.data);
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
    }, []);
    return (
        <>
            {loading ? (
                <div className="row"><p>Carregando...</p></div>
            ) : (
                <div className="row">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="col-md-6">
                            <div className="blog__post-item-three blog__post-item-five shine-animate-item">
                                <div className="blog__post-thumb-three blog__post-thumb-five shine-animate">
                                    <Link href={`/blog/${post.slug}`}>
                                        <img src={post.image ? post.image : placeholder} alt={post.post_title} />
                                    </Link>
                                </div>
                                <div className="blog__post-content-three">
                                    <div className="blog__post-meta">
                                        <ul className="list-wrap">
                                            <li>
                                                <i className="flaticon-calendar"></i>
                                                {post.post_date}
                                            </li>
                                            <li>
                                                <i className="flaticon-user"></i>
                                                Por {post.post_author}
                                            </li>
                                        </ul>
                                    </div>
                                    <h2 className="title">
                                        <Link href={`/blog/${post.slug}`}>{post.post_title}</Link>
                                    </h2>
                                    <p>{post?.post_excerpt}</p>
                                    <Link href={`/blog/${post.slug}`} className="btn">
                                        Ver mais
                                        <img src={rightArrow} alt="" className="injectable" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </>
    )
};
