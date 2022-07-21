import React from 'react';
import {render, screen} from '@testing-library/react';
import { Smartphone } from '../../types/Smartphone';
import { smartphones } from '../../assets/products';
import Product from '.';

test('add product to cart', () => {
    const cart: Smartphone[] = [];
    const handleAddToCart = (product: Smartphone) => {
        cart.push(product);
    }
    render(<Product product={smartphones[0]} cart={cart} handleAddToCart={handleAddToCart}/>);
    const button = screen.getByText('Добавить');
    button.click();
    expect(cart.length).toBe(1);
})
