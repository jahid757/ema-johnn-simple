import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart.length);
    // const totalPrice = cart.reduce((total, product) => total + product.price , 0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }else if(total > 0){
        shipping = 12.99;
    }else if(total > 15){
        shipping = 4.99;
    }
    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2)
    return (
        <div>
            <h3>Order Summary</h3>
            <p>Item Ordered : {cart.length}</p>
            <p><small>Shipping Cost {shipping}</small></p>
            <p><small>Tax : {tax}</small></p>
            <p>Total Price : {grandTotal}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;