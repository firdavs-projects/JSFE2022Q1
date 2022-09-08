import React, {FC} from 'react';
import {Smartphone} from "../../types/Smartphone";
import Product from "../Product";
import {Col, Container, Row} from "react-bootstrap";

interface ProductsProps {
    products: Smartphone[];
    cart: Smartphone[];
    handleAddToCart: (product: Smartphone) => void;
}

const Products: FC<ProductsProps> = ({products, cart, handleAddToCart}): JSX.Element => {
    return (
        <Container fluid className="py-3">
            <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} id="products-list">
                {products.map(product => (
                    <Col key={product.id}>
                        <Product handleAddToCart={handleAddToCart} product={product} cart={cart}/>
                    </Col>
                ))}
            </Row>
            {products.length === 0 && <h1 className="text-center">Товаров не найдено</h1>}
        </Container>
    );
};

export default Products;
