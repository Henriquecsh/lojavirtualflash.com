import React from "react";
import { ProductProvider } from '@/context/ProductContext';
import { ProductDetailsReview } from "@/components/products/ProductDetailsReview";
import { ProductDetailsTop } from "@/components/products/ProductDetailsTop";
import { ProductRelated } from "@/components/products/ProductRelated";
import { Layout } from "@/layouts/Layout";

export default function ProductDetails() {
  return (

    <ProductProvider>
      <Layout
        breadcrumbTitle="Detalhes do produto"
        breadcrumbSubtitle={""}
      >
        <section className="product__details-area">
          <div className="container">
            {/* top */}
            <ProductDetailsTop />

            {/* review */}
            <ProductDetailsReview />

            {/* related products */}
            <ProductRelated />
          </div>
        </section>
      </Layout>
    </ProductProvider>
  );
}
