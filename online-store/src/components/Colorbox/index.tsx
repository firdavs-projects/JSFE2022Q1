import React, {FC, useState} from 'react';
import {Icon} from 'ts-react-feather-icons';
import {Colors} from "../../types";
import {getColorName} from "../../utils";

interface ColorboxProps {
    colors: Colors[];
    onChange: (colors: Colors[]) => void;
}

const Colorbox: FC<ColorboxProps> = ({colors, onChange}) => {
    const [checked, setChecked] = useState<Colors[]>(colors);
    const onChangeHandler = (color: Colors): void => {
        if (checked.includes(color)) {
            const filtered = checked.filter(c => c !== color)
            setChecked(filtered)
            onChange(filtered);
        } else {
            setChecked([...checked, color])
            onChange([...checked, color]);
        }
    }

    return (
        <div className="colors">
            {colors.map(color => (
                <div key={color} className={`box ${getColorName(color)}`} onClick={() => onChangeHandler(color)}>
                    {checked.includes(color) && <Icon name="check" size={22}/>}
                </div>
            ))}
        </div>

    );
};

export default Colorbox;
