"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';
import { Swiper, SwiperSlide, modules } from "../swiper/SwiperRoot";

const rightArrow = "/icon/right_arrow.svg";
const bannerImg01 = "/banner/h3_banner_img01.jpg";

export const BannerFour = () => {
  const swiperSettings = {
    fadeEffect: { crossFade: true },
    autoplay: { delay: 3000 },
    modules: modules,
    spaceBetween: 0,
    effect: "fade",
    loop: true,
  };

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sliders, setSliders] = useState([]);
  const [banners, setBanners] = useState([]);
  const [bannersHome_1, setBannersHome_1] = useState([]);
  const [bannersHome_2, setBannersHome_2] = useState([]);


  useEffect(() => {
    const fetchSliders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL + '/sliders', {
          auth: {
            username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
            password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
          },
        });

        setSliders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os sliders');
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSliders();

    const fetchBanners = async () => {
      setLoading(true);
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL + '/banners', {
          auth: {
            username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
            password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
          },
        });

        const filteredBannersHome_1 = response.data.filter(
          (banner) => banner.posicao.includes("home-1")
        );

        const filteredBannersHome_2 = response.data.filter(
          (banner) => banner.posicao.includes("home-2")
        );

        setBannersHome_1(filteredBannersHome_1);
        setBannersHome_2(filteredBannersHome_2);

        setBanners(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os banners');
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  return (
    <section className="banner__area-four">
      <div className="container">
        <div className="row gutter-20">
          <div className="col-lg-8">
            <Swiper {...swiperSettings} className="slider__active">
              <>
                {
                  loading ? (
                    <div className="slider__single load"></div>
                  ) : (
                    <>
                      {sliders.map((slider) => (
                        <SwiperSlide key={slider.id} className="slider__single">
                          <div
                            className="slider__bg"
                            style={{ backgroundImage: `url(${slider.image})` }}
                          />
                          <div className="slider__content">
                            <h1 className="title">{slider.title}</h1>
                            <h4 className="sub-title">{slider.content}</h4>
                            {
                              slider.url_slide ? (
                                <>
                                  <Link href={slider.url_slide} className="btn">
                                    {slider.button_text}
                                    <img src={rightArrow} alt="" className="injectable" />
                                  </Link>
                                </>
                              ) : (
                                <></>
                              )
                            }
                          </div>
                        </SwiperSlide>
                      ))}
                    </>
                  )
                }
              </>
            </Swiper>
          </div>

          <div className="col-lg-4">
            <div className="banner__post-item-wrap">
              <>
                {
                  loading ? (
                    <div className="banner__post-item shine-animate-item load">
                      <img src={bannerImg01} alt="img" />
                    </div>
                  ) : (
                    <Swiper {...swiperSettings}>
                      {bannersHome_1.map((banner, index) => (
                        <SwiperSlide key={banner.id} className="banner__post-item shine-animate-item">
                          <div className="banner__post-thumb shine-animate">
                            {banner.url_banner ? (
                              <Link href={banner.url_banner}>
                                {banner.target === "yes" ? (
                                  <a target="_blank" rel="noopener noreferrer"><img src={banner.image} alt={banner.title} /></a>
                                ) : (
                                  <img src={banner.image} alt={banner.title} />
                                )}
                              </Link>
                            ) : (
                              <img src={banner.image} alt={banner.title} />
                            )}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )
                }

                {
                  loading ? (
                    <div className="banner__post-item-two shine-animate-item load">
                      <img src={bannerImg01} alt="img" />
                    </div>
                  ) : (
                    <>
                      <Swiper {...swiperSettings}>
                        {bannersHome_2.map((banner, index) => (
                          <SwiperSlide key={banner.id} className="banner__post-item-two shine-animate-item">
                            <div className="banner__post-thumb shine-animate">
                              {banner.url_banner ? (
                                <>
                                  {banner.target === "yes" ? (
                                    <a href={banner.url_banner} target="_blank" rel="noopener noreferrer">
                                      <img src={banner.image} alt={banner.title} />
                                    </a>
                                  ) : (
                                    <Link href={banner.url_banner}>
                                      <img src={banner.image} alt={banner.title} />
                                    </Link>
                                  )}
                                </>
                              ) : (
                                <img src={banner.image} alt={banner.title} />
                              )}
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </>
                  )
                }
              </>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};
