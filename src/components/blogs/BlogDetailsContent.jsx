"use client"
import { VideoPlayer } from "../video/VideoPlayer";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import parse from 'html-react-parser';
import DOMPurify from "isomorphic-dompurify";

import Link from "next/link";
import Api from "@/lib/api";

const avatar = "/blog/avatar.png";

export const BlogDetailsContent = () => {

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchBlogPost = async () => {
      setLoading(true);
      try {
        const response = await Api.get('/posts');
        const data = response.data ? response.data : [];
        const postData = data.find((post) => post.slug === slug);

        setPost(postData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, []);


  return (
    <>
      <div className="blog__details-wrap">
        {post?.image && (
          <>
            <div className="blog__details-thumb">
              <img src={post.image} alt={post.post_title} />
            </div>
          </>
        )}

        {/* <VideoPlayer
          trigger={
            <a href="#vid" className="play-btn popup-video">
              <i className="fas fa-play"></i>
            </a>
          }
        /> */}

        <div className="blog__details-content">
          <h2 className="title">
            {post.post_title}
          </h2>
          <div className="blog__post-meta">
            <ul className="list-wrap">
              <li>
                <i className="flaticon-user"></i>
                Por {post.post_author}
              </li>
              <li>
                <i className="flaticon-calendar"></i>
                {post.post_date}
              </li>
              <li>
                <i className="far fa-comment-alt"></i>
                <Link href="/blog/b-123">05 Comments</Link>
              </li>
            </ul>
          </div>

          {post?.post_content && parse(DOMPurify.sanitize(post.post_content))}

          <div className="blog__details-content-bottom">
            <div className="row align-items-center">
              <div className="col-md-7">
                <div className="post-tags">
                  <h5 className="title">Tags:</h5>
                  <ul className="list-wrap">
                    <li>
                      <Link href="#">Dogs</Link>
                    </li>
                    <li>
                      <Link href="#">Pet Care</Link>
                    </li>
                    <li>
                      <Link href="#">Cats</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-5">
                <div className="blog-post-share">
                  <h5 className="title">Compartilhar:</h5>
                  <ul className="list-wrap">
                    <li>
                      <Link href="https://www.facebook.com/" target="_blank">
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://twitter.com" target="_blank">
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.whatsapp.com/" target="_blank">
                        <i className="fab fa-whatsapp"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.instagram.com/" target="_blank">
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.youtube.com/" target="_blank">
                        <i className="fab fa-youtube"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-avatar-wrap">
        <div className="blog-avatar-img">
          <Link href="/team/t-123">
            <img src={avatar} alt="img" />
          </Link>
        </div>
        <div className="blog-avatar-info">
          <span className="designation">Author</span>
          <h4 className="name">
            <a href="#">Parker Willy</a>
          </h4>
          <p>
            Finanappreciate your trust greatly Our clients choose dentace ducr
            emaining essential yearl ow we are the best area Awaitingare really.
          </p>
        </div>
      </div>
    </>
  );
};
