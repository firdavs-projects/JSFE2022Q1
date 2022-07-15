import React, {FC, useEffect, useState} from 'react';
import {Card, Form} from "react-bootstrap";
import {Sort} from "../../types";

interface SearchProps {
    onInputChange: (value: string) => void;
    onSortChange: (sort: Sort) => void;
    initialValue: string;
    initialSort: Sort;
}

const Search: FC<SearchProps> = ({onInputChange, onSortChange, initialValue, initialSort}): JSX.Element => {
    const onSearchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        onInputChange(e.target.value);
    }
    
    const focusRef = React.useRef<HTMLInputElement>(null);
    useEffect(() => {
        focusRef.current?.focus();
    }, []);

    const onSortChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        onSortChange(e.target.value as Sort);
    }
    return (
        <Form>
            <Form.Group className="my-3">
                <Form.Label><h5>Поиск товаров</h5></Form.Label>
                <Form.Control
                    ref={focusRef} 
                    value={initialValue} 
                    onChange={onSearchChangeHandler} 
                    type="text"
                    placeholder="Поиск товаров по названию"
                />
            </Form.Group>
            <Form.Group className="my-3">
                <Form.Label><h5>Сортировка</h5></Form.Label>
                <Form.Select onChange={onSortChangeHandler} value={initialSort}>
                    <option value={Sort.default}>Выберите порядок</option>
                    <option value={Sort.nameAsc}>По алфавиту от A до Z</option>
                    <option value={Sort.nameDesc}>По алфавиту от Z до A</option>
                    <option value={Sort.priceAsc}>По цене по возрастанию</option>
                    <option value={Sort.priceDesc}>По цене по убыванию</option>
                    <option value={Sort.countAsc}>По количеству по возрастанию</option>
                    <option value={Sort.countDesc}>По количеству по убыванию</option>
                    <option value={Sort.yearAsc}>По году выпуска по возрастанию</option>
                    <option value={Sort.yearDesc}>По году выпуска по убыванию</option>
                </Form.Select>
            </Form.Group>
        </Form>
    );
};

export default Search;
