import React, {FC, useRef, useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import {TwoSliders} from 'react-range-slider-ts';
import 'react-range-slider-ts/dist/index.css';
import './range.css';
import {findCountByPercent} from "../../utils";
import {RangeType} from "../../types";
import {MIN, MAX} from '../../utils/constants';

interface RangeProps {
    onChange: (min: number, max: number, type: RangeType) => void;
    minValue: number;
    maxValue: number;
    title: string;
    type: RangeType;
}

const SortRange: FC<RangeProps> = ({onChange, minValue, maxValue, title, type}): JSX.Element => {
    const [min, setMin] = useState<number>(MIN);
    const [max, setMax] = useState<number>(MAX);
    const [, setForceUpDate] = useState<boolean>(false);

    const refSliderNumRun: React.MutableRefObject<number> = useRef(-1);

    const handleChangeSlider1 = (newPercent: number): void => {
        setMin(newPercent);
        const curr: number = findCountByPercent(minValue, maxValue, newPercent);
        const max: number = findCountByPercent(minValue, maxValue, MAX);
        onChange(curr, max, type);
    }

    const handleChangeSlider2 = (newPercent: number): void => {
        setMax(newPercent);
        const curr: number = findCountByPercent(minValue, maxValue, newPercent);
        const min: number = findCountByPercent(minValue, maxValue, MIN);
        onChange(min, curr, type);
    }

    const afterMouseUp = (): void => {
        setForceUpDate((forceUpdate: boolean): boolean => !forceUpdate);
    }

    const handleReset = (): void => {
        setMin(MIN);
        setMax(MAX);
        onChange(minValue, maxValue, type);
    }

    return (
        <div>
            <Card.Title className="d-flex justify-content-between align-items-center">
                {title}
                <Button
                    variant="warning"
                    className="my-3"
                    onClick={handleReset}
                >
                    <small>Сбросить</small>
                </Button></Card.Title>
            <div className='App_slider'>
                <div className="value">{findCountByPercent(minValue, maxValue, min)}</div>
                <TwoSliders
                    range={<div className="range"/>}
                    active_range={<div className="activeRange"/>}
                    slider1={<div className="slider"/>}
                    slider2={<div className="slider"/>}
                    ref_slider_num_run={refSliderNumRun}
                    value1={min}
                    value2={max}
                    handleChangeSlider1={handleChangeSlider1}
                    handleChangeSlider2={handleChangeSlider2}
                    afterMouseUp={afterMouseUp}
                />
                <div className="value">{findCountByPercent(minValue, maxValue, max)}</div>
            </div>

        </div>
    );
};

export default SortRange;
