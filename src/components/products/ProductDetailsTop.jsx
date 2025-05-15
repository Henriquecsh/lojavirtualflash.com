"use client";
import React, { useState } from "react";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import parse from 'html-react-parser';
import DOMPurify from "isomorphic-dompurify";

const cardImg = "/products/card.png";

import { useProductContext } from "@/context/ProductContext";

export const ProductDetailsTop = () => {

  const { product, quantity, tags, categories, attributes, loading, slides, formatarMoeda, handleQuantityChange } = useProductContext();

  // lightbox
  const [id, setId] = useState(null);

  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <div className="product__details-images-wrap">
            <div className="tab-content" id="myTabContent">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={index == 0 ? 'tab-pane show active' : 'tab-pane show'}
                  id={`item-tab-pane-${index}`}
                  role="tabpanel"
                  aria-labelledby={`item-tab-${index}`}
                  tabIndex="0"
                >
                  <a
                    href={"#"}
                    onClick={(e) => {
                      e.preventDefault();
                      setId(0);
                    }}
                  >
                    {loading ? (
                      <div className="loading"></div>
                    ) : (
                      <img src={slide.src} alt={slide?.alt || product.name} />
                    )}
                  </a>
                </div>
              ))}
            </div>

            <ul className="nav nav-tabs" id="myTab" role="tablist">
              {slides.map((slide, index) => (
                <li key={index} className="nav-item" role="presentation">
                  <button
                    className={index == 0 ? 'nav-link active' : 'nav-link'}
                    id={`item-tab-${index}`}
                    data-bs-toggle="tab"
                    data-bs-target={`#item-tab-pane-${index}`}
                    type="button"
                    role="tab"
                    aria-controls={`item-tab-pane-${index}`}
                    aria-selected="true"
                  >
                    <img src={slide.src} alt={slide?.alt || product.name} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="product__details-content">
            {categories.map((category, index) => (
              <span key={index} className="tag">{category.name}</span>
            ))}
            <h2 className="title">
              {product.name}
            </h2>
            <div className="product__reviews-wrap">
              <div className="product__reviews">
                <div className="rating">
                  {[...Array(5)].map((_, index) => (
                    <i key={index} className={index < product.average_rating ? 'fas fa-star' : 'far fa-star'}></i>
                  ))}
                </div>
                {
                  product.reviews_allowed ? (
                    <span>{product.rating_count <= 1 ? (product.rating_count + ' Avaliação') : (product.rating_count + ' Avaliações')}</span>
                  ) : ('')
                }
              </div>
              <div className="product__code">
                <span>
                  SKU: <strong>CAT4502</strong>
                </span>
              </div>
            </div>
            <h4 className="price">
              {product.on_sale ? (
                <>
                  {formatarMoeda(product.price)} <del>{formatarMoeda(product.regular_price)}</del>
                </>
              ) : (
                <>
                  {formatarMoeda(product.price)}
                </>
              )}
            </h4>
            {product?.short_description && parse(DOMPurify.sanitize(product.short_description))}

            {attributes.map((attribute, index) => (
              <div key={index} className="product__size-wrap">
                <span className="size-title">{attribute.name}:</span>
                <ul className="list-wrap">
                  {attribute.options.map((option, index) => (
                    <li key={index}>
                      <button>{option}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="product__details-qty">
              <div className="cart-plus-minus">
                <div
                  className="dec qtybutton"
                  onClick={() => handleQuantityChange("dec")}
                >
                  <span>-</span>
                </div>
                <input type="text" value={quantity} readOnly />
                <div
                  className="inc qtybutton"
                  onClick={() => handleQuantityChange("inc")}
                >
                  <span>+</span>
                </div>
              </div>

              <button className="add-btn">
                Adicionar no carrinho
              </button>
            </div>
            <Link href="/product/p-123" className="buy-btn">
              Comprar agora
            </Link>
            <div className="product__wishlist-wrap">
              <Link href="/product/p-123">
                <i className="flaticon-love"></i> Adicionar aos favoritos
              </Link>
            </div>
            <div className="product__details-bottom">
              <ul className="list-wrap">
                {categories.length > 0 && (
                  <>
                    <li className="product__details-category">
                      <span className="title">Categorias:</span>
                      {categories.map((category, index) => (
                        <Link key={index} href={`/produtos/categoria/${category.slug}`}>{category.name}</Link>
                      ))}
                    </li>
                  </>
                )}
                {tags.length > 0 && (
                  <>
                    <li className="product__details-tags">
                      <span className="title">Tags:</span>
                      {tags.map((tag, index) => (
                        <Link key={index} href={`/produtos/tag/${tag.id}`}>{tag.name}</Link>
                      ))}
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="product__details-checkout">
              <span className="title">Pagamento seguro</span>
              <img src={cardImg} alt="" />
            </div>
          </div>
        </div>
      </div >

      <Lightbox
        slides={slides}
        open={id !== null}
        index={id}
        close={() => setId(null)}
        styles={{ container: { background: "rgba(0,0,0,0.75)" } }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
};
