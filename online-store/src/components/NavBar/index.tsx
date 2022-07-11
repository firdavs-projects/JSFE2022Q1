import React, {FC} from 'react';
import {Container, Navbar} from "react-bootstrap";

export interface NavbarProps {
    title: string;
}

const NavBar: FC<NavbarProps> = ({title}) => {
    return (
        <header>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Online Store</Navbar.Brand>
                    <Navbar.Text>{title}</Navbar.Text>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Cart
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default NavBar;