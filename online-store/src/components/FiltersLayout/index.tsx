import React, {FC} from 'react';
import {Container, Row} from "react-bootstrap";

export interface FiltersLayoutProps {
    children: React.ReactNode;
}

const FiltersLayout: FC<FiltersLayoutProps> = ({children}) => {
    return (
        <Container fluid>
            <Row xs={1} md={2} lg={3}>
                {children}
            </Row>
        </Container>
    );
};

export default FiltersLayout;
