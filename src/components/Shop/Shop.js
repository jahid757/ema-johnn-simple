import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart} from '../../utilities/databaseManager'


const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(first10);
    const [cart,setCart] = useState([]);

    const handelAddProduct = (product) => {
        // console.log('Product Add',product);
        const newCart = [...cart,product];
        setCart(newCart)
        const sameProduct = newCart.filter(products => products.key === product.key);
        const count = sameProduct.length
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(product => <Product showAddToCard={true} product = {product} key={product.key} addProduct = {handelAddProduct}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart ={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;
