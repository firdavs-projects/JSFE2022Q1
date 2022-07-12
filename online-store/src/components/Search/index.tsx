import React, {FC, useState} from 'react';
import {Card, Form} from "react-bootstrap";
import {Sort} from "../../types";

export interface SearchProps {
    onInputChange: (value: string) => void;
    onSortChange: (sort: Sort) => void;
}

const Search: FC<SearchProps> = ({onInputChange, onSortChange}) => {
    const [value, setValue] = useState<string>('');
    const [sort, setSort] = useState<Sort>(Sort.default);

    const onSearchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
        onInputChange(e.target.value);
    }

    const onSortChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setSort(e.target.value as Sort);
        onSortChange(e.target.value as Sort);
    }
    return (
        <Card>
            <Card.Body>
                <Form>
                    <Form.Group className="my-3">
                        <Form.Label>Поиск товаров</Form.Label>
                        <Form.Control value={value} onChange={onSearchChangeHandler} type="text"
                                      placeholder="Поиск товаров по названию"/>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label>Сортировка</Form.Label>
                        <Form.Select onChange={onSortChangeHandler} value={sort}>
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
            </Card.Body>
        </Card>
    );
};

export default Search;
