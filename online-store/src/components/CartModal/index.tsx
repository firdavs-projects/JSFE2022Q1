import React, {FC} from 'react';
import {Button, Card, Modal} from "react-bootstrap";
import {Smartphone} from "../../types/Smartphone";

export interface CartModalProps {
    show: boolean;
    handleClose: () => void;
    cart: Smartphone[];
}

const CartModal: FC<CartModalProps> = ({show, handleClose, cart}) => {
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
                            <Card.Text><small>{product.price} {product.currency}</small></Card.Text>
                        </Card.Body>
                    </Card>
                ))}
                {cart.length === 0 && <div>Корзина пуста</div>}
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
