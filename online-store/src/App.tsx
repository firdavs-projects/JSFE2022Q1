import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {toast, Toaster} from 'react-hot-toast';
import {Button, Form} from 'react-bootstrap';

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

import {CART_FULL_MESSAGE, CROSS_CHECK_PR, INITIAL_FILTERS, INITIAL_MIN, MAX_CART_SIZE} from './utils/constants';
import {Colors, FilterType, localStorageKeys, Manufacturers, RangeType, Sort} from "./types";
import {
    calculateMinMaxFromArray,
    filterByMinMax,
    localStorageGeneric,
    removeDuplicates,
    searchByValue,
    sortProducts
} from "./utils";

const App: FC = (): JSX.Element => {
    const [products, setProducts] = useState<Smartphone[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cart, setCart] = useState<Smartphone[]>([]);
    const [colors, setColors] = useState<Colors[]>([]);
    const [manufacturers, setManufacturers] = useState<Manufacturers[]>([]);
    const [camCount, setCamCount] = useState<number[]>([]);

    const [minPrice, setMinPrice] = useState<number>(INITIAL_MIN);
    const [maxPrice, setMaxPrice] = useState<number>(INITIAL_MIN);
    const [minCount, setMinCount] = useState<number>(INITIAL_MIN);
    const [maxCount, setMaxCount] = useState<number>(INITIAL_MIN);
    const [minYear, setMinYear] = useState<number>(INITIAL_MIN);
    const [maxYear, setMaxYear] = useState<number>(INITIAL_MIN);

    const [filters, setFilters] = useState<FilterType>(INITIAL_FILTERS);

    const [show, setShow] = useState<boolean>(false);

    useEffect((): void => {
        getProducts();
        const localCart = localStorageGeneric<Smartphone[]>(localStorageKeys.cart)
        Array.isArray(localCart) && setCart(localCart);
        const localFilters = localStorageGeneric<FilterType>(localStorageKeys.filters)
        if (localFilters) {
            setFilters(localFilters);
        }
    }, []);

    const isInitialMount = useRef<boolean>(true);
    useEffect((): void => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            console.log(CROSS_CHECK_PR);
        } else {
            setAllFilters();
            localStorageGeneric<FilterType>(localStorageKeys.filters, filters);
        }
    }, [filters]);

    const getProducts = (): void => {
        setIsLoading(true);
        setProducts(smartphones);

        const {min: minPrice, max: maxPrice} = calculateMinMaxFromArray(smartphones.map(s => s.price));
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);

        const {min: minCount, max: maxCount} = calculateMinMaxFromArray(smartphones.map(s => s.count));
        setMinCount(minCount);
        setMaxCount(maxCount);

        const {min: minYear, max: maxYear} = calculateMinMaxFromArray(smartphones.map(s => s.year));
        setMinYear(minYear);
        setMaxYear(maxYear);

        const colors = removeDuplicates<Colors>(smartphones.map(s => s.color));
        setColors(colors);
        const manufacturers = removeDuplicates<Manufacturers>(smartphones.map(s => s.manufacturer));
        setManufacturers(manufacturers);
        const camCount = removeDuplicates<number>(smartphones.map(s => s.camCount)).sort();
        setCamCount(camCount);

        setIsLoading(false);
    }

    const handleClose = useCallback((): void => setShow(false), [show]);
    const handleShow = useCallback((): void => setShow(true), [show]);

    const setAllFilters = (): void => {
        let newProducts = [...smartphones];
        filters.count.max && (newProducts = filterByMinMax(newProducts, filters.count, 'count'));
        filters.price.max && (newProducts = filterByMinMax(newProducts, filters.price, 'price'));
        filters.year.max && (newProducts = filterByMinMax(newProducts, filters.year, 'year'));
        filters.sort && (newProducts = sortProducts(newProducts, filters.sort));
        filters.search && (newProducts = searchByValue(newProducts, filters.search, 'name'));
        filters.colors.length > 0 && (newProducts = newProducts.filter(p => filters.colors.includes(p.color)));
        filters.brands.length > 0 && (newProducts = newProducts.filter(p => filters.brands.includes(p.manufacturer)));
        filters.camCount.length > 0 && (newProducts = newProducts.filter(p => filters.camCount.includes(p.camCount)));
        filters.popular && (newProducts = newProducts.filter(p => p.isPopular));
        setProducts(newProducts);
    }

    const handleAddToCart = useCallback((product: Smartphone): void => {
        if (cart.length === MAX_CART_SIZE && !cart.find(p => p.id === product.id)) {
            toast.error(CART_FULL_MESSAGE);
            return;
        }
        if (cart.find(p => p.id === product.id)) {
            handleRemoveFromCart(product.id);
            return;
        }
        setCart([...cart, product]);
        localStorageGeneric<Smartphone[]>(localStorageKeys.cart, [...cart, product]);
    }, [cart])

    const handleRemoveFromCart = useCallback((id: number): void => {
        const newCart = cart.filter(p => p.id !== id)
        setCart(newCart);
        localStorageGeneric<Smartphone[]>(localStorageKeys.cart, newCart);
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
                            brands={manufacturers}
                            onChange={handleBrand}
                            initialBrands={filters.brands}
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                        <h5>По цвету</h5>
                        <Colorbox
                            colors={colors}
                            onChange={handleColor}
                            initialColors={filters.colors}
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                        <h5>По количеству камер</h5>
                        <Countbox
                            counts={camCount}
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
                        type={RangeType.price}
                        onChange={handleRange}
                        maxValue={maxPrice}
                        minValue={minPrice}
                        title="По цене"
                        initialMin={filters.price?.min || minPrice}
                        initialMax={filters.price?.max || maxPrice}
                    />
                    <Range
                        type={RangeType.count}
                        onChange={handleRange}
                        maxValue={maxCount}
                        minValue={minCount}
                        title="По количеству на складе"
                        initialMin={filters.count?.min || minCount}
                        initialMax={filters.count?.max || maxCount}
                    />
                    <Range
                        type={RangeType.year}
                        onChange={handleRange}
                        maxValue={maxYear}
                        minValue={minYear}
                        title="По году выпуска"
                        initialMin={filters.year?.min || minYear}
                        initialMax={filters.year?.max || maxYear}
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
