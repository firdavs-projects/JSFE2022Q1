import React, {useEffect, useRef, useState} from 'react';
import MainLayout from "./components/MainLayout";
import Products from "./components/Products";
import {Smartphone} from "./types/Smartphone";
import {smartphones} from "./assets/products";
import CartModal from "./components/CartModal";
import {calculateMinMaxFromArray, localStorageGeneric, sortProducts} from "./utils";
import {Colors, FilterType, localStorageKeys, RangeType, Sort} from "./types";
import Search from "./components/Search";
import FiltersLayout from "./components/FiltersLayout";
import Range from "./components/Range";
import {toast, Toaster} from 'react-hot-toast';
import FilterContainer from "./components/FilterContainer";
import Colorbox from "./components/Colorbox";

const INITIAL_MIN = 0;
const MAX_CART_SIZE = 20;
const INITIAL_FILTERS = {
    count: {min: INITIAL_MIN, max: Infinity},
    price: {min: INITIAL_MIN, max: Infinity},
    year: {min: INITIAL_MIN, max: Infinity},
    colors: [],
    sort: Sort.default,
    search: ''
}

function App() {
    const [products, setProducts] = useState<Smartphone[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cart, setCart] = useState<Smartphone[]>([]);
    const [colors, setColors] = useState<Colors[]>([]);

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

    const isInitialMount = useRef(true);
    useEffect(() => {
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
        const {min: minCount, max: maxCount} = calculateMinMaxFromArray(smartphones.map(s => s.count));
        const {min: minYear, max: maxYear} = calculateMinMaxFromArray(smartphones.map(s => s.year));
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        setMinCount(minCount);
        setMaxCount(maxCount);
        setMinYear(minYear);
        setMaxYear(maxYear);
        const colors = smartphones
            .map(s => s.color)
            .filter((v, i, a) => a.indexOf(v) === i);
        setColors(colors);
        setFilters({...INITIAL_FILTERS, colors});
        setIsLoading(false);
    }

    const handleAddToCart = (product: Smartphone): void => {
        if (cart.length === MAX_CART_SIZE) {
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

    const handleColor = (colors: Colors[]): void => {
        setFilters({...filters, colors});
    }

    const setAllFilters = (): void => {
        let newProducts = [...smartphones];
        filters.count && (newProducts = newProducts
            .filter(p => p.count >= filters.count.min && p.count <= filters.count.max));
        filters.price && (newProducts = newProducts
            .filter(p => p.price >= filters.price.min && p.price <= filters.price.max));
        filters.year && (newProducts = newProducts
            .filter(p => p.year >= filters.year.min && p.year <= filters.year.max));
        filters.sort && (newProducts = sortProducts(newProducts, filters.sort));
        filters.search && (newProducts = newProducts
            .filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase())));
        filters.colors && (newProducts = newProducts
            .filter(p => filters.colors.includes(p.color)));
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
