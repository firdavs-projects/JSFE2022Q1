import React, {useEffect, useState} from 'react';
import MainLayout from "./components/MainLayout";
import Products from "./components/Products";
import {Smartphone} from "./types/Smartphone";
import {smartphones} from "./assets/products";
import CartModal from "./components/CartModal";
import {calculateMinMax, localStorageGeneric, sortProducts} from "./utils";
import {localStorageKeys, Sort} from "./types";
import Search from "./components/Search";
import FiltersLayout from "./components/FiltersLayout";
import {Col} from "react-bootstrap";
import Range from "./components/Range";
import {toast, Toaster} from 'react-hot-toast';

function App() {
    const [products, setProducts] = useState<Smartphone[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cart, setCart] = useState<Smartphone[]>([]);

    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(100);

    const [show, setShow] = useState<boolean>(false);
    const handleClose = (): void => setShow(false);
    const handleShow = (): void => setShow(true);

    useEffect((): void => {
        getProducts();
        const localCart = localStorageGeneric<Smartphone[]>(localStorageKeys.cart)
        Array.isArray(localCart) && setCart(localCart);
    }, []);

    const getProducts = (): void => {
        setIsLoading(true);
        setProducts(smartphones);
        const {min, max} = calculateMinMax(smartphones);
        setMinPrice(min);
        setMaxPrice(max);
        setIsLoading(false);
    }

    const handleAddToCart = (product: Smartphone): void => {
        if (cart.length === 20) {
            toast.error('Извините, все слоты заполнены')
            return;
        }
        if (cart.find(p => p.id === product.id)) {
            handleRemoveFromCart(product.id);
        } else {
            setCart([...cart, product]);
            localStorageGeneric<Smartphone[]>(localStorageKeys.cart, [...cart, product]);
        }
    }

    const handleRemoveFromCart = (id: number): void => {
        const newCart = cart.filter(p => p.id !== id)
        setCart(newCart);
        localStorageGeneric<Smartphone[]>(localStorageKeys.cart, newCart);
    }

    const handleSearch = (search: string): void => {
        const newProducts = smartphones.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        setProducts(newProducts);
    }

    const handleSort = (sort: Sort): void => {
        setProducts(sortProducts(products, sort));
    }

    const handleRange = (min: number, max: number): void => {
        const newProducts = smartphones.filter(p => p.price >= min && p.price <= max);
        setProducts(newProducts);
    }

    return (
        <MainLayout
            title="Смартфоны"
            cartCount={cart.length}
            cartOnClick={handleShow}
        >
            <FiltersLayout>
                <Col><Search onSortChange={handleSort} onInputChange={handleSearch}/></Col>
                <Col><Range onChange={handleRange} maxValue={maxPrice} minValue={minPrice}/></Col>
            </FiltersLayout>
            <Products products={products} cart={cart} handleAddToCart={handleAddToCart}/>
            <CartModal onRemoveFromCart={handleRemoveFromCart} cart={cart} show={show} handleClose={handleClose}/>
            <Toaster/>
        </MainLayout>
    );
}

export default App;
