import React from 'react';

const ReviewItem = (props) => {
    // console.log(props.product);
    const {name,quantity,key,price} = props.product
    return (
        <div style={{borderBottom:'1px solid lightgray', padding:'20px'}}>
            <h2 className="product-name">{name}</h2>
            <p>Quantity: {quantity}</p>
            <p><small>$ {price}</small></p>
            <br/>
            <button onClick={() => props.removeItem(key)} className = "main-btn">Remove</button>
        </div>
    );
};

export default ReviewItem;