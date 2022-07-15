import {Colors, Currency, Manufacturers} from "./index";

export interface Smartphone {
    id: number;
    name: string;
    price: number;
    currency: Currency;
    color: Colors;
    image: string;
    manufacturer: Manufacturers;
    year: number;
    count: number;
    camera: number;
    camCount: number;
}
