import React, {FC, useEffect, useState} from 'react';
import {Car} from '../../types/car';
import CarIcon from '../CarIcon';

const Garage: FC = () => {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        fetch('http://127.0.0.1:3000/garage')
            .then(res => res.json())
            .then(data => {
                setCars(data);
                console.log(data);
            });
    }, []);
    return (
        <section className="container-fluid">
            <h3>Garage</h3>
            {cars.map(car => (
                <div key={car.id} className="car">
                   <CarIcon color={car.color}/> {car.name}
                </div>
            ))}
        </section>
    );
};

export default Garage;
