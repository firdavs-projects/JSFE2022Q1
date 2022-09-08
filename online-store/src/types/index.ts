export enum Colors {
    Black = 'Черный',
    White = 'Белый',
    Gold = 'Золотой',
    Silver = 'Серебряный',
    Red = 'Красный',
    Blue = 'Синий',
    Yellow = 'Желтый',
    Orange = 'Оранжевый',
    All = 'Все'
}

export enum Manufacturers {
    Samsung = 'Samsung',
    Apple = 'Apple',
    Xiaomi = 'Xiaomi',
}

export enum Currency {
    Usd = '$',
}

export enum localStorageKeys {
    Products = 'products',
    Cart = 'cart',
    Filters = 'filters',
}

export enum Sort {
    Default = 'default',
    PriceAsc = 'priceAsc',
    PriceDesc = 'priceDesc',
    NameAsc = 'nameAsc',
    NameDesc = 'nameDesc',
    CountAsc = 'countAsc',
    CountDesc = 'countDesc',
    YearAsc = 'yearAsc',
    YearDesc = 'yearDesc',
}

export enum RangeType {
    Price = 'price',
    Year = 'year',
    Count = 'count',
}

type Range = {
    min: number;
    max: number;
}

export type FilterType = {
    count: Range;
    price: Range;
    year: Range;
    colors: Colors[];
    brands: Manufacturers[];
    camCount: number[];
    sort: Sort;
    search: string;
    popular: boolean;
}
