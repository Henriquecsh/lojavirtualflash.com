"use client";
import React, { useEffect, useState } from "react";
import { ProductOneItem } from "./ProductOneItem";
import axios from 'axios';
import { useParams } from "next/navigation";

const placeholder = "/products/woocommerce-placeholder.png";

export const ProductAll = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { page } = useParams();
  const currentPage = parseInt(page) || 1;
  const [params, setParams] = useState({ per_page: 10, page: currentPage })


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL + '/products', {
          auth: {
            username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
            password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
          },
          params: params,
        });

        console.log(response.data);

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

    fetchProducts();
  }, []);


  return (
    <>
      {
        loading ? (
          <div className="row gutter-20 row-cols-1 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 justify-content-center"><p>Carregando...</p></div>
        ) : (
          <>
            <div className="row gutter-20 row-cols-1 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 justify-content-center">
              {productData.map((product, index) => (
                <div className="col" key={index}>
                  <ProductOneItem {...product} />
                </div>
              ))}
            </div>
          </>
        )
      }
    </>
  );
};
