import React from 'react';
import {render, screen} from '@testing-library/react';
import { calculateMinMax, filterByMinMax, findCountByPercent, findPercentByCount,
    getCartFullMessage, getColorName, removeDuplicates, searchByValue } from '.';
import { Colors, Currency, Manufacturers } from '../types';
import { Smartphone } from '../types/Smartphone';
const products: Smartphone[] = [
    {
        id: 1,
        name: 'Product 1',
        price: 100,
        color: Colors.Red,
        year: 2020,
        count: 10,
        camera: 10,
        camCount: 10,
        isPopular: true,
        currency: Currency.Usd,
        manufacturer: Manufacturers.Apple,
        image: 'https://via.placeholder.com/300x300',
    },
    {
        id: 2,
        name: 'Product 2',
        price: 200,
        color: Colors.Red,
        year: 2020,
        count: 10,
        camera: 10,
        camCount: 10,
        isPopular: true,
        currency: Currency.Usd,
        manufacturer: Manufacturers.Apple,
        image: 'https://via.placeholder.com/300x300',
    },
    {
        id: 3,
        name: 'Product 3',
        price: 150,
        color: Colors.Red,
        year: 2020,
        count: 10,
        camera: 10,
        camCount: 10,
        isPopular: true,
        currency: Currency.Usd,
        manufacturer: Manufacturers.Apple,
        image: 'https://via.placeholder.com/300x300',
    }
];

test('test function calculateMinMax', () => {
    const minMax = calculateMinMax(products.map(s => s.price));
    expect(minMax).toEqual({min: 100, max: 200});
})

test('test function findCountByPercent', () => {
    const minMax = {min: 100, max: 200};
    expect(findCountByPercent(minMax.min, minMax.max, 50)).toBe(150);
})

test('test function findPercentByCount', () => {
    const minMax = {min: 100, max: 200};
    expect(findPercentByCount(minMax.min, minMax.max, 150)).toBe(50);
})

test('test function getColorName', () => {
    expect(getColorName(Colors.Red)).toBe('red');
})

test('test function removeDuplicates', () => {
    expect(removeDuplicates([1,1,2,2,3,3,3,4])).toEqual([1,2,3,4]);
})

test('test function filterByMinMax', () => {
    expect(filterByMinMax(products, {min: 140, max: 160}, 'price')).toEqual([products[2]]);
})

test('test function searchByValue', () => {
    expect(searchByValue(products, 'Product 1', 'name')).toEqual([products[0]]);
})

test('test function getCartFullMessage', () => {
    expect(getCartFullMessage()).not.toBeUndefined();
})
