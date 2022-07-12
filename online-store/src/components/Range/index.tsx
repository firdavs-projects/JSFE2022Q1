import React, {FC, useRef, useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import {TwoSliders} from 'react-range-slider-ts';
import 'react-range-slider-ts/dist/index.css';
import './range.css';
import {findPriceByPercent} from "../../utils";

const MAX = 100;
const MIN = 0;
const range: JSX.Element = (
    <div className="range"/>
);

const activeRange: JSX.Element = (
    <div className="activeRange"/>
);

const slider: JSX.Element = (
    <div className="slider"/>
);

export interface RangeProps {
    onChange: (min: number, max: number) => void;
    minValue: number;
    maxValue: number;
}

const SortRange: FC<RangeProps> = ({onChange, minValue, maxValue}) => {
    const [min, setMin] = useState<number>(MIN);
    const [max, setMax] = useState<number>(MAX);
    const [, setForceUpDate] = useState<boolean>(false);

    const refSliderNumRun: React.MutableRefObject<number> = useRef(-1);

    const handleChangeSlider1 = (newPercent: number): void => {
        setMin(newPercent);
        const curr: number = findPriceByPercent(minValue, maxValue, newPercent);
        const max: number = findPriceByPercent(minValue, maxValue, MAX);
        onChange(curr, max);
    }

    const handleChangeSlider2 = (newPercent: number): void => {
        setMax(newPercent);
        const curr: number = findPriceByPercent(minValue, maxValue, newPercent);
        const min: number = findPriceByPercent(minValue, maxValue, MIN);
        onChange(min, curr);
    }

    const afterMouseUp = (): void => {
        setForceUpDate((forceUpdate: boolean): boolean => !forceUpdate);
    }

    const handleReset = (): void => {
        setMin(MIN);
        setMax(MAX);
        onChange(minValue, maxValue);
    }

    return (
        <Card>
            <Card.Body>
                <div className='App_slider'>
                    <div className="value">{findPriceByPercent(minValue, maxValue, min)}</div>
                    <TwoSliders
                        range={range}
                        active_range={activeRange}
                        slider1={slider}
                        slider2={slider}
                        ref_slider_num_run={refSliderNumRun}
                        value1={min}
                        value2={max}
                        handleChangeSlider1={handleChangeSlider1}
                        handleChangeSlider2={handleChangeSlider2}
                        afterMouseUp={afterMouseUp}
                    />
                    <div className="value">{findPriceByPercent(minValue, maxValue, max)}</div>
                </div>
                <Button
                    variant="warning"
                    className="my-3"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </Card.Body>
        </Card>
    );
};

export default SortRange;
