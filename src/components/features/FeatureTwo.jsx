"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide, modules } from "../swiper/SwiperRoot";
import Link from "next/link";
import Api from "@/lib/api";

const featuresImg01 = "/images/features_img01.jpg";
const featuresImg02 = "/images/features_img02.jpg";
const rightArrow = "/icon/right_arrow.svg";

export const FeatureTwo = () => {
  const swiperSettingsBanner = {
    fadeEffect: { crossFade: true },
    autoplay: { delay: 3000 },
    slidesPerGroup: 1,
    slidesPerView: 1,
    modules: modules,
    spaceBetween: 0,
    effect: "fade",
    loop: false,
  };

  const swiperSettingsBannerTwo = {
    fadeEffect: { crossFade: true },
    autoplay: { delay: 3000 },
    slidesPerGroup: 1,
    slidesPerView: 1,
    modules: modules,
    spaceBetween: 0,
    effect: "fade",
    loop: false,
  };

  const [loading, setLoading] = useState(true);
  const [bannersHome_4, setBannersHome_4] = useState([]);
  const [bannersHome_5, setBannersHome_5] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        const response = await Api.get('/banners');
        const filteredBannersHome_4 = response.data.filter(
          (banner) => banner.posicao.includes("home-4")
        );

        const filteredBannersHome_5 = response.data.filter(
          (banner) => banner.posicao.includes("home-5")
        );

        setBannersHome_4(filteredBannersHome_4);
        setBannersHome_5(filteredBannersHome_5);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, [])

  return (
    <section className="features__area-two">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {
              loading ? (
                <div className="banner__post-item load">
                  <img src={featuresImg01} alt="img" />
                </div>
              ) : (
                <Swiper {...swiperSettingsBanner}>
                  {bannersHome_4.map((banner, index) => (
                    <SwiperSlide key={banner.id} className="features__item-two">
                      <div className="features__thumb">
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
          </div>
          <div className="col-md-6">
            {
              loading ? (
                <div className="banner__post-item load">
                  <img src={featuresImg01} alt="img" />
                </div>
              ) : (
                <Swiper {...swiperSettingsBannerTwo}>
                  {bannersHome_5.map((banner, index) => (
                    <SwiperSlide key={banner.id} className="features__item-two">
                      <div className="features__thumb">
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
          </div>
        </div>
      </div>
    </section>
  );
};
