"use client";
import React, { useEffect, useState } from "react";
import Api from "@/lib/api";

const loadFetureOne = "/loads/loadFetureOne.png";
const featureIcon1 = "/icon/features_icon01.svg";
const featureIcon2 = "/icon/features_icon02.svg";
const featureIcon3 = "/icon/features_icon03.svg";
const featureIcon4 = "/icon/features_icon04.svg";

export const FeatureOne = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuresList, setFeaturesList] = useState([]);


  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const response = await Api.get('/flash-settings');
        const settings = response.data;

        const newFeaturesList = [
          {
            icon: settings.icone_bloco_1 ? settings.icone_bloco_1 : featureIcon1,
            title: settings.titulo_bloco_1 ? settings.titulo_bloco_1 : "Frete grátis",
            description: settings.texto_bloco_1 ? settings.texto_bloco_1 : "for orders over $200",
          },
          {
            icon: settings.icone_bloco_2 ? settings.icone_bloco_2 : featureIcon2,
            title: settings.titulo_bloco_2 ? settings.titulo_bloco_2 : "Política de trocas",
            description: settings.texto_bloco_2 ? settings.texto_bloco_2 : "30 dias para uma troca",
          },
          {
            icon: settings.icone_bloco_3 ? settings.icone_bloco_3 : featureIcon3,
            title: settings.titulo_bloco_3 ? settings.titulo_bloco_3 : "Política de devolução",
            description: settings.texto_bloco_3 ? settings.texto_bloco_3 : "Devolução a qualquer momento",
          },
          {
            icon: settings.icone_bloco_4 ? settings.icone_bloco_4 : featureIcon4,
            title: settings.titulo_bloco_4 ? settings.titulo_bloco_4 : "Melhores ofertas",
            description: settings.texto_bloco_4 ? settings.texto_bloco_4 : "Para o seu bolso",
          },
        ];

        setFeaturesList(newFeaturesList);

        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os banners');
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();

  }, [])


  return (
    <section className="features__area">
      <div className="container">
        <div className="row justify-content-center">

          {loading ? (
            <>
              {[1, 2, 3, 4].map((key, index) => (
                <div key={index} className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="features__item load">
                    <div className="features__icon ">
                      <img src={loadFetureOne} alt="" />
                    </div>
                    <div className="features__content">
                      <h4 className="title"><span></span></h4>
                      <p><span></span></p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {featuresList.map((feature, index) => (
                <div key={index} className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="features__item">
                    <div className="features__icon">
                      <img src={feature.icon} alt="" className="injectable" />
                    </div>
                    <div className="features__content">
                      <h4 className="title">{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
