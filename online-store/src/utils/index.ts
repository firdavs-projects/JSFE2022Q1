import {Sort} from "../types";
import {Smartphone} from "../types/Smartphone";

export const localStorageGeneric = <T>(key: string, value?: T): T | undefined => {
    if (value) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        return JSON.parse(localStorage.getItem(key) as string);
    }
}

export const convertToAmount = (value: number): string => {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
}

export const sortProducts = (products: Smartphone[], sort: Sort): Smartphone[] => {
    const newProducts = [...products];
    switch (sort) {
        case Sort.priceAsc:
            newProducts.sort((a, b) => a.price - b.price);
            break;
        case Sort.priceDesc:
            newProducts.sort((a, b) => b.price - a.price);
            break;
        case Sort.nameAsc:
            newProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case Sort.nameDesc:
            newProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case Sort.yearAsc:
            newProducts.sort((a, b) => a.year - b.year);
            break;
        case Sort.yearDesc:
            newProducts.sort((a, b) => b.year - a.year);
            break;
        case Sort.countAsc:
            newProducts.sort((a, b) => a.count - b.count);
            break;
        case Sort.countDesc:
            newProducts.sort((a, b) => b.count - a.count);
            break;
        default:
            newProducts.sort((a, b) => a.id - b.id);
            break;
    }
    return newProducts;
}

export const calculateMinMaxFromArray = (array: number[]): { min: number, max: number } => {
    const min = array.reduce((min, value) => Math.min(min, value), array[0]);
    const max = array.reduce((max, value) => Math.max(max, value), array[0]);
    return {min, max};
}

export const findCountByPercent = (min: number, max: number, percent: number): number => {
    return Math.round(min + (max - min) * percent / 100);
}