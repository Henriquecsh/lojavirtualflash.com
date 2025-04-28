"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import axios from 'axios';
import { useParams } from "next/navigation";
import parse from 'html-react-parser';
import DOMPurify from "isomorphic-dompurify";

const placeholder = "/products/woocommerce-placeholder.png";
const cardImg = "/products/card.png";

export const ProductDetailsTop = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { slug } = useParams();

  const [slides, setSlides] = useState([{ src: placeholder, alt: '' }]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL + '/products', {
          auth: {
            username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY, // Substitua pela sua Consumer Key
            password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET, // Substitua pela sua Consumer Secret
          },
          params: {
            slug: slug
          },
        });

        const data = response.data[0] ? response.data[0] : []
        setProduct(data);
        setCategories(data.categories);
        setTags(data.tags);
        setSlides(data.images);
        setAttributes(data.attributes);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os produtos');
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }


  const handleQuantityChange = (type) => {
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    } else if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

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
                {/* <li className="product__details-social">
                  <span className="title">Compartilhar:</span>
                  <ul className="list-wrap">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com" target="_blank">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.whatsapp.com/" target="_blank">
                        <i className="fab fa-whatsapp"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/" target="_blank">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </div>

            <div className="product__details-checkout">
              <span className="title">Guaranteed Safe Checkout</span>
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
