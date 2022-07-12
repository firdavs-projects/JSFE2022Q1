import React, {useEffect, useState} from 'react';
import MainLayout from "./components/MainLayout";
import Products from "./components/Products";
import {Smartphone} from "./types/Smartphone";
import {smartphones} from "./assets/products";
import CartModal from "./components/CartModal";
import {localStorageGeneric} from "./utils";
import {localStorageKeys} from "./types";
import Search from "./components/Search";
import FiltersLayout from "./components/FiltersLayout";

function App() {
    const [products, setProducts] = useState<Smartphone[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cart, setCart] = useState<Smartphone[]>([]);

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
        setIsLoading(false);
    }

    const handleAddToCart = async (product: Smartphone): Promise<void> => {
        if (cart.find(p => p.id === product.id)) {
            const newCart = cart.filter(p => p.id !== product.id)
            setCart(newCart);
            localStorageGeneric<Smartphone[]>(localStorageKeys.cart, newCart);
        } else {
            setCart([...cart, product]);
            localStorageGeneric<Smartphone[]>(localStorageKeys.cart, [...cart, product]);
        }
    }

    const handleSearch = (search: string): void => {
        const newProducts = smartphones.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        setProducts(newProducts);
    }

    return (
        <MainLayout
            title="Смартфоны"
            cartCount={cart.length}
            cartOnClick={handleShow}
        >
            <FiltersLayout>
                <Search onInputChange={handleSearch}/>
            </FiltersLayout>
            <Products products={products} cart={cart} handleAddToCart={handleAddToCart}/>
            <CartModal cart={cart} show={show} handleClose={handleClose}/>
        </MainLayout>
    );
}

export default App;
