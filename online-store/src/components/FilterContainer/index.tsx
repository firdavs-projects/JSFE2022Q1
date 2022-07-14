import React, {FC} from 'react';
import {Card, Col} from "react-bootstrap";

interface FilterContainerProps {
    children: React.ReactNode;
    lg?: number;
}

const FilterContainer: FC<FilterContainerProps> = ({children, lg}): JSX.Element => {
    return (
        <Col lg={lg}>
            <Card className='h-250 mt-4'>
                <Card.Body>
                    {children}
                </Card.Body>
            </Card>
        </Col>
    );
};

export default FilterContainer;
