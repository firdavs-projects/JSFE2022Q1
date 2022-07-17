import React, {FC, useRef, useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import {TwoSliders} from 'react-range-slider-ts';

import {findCountByPercent, findPercentByCount} from "../../utils";
import {RangeType} from "../../types";

import 'react-range-slider-ts/dist/index.css';
import './range.css';

type MinMax = {
    min: number;
    max: number;
}

interface RangeProps {
    onChange: (min: number, max: number, type: RangeType) => void;
    initialMinMax: MinMax;
    title: string;
    type: RangeType;
    currentMinMax: MinMax;
}

const SortRange: FC<RangeProps> = ({onChange, initialMinMax, title, type, currentMinMax}): JSX.Element => {
    const [, setForceUpDate] = useState<boolean>(false);
    const {min, max} = initialMinMax;
    const {min: currentMin, max: currentMax} = currentMinMax;
    const refSliderNumRun: React.MutableRefObject<number> = useRef(-1);

    const handleChangeMinSlider = (newPercent: number): void => {
        const currMin: number = findCountByPercent(min, max, newPercent);
        const currMax: number = currentMax;
        onChange(currMin, currMax, type);
    }

    const handleChangeMaxSlider = (newPercent: number): void => {
        const currMax: number = findCountByPercent(min, max, newPercent);
        const currMin: number = currentMin;
        onChange(currMin, currMax, type);
    }

    const afterMouseUp = (): void => {
        setForceUpDate((forceUpdate: boolean): boolean => !forceUpdate);
    }

    const handleReset = (): void => {
        onChange(min, max, type);
    }

    return (
        <div>
            <Card.Title className="d-flex my-0 justify-content-between align-items-center">
                {title}
                <Button
                    variant="outline-warning"
                    className="my-3"
                    onClick={handleReset}
                >
                    <small>Сбросить</small>
                </Button>
            </Card.Title>
            <div className='App_slider'>
                <div className="value">{Math.round(currentMin)}</div>
                <TwoSliders
                    range={<div className="range"/>}
                    active_range={<div className="activeRange"/>}
                    slider1={<div className="slider"/>}
                    slider2={<div className="slider"/>}
                    ref_slider_num_run={refSliderNumRun}
                    value1={findPercentByCount(min, max, currentMin)}
                    value2={findPercentByCount(min, max, currentMax)}
                    handleChangeSlider1={handleChangeMinSlider}
                    handleChangeSlider2={handleChangeMaxSlider}
                    afterMouseUp={afterMouseUp}
                />
                <div className="value">{Math.round(currentMax)}</div>
            </div>
        </div>
    );
};

export default SortRange;
