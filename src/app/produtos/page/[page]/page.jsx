import { ProductPagination } from "@/components/products/ProductPagination";
import { ProductAll } from "@/components/products/ProductAll";
import { ProductsProvider } from '@/context/ProductsContext';
import { Layout } from "@/layouts/Layout";

export default function Product() {
  return (
    <ProductsProvider>
      <Layout breadcrumbTitle="Todos produtos">
        <section className="product__area-four">
          <div className="container">
            {/* list */}
            <ProductAll />

            {/* pagination */}
            <ProductPagination />
          </div>
        </section>
      </Layout>
    </ProductsProvider>
  );
}
