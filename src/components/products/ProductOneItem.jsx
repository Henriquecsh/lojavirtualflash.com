"use client";
import React, { useState } from "react";
import Link from "next/link";

const placeholder = "/products/woocommerce-placeholder.png";

export const ProductOneItem = ({
  images,
  on_sale,
  reviews_allowed,
  rating_count,
  average_rating,
  name,
  featured,
  price,
  oldPrice,
  slug,
}) => {

  const [reviews, setReviews] = useState(reviews_allowed);
  const [rating, setRating] = useState([]);
  const imageUrl = images?.src || placeholder;

  return (
    <div className="product__item">
      <div className="product__thumb">
        <Link href={`/product/${slug}`}>
          <img src={imageUrl} alt={name} />
        </Link>
        <div className="product__action">
          <Link href={`/product/${slug}`}>
            <i className="flaticon-love"></i>
          </Link>
          <Link href={`/product/${slug}`}>
            <i className="flaticon-loupe"></i>
          </Link>
          <Link href={`/product/${slug}`}>
            <i className="flaticon-exchange"></i>
          </Link>
        </div>
        {on_sale && (<div className="sale-wrap sale-wrap-two"><span>Off</span></div>)}
        <div className="product__add-cart">
          <Link href={`/product/${slug}`} className="btn">
            <i className="flaticon-shopping-bag"></i>Comprar
          </Link>
        </div>
      </div>
      <div className="product__content">
        <div className="product__reviews">
          <div className="rating">
            {rating.map((_, index) => (
              <i key={index} className="fas fa-star"></i>
            ))}
          </div>
          {
            reviews ? (
              <span>{rating_count <= 1 ? (rating_count + ' Avaliação') : (rating_count + ' Avaliações')}</span>
            ) : ('')
          }
        </div>
        <h4 className="title">
          <Link href={`/product/${slug}`}>{name}</Link>
        </h4>
        <h3 className="price">
          {/* ${price?.toFixed(2)} <del>${oldPrice?.toFixed(2)}</del> */}
        </h3>
      </div>
    </div>
  );
};
