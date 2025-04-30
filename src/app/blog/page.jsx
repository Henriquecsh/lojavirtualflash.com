"use client"
import { Layout } from "@/layouts/Layout";
import { LayoutBlog } from "@/layouts/LayoutBlog";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from 'axios';

const rightArrow = "/icon/right_arrow.svg";
const paginationIcon01 = "/icon/pagination_icon01.svg";
const paginationIcon02 = "/icon/pagination_icon02.svg";

export default function Blog() {

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
        const response = await axios.get(process.env.NEXT_PUBLIC_WORDPRESS_API_URL + '/posts', {
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
    <Layout
      breadcrumbTitle="Our Latest Blogs"
      breadcrumbSubtitle={"All Blogs"}
      mainClass="nothing"
    >
      <LayoutBlog>
        <div className="row">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-md-6">
              <div className="blog__post-item-three blog__post-item-five shine-animate-item">
                <div className="blog__post-thumb-three blog__post-thumb-five shine-animate">
                  <Link href="/blog/b-123">
                    {/* <img src={post.image} alt="blog" /> */}
                  </Link>
                  <ul className="list-wrap blog__post-tag blog__post-tag-two">
                    {/* {post.tags.map((tag, index) => (
                      <li key={index}>
                        <Link href="/blog">{tag}</Link>
                      </li>
                    ))} */}
                  </ul>
                </div>
                <div className="blog__post-content-three">
                  <div className="blog__post-meta">
                    <ul className="list-wrap">
                      <li>
                        <i className="flaticon-calendar"></i>
                        {post.date}
                      </li>
                      <li>
                        <i className="flaticon-user"></i>by
                        <Link href="/blog/b-123">admin</Link>
                      </li>
                    </ul>
                  </div>
                  <h2 className="title">
                    <Link href="/blog/b-123">{post.title.rendered}</Link>
                  </h2>
                  <p>{post.description}</p>
                  <Link href="/blog/b-123" className="btn">
                    Read More
                    <img src={rightArrow} alt="" className="injectable" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* pagination */}
        <nav className="pagination__wrap mt-50">
          <ul className="list-wrap">
            <li className="link-arrow">
              <Link href="#">
                <img src={paginationIcon01} alt="" className="injectable" />
              </Link>
            </li>
            <li className="active">
              <Link href="#">1</Link>
            </li>
            <li>
              <Link href="courses.html">2</Link>
            </li>
            <li>
              <Link href="courses.html">3</Link>
            </li>
            <li>
              <Link href="courses.html">4</Link>
            </li>
            <li className="link-arrow">
              <Link href="#">
                <img src={paginationIcon02} alt="" className="injectable" />
              </Link>
            </li>
          </ul>
        </nav>
      </LayoutBlog>
    </Layout>
  );
}
