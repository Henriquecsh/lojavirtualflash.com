"use client";

import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { ProductOneItem } from "./ProductOneItem";
import { padNumber } from "../../lib/helper";
import Api from "@/lib/api";


const titleShape = "/images/title_shape.svg";
const productsShape01 = "/products/products_shape01.png";
const productsShape02 = "/products/products_shape02.png";

export const ProductHotSale = () => {

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countDown, setCountDown] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await Api.get('/products', {
          params: { on_sale: true, per_page: 5 },
        });
        setProductData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os produtos');
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts()
  }, []);

  return (
    <section className="product__area-two">
      {/* top */}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="section__title-two mb-20">
              <h2 className="title">
                Produtos em promoção
                <img src={titleShape} alt="" className="injectable" />
              </h2>
            </div>
          </div>

          {countDown && (
            <div className="col-md-4">
              <div className="coming-time-wrap">
                <div className="coming-time">
                  <Countdown
                    date={new Date("2024-12-31")}
                    renderer={({ days, hours, minutes, seconds, completed }) => (
                      <>
                        <div className="time-count day">
                          <span>{padNumber(days)}</span>
                          <strong>d</strong>
                        </div>
                        <div className="time-count hour">
                          <span>{padNumber(hours)}</span>
                          <strong>h</strong>
                        </div>
                        <div className="time-count min">
                          <span>{padNumber(minutes)}</span>
                          <strong>m</strong>
                        </div>
                        <div className="time-count sec">
                          <span>{padNumber(seconds)}</span>
                          <strong>s</strong>
                        </div>
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <div className="container custom-container-two">
        <div className="product__item-wrap-two">
          <div className="row gutter-20 row-cols-1 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 justify-content-center">
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <>
                {productData.map((product, index) => (
                  <div className="col" key={index}>
                    <ProductOneItem {...product} />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* shape */}
      <div className="product__shape-wrap">
        <img src={productsShape01} alt="shape" className="ribbonRotate" />
        <img
          src={productsShape02}
          alt="shape"
          data-aos="fade-up-right"
          data-aos-delay="400"
        />
      </div>
    </section>
  );
};
