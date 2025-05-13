"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BlogFourItem } from "./BlogFourItem";
import Api from "@/lib/api";

const titleShape = "/images/title_shape.svg";
const blogShape1 = "/blog/h4_blog_shape01.png";
const blogShape2 = "/blog/h4_blog_shape02.png";

export const BlogFour = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({ per_page: 4 });


  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const response = await Api.get('/posts', {
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
    <section className="blog__post-area-four">
      <div className="container">
        {/* top */}
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="section__title-two mb-20">
              <h2 className="title">
                Últimas notícias e atualizações
                <img src={titleShape} alt="" className="injectable" />
              </h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="view-all-btn">
              <Link href="/blog">
                Ver todos <i className="flaticon-right-arrow-angle"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* list */}
        <div className="row justify-content-center">
          {loading ? (
            <>
              <div className="col-xl-12 col-lg-12 col-md-12">
                <p>Carregando...</p>
              </div>
            </>
          ) : (
            <>
              {blogPosts.map((post) => (
                <BlogFourItem key={post.ID} {...post} />
              ))}
            </>
          )}
        </div>
      </div>

      {/* shape */}
      <div className="blog__shape-wrap-four">
        <img
          src={blogShape1}
          alt="img"
          data-aos="fade-down-left"
          data-aos-delay="400"
        />
        <img
          src={blogShape2}
          alt="img"
          data-aos="fade-up-right"
          data-aos-delay="400"
        />
      </div>
    </section>
  );
};
