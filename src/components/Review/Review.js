import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handelPlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
        // console.log('Order Placed');
    }

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
    let successOrder;
    if(orderPlaced){
       successOrder =<img src={happyImage} alt=""/>
    }

    
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(products => <ReviewItem product = {products} key={products.key} removeItem={handelRemoveItem}></ReviewItem>)
            }
            
            { successOrder }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review"><button onClick={handelPlaceOrder} className="main-btn">Place Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;