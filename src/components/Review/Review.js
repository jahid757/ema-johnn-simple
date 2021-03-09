import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);

    const handelRemoveItem = (productKey) =>{
        // console.log(productKey);
        const newCart = cart.filter(product => product.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const products = fakeData.find(product => product.key === key)
            // console.log(products);
            // console.log(key);
            products.quantity = savedCart[key]
            return products
        })
        // console.log(cartProducts);
        setCart(cartProducts);
    },[])
    // console.log(cart);
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(products => <ReviewItem product = {products} key={products.key} removeItem={handelRemoveItem}></ReviewItem>)
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Review;