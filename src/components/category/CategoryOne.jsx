"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';

const titleShape = "/images/title_shape.svg";
const placeholder = "/products/woocommerce-placeholder.png";

export const CategoryOne = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProductsCategories = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL + '/products/categories', {
          auth: {
            username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY, // Substitua pela sua Consumer Key
            password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET, // Substitua pela sua Consumer Secret
          },
        });

        setProductCategories(response.data); // Armazena os produtos na variável de estado
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os produtos');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProductsCategories();
  }, []);

  return (
    <section className="category__area">
      <div className="container">
        <div className="row align-tiems-center">
          <div className="col-md-8">
            <div className="section__title-two mb-30">
              <h2 className="title">
                Compre por categoria
                <img src={titleShape} alt="" className="injectable" />
              </h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="view-all-btn">
              <Link href="/product">
                Ver todas categorias{" "}
                <i className="flaticon-right-arrow-angle"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="row row-cols-2 row-cols-lg-6 row-cols-md-4 row-cols-sm-3 justify-content-center">
          {productCategories.slice(0, 6).map((category, index) => (
            <div className="col" key={index} >
              <div className="category__item">
                <Link href={`/produtos/categoria/${category.slug}`}>
                  <img src={category?.image ? category.image.src : placeholder} alt={category.name} />
                  <span className="name">{category.name}</span>
                  <strong>{category.count} Items</strong>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
