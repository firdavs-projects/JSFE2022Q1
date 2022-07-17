import React, {FC, useState} from 'react';
import {Icon} from 'ts-react-feather-icons';
import {Colors, Manufacturers} from "../../types";
import {getColorName} from "../../utils";
import samsung from "../../assets/icons/samsung.svg";
import apple from "../../assets/icons/apple.svg";
import xiaomi from "../../assets/icons/xiaomi.svg";

const getIcon = (manufacturer: Manufacturers): string => {
    switch (manufacturer) {
        case Manufacturers.Samsung:
            return samsung;
        case Manufacturers.Apple:
            return apple;
        case Manufacturers.Xiaomi:
            return xiaomi;
        default:
            return '';
    }
}

interface BrandboxProps {
    brands: Manufacturers[];
    onChange: (colors: Manufacturers[]) => void;
    initialBrands: Manufacturers[];
}

const Brandbox: FC<BrandboxProps> = ({brands, onChange, initialBrands}): JSX.Element => {
    const onChangeHandler = (brand: Manufacturers): void => {
        if (initialBrands.includes(brand)) {
            const filtered = initialBrands.filter(b => b !== brand)
            onChange(filtered);
        } else {
            onChange([...initialBrands, brand]);
        }
    }

    return (
        <div className="d-flex justify-content-center align-item-center">
            {brands.map(brand => (
                <div
                    key={brand}
                    className={`box ${brand} ${initialBrands.includes(brand) ? 'checked' : ''}`}
                    onClick={() => onChangeHandler(brand)}
                >
                    <img className="brand" src={getIcon(brand)} alt={brand}/>
                </div>
            ))}
        </div>
    );
};

export default Brandbox;
