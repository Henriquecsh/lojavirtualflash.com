import React from "react";
import { Layout } from "@/layouts/Layout";
import { Carrinho } from "@/components/carrinho/Carrinho"

export default function pageCarrinho() {
    return (
        <Layout breadcrumbTitle="Carrinho" hideNewsLetter>
            <Carrinho />
        </Layout>
    );
}
