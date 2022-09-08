import React, {FC, useState} from 'react';
import {Icon} from 'ts-react-feather-icons';

interface CountboxProps {
    counts: number[];
    onChange: (counts: number[]) => void;
    initialCount: number[];
}

const Countbox: FC<CountboxProps> = ({counts, onChange, initialCount}): JSX.Element => {
    const onChangeHandler = (count: number): void => {
        if (initialCount.includes(count)) {
            const filtered = initialCount.filter(c => c !== count);
            onChange(filtered);
        } else {
            onChange([...initialCount, count]);
        }
    }

    return (
        <div className="colors">
            {counts.map(count => (
                <div
                    key={count}
                    className={`box ${initialCount.includes(count) ? 'checked' : ''}`}
                    onClick={() => onChangeHandler(count)}
                >
                    {count}
                </div>
            ))}
        </div>
    );
};

export default Countbox;
