import { BlogPagination } from "@/components/blogs/BlogPagination";
import { BlogPostsAll } from "@/components/blogs/BlogPostsAll";
import { BlogSidebar } from "@/components/blogs/BlogSidebar";
import { Layout } from "@/layouts/Layout";

export default function Blog() {
  return (
    <Layout breadcrumbTitle="Novidades do blog">
      <section className="blog__area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <BlogSidebar />
            </div>

            <div className="col-xl-9 col-lg-8 order-0 order-lg-2">
              <BlogPostsAll />
              <BlogPagination />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}