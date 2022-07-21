import React, { useState } from 'react';
import {render, screen} from '@testing-library/react';
import {Smartphone} from '../../types/Smartphone';
import {smartphones} from '../../assets/products';
import Colorbox from '.';
import { Colors } from '../../types';

test('should return correct colors', () => {
    let colors: Colors[] = [Colors.Red, Colors.Blue, Colors.Gold];
    let colorsState: Colors[] = [];
    const onChange = (newColors: Colors[]): void => {
        colorsState = newColors;
    }
    render(
        <Colorbox 
            colors={colors} 
            onChange={onChange} 
            initialColors={colorsState}
        />
    );
    const redBox = document.getElementById('color-red');
    const blueBox = document.getElementById('color-blue');
    const goldBox = document.getElementById('color-gold');
    redBox?.click();
    expect(colorsState).toStrictEqual([Colors.Red]);
    redBox?.click();
    goldBox?.click();
    blueBox?.click();
    expect(colorsState).toStrictEqual([Colors.Gold, Colors.Blue]);
})
