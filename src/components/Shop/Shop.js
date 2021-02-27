import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';


const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(first10);
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product name = {product}></Product>)
                }
            </div>
            <div className="cart-container">
                <h2>this is cart</h2>
            </div>
        </div>
    );
};

export default Shop;