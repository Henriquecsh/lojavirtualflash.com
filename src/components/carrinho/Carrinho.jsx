"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CarrinhoItem } from "@/components/carrinho/CarrinhoItem"
import { useCarrinhoContext } from "@/context/CarrinhoContext";

export const Carrinho = () => {

    const { isFloatCartOpen, toggleCart, formatarMoeda, quantItemCarrinho, valorTotalCarrinho } = useCarrinhoContext();

    return (
        <>

            <div className="carrinho-content">
                <div className="container">
                    <div className="col-xl-12 col-lg-8 col-md-8">
                        {quantItemCarrinho === 0 ? (
                            <>
                                <div className="carrinho-vazio">Carrinho vazio</div>
                            </>
                        ) : (
                            <>
                                <div className="cart-wrapper-table">
                                    <div className="cart-header">
                                        <span></span>
                                        <span>Produto</span>
                                        <span></span>
                                        <span>Quantidade</span>
                                        <span>Preço</span>
                                    </div>

                                    <div className="cart-items">
                                        {[...Array(quantItemCarrinho)].map((_, index) => (
                                            <CarrinhoItem key={index} {...index} />
                                        ))}
                                    </div>
                                </div>

                                <div className="cart-actions">
                                    <div className="cart-total">
                                        <h4>Total do Carrinho: <span>{formatarMoeda(valorTotalCarrinho)}</span></h4>
                                    </div>
                                    <Link className="btn btn-small" href="/carrinho">Finalizar compra</Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
