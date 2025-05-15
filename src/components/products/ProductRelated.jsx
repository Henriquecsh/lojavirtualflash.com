"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide, modules } from "../swiper/SwiperRoot";
import { useProductContext } from "@/context/ProductContext";
import { ProductOneItem } from "./ProductOneItem";
import Api from "@/lib/api";


const titleShape = "/images/title_shape.svg";
const product1 = "/products/products_img01.jpg";

export const ProductRelated = () => {

  const { product } = useProductContext();

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (product.id) {
          const response = await Api.get(`/products/${product.id}/related`, {
            params: {
              per_page: 12
            },
          });
          setProductData(response.data);
        } else {
          const response = await Api.get('/products', {
            params: {
              per_page: 12,
              exclude: product.id
            },
          });
          setProductData(response.data);
        }

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
  }, [product.id]);



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

  return (
    <div className="related-product-area">
      <div className="row">
        <div className="col-12">
          <div className="section__title-two mb-20">
            <h2 className="title">
              Produtos relacionados
              <img src={titleShape} alt="" className="injectable" />
            </h2>
          </div>
        </div>
      </div>

      <div className="product__item-wrap">
        <Swiper {...swiperSettings} className="product-active">
          {productData.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductOneItem {...product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="product__nav-wrap">
          <button className="product-button-prev">
            <i className="flaticon-left-chevron"></i>
          </button>
          <button className="product-button-next">
            <i className="flaticon-right-arrow-angle"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
