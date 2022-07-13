export enum Colors {
    black = 'Черный',
    white = 'Белый',
    gold = 'Золотой',
    silver = 'Серебряный',
    red = 'Красный',
    blue = 'Синий',
    yellow = 'Желтый',
    orange = 'Оранжевый',
    all = 'Все'
}

export enum Manufacturers {
    samsung = 'Samsung',
    apple = 'Apple',
    xiaomi = 'Xiaomi',
}

export enum Currency {
    usd = '$',
}

export enum localStorageKeys {
    products = 'products',
    cart = 'cart',
}

export enum Sort {
    default = 'default',
    priceAsc = 'priceAsc',
    priceDesc = 'priceDesc',
    nameAsc = 'nameAsc',
    nameDesc = 'nameDesc',
    countAsc = 'countAsc',
    countDesc = 'countDesc',
    yearAsc = 'yearAsc',
    yearDesc = 'yearDesc',
}

export enum RangeType {
    price = 'price',
    year = 'year',
    count = 'count',
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
    sort: Sort;
    search: string;
}