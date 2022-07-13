import React, {FC} from 'react';
import {Card, Col} from "react-bootstrap";
interface FilterContainerProps {
    children: React.ReactNode;
}
const FilterContainer: FC<FilterContainerProps> = ({children}) => {
    return (
        <Col>
            <Card className='h-250'>
                <Card.Body>
                    {children}
                </Card.Body>
            </Card>
        </Col>
    );
};

export default FilterContainer;
