import {Smartphone} from "../../types/Smartphone";
import {Colors, Currency, Manufacturers} from "../../types";

import s21 from '../images/1.png';
import a03 from '../images/2.png';
import s20 from '../images/3.png';
import poco from '../images/4.png';
import note11 from '../images/5.png';
import redmi9 from '../images/6.png';
import i11 from '../images/7.png';
import i13 from '../images/8.png';
import i12 from '../images/9.png';
import ce from '../images/10.png';

export const smartphones: Smartphone[] = [
    {
        id: 1,
        name: 'Samsung Galaxy S20',
        price: 899,
        currency: Currency.usd,
        color: Colors.yellow,
        image: s20,
        count: 10,
        manufacturer: Manufacturers.samsung,
        year: 2019,
        camera: 14,
        camCount: 3,
        isPopular: true
    },
    {
        id: 2,
        name: 'Samsung Galaxy S21',
        price: 1299,
        currency: Currency.usd,
        color: Colors.white,
        image: s21,
        count: 17,
        manufacturer: Manufacturers.samsung,
        year: 2022,
        camera: 20,
        camCount: 3,
        isPopular: true
    },
    {
        id: 3,
        name: 'Apple Iphone 11',
        price: 1499,
        currency: Currency.usd,
        color: Colors.white,
        image: i11,
        count: 14,
        manufacturer: Manufacturers.apple,
        year: 2018,
        camera: 16,
        camCount: 2,
        isPopular: false
    },
    {
        id: 4,
        name: 'Apple Iphone 12',
        price: 1799,
        currency: Currency.usd,
        color: Colors.yellow,
        image: i12,
        count: 7,
        manufacturer: Manufacturers.apple,
        year: 2020,
        camera: 16,
        camCount: 2,
        isPopular: false
    },
    {
        id: 5,
        name: 'Apple Iphone 13',
        price: 1999,
        currency: Currency.usd,
        color: Colors.red,
        image: i13,
        count: 4,
        manufacturer: Manufacturers.apple,
        year: 2021,
        camera: 19,
        camCount: 2,
        isPopular: true
    },
    {
        id: 6,
        name: 'Apple Iphone CE',
        price: 999,
        currency: Currency.usd,
        color: Colors.white,
        image: ce,
        count: 4,
        manufacturer: Manufacturers.apple,
        year: 2019,
        camera: 12,
        camCount: 1,
        isPopular: false
    },
    {
        id: 7,
        name: 'Samsung Galaxy A03',
        price: 399,
        currency: Currency.usd,
        color: Colors.red,
        image: a03,
        count: 37,
        manufacturer: Manufacturers.samsung,
        year: 2021,
        camera: 12,
        camCount: 2,
        isPopular: false
    },
    {
        id: 8,
        name: 'Xiaomi Poco X4 pro',
        price: 599,
        currency: Currency.usd,
        color: Colors.yellow,
        image: poco,
        count: 24,
        manufacturer: Manufacturers.xiaomi,
        year: 2022,
        camera: 48,
        camCount: 4,
        isPopular: false
    },
    {
        id: 9,
        name: 'Xiaomi Redmi 9C 3/64gb',
        price: 299,
        currency: Currency.usd,
        color: Colors.orange,
        image: redmi9,
        count: 46,
        manufacturer: Manufacturers.xiaomi,
        year: 2021,
        camera: 16,
        camCount: 3,
        isPopular: false
    },
    {
        id: 10,
        name: 'Xiaomi Redmi Note 11',
        price: 899,
        currency: Currency.usd,
        color: Colors.white,
        image: note11,
        count: 14,
        manufacturer: Manufacturers.xiaomi,
        year: 2022,
        camera: 48,
        camCount: 4,
        isPopular: true
    },
];
