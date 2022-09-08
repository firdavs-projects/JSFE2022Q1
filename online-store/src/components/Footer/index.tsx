import React, { FC } from "react";
import { Container } from "react-bootstrap";
import rsLogo from '../../assets/icons/logo_rs_text.svg';

const Footer: FC = (): JSX.Element => {
    const getCurrentYear = (): number => {
        const date = new Date();
        return date.getFullYear();
    }
    return (
        <footer className="footer bg-dark">
            <Container className="py-2 d-flex align-items-center justify-content-between">
                <a href="https://rs.school/"><img src={rsLogo} width={100} alt="RS School"/></a>
                <div className="text-end">
                    <p className="text-light">
                        &copy; Copyright - {getCurrentYear()}. Rolling Scopes School
                    </p>
                    <p className="text-muted m-0">
                        Developed by <a href="https://github.com/firdavs-projects">Firdavs Abdulloev</a>
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
