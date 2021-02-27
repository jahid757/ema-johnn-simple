import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';

const Product = (props) => {
    // console.log(props.product);
    const {img,name,seller,price,stock} = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt=""/>
            </div>
            <div>
                <h2 className="product-name">{name}</h2>
                <p><small>By: {seller}</small></p>
                <p>Price : ${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                <button onClick={() => props.addProduct(props.product)} className="main-btn"><FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</button>
            </div>
        </div>
    );
};

export default Product;
