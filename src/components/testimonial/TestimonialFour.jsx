"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide, modules } from "../swiper/SwiperRoot";
import Api from "@/lib/api";

const quoteIcon = "/icon/quote02.svg";
const testimonialPlaceholder = "/images/testimonial-placeholder.png";
const rightArrow = "/icon/right_arrow03.svg";

export const TestimonialFour = () => {
  const swiperSettings = {
    slidesPerGroup: 5,
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    breakpoints: {
      1200: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      0: {
        slidesPerView: 1,
      },
    },
    // Navigation arrows
    modules: modules,
    navigation: {
      nextEl: ".testimonial-button-next",
      prevEl: ".testimonial-button-prev",
    },
  };

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [depoimentos, setDepoimentos] = useState([]);

  useEffect(() => {
    const fetchDepoimentos = async () => {
      setLoading(true);
      try {
        const response = await Api.get('/depoimentos');
        setDepoimentos(response.data);

        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os banners');
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDepoimentos();
  }, []);

  return (
    <section className="testimonial__area-four">
      <div className="container">
        <div className="testimonial__item-wrap-four">
          {loading ? (
            <>
            </>
          ) : (
            <>
              {console.log(depoimentos)}
              <Swiper {...swiperSettings} className="testimonial-active-two">
                {depoimentos.map((depoimento) => {
                  <SwiperSlide key={depoimento.id}>
                    <div className="testimonial__item-four">
                      <div className="testimonial__icon-four">
                        <img src={quoteIcon} alt="Quote" className="injectable" />
                      </div>
                      <div className="testimonial__content-four">
                        <h2 className="title">{depoimento.title ? depoimento.title : ''}</h2>
                        <div className="rating">
                          {[1, 2, 3, 4, 5].slice(0, depoimento.nota_depoimento).map((index) => {
                            <i key={index} className="fas fa-star"></i>
                          })}
                        </div>
                        <p>{depoimento.content}</p>
                      </div>
                      <div className="testimonial__author-two testimonial__author-four">
                        <div className="testimonial__author-thumb">
                          <img src={depoimento.image ? depoimento.image : authorImg} alt={depoimento.title ? depoimento.title : testimonialPlaceholder} />
                        </div>
                        <div className="testimonial__author-content">
                          <h4 className="title">{depoimento.nome_depoimento ? depoimento.nome_depoimento : ''}</h4>
                          <span>
                            <span>{depoimento.cargo_depoimento ? depoimento.cargo_depoimento : ''}</span>
                            <span>{depoimento.empresa_depoimento ? depoimento.empresa_depoimento : ''}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                })}
              </Swiper>

              <div className="testimonial__nav-wrap">
                <button className="testimonial-button-prev">
                  <img src={rightArrow} alt="Previous" className="injectable" />
                </button>
                <button className="testimonial-button-next">
                  <img src={rightArrow} alt="Next" className="injectable" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
