import React, {FC, useState} from 'react';
import {Form} from "react-bootstrap";

export interface SearchProps {
    onInputChange: (value: string) => void;
}

const Search: FC<SearchProps> = ({onInputChange}) => {
    const [value, setValue] = useState<string>('');
    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
        onInputChange(e.target.value);
    }
    return (
        <Form>
            <Form.Group className="my-3" controlId="formBasicEmail">
                <Form.Label>Поиск товаров</Form.Label>
                <Form.Control value={value} onChange={onChange} type="text" placeholder="Поиск товаров по названию"/>
            </Form.Group>
        </Form>
    );
};

export default Search;
