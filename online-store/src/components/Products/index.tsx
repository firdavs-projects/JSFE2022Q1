import React, {FC} from 'react';
import {Smartphone} from "../../types/Smartphone";
import Product from "../Product";
import {Col, Container, Row} from "react-bootstrap";

export interface ProductsProps {
    products: Smartphone[];
    cart: Smartphone[];
    handleAddToCart: (product: Smartphone) => void;
}

const Products: FC<ProductsProps> = ({products, cart, handleAddToCart}) => {
    return (
        <Container fluid className="py-5 min-vh-100">
            <Row xs={2} md={3} lg={5}>
                {products.map(product => (<Col key={product.id}>
                    <Product handleAddToCart={handleAddToCart} product={product} cart={cart}/>
                </Col>))}
            </Row>
        </Container>
    );
};

export default Products;