import React, {FC, useEffect, useState} from 'react';
import {Smartphone} from "../../types/Smartphone";

export interface ProductsProps {
    products: Smartphone[];
}

const Products: FC<ProductsProps> = ({products}) => {

    return (
        <div>
            {products.map(product => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                    <img src={product.image} alt={product.name}/>
                </div>)
            )}
        </div>
    );
};

export default Products;