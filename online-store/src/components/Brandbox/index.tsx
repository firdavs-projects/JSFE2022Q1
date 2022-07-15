import React, {FC, useState} from 'react';
import {Icon} from 'ts-react-feather-icons';
import {Colors, Manufacturers} from "../../types";
import {getColorName} from "../../utils";
import samsung from "../../assets/icons/samsung.svg";
import apple from "../../assets/icons/apple.svg";
import xiaomi from "../../assets/icons/xiaomi.svg";

const getIcon = (manufacturer: Manufacturers): string => {
    switch (manufacturer) {
        case Manufacturers.samsung:
            return samsung;
        case Manufacturers.apple:
            return apple;
        case Manufacturers.xiaomi:
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
    // const [checked, setChecked] = useState<Manufacturers[]>(initialBrands);
    const onChangeHandler = (brand: Manufacturers): void => {
        if (initialBrands.includes(brand)) {
            // const filtered = checked.filter(b => b !== brand)
            // setChecked([])
            onChange([]);
        } else {
            // setChecked([brand])
            onChange([brand]);
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
