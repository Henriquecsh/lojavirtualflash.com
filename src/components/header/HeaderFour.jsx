"use client";

import React, { useEffect, useState } from "react";
import Api from "@/lib/api";
import Link from "next/link";
import { HeaderTop } from "./HeaderTop";
import { HeaderNav } from "./HeaderNav";
import { useMobileMenu } from "../../lib/hooks/useHeader";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import Select from "react-select";
import { useSearchParams } from "next/navigation";
import { useCarrinhoContext } from "@/context/CarrinhoContext";

const logoImg = "/logo/logo.png";

export const HeaderFour = () => {
  useMobileMenu();

  const [logoPrincipal, setLogoPrincipal] = useState(null);
  const { toggleCart, formatarMoeda, valorTotalCarrinho, quantItemCarrinho } = useCarrinhoContext();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await Api.get('/flash-settings');
        setLogoPrincipal(response.data.logo_principal);
      } catch (err) {
        console.error(err);
      } finally {
      }
    };
    fetchSettings();
  }, []);

  return (
    <header>
      <div id="header-fixed-height"></div>
      <HeaderTop />
      <div id="sticky-header" className="tg-header__area tg-header__area-four">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tgmenu__wrap">
                <nav className="tgmenu__nav">
                  <div className="logo">
                    <Link href="/">
                      <img src={logoPrincipal ? logoPrincipal : logoImg} alt="Logo" />
                    </Link>
                  </div>
                  <div className="tgmenu__navbar-wrap tgmenu__navbar-wrap-two tgmenu__main-menu d-none d-xl-flex">
                    <HeaderNav />
                  </div>

                  {/* form */}
                  <div className="tgmenu__search">
                    <Form />
                  </div>

                  {/* action */}
                  <div className="tgmenu__action tgmenu__action-three d-none d-md-block">
                    <ul className="list-wrap">
                      <li className="header-login">
                        <Link href="/contact">
                          <i className="flaticon-user"></i>
                        </Link>
                      </li>
                      <li className="header-wishlist">
                        <Link href="#">
                          <i className="flaticon-love"></i>
                        </Link>
                      </li>
                      <li className="header-cart header-cart-two">
                        <strong className="price">{formatarMoeda(valorTotalCarrinho)}</strong>
                        <Link href="#" onClick={toggleCart}>
                          <i className="flaticon-shopping-bag"></i>
                          <span>{quantItemCarrinho}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mobile-nav-toggler">
                    <i className="flaticon-layout"></i>
                  </div>
                </nav>
              </div>

              {/*  Mobile Menu   */}
              <HeaderMobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Form = () => {

  const searchParams = useSearchParams();
  const [search, setS] = useState(searchParams.get('busca') || '');

  return (

    <form action="/produtos/" className="tgmenu__search-form">
      <input type="text" name="busca" value={search} onChange={(e) => setS(e.target.value)} placeholder="Pesquisar . . ." />
      <button type="submit">
        <i className="flaticon-loupe"></i>
      </button>
    </form>
  );
};
