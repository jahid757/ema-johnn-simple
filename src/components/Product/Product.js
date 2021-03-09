import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import {Link} from 'react-router-dom'

const Product = (props) => {
    // console.log(props);
    const {img,name,seller,price,stock,key} = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt=""/>
            </div>
            <div>
                <h2 className="product-name"><Link to={"/product/"+key}>{name}</Link></h2>
                <p><small>By: {seller}</small></p>
                <p>Price : ${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                {
                    props.showAddToCard === true && <button onClick={() => props.addProduct(props.product)} className="main-btn"><FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</button>
                }
            </div>
        </div>
    );
};

export default Product;
