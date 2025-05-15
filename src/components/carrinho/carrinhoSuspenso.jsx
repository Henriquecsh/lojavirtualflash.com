"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CarrinhoItem } from "@/components/carrinho/CarrinhoItem"


import { useCarrinhoContext } from "@/context/CarrinhoContext";

export const CarrinhoSuspenso = () => {

    const { isFloatCartOpen, toggleCart, formatarMoeda, quantItemCarrinho, valorTotalCarrinho } = useCarrinhoContext();

    return (
        <>
            <div id="cart-float-wrapper" className={`cart-float-wrapper ${isFloatCartOpen ? ' open ' : ''}`}>
                <div className="cart-header">
                    <h4 className="title">Carrinho de compras</h4>
                    <button type="button" onClick={toggleCart} className="close-cart btn">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                {quantItemCarrinho === 0 ? (
                    <>
                        <div className="carrinho-vazio">Carrinho vazio</div>
                    </>
                ) : (
                    <>
                        <div className="cart-items">
                            {[...Array(quantItemCarrinho)].map((_, index) => (
                                <CarrinhoItem key={index} {...index} />
                            ))}
                        </div>

                        <div className="cart-actions">
                            <div className="cart-total">
                                <span>{formatarMoeda(valorTotalCarrinho)}</span>
                            </div>
                            <Link className="btn btn-small" href="/carrinho">Ver carrinho</Link>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};