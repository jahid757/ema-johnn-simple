import React from 'react';
import './Product.css'

const Product = (props) => {
    return (
        <div>
            <h2>this is {props.name.name} </h2>
            {
                console.log(props)
            }
        </div>
    );
};

export default Product;