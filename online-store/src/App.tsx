import React, {FC, useEffect, useRef, useState} from 'react';
import {toast, Toaster} from 'react-hot-toast';

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

import {CART_FULL_MESSAGE, INITIAL_FILTERS, INITIAL_MIN, MAX_CART_SIZE} from './utils/constants';
import {Colors, FilterType, localStorageKeys, Manufacturers, RangeType, Sort} from "./types";
import {
    calculateMinMaxFromArray,
    filterByMinMax,
    localStorageGeneric,
    removeDuplicates,
    searchByValue,
    sortProducts
} from "./utils";
import Brandbox from './components/Brandbox';

const App: FC = (): JSX.Element => {
    const [products, setProducts] = useState<Smartphone[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cart, setCart] = useState<Smartphone[]>([]);
    const [colors, setColors] = useState<Colors[]>([]);
    const [manufacturers, setManufacturers] = useState<Manufacturers[]>([]);

    const [minPrice, setMinPrice] = useState<number>(INITIAL_MIN);
    const [maxPrice, setMaxPrice] = useState<number>(INITIAL_MIN);
    const [minCount, setMinCount] = useState<number>(INITIAL_MIN);
    const [maxCount, setMaxCount] = useState<number>(INITIAL_MIN);
    const [minYear, setMinYear] = useState<number>(INITIAL_MIN);
    const [maxYear, setMaxYear] = useState<number>(INITIAL_MIN);

    const [filters, setFilters] = useState<FilterType>(INITIAL_FILTERS);

    const [show, setShow] = useState<boolean>(false);

    const handleClose = (): void => setShow(false);
    const handleShow = (): void => setShow(true);

    useEffect((): void => {
        getProducts();
        const localCart = localStorageGeneric<Smartphone[]>(localStorageKeys.cart)
        Array.isArray(localCart) && setCart(localCart);
    }, []);

    const isInitialMount = useRef<boolean>(true);
    useEffect((): void => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setAllFilters();
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

        setFilters(INITIAL_FILTERS);
        setIsLoading(false);
    }

    const handleAddToCart = (product: Smartphone): void => {
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

    const handleColor = (colors: Colors[]): void => {
        setFilters({...filters, colors});
    }

    const handleBrand = (brands: Manufacturers[]): void => {
        setFilters({...filters, brands});
    }

    const setAllFilters = (): void => {
        let newProducts = [...smartphones];
        filters.count && (newProducts = filterByMinMax(newProducts, filters.count, 'count'));
        filters.price && (newProducts = filterByMinMax(newProducts, filters.price, 'price'));
        filters.year && (newProducts = filterByMinMax(newProducts, filters.year, 'year'));
        filters.sort && (newProducts = sortProducts(newProducts, filters.sort));
        filters.search && (newProducts = searchByValue(newProducts, filters.search, 'name'));
        filters.colors.length > 0 && (newProducts = newProducts.filter(p => filters.colors.includes(p.color)));
        filters.brands.length > 0 && (newProducts = newProducts.filter(p => filters.brands.includes(p.manufacturer)));
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
                    <h4>Сортировки</h4>
                    <Search
                        onSortChange={handleSort}
                        onInputChange={handleSearch}
                    />
                </FilterContainer>
                <FilterContainer>
                    <h4>Диапазоны</h4>
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
                <FilterContainer lg={12}>
                    <h4>Характеристики</h4>
                    <Range
                        type={RangeType.year}
                        onChange={handleRange}
                        maxValue={maxYear}
                        minValue={minYear}
                        title="По году выпуска"
                    />
                    <div className="d-flex align-items-center justify-content-between mt-4">
                        <h5>По цвету</h5>
                        {!isLoading && <Colorbox colors={colors} onChange={handleColor}/>}
                    </div>

                    <div className="d-flex align-items-center justify-content-between mt-4">
                        <h5>По производителю</h5>
                        {!isLoading && <Brandbox brands={manufacturers} onChange={handleBrand}/>}
                    </div>
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
