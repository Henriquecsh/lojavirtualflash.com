import React from "react";
import Link from "next/link";

const placeholder = "/blog/placeholder.png";

export const BlogFourItem = ({ ID, image, post_author, post_date, post_title, slug }) => {
  return (
    <div key={ID} className="col-xl-3 col-lg-4 col-md-6">
      <div id={`post-${ID}`} className="blog__post-item-four shine-animate-item">
        <div className="blog__post-thumb-four shine-animate">
          <Link href={`/blog/${slug}`}>
            <img src={image ? image : placeholder} alt={post_title} />
          </Link>
          <ul className="list-wrap blog__post-tag blog__post-tag-three">
            <li>
              {/* <Link href="/blog">{category}</Link> */}
            </li>
          </ul>
        </div>
        <div className="blog__post-content-four">
          <div className="blog__post-meta">
            <ul className="list-wrap">
              <li>
                <i className="flaticon-calendar"></i>
                {post_date}
              </li>
              <li>
                <i className="flaticon-user"></i>
                Por {post_author}
              </li>
            </ul>
          </div>
          <h2 className="title">
            <Link href={`/blog/${slug}`}>{post_title}</Link>
          </h2>
        </div>
      </div>
    </div>
  );
};
