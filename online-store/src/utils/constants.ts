import { Sort } from "../types";

export const INITIAL_MIN = 0;
export const MAX_CART_SIZE = 5;
export const INITIAL_FILTERS = {
    count: {min: INITIAL_MIN, max: Infinity},
    price: {min: INITIAL_MIN, max: Infinity},
    year: {min: INITIAL_MIN, max: Infinity},
    colors: [],
    brands: [],
    sort: Sort.default,
    search: ''
}

export const CART_FULL_MESSAGE = 'Извините, все слоты заполнены.\nP.S. Из за ограниченности тестовых данных лимит установлен на 5 товаров.';

export const MAX = 100;
export const MIN = 0;
