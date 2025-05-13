"use client";
import React, { useEffect, useState } from "react";
import { ProductOneItem } from "./ProductOneItem";
import { useParams, useSearchParams } from "next/navigation";
import Api from "@/lib/api";


export const ProductAll = () => {
  const [productData, setProductData] = useState([]);
  const [totalProduct, setTotalProduct] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { page } = useParams();
  const currentPage = parseInt(page) || 1;
  const [params, setParams] = useState({ per_page: 10, page: currentPage });

  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('busca') || '');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {

        console.log(search !== '');

        if (search !== '') {
          const response = await Api.get(`/products?search=${search}`, {
            params: params,
          });
          setProductData(response.data);
          setTotalProduct(response.headers['x-wp-total']);
        } else {

          const response = await Api.get('/products', {
            params: params,
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
