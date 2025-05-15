"use client";
import React from "react";
import parse from 'html-react-parser';
import DOMPurify from "isomorphic-dompurify";
import { useProductContext } from "@/context/ProductContext";


export const ProductDetailsReview = () => {

  const { product } = useProductContext();

  return (
    <div className="row">
      <div className="col-12">
        <div className="product-desc-wrap">
          <ul className="nav nav-tabs" id="myTab2" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="description-tab"
                data-bs-toggle="tab"
                data-bs-target="#description-tab-pane"
                type="button"
                role="tab"
                aria-controls="description-tab-pane"
                aria-selected="true"
              >
                Descrição
              </button>
            </li>
            {
              product.reviews_allowed && (
                <>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="reviews-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#reviews-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="reviews-tab-pane"
                      aria-selected="false"
                    >
                      Avaliações <span>{product.rating_count <= 1 ? (product.rating_count) : (product.rating_count)}</span>
                    </button>
                  </li>
                </>

              )
            }

          </ul>
          <div className="tab-content" id="myTabContent2">
            <div
              className="tab-pane fade show active"
              id="description-tab-pane"
              role="tabpanel"
              aria-labelledby="description-tab"
              tabIndex="0"
            >
              {product?.description && parse(DOMPurify.sanitize(product.description))}
            </div>

            {
              product.reviews_allowed && (
                <>
                  <div
                    className="tab-pane fade"
                    id="reviews-tab-pane"
                    role="tabpanel"
                    aria-labelledby="reviews-tab"
                    tabIndex="0"
                  >
                    <div className="product-desc-review">
                      <div className="product-desc-review-title mb-15">
                        <h5 className="title">Customer Reviews (0)</h5>
                      </div>
                      <div className="left-rc">
                        <p>No reviews yet</p>
                      </div>
                      <div className="right-rc">
                        <a href="#">Write a review</a>
                      </div>
                    </div>
                  </div>
                </>
              )
            }

          </div>
        </div>
      </div>
    </div>
  );
};
