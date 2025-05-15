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
  price,
  regular_price,
  slug,
}) => {

  function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  const [reviews, setReviews] = useState(reviews_allowed);
  const imageUrl = Array.isArray(images) && images.length > 0 ? images[0].src : placeholder;

  return (
    <div className="product__item">
      <div className="product__thumb">
        <Link href={`/produto/${slug}`}>
          <img src={imageUrl} alt={name} />
        </Link>
        <div className="product__action">
          <Link href={`/produto/${slug}`}>
            <i className="flaticon-love"></i>
          </Link>
          <Link href={`/produto/${slug}`}>
            <i className="flaticon-loupe"></i>
          </Link>
          <Link href={`/produto/${slug}`}>
            <i className="flaticon-exchange"></i>
          </Link>
        </div>
        {on_sale && (<div className="sale-wrap sale-wrap-two"><span>Off</span></div>)}
        <div className="product__add-cart">
          <Link href={`/produto/${slug}`} className="btn">
            <i className="flaticon-shopping-bag"></i>Comprar
          </Link>
        </div>
      </div>
      <div className="product__content">
        <div className="product__reviews">
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <i key={index} className={index < average_rating ? 'fas fa-star' : 'far fa-star'}></i>
            ))}
          </div>
          {
            reviews && (
              <span>{rating_count <= 1 ? (rating_count + ' Avaliação') : (rating_count + ' Avaliações')}</span>
            )
          }
        </div>
        <h4 className="title">
          <Link href={`/produto/${slug}`}>{name}</Link>
        </h4>
        <h3 className="price">
          {on_sale ? (
            <>
              {formatarMoeda(price)} <del>{formatarMoeda(regular_price)}</del>
            </>
          ) : (
            <>
              {formatarMoeda(price)}
            </>
          )}
        </h3>
      </div>
    </div>
  );
};
