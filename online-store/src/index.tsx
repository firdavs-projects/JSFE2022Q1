import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { smartphones } from './assets/products';
import {INITIAL_FILTERS, MAX_CART_SIZE } from './utils/constants';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <App 
            initialProducts={smartphones} 
            initialFilters={INITIAL_FILTERS} 
            initialCart={[]} 
            maxCartSize={MAX_CART_SIZE} 
        />
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
