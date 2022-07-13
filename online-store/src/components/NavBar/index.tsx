import React, {FC} from 'react';
import {Button, Container, Navbar} from "react-bootstrap";
import {Icon} from "ts-react-feather-icons";
import rsLogo from '../../assets/icons/logo_rs_text.svg';

export interface NavbarProps {
    title: string;
    onClick: () => void;
    count: number;
}

const NavBar: FC<NavbarProps> = ({title, count, onClick}) => {
    return (
        <header className="position-sticky top-0" style={{zIndex: 10}}>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/"><img src={rsLogo} alt="RS School"/> Store</Navbar.Brand>
                    <Navbar.Text>{title}</Navbar.Text>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Button onClick={onClick} variant="outline-warning" className="px-2 py-1">
                                <Icon name="shopping-cart" color="orange" size={16}/> {count}
                            </Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default NavBar;
