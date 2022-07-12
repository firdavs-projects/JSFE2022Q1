import React, {FC} from 'react';
import {Button, Card, Modal} from "react-bootstrap";
import { Icon } from 'ts-react-feather-icons';
import {Smartphone} from "../../types/Smartphone";
import {convertToAmount} from "../../utils";
import {Currency} from "../../types";

export interface CartModalProps {
    show: boolean;
    handleClose: () => void;
    onRemoveFromCart: (id: number) => void;
    cart: Smartphone[];
}

const CartModal: FC<CartModalProps> = ({show, handleClose, onRemoveFromCart, cart}) => {
    const total = convertToAmount(cart.reduce((acc, cur) => acc + +cur.price, 0));
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Корзина</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {cart.map(product => (
                    <Card key={product.id} className="flex-row align-items-center mb-3">
                        <Card.Img variant="top" style={{width: 100}} src={product.image}/>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text><small>{product.price} {product.currency} - 1 шт</small></Card.Text>
                            <Button variant="warning" className="d-flex align-items-center" onClick={() => onRemoveFromCart(product.id)}>
                                <Icon name="trash" size={16}/> <small className="px-2"> Удалить из корзины </small>
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
                {cart.length === 0 && <div>Корзина пуста</div>}
                {total && <div className="text-right">Итого: {total} {Currency.usd}</div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CartModal;
