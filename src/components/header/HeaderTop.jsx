"use client";
import React, { useEffect, useState } from "react";
import Api from "@/lib/api";

export const HeaderTop = () => {

  const [settings, setSettings] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await Api.get('/flash-settings');
        setSettings(response.data);
      } catch (err) {
        console.error(err);
      } finally {
      }
    };
    fetchSettings();

  }, []);

  return (
    <div className="tg-header__top">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-8">
            <ul className="tg-header__top-info left-side list-wrap">
              {settings.endereco_cabecalho && (
                <>
                  <li>
                    <i className="flaticon-placeholder"></i>
                    {settings.endereco_cabecalho}
                  </li>
                </>
              )}
              {settings.email && (
                <>
                  <li>
                    <i className="flaticon-mail"></i>
                    <a href={`mailto:${settings.email}`}>
                      {settings.email}
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="col-xl-6 col-lg-4">
            <ul className="tg-header__top-right list-wrap">
              {settings.email && (
                <>
                  <li>
                    <i className="flaticon-three-o-clock-clock"></i>
                    Atendimento: {settings.atendimento}
                  </li>
                </>
              )}
              <li className="tg-header__top-social">
                <ul className="list-wrap">
                  {settings.whatsapp_api && (
                    <>
                      <li>
                        <a href={`https://api.whatsapp.com/send?phone=${settings.whatsapp_api}`} target="_blank">
                          <i className="fab fa-whatsapp"></i>
                        </a>
                      </li>
                    </>
                  )}
                  {settings.instagram_url && (
                    <>
                      <li>
                        <a href={settings.instagram_url} target="_blank">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </>
                  )}
                  {settings.facebook_url && (
                    <>
                      <li>
                        <a href={settings.facebook_url} target="_blank">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                    </>
                  )}
                  {settings.tiktok_url && (
                    <>
                      <li>
                        <a href={settings.tiktok_url} target="_blank">
                          <i className="fa-brands fa-tiktok"></i>
                        </a>
                      </li>
                    </>
                  )}
                  {settings.youtube_url && (
                    <>
                      <li>
                        <a href={settings.youtube_url} target="_blank">
                          <i className="fab fa-youtube"></i>
                        </a>
                      </li>
                    </>
                  )}
                  {settings.twitter_url && (
                    <>
                      <li>
                        <a href={settings.twitter_url} target="_blank">
                          <i className="fab fa-x-twitter"></i>
                        </a>
                      </li>
                    </>
                  )}
                  {settings.pinterest_url && (
                    <>
                      <li>
                        <a href={settings.pinterest_url} target="_blank">
                          <i className="fa-brands fa-pinterest"></i>
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
