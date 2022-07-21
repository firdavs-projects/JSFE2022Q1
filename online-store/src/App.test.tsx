import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {INITIAL_FILTERS} from './utils/constants';
import {smartphones} from './assets/products';
import {FilterType} from './types';
import {Smartphone} from './types/Smartphone';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

test('renders author link', () => {
    render(
        <App
            initialCart={[]}
            initialFilters={INITIAL_FILTERS}
            initialProducts={smartphones}
            maxCartSize={3}
        />);
    const linkElement = screen.getByText(/Firdavs Abdulloev/i);
    expect(linkElement).toBeInTheDocument();
});

test('should correctly set filters', async () => {
    let isPopular = false;
    const onChange = (filters: FilterType, p: Smartphone[], c: Smartphone[]): void => {
        isPopular = filters.popular;
    }
    render(
        <App
            initialCart={[]}
            initialFilters={INITIAL_FILTERS}
            initialProducts={smartphones}
            onChangeInitialData={onChange}
            maxCartSize={3}
        />
    );
    const popularBtn = document.getElementById('popular');
    popularBtn?.click();
    expect(isPopular).toBe(true);
}, 100)


test('should not add products to cart more than limit', async () => {
    const limitCount = 1;
    let currCount = 0;
    const onChange = (filters: FilterType, p: Smartphone[], c: Smartphone[]): void => {
        currCount = c.length;
    }
    render(
        <App
            initialCart={[]}
            initialFilters={INITIAL_FILTERS}
            initialProducts={smartphones}
            onChangeInitialData={onChange}
            maxCartSize={limitCount}
        />
    );
    const addBtns = document.getElementsByClassName('add-btn');
    const btn1 = addBtns[0] as HTMLElement;
    const btn2 = addBtns[1] as HTMLElement;
    btn1.click();
    btn2.click();
    expect(currCount).toBe(limitCount);
})
