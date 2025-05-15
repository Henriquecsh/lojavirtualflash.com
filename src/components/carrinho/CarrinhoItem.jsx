
const placeholder = "/products/woocommerce-placeholder.png";

export const CarrinhoItem = ({ index }) => {

    function formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor);
    }

    return (
        <div key={index} className="cart-item">
            <div className="imagem">
                <img src={placeholder} alt="" />
            </div>
            <div className="info-item">
                <h4 className="title">Nome do produto do carrinho se ficar maior o texto</h4>
                <button title="Remover produto do carrinho" className="remove-item"><i className="fa-solid fa-trash"></i></button>
                <span className="item-qty-box">
                    <button type="button" className="minus"><i className="fa-solid fa-minus"></i></button>
                    <input type="text" className="item-qty" />
                    <button type="button" className="plus"><i className="fa-solid fa-plus"></i></button>
                </span>
                <span className="price-item">R$ 18,90</span>
            </div>
        </div>
    );
};
