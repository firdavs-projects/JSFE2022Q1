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
    const [colorsState, setColorsState] = useState<Colors[]>(initialColors);
    const onChangeHandler = (color: Colors): void => {
        if (colorsState.includes(color)) {
            const filtered = colorsState.filter(c => c !== color);
            setColorsState(filtered);
            onChange(filtered);
        } else {
            onChange([...colorsState, color]);
            setColorsState([...colorsState, color]);
        }
    }

    return (
        <div className="colors">
            {colors.map(color => (
                <div 
                    key={color} 
                    id={'color-'+getColorName(color)} 
                    className={`box ${getColorName(color)}`} 
                    onClick={() => onChangeHandler(color)}
                >
                    {colorsState.includes(color) && <Icon name="check" size={22}/>}
                </div>
            ))}
        </div>
    );
};

export default Colorbox;
