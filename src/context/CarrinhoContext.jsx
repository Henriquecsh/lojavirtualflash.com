"use client"
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";


export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {
    const pathname = usePathname();

    const [isFloatCartOpen, setIsFloatCartOpen] = useState(false);
    const [quantItemCarrinho, setQuantItemCarrinho] = useState(3);
    const [valorTotalCarrinho, setValorTotalCarrinho] = useState(10);

    const toggleCart = () => {
        if (pathname !== "/carrinho") {
            setIsFloatCartOpen(!isFloatCartOpen);
        }
    };

    function formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor);
    }


    return (
        <CarrinhoContext.Provider value={{ isFloatCartOpen, toggleCart, formatarMoeda, quantItemCarrinho, valorTotalCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export const useCarrinhoContext = () => {
    const context = useContext(CarrinhoContext);
    if (!context) {
        throw new Error('useCarrinhoContext deve ser usado dentro de um CarrinhoProvider');
    }
    return context;
};