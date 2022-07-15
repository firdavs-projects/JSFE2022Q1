import React, {FC, useState} from 'react';
import {Icon} from 'ts-react-feather-icons';
import {Colors} from "../../types";
import {getColorName} from "../../utils";

interface ColorboxProps {
    colors: Colors[];
    onChange: (colors: Colors[]) => void;
    initialColors: Colors[];
}

const Colorbox: FC<ColorboxProps> = ({colors, onChange, initialColors}): JSX.Element => {
    const onChangeHandler = (color: Colors): void => {
        if (initialColors.includes(color)) {
            const filtered = initialColors.filter(c => c !== color);
            onChange(filtered);
        } else {
            onChange([...initialColors, color]);
        }
    }

    return (
        <div className="colors">
            {colors.map(color => (
                <div key={color} className={`box ${getColorName(color)}`} onClick={() => onChangeHandler(color)}>
                    {initialColors.includes(color) && <Icon name="check" size={22}/>}
                </div>
            ))}
        </div>
    );
};

export default Colorbox;
