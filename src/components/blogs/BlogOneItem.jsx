import React from "react";
import Link from "next/link";

const placeholder = "/blog/placeholder.png";
const blogImgShape = "/blog/blog_img_shape.svg";

export const BlogOneItem = ({ image, post_author, post_date, post_title, slug }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-8">
      <div className="blog__post-item shine-animate-item">
        <div className="blog__post-thumb">
          <div className="blog__post-mask shine-animate">
            <Link href={`/blog/${slug}`}>
              <img src={image ? image : placeholder} alt={post_title} />
            </Link>
          </div>
          <div className="shape">
            <img src={blogImgShape} alt="" className="injectable" />
          </div>
        </div>
        <div className="blog__post-content">
          <div className="blog__post-meta">
            <ul className="list-wrap">
              <li>
                <i className="flaticon-user"></i>
                Por {post_author}
              </li>
              <li>
                <i className="flaticon-calendar"></i>
                {post_date}
              </li>
            </ul>
          </div>
          <h2 className="title">
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h2>
        </div>
      </div>
    </div>
  );
};
