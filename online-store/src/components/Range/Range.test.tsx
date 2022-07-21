import React from 'react';
import {render, screen} from '@testing-library/react';
import {Smartphone} from '../../types/Smartphone';
import {smartphones} from '../../assets/products';
import Range from '.';
import {RangeType} from '../../types';

test('should reset range value to init', () => {
    const initMinMax = {min: 0, max: 100};
    const currMinMax = {min: 50, max: 75};
    const changeHandler = (min: number, max: number, type: RangeType): void => {
        currMinMax.min = min;
        currMinMax.max = max;
    }
    render(
        <Range
            onChange={changeHandler}
            initialMinMax={initMinMax}
            title=''
            type={RangeType.Price}
            currentMinMax={currMinMax}
        />
    );
    const resetBtn = document.getElementById('range-reset-btn');
    resetBtn?.click();
    expect(currMinMax.min).toBe(initMinMax.min);
    expect(currMinMax.max).toBe(initMinMax.max);
})
