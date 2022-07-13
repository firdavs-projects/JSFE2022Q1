import React, {useEffect, useState} from 'react';
import MainLayout from "./components/MainLayout";
import Products from "./components/Products";
import {Smartphone} from "./types/Smartphone";
import {smartphones} from "./assets/products";
import CartModal from "./components/CartModal";
import {calculateMinMaxFromArray, localStorageGeneric, sortProducts} from "./utils";
import {FilterType, localStorageKeys, RangeType, Sort} from "./types";
import Search from "./components/Search";
import FiltersLayout from "./components/FiltersLayout";
import {Card, Col} from "react-bootstrap";
import Range from "./components/Range";
import {toast, Toaster} from 'react-hot-toast';
import FilterContainer from "./components/FilterContainer";

function App() {
    const [products, setProducts] = useState<Smartphone[]>([]);
    const [, setIsLoading] = useState<boolean>(true);
    const [cart, setCart] = useState<Smartphone[]>([]);

    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);

    const [minCount, setMinCount] = useState<number>(0);
    const [maxCount, setMaxCount] = useState<number>(0);

    const [filters, setFilters] = useState<FilterType>({
        count: {min: 0, max: Infinity},
        price: {min: 0, max: Infinity},
        sort: Sort.default,
        search: ''
    });

    const [show, setShow] = useState<boolean>(false);
    const handleClose = (): void => setShow(false);
    const handleShow = (): void => setShow(true);

    useEffect((): void => {
        getProducts();
        const localCart = localStorageGeneric<Smartphone[]>(localStorageKeys.cart)
        Array.isArray(localCart) && setCart(localCart);
    }, []);

    useEffect((): void => {
        setAllFilters();
    }, [filters]);

    const getProducts = (): void => {
        setIsLoading(true);
        setProducts(smartphones);
        const {min: minPrice, max: maxPrice} = calculateMinMaxFromArray(smartphones.map(s => s.price));
        const {min: minCount, max: maxCount} = calculateMinMaxFromArray(smartphones.map(s => s.count));
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        setMinCount(minCount);
        setMaxCount(maxCount);
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
        setFilters({...filters, search});
    }

    const handleSort = (sort: Sort): void => {
        setFilters({...filters, sort});
    }

    const handleRange = (min: number, max: number, type: RangeType): void => {
        setFilters({...filters, [type]: {min, max}});
    }

    const setAllFilters = (): void => {
        let newProducts = [...smartphones];
        filters.count && (newProducts = newProducts
            .filter(p => p.count >= filters.count.min && p.count <= filters.count.max));
        filters.price && (newProducts = newProducts
            .filter(p => p.price >= filters.price.min && p.price <= filters.price.max));
        filters.sort && (newProducts = sortProducts(newProducts, filters.sort));
        filters.search && (newProducts = newProducts
            .filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase())));
        setProducts(newProducts);
    }

    return (
        <MainLayout
            title="Смартфоны"
            cartCount={cart.length}
            cartOnClick={handleShow}
        >
            <FiltersLayout>
                <FilterContainer>
                    <Search
                        onSortChange={handleSort}
                        onInputChange={handleSearch}
                    />
                </FilterContainer>
                <FilterContainer>
                    <Range
                        type={RangeType.price}
                        onChange={handleRange}
                        maxValue={maxPrice}
                        minValue={minPrice}
                        title="По цене"
                    />
                    <Range
                        type={RangeType.count}
                        onChange={handleRange}
                        maxValue={maxCount}
                        minValue={minCount}
                        title="По количеству на складе"
                    />
                </FilterContainer>
            </FiltersLayout>

            <Products
                products={products}
                cart={cart}
                handleAddToCart={handleAddToCart}
            />

            <CartModal
                onRemoveFromCart={handleRemoveFromCart}
                cart={cart}
                show={show}
                handleClose={handleClose}
            />

            <Toaster/>
        </MainLayout>
    );
}

export default App;
