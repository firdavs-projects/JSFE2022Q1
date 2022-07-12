import React from 'react';
import {Container} from "react-bootstrap";

const Footer = () => {
    const getCurrentYear = () => {
        const date = new Date();
        return date.getFullYear();
    }
    return (
        <footer className="footer bg-dark">
            <Container className="py-2">
                <p className="text-light">&copy; Copyright - {getCurrentYear()}. Rolling Scopes School</p>
                <p className="text-muted m-0">Developed by <a href="#">Firdavs Abdulloev</a></p>
            </Container>
        </footer>
    );
};

export default Footer;
