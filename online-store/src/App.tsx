import React, {useEffect, useState} from 'react';
import MainLayout from "./components/MainLayout";
import {Container} from "react-bootstrap";
import Products from "./components/Products";
import {Smartphone} from "./types/Smartphone";
import {smartphones} from "./assets/products";

function App() {
    const [products, setProducts] = useState<Smartphone[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        setIsLoading(true);
        setTimeout(() => {
            setProducts(smartphones);
            setIsLoading(false);
        }, 1000);
    }
  return (
    <MainLayout title="Смартфоны">
        <Container>
            <Products products={products}/>
        </Container>
    </MainLayout>
  );
}

export default App;
