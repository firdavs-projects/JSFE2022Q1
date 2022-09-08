import {useEffect, useRef, useState} from "react";
import {FilterType, localStorageKeys} from "../types";
import {Smartphone} from "../types/Smartphone";
import {filterByMinMax, localStr, searchByValue, sortProducts} from "../utils";

interface UseFilters {
    filtered: Smartphone[];
    filters: FilterType;
    setFilters: (filters: FilterType) => void;
}

export const useFilters = (products: Smartphone[], initialFilters: FilterType): UseFilters => {
    const [filters, setFilters] = useState<FilterType>(initialFilters);
    const [filtered, setFiltered] = useState<Smartphone[]>(products);
    
    useEffect(()=> {
        setAllFilters();
    }, [products])

    const isInitialMount = useRef<boolean>(true);
    useEffect((): void => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            const localFilters = localStr<FilterType>(localStorageKeys.Filters)
            setFilters(localFilters || initialFilters);
        } else {
            setAllFilters();
            localStr<FilterType>(localStorageKeys.Filters, filters);
        }
    }, [filters]);

    const setAllFilters = (): void => {
        let newProducts = [...products];
        filters.count.max && (newProducts = filterByMinMax(newProducts, filters.count, 'count'));
        filters.price.max && (newProducts = filterByMinMax(newProducts, filters.price, 'price'));
        filters.year.max && (newProducts = filterByMinMax(newProducts, filters.year, 'year'));
        filters.sort && (newProducts = sortProducts(newProducts, filters.sort));
        filters.search && (newProducts = searchByValue(newProducts, filters.search, 'name'));
        filters.colors.length > 0 && (newProducts = newProducts.filter(p => filters.colors.includes(p.color)));
        filters.brands.length > 0 && (newProducts = newProducts.filter(p => filters.brands.includes(p.manufacturer)));
        filters.camCount.length > 0 && (newProducts = newProducts.filter(p => filters.camCount.includes(p.camCount)));
        filters.popular && (newProducts = newProducts.filter(p => p.isPopular));
        setFiltered(newProducts);
    }

    return {filtered, filters, setFilters};
}
