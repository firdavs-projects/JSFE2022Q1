import React, {FC} from 'react';
import {Smartphone} from "../../types/Smartphone";
import {Button, Card, Row} from "react-bootstrap";
import {Icon} from 'ts-react-feather-icons';

interface ProductProps {
    product: Smartphone;
    cart: Smartphone[];
    handleAddToCart: (product: Smartphone) => void;
}

const Product: FC<ProductProps> = ({product, cart, handleAddToCart}): JSX.Element => {
    const isInCart = cart.some(item => item.id === product.id);
    const onCartClick = (): void => handleAddToCart(product);
    return (
        <Card className="mb-4 w-100 d-flex align-items-center">
            <Card.Img
                className="py-2 d-flex justify-content-center"
                style={{height: 200, width: 'fit-content'}}
                variant="top" src={product.image}
                alt={product.name}
            />
            <Card.Body className="w-100">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-success">
                    <small>{product.price} {product.currency}</small>
                </Card.Text>
                <Card.Text className="text-success">
                    <Button
                        variant={isInCart ? "warning" : "outline-warning"}
                        className="px-2 py-1 w-100"
                        onClick={onCartClick}
                    >
                        <small style={{color: isInCart ? "white" : "currentcolor"}}>
                            {isInCart ? "Добавлен " : "Добавить "}
                        </small>
                        <Icon name="shopping-cart" color={isInCart ? "white" : "orange"} size={16}/>
                    </Button>
                </Card.Text>
                <Card.Text className="mb-0"><small>Производитель: <b>{product.manufacturer}</b></small></Card.Text>
                <Card.Text className="mb-0"><small>Цвет: <b>{product.color}</b></small></Card.Text>
                <Card.Text className="mb-0"><small>Год выпуска: <b>{product.year}</b></small></Card.Text>
                <Card.Text className="mb-0"><small>Основная камера: <b>{product.camera} Мп</b></small></Card.Text>
                <Card.Text className="mb-0"><small>В наличии: <b>{product.count} шт</b></small></Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
