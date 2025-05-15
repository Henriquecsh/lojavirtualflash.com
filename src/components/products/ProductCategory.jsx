"use client";
import React, { useEffect, useState } from "react";
import { ProductOneItem } from "./ProductOneItem";
import { useParams } from "next/navigation";
import Api from "@/lib/api";

const placeholder = "/products/woocommerce-placeholder.png";
const loadImage = "/loads/loadCategoryDesktop.png";

export const ProductCategory = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { page, slug } = useParams();
  const currentPage = parseInt(page) || 1;
  const [currentCategory, setCurrentCategory] = useState(false);
  const [params, setParams] = useState({ per_page: 10, page: currentPage });
  const [notFound, setNotFound] = useState(false);


  useEffect(() => {
    const fetchProductsCategories = async () => {
      try {
        const response = await Api.get('/products/categories');
        const data = response.data ? response.data : [];
        const categoryID = data.find((category) => category.slug === slug);

        if (!categoryID?.id) {
          setNotFound(true);
        } else {
          setParams({ per_page: 10, page: currentPage, category: categoryID.id });
          setCurrentCategory(categoryID.id);
          fetchProducts();
        }

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
  }, [currentCategory]);

  return (
    <>
      {
        loading ? (
          <div className="row">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="col">
                <div className="product__item">
                  <div className="product__thumb load">
                    <img src={placeholder} alt="" />
                  </div>
                  <div className="product__content">
                    <div className="product__reviews load">
                      <div className="rating">&nbsp;</div>
                    </div>
                    <h4 className="title load">&nbsp;</h4>
                    <h3 className="price load">&nbsp;</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {notFound ? (
              <>
                <div className="row gutter-20 row-cols-1">
                  <p className="col">Nenhum produto encontrado nesta categoria.</p>
                </div>
              </>
            ) : (
              <div className="row gutter-20 row-cols-1 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 justify-content-center">
                {productData.map((product, index) => (
                  <div className="col" key={index}>
                    <ProductOneItem {...product} />
                  </div>
                ))}
              </div>
            )}
          </>
        )
      }
    </>
  );
};
