import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {toast, Toaster} from 'react-hot-toast';
import {Button, Form} from 'react-bootstrap';
import { useFilters } from './hooks/useFilters';

import MainLayout from "./components/MainLayout";
import FiltersLayout from "./components/FiltersLayout";
import FilterContainer from "./components/FilterContainer";
import Products from "./components/Products";
import {Smartphone} from "./types/Smartphone";
import {smartphones} from "./assets/products";
import CartModal from "./components/CartModal";
import Search from "./components/Search";
import Range from "./components/Range";
import Colorbox from "./components/Colorbox";
import Brandbox from './components/Brandbox';
import Countbox from './components/Countbox';

import {CROSS_CHECK_PR, INITIAL_FILTERS, INITIAL_MIN, MAX_CART_SIZE} from './utils/constants';
import {Colors, FilterType, localStorageKeys, Manufacturers, RangeType, Sort} from "./types";
import {
    calculateMinMax,
    filterByMinMax,
    localStr,
    removeDuplicates,
    searchByValue,
    sortProducts,
    getCartFullMessage
} from "./utils";

const App: FC = (): JSX.Element => {
    const [products, setProducts] = useState<Smartphone[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cart, setCart] = useState<Smartphone[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const {filtered, filters, setFilters} = useFilters(products, INITIAL_FILTERS);

    useEffect((): void => {
        console.log(CROSS_CHECK_PR);
        getProducts();
        const localCart = localStr<Smartphone[]>(localStorageKeys.Cart)
        Array.isArray(localCart) && setCart(localCart);
    }, []);

    const getProducts = (): void => {
        setIsLoading(true);
        setProducts(smartphones);
        setIsLoading(false);
    }

    const handleClose = useCallback((): void => setShow(false), [show]);
    const handleShow = useCallback((): void => setShow(true), [show]);

    const handleAddToCart = useCallback((product: Smartphone): void => {
        if (cart.length === MAX_CART_SIZE && !cart.find(p => p.id === product.id)) {
            toast.error(getCartFullMessage());
            return;
        }
        if (cart.find(p => p.id === product.id)) {
            handleRemoveFromCart(product.id);
            return;
        }
        setCart([...cart, product]);
        localStr<Smartphone[]>(localStorageKeys.Cart, [...cart, product]);
    }, [cart])

    const handleRemoveFromCart = useCallback((id: number): void => {
        const newCart = cart.filter(p => p.id !== id)
        setCart(newCart);
        localStr<Smartphone[]>(localStorageKeys.Cart, newCart);
    }, [cart])

    const handleSearch = useCallback((search: string): void => {
        setFilters({...filters, search});
    }, [filters])

    const handleSort = useCallback((sort: Sort): void => {
        setFilters({...filters, sort});
    }, [filters])

    const handleRange = useCallback((min: number, max: number, type: RangeType): void => {
        setFilters({...filters, [type]: {min, max}});
    }, [filters])

    const handleColor = useCallback((colors: Colors[]): void => {
        setFilters({...filters, colors});
    }, [filters])

    const handleBrand = useCallback((brands: Manufacturers[]): void => {
        setFilters({...filters, brands});
    }, [filters])

    const handlePopular = useCallback((): void => {
        setFilters({...filters, popular: !filters.popular});
    }, [filters]);

    const handleCamCount = useCallback((camCount: number[]): void => {
        setFilters({...filters, camCount});
    }, [filters])

    const resetAll = useCallback((): void => {
        localStorage.clear();
        setCart([]);
        setFilters(INITIAL_FILTERS);
        getProducts();
    }, [cart, filters])

    return (
        <MainLayout
            title="Смартфоны"
            cartCount={cart.length}
            cartOnClick={handleShow}
        >
            {!isLoading && <FiltersLayout>
                <FilterContainer lg={12}>
                    <h5>Фильтры по значению</h5>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                        <h5>По производителю</h5>
                        <Brandbox
                            brands={removeDuplicates<Manufacturers>(smartphones.map(s => s.manufacturer))}
                            onChange={handleBrand}
                            initialBrands={filters.brands}
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                        <h5>По цвету</h5>
                        <Colorbox
                            colors={removeDuplicates<Colors>(products.map(s => s.color))}
                            onChange={handleColor}
                            initialColors={filters.colors}
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                        <h5>По количеству камер</h5>
                        <Countbox
                            counts={removeDuplicates<number>(smartphones.map(s => s.camCount)).sort()}
                            onChange={handleCamCount}
                            initialCount={filters.camCount}
                        />
                    </div>
                    <div className="mt-3 pointer">
                        <Form.Check
                            type="checkbox"
                            id="popular"
                            checked={filters.popular}
                            onChange={handlePopular}
                            label="Только популярные товары"
                        />
                    </div>
                </FilterContainer>
                <FilterContainer>
                    <h5>Фильтры по диапазону</h5>
                    <Range
                        type={RangeType.Price}
                        onChange={handleRange}
                        initialMinMax={calculateMinMax(products.map(s => s.price))}
                        currentMinMax={filters.price.max ? filters.price : calculateMinMax(products.map(s => s.price))}
                        title="По цене"
                    />
                    <Range
                        type={RangeType.Count}
                        onChange={handleRange}
                        initialMinMax={calculateMinMax(products.map(s => s.count))}
                        currentMinMax={filters.count.max ? filters.count : calculateMinMax(products.map(s => s.count))}
                        title="По количеству на складе"
                    />
                    <Range
                        type={RangeType.Year}
                        onChange={handleRange}
                        initialMinMax={calculateMinMax(products.map(s => s.year))}
                        currentMinMax={filters.year.max ? filters.year : calculateMinMax(products.map(s => s.year))}
                        title="По году выпуска"
                    />
                </FilterContainer>
                <FilterContainer>
                    <h5>Сортировки по значению</h5>
                    <Search
                        onSortChange={handleSort}
                        onInputChange={handleSearch}
                        initialSort={filters.sort}
                        initialValue={filters.search}
                    />
                    <div className="d-flex">
                        <Button
                            className="w-100 mr-1"
                            variant="outline-warning"
                            onClick={() => setFilters({...INITIAL_FILTERS, sort: filters.sort})}
                        >
                            Сбросить фильтры
                        </Button>
                        <Button
                            className="w-100 ml-1"
                            variant="outline-warning"
                            onClick={resetAll}
                        >
                            Сброс настроек
                        </Button>
                    </div>
                </FilterContainer>
            </FiltersLayout>}

            <Products
                products={filtered}
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
