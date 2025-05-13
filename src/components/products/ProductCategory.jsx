"use client";
import React, { useEffect, useState } from "react";
import { ProductOneItem } from "./ProductOneItem";
import { useParams, useSearchParams } from "next/navigation";
import Api from "@/lib/api";

export const ProductCategory = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { page, slug } = useParams();
  const currentPage = parseInt(page) || 1;
  const [currentCategory, setCurrentCategory] = useState(false);
  const [params, setParams] = useState({ per_page: 10, page: currentPage });


  useEffect(() => {

    const fetchProductsCategories = async () => {
      try {
        const response = await Api.get('/products/categories');
        const data = response.data ? response.data : [];
        const categoryID = data.find((category) => category.slug === slug);

        setParams({ per_page: 10, page: currentPage, category: categoryID.id });
        setCurrentCategory(categoryID.id);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os produtos');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProductsCategories();

    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await Api.get('/products', {
          params: params,
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

    fetchProducts();
  }, [currentCategory]);

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
