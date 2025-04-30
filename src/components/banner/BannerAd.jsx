"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';
import { Swiper, SwiperSlide, modules } from "../swiper/SwiperRoot";

const adBanner = "/images/advertisement.jpg";

export const BannerAd = () => {
  const swiperSettings = {
    fadeEffect: { crossFade: true },
    autoplay: { delay: 3000 },
    modules: modules,
    spaceBetween: 0,
    effect: "fade",
    loop: true,
  };

  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL + '/banners', {
          auth: {
            username: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
            password: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
          },
        });

        const data = response.data.filter(
          (banner) => banner.posicao.includes("home-3")
        );

        setBanners(data);
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
    <div className="ad-banner-area pb-80">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="ad-banner-img">
              {
                loading ? (
                  <div className="ad-banner-img load">
                    <img src={adBanner} alt="img" />
                  </div>
                ) : (
                  <Swiper {...swiperSettings}>
                    {banners.map((banner, index) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
