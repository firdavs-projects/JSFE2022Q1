import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

// is the element on the page
test('renders author link', () => {
    render(<App/>);
    const linkElement = screen.getByText(/Firdavs Abdulloev/i);
    expect(linkElement).toBeInTheDocument();
});
