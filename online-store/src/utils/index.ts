import {Colors, Sort} from "../types";
import {Smartphone} from "../types/Smartphone";
import { MAX_CART_SIZE } from "./constants";

export const localStr = <T>(key: string, value?: T): T | undefined => {
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
        case Sort.PriceAsc:
            newProducts.sort((a, b) => a.price - b.price);
            break;
        case Sort.PriceDesc:
            newProducts.sort((a, b) => b.price - a.price);
            break;
        case Sort.NameAsc:
            newProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case Sort.NameDesc:
            newProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case Sort.YearAsc:
            newProducts.sort((a, b) => a.year - b.year);
            break;
        case Sort.YearDesc:
            newProducts.sort((a, b) => b.year - a.year);
            break;
        case Sort.CountAsc:
            newProducts.sort((a, b) => a.count - b.count);
            break;
        case Sort.CountDesc:
            newProducts.sort((a, b) => b.count - a.count);
            break;
        default:
            newProducts.sort((a, b) => a.id - b.id);
            break;
    }
    return newProducts;
}

export const calculateMinMax = (array: number[]): { min: number, max: number } => {
    const min = Math.min.apply(null, array);
    const max = Math.max.apply(null, array);
    return {min, max};
}

export const findCountByPercent = (min: number, max: number, percent: number): number => {
    return min + (max - min) * percent / 100;
}
export const findPercentByCount = (min: number, max: number, count: number): number => {
    if (max - min !== 0) {
        return (count - min) / (max - min) * 100;
    }
    return 0;
}

export const getColorName = (color: Colors): string => {
    switch (color) {
        case Colors.Red:
            return 'red';
        case Colors.Blue:
            return 'blue';
        case Colors.Yellow:
            return 'yellow';
        case Colors.Orange:
            return 'orange';
        case Colors.White:
            return 'white';
        case Colors.Gold:
            return 'gold';
        default:
            return '';
    }
}

export const removeDuplicates = <T>(array: T[]): T[] => {
    return array.filter((v, i, a) => a.indexOf(v) === i);
}

export const filterByMinMax = (
    products: Smartphone[],
    {min, max}: { min: number, max: number },
    key: keyof Smartphone
): Smartphone[] => {
    return products.filter(product => product[key] >= min && product[key] <= max);
}

export const searchByValue = (products: Smartphone[], value: string, key: keyof Smartphone): Smartphone[] => {
    return products.filter(p => `${p[key]}`.toLowerCase().includes(value.toLowerCase()));
}

export const getCartFullMessage = (limit: number = MAX_CART_SIZE): string => {
    return `Извините, все слоты заполнены.\nP.S. Из за ограниченности тестовых данных лимит установлен на ${limit} товаров.`
};

