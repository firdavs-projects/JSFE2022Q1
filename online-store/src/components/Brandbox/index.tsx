import React, {FC, useState} from 'react';
import {Icon} from 'ts-react-feather-icons';
import {Colors, Manufacturers} from "../../types";
import {getColorName} from "../../utils";

interface BrandboxProps {
    brands: Manufacturers[];
    onChange: (colors: Manufacturers[]) => void;
}

const Brandbox: FC<BrandboxProps> = ({brands, onChange}): JSX.Element => {
    const [checked, setChecked] = useState<Manufacturers[]>(brands);
    const onChangeHandler = (brand: Manufacturers): void => {
        if (checked.includes(brand)) {
            const filtered = checked.filter(b => b !== brand)
            setChecked(filtered)
            onChange(filtered);
        } else {
            setChecked([...checked, brand])
            onChange([...checked, brand]);
        }
    }

    return (
        <div className="colors">
            {brands.map(brand => (
                <div key={brand} className={`box ${brand}`} onClick={() => onChangeHandler(brand)}>
                    {checked.includes(brand) && <Icon name="check" size={22}/>}
                </div>
            ))}
        </div>
    );
};

export default Brandbox;
