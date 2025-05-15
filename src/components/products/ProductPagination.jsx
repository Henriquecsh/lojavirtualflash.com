"use client";
import React from "react";
import Link from "next/link";
import { useProductsContext } from "@/context/ProductsContext";

const paginationPrev = "/icon/pagination_icon01.svg";
const paginationNext = "/icon/pagination_icon02.svg";

export const ProductPagination = () => {

  const { currentPage, notFound, totalPages, slug } = useProductsContext();


  console.log(totalPages, notFound, slug);

  return (
    <>
      {!notFound && (
        <>
          {
            totalPages > 1 ? (
              <>
                <nav className="pagination__wrap mt-50">
                  <ul className="list-wrap">
                    <li className="link-arrow">
                      {slug ? (
                        <Link href={currentPage <= 2 ? `/produtos` : `/produtos/categoria/${slug}/page/${currentPage - 1}`} className={currentPage > 1 ? '' : 'disabled-link'}><img src={paginationPrev} alt="Previous" className="injectable" /></Link>
                      ) : (
                        <Link href={currentPage <= 2 ? `/produtos` : `/produtos/page/${currentPage - 1}`} className={currentPage > 1 ? '' : 'disabled-link'}><img src={paginationPrev} alt="Previous" className="injectable" /></Link>
                      )}
                    </li>
                    <li>{" "} Página {currentPage} de {totalPages} {" "}</li>
                    <li className="link-arrow">
                      {slug ? (
                        <Link href={`/produtos/categoria/${slug}/page/${currentPage + 1}`} className={currentPage < totalPages ? '' : 'disabled-link'}><img src={paginationNext} alt="Next" className="injectable" /></Link>
                      ) : (
                        <Link href={`/produtos/page/${currentPage + 1}`} className={currentPage < totalPages ? '' : 'disabled-link'}><img src={paginationNext} alt="Next" className="injectable" /></Link>
                      )}
                    </li>
                  </ul>
                </nav>
              </>
            ) : (
              <>
                <nav className="pagination__wrap mt-50">
                  <ul className="list-wrap">
                    <li>{" "} Página {currentPage} de {totalPages} {" "}</li>
                  </ul>
                </nav>
              </>
            )}

        </>
      )}
    </>
  )
};
