"use client";

import React from "react";
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, modules } from "../swiper/SwiperRoot";
import { ProductOneItem } from "./ProductOneItem";
import Api from "@/lib/api";

const titleShape = "/images/title_shape.svg";

export const ProductOne = () => {

  return (
    <section className="product__area">
      <div className="container">
        {/* top */}
        <div className="row align-items-center">
          <div className="col-md-7">
            <div className="section__title-two mb-25">
              <h2 className="title">
                Produtos destaque
                <img src={titleShape} alt="" className="injectable" />
              </h2>
            </div>
          </div>
          <div className="col-md-5">
            <div className="product__tab-wrap mb-25">
              <ul className="nav nav-tabs" id="productTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="all-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#all-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="all-tab-pane"
                    aria-selected="true"
                  >
                    Todos
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="best-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#best-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="best-tab-pane"
                    aria-selected="false"
                  >
                    Mais vendidos
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="sale-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#sale-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="sale-tab-pane"
                    aria-selected="false"
                  >
                    Promoção
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* list */}
        <div className="row">
          <div className="col-lg-12">
            <div
              className="tab-content product__item-wrap"
              id="productTabContent"
            >
              <div
                className="tab-pane fade show active"
                id="all-tab-pane"
                role="tabpanel"
                aria-labelledby="all-tab"
                tabIndex="0"
              >
                <Sliders {...{ per_page: 10 }} />
              </div>

              <div
                className="tab-pane fade"
                id="best-tab-pane"
                role="tabpanel"
                aria-labelledby="best-tab"
                tabIndex="0"
              >
                <Sliders {...{ per_page: 10, orderby: 'popularity', order: 'desc' }} />
              </div>

              <div
                className="tab-pane fade"
                id="sale-tab-pane"
                role="tabpanel"
                aria-labelledby="sale-tab"
                tabIndex="0"
              >
                <Sliders {...{ per_page: 10, on_sale: true }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Sliders = (params) => {
  const swiperSettings = {
    slidesPerView: 1,
    spaceBetween: 20,
    observer: true,
    observeParents: true,
    loop: true,
    breakpoints: {
      1500: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 5,
      },
      992: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      576: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
    modules: modules,
    navigation: {
      nextEl: ".product-button-next",
      prevEl: ".product-button-prev",
    },
  };

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await Api.get('/products', {
          params: params,
        });

        setProductData(response.data); // Armazena os produtos na variável de estado
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os produtos');
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  return (
    <>
      {
        loading ? (
          <div className="row gutter-20 row-cols-1 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 justify-content-center"><p>Carregando...</p></div>
        ) : (
          <>
            <Swiper {...swiperSettings} className="product-active">
              {productData.map((product) => (
                <SwiperSlide key={product.id} >
                  <ProductOneItem {...product} />
                </SwiperSlide>
              ))}
            </Swiper >
          </>
        )
      }

      <div className="product__nav-wrap">
        <button className="product-button-prev">
          <i className="flaticon-left-chevron"></i>
        </button>
        <button className="product-button-next">
          <i className="flaticon-right-arrow-angle"></i>
        </button>
      </div>
    </>
  );
};
