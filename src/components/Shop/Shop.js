import React, { useEffect, useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager'


const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(first10);
    const [cart,setCart] = useState([]);


    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(productsKey => {
            const product = fakeData.find(product => product.key === productsKey)
            product.quantity = savedCart[productsKey]
            return product;
        })
        setCart(previousCart);
    },[])


    const handelAddProduct = (product) => {
        // console.log('Product Add',product);
        // const newCart = [...cart,product];
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(products => products.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count; // sameProduct.quantity + 1
            const others = cart.filter(products => products.key !== toBeAddedKey);
            newCart = [...others,sameProduct]
        }else{
            product.quantity = 1;
            newCart = [...cart,product]
        }
        setCart(newCart);
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
                <Cart cart ={cart}>
                <Link to="/review"><button className="main-btn">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
