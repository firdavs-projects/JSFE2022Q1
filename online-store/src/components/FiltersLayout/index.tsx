import React, {FC} from 'react';
import {Container, Row} from "react-bootstrap";

export interface FiltersLayoutProps {
    children: React.ReactNode;
}

const FiltersLayout: FC<FiltersLayoutProps> = ({children}) => {
    return (
        <Container fluid>
            <Row xs={1} lg={2} xl={3}>
                {children}
            </Row>
        </Container>
    );
};

export default FiltersLayout;
