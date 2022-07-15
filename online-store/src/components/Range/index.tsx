import React, {FC, useRef, useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import {TwoSliders} from 'react-range-slider-ts';
import 'react-range-slider-ts/dist/index.css';
import './range.css';
import {findCountByPercent, findPercentByCount} from "../../utils";
import {RangeType} from "../../types";

interface RangeProps {
    onChange: (min: number, max: number, type: RangeType) => void;
    minValue: number;
    maxValue: number;
    title: string;
    type: RangeType;
    initialMin: number;
    initialMax: number;
}

const SortRange: FC<RangeProps> = ({onChange, minValue, maxValue, title, type, initialMin, initialMax}): JSX.Element => {
    const [, setForceUpDate] = useState<boolean>(false);

    const refSliderNumRun: React.MutableRefObject<number> = useRef(-1);

    const handleChangeSlider1 = (newPercent: number): void => {
        const curr: number = findCountByPercent(minValue, maxValue, newPercent);
        const max: number = initialMax;
        onChange(curr, max, type);
    }

    const handleChangeSlider2 = (newPercent: number): void => {
        const curr: number = findCountByPercent(minValue, maxValue, newPercent);
        const min: number = initialMin;
        onChange(min, curr, type);
    }

    const afterMouseUp = (): void => {
        setForceUpDate((forceUpdate: boolean): boolean => !forceUpdate);
    }

    const handleReset = (): void => {
        onChange(minValue, maxValue, type);
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
                </Button></Card.Title>
            <div className='App_slider'>
                <div className="value">{Math.round(initialMin)}</div>
                <TwoSliders
                    range={<div className="range"/>}
                    active_range={<div className="activeRange"/>}
                    slider1={<div className="slider"/>}
                    slider2={<div className="slider"/>}
                    ref_slider_num_run={refSliderNumRun}
                    value1={findPercentByCount(minValue, maxValue, initialMin)}
                    value2={findPercentByCount(minValue, maxValue, initialMax)}
                    handleChangeSlider1={handleChangeSlider1}
                    handleChangeSlider2={handleChangeSlider2}
                    afterMouseUp={afterMouseUp}
                />
                <div className="value">{Math.round(initialMax)}</div>
            </div>

        </div>
    );
};

export default SortRange;
